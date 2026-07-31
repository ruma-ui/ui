import Link from "next/link";

export default function InstallationPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Installation</h1>
        <p className="mt-2 text-base text-zinc-400">
          How to initialize ruma-ui and configure dependencies in your React project.
        </p>
      </div>

      {/* Step 1 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
            1
          </span>
          <h2 className="text-lg font-bold text-white">Create a React or Next.js project</h2>
        </div>
        <p className="pl-10 text-sm text-zinc-400">
          If you don&apos;t have an existing project, you can initialize{" "}
          <code className="font-mono text-cyan-400">ruma-ui init</code> in an empty directory to
          automatically create a Next.js project, or create one manually:
        </p>
        <div className="pl-10">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
            npx create-next-app@latest my-app --typescript --tailwind --eslint
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
            2
          </span>
          <h2 className="text-lg font-bold text-white">Run the ruma-ui CLI init command</h2>
        </div>
        <p className="pl-10 text-sm text-zinc-400">
          Run the <code className="font-mono text-cyan-400">init</code> command to set up your
          project dependencies and create your{" "}
          <code className="font-mono text-white">components.json</code> config file:
        </p>
        <div className="pl-10">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
            npx @ruma-kit/cli init
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
            3
          </span>
          <h2 className="text-lg font-bold text-white">Configure components.json</h2>
        </div>
        <p className="pl-10 text-sm text-zinc-400">
          The CLI generates a <code className="font-mono text-white">components.json</code> file in
          your project root:
        </p>
        <div className="pl-10">
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
            <pre>{`{
  "$schema": "https://ruma.5dev.in/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`}</pre>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
            4
          </span>
          <h2 className="text-lg font-bold text-white">Start adding components</h2>
        </div>
        <p className="pl-10 text-sm text-zinc-400">You can now add components to your project:</p>
        <div className="pl-10">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
            npx ruma-ui add button card tabs
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <Link
          href="/docs/components"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          Explore All Components &rarr;
        </Link>
      </div>
    </div>
  );
}
