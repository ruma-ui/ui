export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-center text-xs text-zinc-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>
          Built by <span className="font-semibold text-zinc-300">Ruma UI</span>. Distributed under
          MIT License.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ruma-ui/ui"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          <a href="/docs/installation" className="transition-colors hover:text-zinc-300">
            Docs
          </a>
          <a href="/docs/cli" className="transition-colors hover:text-zinc-300">
            CLI
          </a>
        </div>
      </div>
    </footer>
  );
}
