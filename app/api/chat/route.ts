import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is not configured on the server." },
        { status: 500 },
      );
    }

    // 🚀 Server-side Supabase Client (Gerçek Veritabanı Bağlamı İçin)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 📊 Veritabanından Anlık Enterprise Telemetri Verilerini Çekelim
    let dbContextSummary = "No active database context available.";
    try {
      const [{ data: agents }, { data: incidents }, { data: policies }] =
        await Promise.all([
          supabase.from("agents").select("id, name, model, risk_level, status"),
          supabase
            .from("incidents")
            .select("id, threat_type, severity, status, agent_name")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase.from("policy_rules").select("policy_key, is_enabled"),
        ]);

      dbContextSummary = `
REAL-TIME DATABASE TELEMETRY & STATE:
- Total Deployed Agents: ${agents?.length || 0}
- Agent Fleet Details: ${JSON.stringify(agents || [])}
- Recent Security Incidents: ${JSON.stringify(incidents || [])}
- Active Security Policies: ${JSON.stringify(policies || [])}
`;
    } catch (dbErr) {
      console.error("Failed to fetch DB context for AI:", dbErr);
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
- If you need clarification or want to give the user quick choices to narrow down their request (like Claude Artifacts / interactive options), you MUST include a JSON block at the very end of your response formatted exactly like this:
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
      data.choices[0]?.message?.content || "No response generated.";

    let options: string[] = [];
    let cleanContent = rawContent;

    const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.options && Array.isArray(parsed.options)) {
          options = parsed.options;
        }
        cleanContent = rawContent.replace(jsonMatch[0], "").trim();
      } catch (e) {
        // Parse hatası olursa yut
      }
    }

    return NextResponse.json({ result: cleanContent, options });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
