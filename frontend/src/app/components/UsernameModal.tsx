"use client";

import { FormEvent, useEffect, useState } from "react";

export default function UsernameModal({
  onComplete,
}: {
  onComplete: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // When the app loads, check if they already have a saved name
    const storedName = localStorage.getItem("codeio_username");
    if (!storedName) {
      setIsVisible(true); // Show modal if no name is found
    } else {
      onComplete(storedName); // Skip modal and log them in
    }
  }, [onComplete]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return; // Prevent empty names

    // Save to browser memory and close modal
    localStorage.setItem("codeio_username", name.trim());
    setIsVisible(false);
    onComplete(name.trim());
  };

  // If they are already logged in, render nothing so the workspace shows
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold text-white">
          Welcome to code.io
        </h2>
        <p className="mb-6 text-sm text-neutral-400">
          Enter a username to join the workspace.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Lucky, Daksh..."
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Join Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
