"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, Plus, Key } from "lucide-react";

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.includes("webhooks") ? "webhooks" : "connected-apps";

  return (
    <div className="h-[calc(100v h-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflo w-y-auto cf-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Share2 className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Protect & Connect</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Integrations & APIs</h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
              Connect external services, configure automated incident forwarding, and manage webhook endpoints for your AI fleet.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#18181b] border b order-border hover:bg-[#27272a] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer">
              <Key className="w-3.5 h-3.5" /> API Keys
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer shado w-sm">
              <Plus className="w-3.5 h-3.5" /> Add Connection
            </button>
          </div>
        </div>

        {/* CLOUDFLARE TABS */}
        <div className="flex items-center gap-6 b order-b b order-border/50 mb-6">
          <Link
            href="/dashboard/integrations/connected-apps"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'connected-apps' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Connected Apps
            {activeTab === 'connected-apps' && <motion.div layoutId="integrations-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/integrations/webhooks"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'webhooks' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Webhooks
            {activeTab === 'webhooks' && <motion.div layoutId="integrations-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
        </div>

        {/* RENDERED CHILD PAGES */}
        {children}

      </div>
    </div>
  );
}
