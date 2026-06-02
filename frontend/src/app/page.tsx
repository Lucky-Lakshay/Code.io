"use client";

import { useState } from "react";
import UsernameModal from "./components/UsernameModal";

export default function Home() {
  // This state holds the identity of the current user
  const [username, setUsername] = useState<string | null>(null);

  return (
    <main className="flex h-screen w-screen flex-col bg-neutral-950 text-white overflow-hidden">
      {/* The Gatekeeper */}
      <UsernameModal onComplete={(name) => setUsername(name)} />

      {/* The Workspace (Only renders if the user has provided a name) */}
      {username ? (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-neutral-700 mb-4">code.io</h1>
          <p className="text-neutral-500">
            Identity confirmed:{" "}
            <span className="text-blue-500 font-semibold">{username}</span>
          </p>
          <p className="text-sm text-neutral-600 mt-2">
            Waiting for workspace UI...
          </p>
        </div>
      ) : null}
    </main>
  );
}
