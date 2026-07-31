"use client";

import { useState } from "react";

interface ComponentPreviewProps {
  slug: string;
  name: string;
  code: string;
  children: React.ReactNode;
}

export function ComponentPreview({ slug, code, children }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommand = `npx @rumaui/cli add ${slug}`;

  const copyToClipboard = (text: string, type: "code" | "cli") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        {/* Tabs: Preview vs Code */}
        <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "preview"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "code"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Code
          </button>
        </div>

        {/* CLI Quick Action */}
        <div className="mt-2 flex items-center gap-2 sm:mt-0">
          <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300 sm:flex">
            <span>$ {cliCommand}</span>
            <button
              onClick={() => copyToClipboard(cliCommand, "cli")}
              className="text-zinc-400 transition-colors hover:text-white"
              title="Copy CLI command"
            >
              {copiedCli ? (
                <span className="font-sans text-[10px] text-emerald-400">Copied!</span>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>

          {activeTab === "code" && (
            <button
              onClick={() => copyToClipboard(code, "code")}
              className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              {copiedCode ? (
                <span className="text-emerald-400">Copied!</span>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy code</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "preview" ? (
        <div className="flex min-h-[300px] items-center justify-center bg-zinc-950/40 p-8">
          {children}
        </div>
      ) : (
        <div className="overflow-x-auto bg-zinc-950 p-4">
          <pre className="border-none bg-transparent p-0 font-mono text-xs leading-relaxed text-zinc-300">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
