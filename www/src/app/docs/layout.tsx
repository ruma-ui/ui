import { Sidebar } from "../../components/Sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-hidden py-8 md:pl-8 lg:pl-12">{children}</main>
      </div>
    </div>
  );
}
