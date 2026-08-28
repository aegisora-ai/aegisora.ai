"use client";
import React, { useState } from "react";
import { MessageSquare, Send, ShieldCheck, Bot, User } from "lucide-react";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello Eray! I am your governed AI assistant. All your queries are protected by Aegisora's active PII and jailbreak guards." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: "user", text: input }];
    setMessages(newMsgs);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: "Message validated successfully through Aegisora Gateway. Policy check passed with 0 violations." }]);
    }, 1000);
  };

  return (
    <div className="max-w-[900px] mx-auto h-[calc(100v h-140px)] flex flex-col animate-in fade-in duration-500">

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#0066FF]" /> Governed AI Chat
          </h1>
          <p className="text-[14px] text-slate-500 font-medium">Test prompts in real-time with active workspace security policies.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-[12px] font-bold rounded-full border b order-emerald-200">
          <ShieldCheck className="w-4 h-4" /> Guards Active
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white border b order-slate-200 rounded-xl shado w-sm flex flex-col overflo w-hidden">

        {/* Message Feed */}
        <div className="flex-1 overflo w-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-ro w-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-[#0066FF]'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[70%] p-4 rounded-2xl text-[14px] leading-relaxed ${
                msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 b order-t b order-slate-200 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message to test guardrails..."
            className="flex-1 px-4 py-3 bg-white border b order-slate-200 rounded-xl text-[14px] focus:outline-none focus:b order-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium"
          />
          <button type="submit" className="px-5 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl font-bold transition-colors flex items-center justify-center shado w-sm">
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
