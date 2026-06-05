"use client";
import { useState } from "react";
import Navbar from './components/Navbar'; 
import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
export default function Home() {
    const [username, setUsername] = useState("");
    const [hasJoined, setHasJoined] = useState(false);
    const [language, setLanguage] = useState("c");

    const handleJoin = () => {
    if (username.trim() !== "") {
        setHasJoined(true);
    }
    };
    
  return (
    <>
        {hasJoined?(
        <div className="h-screen flex flex-col">
            <Navbar 
            username={username} 
            onLeave={() => setHasJoined(false)} 
            />
            <PanelGroup direction="horizontal">
            
            <Panel defaultSize={50} minSize={20}>
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
            </Panel>

            <PanelResizeHandle className="w-2 bg-neutral-700 cursor-col-resize" />

            <Panel defaultSize={50} minSize={20}>
                output
            </Panel>
            </PanelGroup>
        </div>
        )
        :(
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-7xl mb-7">
                Welcome to Code.io
            </h1>
            <input
            className="placeholder:text-center text-center px-4 py-2 border border-neutral-700 rounded bg-neutral-800 focus:outline-none focus:border-blue-500 mb-4"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e)=>{
                const value = e.target.value;
                if (/^[A-Za-z]*$/.test(value)) {
                setUsername(value);}
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleJoin();
            }}}
            />
            <button onClick={handleJoin} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors">Join Room</button>
        </div>
        )}
  </>);
}
