"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPONENTS_DATA } from "../data/componentsData";

export function Sidebar() {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");

  const gettingStartedLinks = [
    { title: "Introduction", href: "/docs" },
    { title: "Installation", href: "/docs/installation" },
    { title: "CLI Reference", href: "/docs/cli" },
    { title: "components.json", href: "/docs/components-json" },
  ];

  const filteredComponents = COMPONENTS_DATA.filter(
    comp =>
      comp.name.toLowerCase().includes(filter.toLowerCase()) ||
      comp.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-800/60 py-8 pr-6 md:block">
      {/* Search Input Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter components..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500 focus:outline-none"
        />
      </div>

      <div className="space-y-6">
        {/* Getting Started Section */}
        <div>
          <h4 className="mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Getting Started
          </h4>
          <ul className="space-y-1">
            {gettingStartedLinks.map(item => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-zinc-800 font-semibold text-white"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Components Section */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Components
            </h4>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
              {filteredComponents.length}
            </span>
          </div>
          <ul className="max-h-[calc(100vh-260px)] space-y-1 overflow-y-auto pr-1">
            {filteredComponents.map(comp => {
              const href = `/docs/components/${comp.slug}`;
              const isActive = pathname === href;
              return (
                <li key={comp.slug}>
                  <Link
                    href={href}
                    className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border border-cyan-500/20 bg-cyan-500/10 font-semibold text-cyan-400"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <span>{comp.name}</span>
                    <span className="font-mono text-[10px] text-zinc-500">{comp.category}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
