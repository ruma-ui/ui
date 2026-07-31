export default function CliPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">CLI Reference</h1>
        <p className="mt-2 text-base text-zinc-400">
          Use the ruma-ui CLI to add components, initialize configurations, and manage dependencies.
        </p>
      </div>

      {/* Init Command */}
      <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="font-mono text-cyan-400">init</span>
        </h2>
        <p className="text-sm text-zinc-300">
          Initializes ruma-ui in your project. Creates{" "}
          <code className="font-mono text-cyan-400">components.json</code>, configures import
          aliases, creates <code className="font-mono text-cyan-400">lib/utils.ts</code>, and
          installs dependencies.
        </p>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
          npx @rumaui/cli init [options]
        </div>

        <h3 className="pt-2 text-sm font-semibold text-white">Options</h3>
        <ul className="space-y-2 text-xs text-zinc-300">
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">-y, --yes</code>
            <span>Skip confirmation prompts and use default configuration values.</span>
          </li>
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">
              -t, --template &lt;template&gt;
            </code>
            <span>
              Specify framework template (e.g. <code className="text-white">next</code>) when
              scaffolding a new project.
            </span>
          </li>
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">-n, --name &lt;name&gt;</code>
            <span>Specify the name of the new project to create.</span>
          </li>
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">-c, --cwd &lt;path&gt;</code>
            <span>Specify the working directory (defaults to current directory).</span>
          </li>
        </ul>
      </div>

      {/* Add Command */}
      <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="font-mono text-cyan-400">add</span>
        </h2>
        <p className="text-sm text-zinc-300">
          Adds components to your project. Downloads component source files from the registry,
          remaps import aliases, and installs package dependencies.
        </p>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
          npx ruma-ui add [components...] [options]
        </div>

        <h3 className="pt-2 text-sm font-semibold text-white">Examples</h3>
        <div className="space-y-2 font-mono text-xs">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-300">
            npx ruma-ui add button
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-300">
            npx ruma-ui add button card tabs switch alert
          </div>
        </div>

        <h3 className="pt-2 text-sm font-semibold text-white">Options</h3>
        <ul className="space-y-2 text-xs text-zinc-300">
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">-o, --overwrite</code>
            <span>Overwrite existing component files without prompting.</span>
          </li>
          <li className="flex gap-2">
            <code className="shrink-0 font-mono text-cyan-400">-c, --cwd &lt;path&gt;</code>
            <span>Specify the working directory target.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
