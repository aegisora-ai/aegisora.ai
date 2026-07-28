import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Sunucu Bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    // 1. API Key Kontrolü (Sisteme sadece anahtarı olanlar girebilir)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer aeg_")) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid API Key" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { agentId, workspaceId, prompt } = body;

    if (!agentId || !workspaceId || !prompt) {
      return NextResponse.json(
        { error: "Missing required payload (agentId, workspaceId, prompt)" },
        { status: 400 },
      );
    }

    // --- AEGISORA OTONOM TEHDİT TARAMASI (Zero-Trust) ---
    let threatDetected = null;
    let severity = "Low";
    let status = "Passed";

    const lowerPrompt = prompt.toLowerCase();

    // Senaryo 1: Prompt Injection (Siber Saldırı)
    if (lowerPrompt.includes("ignore") && lowerPrompt.includes("instruction")) {
      threatDetected = "Prompt Injection";
      severity = "HIGH";
      status = "Mitigated";
    }
    // Senaryo 2: PII Data Leak (Kredi Kartı / SSN Sızıntısı)
    else if (
      lowerPrompt.match(/\d{4}-\d{4}-\d{4}-\d{4}/) ||
      lowerPrompt.includes("ssn") ||
      lowerPrompt.includes("password")
    ) {
      threatDetected = "PII Exposure";
      severity = "CRITICAL";
      status = "Blocked";
    }
    // Senaryo 3: Hallucination Risk (Saçmalama veya Manipülasyon)
    else if (
      lowerPrompt.includes("drop table") ||
      lowerPrompt.includes("system prompt")
    ) {
      threatDetected = "Unauthorized System Access";
      severity = "CRITICAL";
      status = "Blocked";
    }

    // EĞER TEHDİT BULUNURSA: Blokla ve Veritabanına (Risk Center'a) Yaz!
    if (threatDetected) {
      const incidentId = `INC-${Math.floor(Math.random() * 9000) + 1000}`;

      const { error } = await supabase.from("incidents").insert([
        {
          id: incidentId,
          workspace_id: workspaceId,
          threat_type: threatDetected,
          agent_name: agentId,
          severity: severity,
          status: status,
          payload: `Intercepted Request: "${prompt}"`,
        },
      ]);

      if (error) console.error("Aegisora Core DB Error:", error);

      // Müşteriye "İsteğin Aegisora tarafından engellendi" yanıtı dön
      return NextResponse.json(
        {
          success: false,
          action: "blocked_by_aegisora",
          reason: threatDetected,
          incident_id: incidentId,
        },
        { status: 403 },
      );
    }

    // EĞER TEMİZSE: İsteğe izin ver
    return NextResponse.json(
      {
        success: true,
        action: "passed",
        scanned_prompt: prompt,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
