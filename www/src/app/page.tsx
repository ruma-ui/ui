"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "@ruma-kit/ui";

export default function Home() {
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommand = "npx @ruma-kit/cli init";

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl" />

      {/* Hero Content */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          <span>✨ Enterprise Component System</span>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl">
          Build your component library. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Copy. Paste. Customize.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Beautifully crafted, production-ready React components built with TypeScript and Tailwind
          CSS. Directly installed into your codebase via CLI.
        </p>

        {/* Action Buttons & Terminal */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg transition-all hover:bg-zinc-200 sm:w-auto"
          >
            Get Started
          </Link>
          <Link
            href="/docs/components"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto"
          >
            Browse Components
          </Link>

          {/* Quick CLI Terminal Copy */}
          <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 font-mono text-xs text-zinc-300 sm:w-auto">
            <span>$ {cliCommand}</span>
            <button
              onClick={copyCli}
              className="rounded-md bg-zinc-800 px-2 py-1 font-sans text-[11px] text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              {copiedCli ? <span className="text-emerald-400">Copied!</span> : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Live Component Preview Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white">Live Component Showcase</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Interactive preview of components ready for your application
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Showcase Card 1: Buttons & Badges */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div>
              <span className="font-mono text-xs text-cyan-400">Button & Badge</span>
              <h3 className="mt-1 text-base font-semibold text-white">Visual Variants</h3>
              <p className="mt-1 mb-6 text-xs text-zinc-400">
                Built-in states, sizes, and color palettes.
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="primary">
                    Primary
                  </Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                  <Button size="sm" variant="outline">
                    Outline
                  </Button>
                  <Button size="sm" variant="destructive">
                    Danger
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">New</Badge>
                  <Badge variant="secondary">Beta</Badge>
                  <Badge variant="info" style="outline">
                    v0.1.0
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-zinc-800/60 pt-4 text-xs text-zinc-400">
              <span>npx ruma-ui add button</span>
              <Link href="/docs/components/button" className="text-cyan-400 hover:underline">
                View Docs &rarr;
              </Link>
            </div>
          </div>

          {/* Showcase Card 2: Interactive Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div>
              <span className="font-mono text-xs text-cyan-400">Card & Switch</span>
              <h3 className="mt-1 text-base font-semibold text-white">Structured Containers</h3>
              <p className="mt-1 mb-4 text-xs text-zinc-400">
                Header, body, footer, and form controls.
              </p>

              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                  <h4 className="text-sm font-semibold text-white">Notifications</h4>
                  <p className="text-xs text-zinc-400">Configure how you receive alerts.</p>
                </CardHeader>
                <CardBody className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-300">Push Notifications</span>
                    <Switch id="showcase-switch" defaultChecked />
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-zinc-800/60 pt-4 text-xs text-zinc-400">
              <span>npx ruma-ui add card</span>
              <Link href="/docs/components/card" className="text-cyan-400 hover:underline">
                View Docs &rarr;
              </Link>
            </div>
          </div>

          {/* Showcase Card 3: Tabs Navigation */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <div>
              <span className="font-mono text-xs text-cyan-400">Tabs</span>
              <h3 className="mt-1 text-base font-semibold text-white">Tabbed Navigation</h3>
              <p className="mt-1 mb-4 text-xs text-zinc-400">
                Uncontrolled and controlled state management.
              </p>

              <Tabs defaultValue="tab1" className="w-full">
                <TabList>
                  <Tab value="tab1">General</Tab>
                  <Tab value="tab2">Security</Tab>
                </TabList>
                <TabPanel
                  value="tab1"
                  className="mt-2 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300"
                >
                  General project settings and organization aliases.
                </TabPanel>
                <TabPanel
                  value="tab2"
                  className="mt-2 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300"
                >
                  API keys, OAuth client secrets, and permissions.
                </TabPanel>
              </Tabs>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-zinc-800/60 pt-4 text-xs text-zinc-400">
              <span>npx ruma-ui add tabs</span>
              <Link href="/docs/components/tabs" className="text-cyan-400 hover:underline">
                View Docs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl border-t border-zinc-800/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 font-bold text-cyan-400">
              ⚡
            </div>
            <h3 className="text-base font-semibold text-white">CLI Component Delivery</h3>
            <p className="text-sm text-zinc-400">
              Add individual components directly into your source folder using `npx ruma-ui add`
              with zero bloat.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 font-bold text-blue-400">
              🎨
            </div>
            <h3 className="text-base font-semibold text-white">Tailwind CSS & CSS Variables</h3>
            <p className="text-sm text-zinc-400">
              Fully styled with Tailwind CSS custom tokens. Easily customize colors, fonts, and dark
              mode themes.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 font-bold text-indigo-400">
              🛡️
            </div>
            <h3 className="text-base font-semibold text-white">100% TypeScript</h3>
            <p className="text-sm text-zinc-400">
              Type-safe component props, autocomplete, and strict TypeScript definitions out of the
              box.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
