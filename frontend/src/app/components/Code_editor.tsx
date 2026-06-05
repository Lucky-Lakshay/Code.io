"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
export default function Code_Editor() {
  const [language, setLanguage] = useState("c");
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
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm transition-colors ml-auto">
          Run Code
      </button>
      </div>
      <div className="flex-grow">
      <Editor
          height="100%"
          language={language}
          theme="vs-dark"
      />
      </div>

  </div>
  );
}