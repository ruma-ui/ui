import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Introduction</h1>
        <p className="mt-2 text-base text-zinc-400">
          Re-usable components built using React, TypeScript, and Tailwind CSS.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">What is ruma-ui?</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          <strong className="text-white">ruma-ui</strong> is NOT a component library package
          installed via npm dependency. It is a collection of re-usable components that you copy and
          paste into your apps or install via CLI directly into your codebase.
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          You own the code. Pick the components you need, customize the styles to fit your brand
          design system, and maintain full control over your UI dependencies.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Why ruma-ui?</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-sm font-semibold text-white">Full Customization</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Direct source code in your project directory. Change any styling or behavior anytime.
            </p>
          </li>
          <li className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-sm font-semibold text-white">Zero Dependency Lock-in</h3>
            <p className="mt-1 text-xs text-zinc-400">
              No bulky npm package updates or breaking library updates. You are in complete control.
            </p>
          </li>
          <li className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-sm font-semibold text-white">Tailwind CSS & Dark Mode</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Styled using standard Tailwind CSS classes and CSS custom properties.
            </p>
          </li>
          <li className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-sm font-semibold text-white">CLI Powered</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Install components with one terminal command:{" "}
              <code className="font-mono text-cyan-400">npx ruma-ui add &lt;component&gt;</code>.
            </p>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4 border-t border-zinc-800 pt-4">
        <Link
          href="/docs/installation"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          Next: Installation &rarr;
        </Link>
        <Link
          href="/docs/cli"
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-700"
        >
          CLI Reference
        </Link>
      </div>
    </div>
  );
}
