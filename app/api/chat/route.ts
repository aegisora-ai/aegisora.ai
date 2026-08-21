import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireUser } from "@/utils/supabase/auth-guard";

// Tip Tanımlamaları
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface GroqRequestPayload {
  messages: Message[];
}

export async function POST(req: Request) {
  try {
    const body: GroqRequestPayload = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload: 'messages' array is required." },
        { status: 400 },
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!groqApiKey || !supabaseUrl || !supabaseServiceKey) {
      console.error("[Aegisora Core] Missing critical environment variables.");
      return NextResponse.json(
        {
          error: "Server configuration error. Contact platform administrator.",
        },
        { status: 500 },
      );
    }

    // 🚀 Server-side Supabase Client (Enterprise Güvenlik Optimizasyonu)
    // Sadece sunucu tarafında çalışan ve RLS'i bypass eden Service Role Key kullanıyoruz.
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 📊 Veritabanından Anlık Enterprise Telemetri Verilerini Çekelim
    let dbContextSummary = "No active database context available.";
    try {
      const [agentsRes, incidentsRes, policiesRes] = await Promise.all([
        supabase.from("agents").select("id, name, model, risk_level, status"),
        supabase
          .from("incidents")
          .select("id, threat_type, severity, status, agent_name")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase.from("policy_rules").select("policy_key, is_enabled"),
      ]);

      // Hata kontrolü
      if (agentsRes.error)
        console.error("Agents fetch error:", agentsRes.error);
      if (incidentsRes.error)
        console.error("Incidents fetch error:", incidentsRes.error);
      if (policiesRes.error)
        console.error("Policies fetch error:", policiesRes.error);

      dbContextSummary = `
REAL-TIME DATABASE TELEMETRY & STATE:
- Total Deployed Agents: ${agentsRes.data?.length || 0}
- Agent Fleet Details: ${JSON.stringify(agentsRes.data || [])}
- Recent Security Incidents: ${JSON.stringify(incidentsRes.data || [])}
- Active Security Policies: ${JSON.stringify(policiesRes.data || [])}
`;
    } catch (dbErr) {
      console.error(
        "[Aegisora Core] Failed to fetch DB context for AI telemetry:",
        dbErr,
      );
    }

    // 🧠 Groq API Çağrısı
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are Aegisora Intelligence Core, an expert enterprise AI security, governance, and runtime protection assistant.
You have direct, real-time access to the organization's PostgreSQL database telemetry.

${dbContextSummary}

Guidelines:
- Always base your security answers, analytics, and diagnostics on the real database telemetry provided above. Never invent fake agent names or mock incident IDs if real ones exist.
- If the user asks about the fleet, incidents, or security rules, quote the actual data from the telemetry above.
- If you need clarification or want to give the user quick choices to narrow down their request (like interactive options), you MUST include a JSON block at the very end of your response formatted exactly like this:
\`\`\`json
{
  "options": ["Option 1", "Option 2", "Option 3"]
}
\`\`\`
If no choices are needed, do not include this json block. Be professional, technical, precise, and authoritative.`,
            },
            ...messages,
          ],
          temperature: 0.3,
          max_tokens: 1024,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to communicate with Groq API.",
      );
    }

    const rawContent =
      data.choices?.[0]?.message?.content || "No response generated.";

    // 🛠️ JSON Parse Optimizasyonu
    let options: string[] = [];
    let cleanContent = rawContent;

    const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed && Array.isArray(parsed.options)) {
          options = parsed.options;
        }
        cleanContent = rawContent.replace(jsonMatch[0], "").trim();
      } catch (parseError) {
        console.warn(
          "[Aegisora Core] Failed to parse JSON options from LLM response:",
          parseError,
        );
        // Parse hatası olursa içeriği bozmamak için müdahale etmiyoruz
      }
    }

    return NextResponse.json({ result: cleanContent, options });
  } catch (error: unknown) {
    console.error("[Aegisora Core] API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during AI processing." },
      { status: 500 },
    );
  }
}


