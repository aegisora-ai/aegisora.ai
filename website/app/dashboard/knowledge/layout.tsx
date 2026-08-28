"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderOpen, Plus, RefreshCw } from "lucide-react";

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.includes("vector-db") ? "vector-db" : "datasets";

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflow-y-auto cf-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <FolderOpen className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Build</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Knowledge Base</h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
              Connect external data sources, manage embeddings, and monitor vector database performance for retrieval-augmented generation (RAG).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#18181b] border border-border hover:bg-[#27272a] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" /> Sync All
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Add Data Source
            </button>
          </div>
        </div>

        {/* CLOUDFLARE TABS */}
        <div className="flex items-center gap-6 border-b border-border/50 mb-6">
          <Link
            href="/dashboard/knowledge/datasets"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'datasets' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Datasets & Sources
            {activeTab === 'datasets' && <motion.div layoutId="knowledge-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/knowledge/vector-db"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'vector-db' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Vector Database
            {activeTab === 'vector-db' && <motion.div layoutId="knowledge-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
        </div>

        {/* RENDERED CHILD PAGES */}
        {children}

      </div>
    </div>
  );
}
