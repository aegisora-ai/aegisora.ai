import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docLinks = [
    { 
      title: "Getting Started", 
      items: [
        { name: "Introduction", href: "/docs" }, 
        { name: "Quickstart", href: "/docs/quickstart" }
      ] 
    },
    { 
      title: "Core Concepts", 
      items: [
        { name: "Zero-Trust Architecture", href: "/docs/architecture" }, 
        { name: "Agents & Proxies", href: "/docs/agents" }
      ] 
    },
    { 
      title: "Governance", 
      items: [
        { name: "Policy Engine", href: "/docs/policy-engine" }, 
        { name: "Enforcement Rules", href: "/docs/enforcement" },
        { name: "Audit Logging", href: "/docs/audit" }
      ] 
    },
    { 
      title: "Developers", 
      items: [
        { name: "Node.js SDK", href: "/docs/sdk/node" }, 
        { name: "Python SDK", href: "/docs/sdk/python" }, 
        { name: "API Reference", href: "/docs/api" }
      ] 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 py-10">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block border-r border-border pr-6">
          <div className="sticky top-24 space-y-8">
            {docLinks.map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-3 text-sm tracking-tight">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <Link href={item.href} className="hover:text-primary transition-colors block py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-20">
          {children}
        </main>
        
      </div>

      <Footer />
    </div>
  );
}