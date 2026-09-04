import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Menu, Eye, ShieldAlert, Unlock, Activity, Terminal, CheckCircle2, Globe, FileCode2 } from 'lucide-react';

export default function WorkforceAISecurity() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col overflow-x-hidden">
      
      {/* Top Banner & Header (Shared UI) */}
      <div className="bg-[#0b2065] text-center py-2.5 px-4 text-[13px] font-medium flex justify-center items-center gap-2 w-full">
        <span className="hidden sm:inline">Controlling what AI can access isn't enough. Control what it does.</span>
        <span className="underline underline-offset-4 ml-1 cursor-pointer">Read more</span> <ArrowRight className="w-3.5 h-3.5" />
      </div>

      <header className="flex items-center justify-between px-5 md:px-8 py-5 border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/images/aegisora-logo.png" alt="Aegisora" width={28} height={28} className="rounded-sm" priority />
          </Link>
          <span className="font-bold tracking-[0.2em] uppercase text-[16px] leading-none text-white">Aegisora</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-zinc-300">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-white">
            Products <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <Link href="#" className="hover:text-white transition-colors">Research</Link>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            Resources <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <Link href="#" className="hover:text-white transition-colors">Company</Link>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="hover:text-white transition-colors">Careers</span>
            <span className="px-1.5 py-0.5 rounded-sm bg-[#1a2b6d] text-[#6085ff] text-[10px] font-bold tracking-wider uppercase">Hiring</span>
          </div>
        </nav>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/dashboard/agents" className="text-[14px] font-medium text-zinc-300 hover:text-white transition-colors px-5 py-2.5 rounded-md">
            Log in
          </Link>
          <Link href="#" className="text-[14px] font-medium text-black bg-white hover:bg-zinc-200 transition-colors px-5 py-2.5 rounded-md">
            Book a demo
          </Link>
        </div>
        <div className="lg:hidden flex items-center text-zinc-300"><Menu className="w-6 h-6" /></div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 md:pt-28 pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Subtle Background Radial Glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[#60a5fa]/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="flex-1 lg:pr-10">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-white">
              Protect every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">employee AI</span> interaction.
            </h1>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl">
              Discover shadow AI, assess risk, govern employee usage, and stop sensitive data exposure across AI apps, browser extensions, desktop agents, IDEs, and MCP-connected tools.
            </p>
            <button className="px-8 py-3.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[15px] font-medium rounded-md transition-all">
              Contact sales
            </button>
          </div>

          {/* Code-based Dashboard Mockup */}
          <div className="flex-1 w-full relative">
            <div className="bg-[#0a0c10] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl relative z-10 aspect-[4/3] flex flex-col">
              <div className="border-b border-zinc-800/80 px-4 py-3 flex gap-4 text-[11px] font-medium text-zinc-500 uppercase tracking-wider bg-[#050505]">
                <span className="text-white border-b border-blue-500 pb-3 -mb-3">Applications</span>
                <span>Code Assistants</span>
                <span>MCP Servers</span>
              </div>
              <div className="p-5 flex-1 flex gap-6">
                <div className="w-1/3 flex flex-col gap-4">
                  <div className="text-xs text-zinc-400 font-medium">Risk Distribution</div>
                  <div className="relative w-32 h-32 mx-auto rounded-full border-[8px] border-zinc-800 border-t-red-500 border-r-amber-500"></div>
                  <div className="flex justify-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>High</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Med</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-zinc-400 font-medium mb-4">Top application by category</div>
                  <div className="space-y-3">
                    {[
                      { name: 'ChatGPT', val: '82%', color: 'bg-blue-500' },
                      { name: 'Claude', val: '45%', color: 'bg-indigo-500' },
                      { name: 'Gemini', val: '30%', color: 'bg-purple-500' },
                    ].map(bar => (
                      <div key={bar.name} className="flex items-center gap-3 text-xs">
                        <span className="w-16 text-zinc-300">{bar.name}</span>
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full ${bar.color}`} style={{ width: bar.val }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features 4-Column Grid */}
        <section className="py-24 px-6 border-t border-zinc-900 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-16 max-w-2xl">
              Why Workforce AI needs a new control layer.
            </h2>
            <p className="text-lg text-zinc-400 mb-12 max-w-4xl">
              Employee AI usage is spreading faster than traditional controls can keep up — across browser tools, desktop apps, copilots, IDEs, and connected SaaS services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111318] border border-zinc-800/80 p-6 rounded-xl flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 text-indigo-400">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Shadow AI is spreading</h3>
                <p className="text-sm text-zinc-400">Teams are using sanctioned and unsanctioned AI tools across the browser, desktop, and SaaS.</p>
              </div>
              <div className="bg-[#111318] border border-zinc-800/80 p-6 rounded-xl flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 text-indigo-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Legacy controls miss risk</h3>
                <p className="text-sm text-zinc-400">Traditional DLP and web controls were not built to understand prompts, intent, or AI responses.</p>
              </div>
              <div className="bg-[#111318] border border-zinc-800/80 p-6 rounded-xl flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 text-indigo-400">
                  <Unlock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Sensitive data leaks</h3>
                <p className="text-sm text-zinc-400">Source code, customer data, credentials, and internal plans can all be exposed in real time.</p>
              </div>
              <div className="bg-[#111318] border border-zinc-800/80 p-6 rounded-xl flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 text-indigo-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Runtime governance breaks</h3>
                <p className="text-sm text-zinc-400">Security teams need policy by app, user, data type, and action — not blanket block decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 lg:pr-10">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
                Secure where employees actually interact with AI.
              </h2>
              <p className="text-lg text-zinc-600 mb-12">
                From public chatbots to SaaS copilots to MCP-connected workflows, Workforce AI Security extends visibility and policy enforcement across the modern employee AI stack.
              </p>
              
              {/* Fake Dashboard graphic for light mode */}
              <div className="bg-[#f8fafc] border border-zinc-200 rounded-xl p-6 shadow-sm aspect-[4/3] relative overflow-hidden">
                 <div className="absolute top-4 left-4 right-4 flex gap-4">
                    <div className="w-1/2 h-32 bg-white rounded-lg shadow-sm border border-zinc-100 p-4">
                      <div className="w-1/3 h-2 bg-blue-100 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="w-full h-1 bg-zinc-100 rounded"></div>
                        <div className="w-4/5 h-1 bg-zinc-100 rounded"></div>
                        <div className="w-full h-1 bg-zinc-100 rounded"></div>
                      </div>
                    </div>
                    <div className="w-1/2 h-32 bg-white rounded-lg shadow-sm border border-zinc-100 p-4">
                      <div className="w-1/3 h-2 bg-indigo-100 rounded mb-4"></div>
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-50 mx-auto border-t-indigo-500"></div>
                    </div>
                 </div>
                 <div className="absolute bottom-4 left-4 right-4 h-32 bg-white rounded-lg shadow-sm border border-zinc-100 p-4 flex flex-col gap-3">
                    <div className="w-full h-4 bg-zinc-50 rounded"></div>
                    <div className="w-full h-4 bg-zinc-50 rounded"></div>
                    <div className="w-full h-4 bg-zinc-50 rounded"></div>
                 </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-10">
              {[
                { num: '1', title: 'Public AI tools and copilots', desc: 'Test for damaging prompts and interactions that could cause harm to individuals or groups.' },
                { num: '2', title: 'Browser, desktop, SaaS interactions', desc: 'Cover the places employees engage with AI—copy, paste, upload, and interact day to day.' },
                { num: '3', title: 'Developer tools, agents, MCPs', desc: 'Extend visibility into emerging AI workflows where tools can access codebase and systems.' },
              ].map(step => (
                <div key={step.num} className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600 font-semibold text-lg border border-blue-100">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Defense Plane Cards */}
        <section className="py-24 px-6 bg-[#0a0c10] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-white text-center">
              Secure the employee layer of the AI Defense Plane.
            </h2>
            <p className="text-zinc-400 text-center mb-16 max-w-3xl mx-auto">
              Workforce AI Security protects where employees interact with AI. Together with AI Red Teaming and AI Agent Security, it helps organizations secure employees, applications, and autonomous agents under one broader AI Security strategy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black border border-zinc-800/80 rounded-xl p-8 hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Employees</h3>
                </div>
                <p className="text-sm text-zinc-400">Discover shadow AI and stop sensitive data leakage where work actually happens.</p>
              </div>
              <div className="bg-black border border-zinc-800/80 rounded-xl p-8 hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <FileCode2 className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-xl font-semibold text-white">Applications</h3>
                </div>
                <p className="text-sm text-zinc-400">Identify safety and security failure modes before AI features and copilots reach production.</p>
              </div>
              <div className="bg-black border border-zinc-800/80 rounded-xl p-8 hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Agents</h3>
                </div>
                <p className="text-sm text-zinc-400">Contain unsafe actions, tool abuse, and connected system risk at runtime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-white">
              Speak with an AI security expert about <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Workforce AI Security.</span>
            </h2>
            <p className="text-zinc-400 mb-10">See how to discover shadow AI, define policy, and protect employee AI usage across your organization.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">First Name*</label>
                  <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Last Name*</label>
                  <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email*</label>
                <input type="email" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Company name*</label>
                <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Message*</label>
                <textarea rows={4} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Let us know how we can help."></textarea>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 bg-zinc-900 border-zinc-800 rounded" />
                <span className="text-sm text-zinc-400">Join our beta testing community</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Aegisora needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.
              </p>
              <button type="button" className="w-full py-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-md transition-colors">
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Shared Footer */}
        <footer className="bg-black border-t border-zinc-800 px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Image src="/images/aegisora-logo.png" alt="Aegisora" width={28} height={28} className="rounded-sm" />
                <span className="font-bold tracking-[0.2em] uppercase text-[16px] leading-none text-white">Aegisora</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200">Book a demo</button>
                <button className="px-5 py-2.5 bg-transparent border border-zinc-700 text-white text-sm font-medium rounded-md hover:bg-zinc-800">Start for free</button>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Aegisora Inc.<br/>Zurmaiener Straße, Casenhaus<br/>54292 Trier, Germany
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6 text-sm">Products</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/workforce-ai-security" className="hover:text-white transition-colors">Workforce AI Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">AI Agent Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">AI Red Teaming</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6 text-sm">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
