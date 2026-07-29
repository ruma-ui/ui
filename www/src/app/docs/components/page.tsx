"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPONENTS_DATA } from "../../../data/componentsData";

export default function ComponentsGalleryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Form", "Data Display", "Feedback", "Navigation", "Layout", "Media"];

  const filtered = COMPONENTS_DATA.filter(comp => {
    const matchesSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Components</h1>
        <p className="mt-2 text-base text-zinc-400">
          Browse all production-ready React components built for ruma-ui.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search 50+ components..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex w-full flex-wrap gap-1.5 sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white font-semibold text-zinc-950 shadow"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Components Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(comp => (
          <Link
            key={comp.slug}
            href={`/docs/components/${comp.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white transition-colors group-hover:text-cyan-400">
                  {comp.name}
                </h3>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  {comp.category}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-zinc-400">{comp.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-3 font-mono text-[11px] text-zinc-500 group-hover:text-zinc-300">
              <span>npx ruma-ui add {comp.slug}</span>
              <span className="text-cyan-400">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-zinc-500">
          No components found matching your search.
        </div>
      )}
    </div>
  );
}
