"use client";
interface OutputProps {
  setOutput: (value: string) => void;
}
import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
export default function Code_Editor({setOutput}:OutputProps) {
  const [language, setLanguage] = useState("c");
  const editorRef = useRef<any>(null);
  const handleEditorDidMount = (editor: any) => {
  editorRef.current = editor;
};
  const executeCode = async () => {
    if (!editorRef.current) {
      setOutput("System Error: Editor not loaded.");
      return;
    }

    const currentCode = editorRef.current.getValue();
    
    if (!currentCode) {
      setOutput("Please write some code first.");
      return; 
    }

    setOutput("Running...\n");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language,
          code: currentCode
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setOutput(`Server Error: ${data.error}`);
        return;
      }

      if (data.output && data.output.trim() !== "") {
        setOutput(data.output);
      } else {
        setOutput("Code executed successfully, but there was no output.");
      }

    } catch (error) {
      setOutput("Failed to connect to local execution server.");
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="bg-neutral-800 p-2 flex justify-between items-center border-b border-neutral-700">
      
      <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-neutral-700 text-white px-2 py-1 rounded text-sm outline-none"
      >
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      </select>
      <button onClick={executeCode} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm transition-colors ml-auto">
          Run Code
      </button>
      </div>
      <div className="flex-grow relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

  </div>
  );
}