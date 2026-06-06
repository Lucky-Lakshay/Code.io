import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import crypto from 'crypto';
const execPromise = util.promisify(exec);
const LANGUAGE_CONFIG: Record<string, any> = {
  python: {
    extension: 'py',
    image: 'python:3.10-slim',
    command: (file: string, inputFile: string) => `python ${file} < ${inputFile}`
  },
  javascript: {
    extension: 'js',
    image: 'node:18-alpine',
    command: (file: string, inputFile: string) => `node ${file} < ${inputFile}`
  },
  c: {
    extension: 'c',
    image: 'gcc:latest',
    command: (file: string, inputFile: string) => `gcc ${file} -o a.out && ./a.out < ${inputFile}`
  },
  cpp: {
    extension: 'cpp',
    image: 'gcc:latest',
    command: (file: string, inputFile: string) => `g++ ${file} -o a.out && ./a.out < ${inputFile}`
  }
};

export async function POST(request: Request) {
  const { language, code, input = "" } = await request.json();

  if (!LANGUAGE_CONFIG[language]) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  const config = LANGUAGE_CONFIG[language];
  const uniqueId = crypto.randomUUID();
  
  const filename = `main_${uniqueId}.${config.extension}`;
  const inputFilename = `input_${uniqueId}.txt`;

  const tempDir = path.join(process.cwd(), '.temp_execution');
  const filePath = path.join(tempDir, filename);
  const inputFilePath = path.join(tempDir, inputFilename);

  try {
    await fs.mkdir(tempDir, { recursive: true });

    await fs.writeFile(filePath, code);
    await fs.writeFile(inputFilePath, input);

    const dockerCmd = `docker run --rm -v "${tempDir}:/app" -w /app ${config.image} sh -c "${config.command(filename, inputFilename)}"`;

    const { stdout, stderr } = await execPromise(dockerCmd, { timeout: 10000 });

    let finalOutput = stdout;
    if (stderr) finalOutput = stderr + "\n" + stdout;

    return NextResponse.json({ output: finalOutput });

  } catch (error: any) {
    let errorMessage = "Execution failed.";
    if (error.killed) errorMessage = "Error: Execution timed out (Infinite loop detected).";
    else if (error.stderr) errorMessage = error.stderr; 
    else if (error.stdout) errorMessage = error.stdout;

    return NextResponse.json({ output: errorMessage });

  } finally {
    try {
      await fs.unlink(filePath);
      await fs.unlink(inputFilePath);
    } catch (cleanupError) {
      console.error("Failed to delete temp files:", cleanupError);
    }
  }
}