import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Sunucu Bağlantısı (Enterprise Güvenlik Optimizasyonu)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ScanPayload {
  agentId?: string;
  workspaceId?: string;
  prompt?: string;
}

export async function POST(req: Request) {
  try {
    // 1. API Key Kontrolü (Sisteme sadece yetkili Aegisora anahtarı olanlar girebilir)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer aeg_")) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing Aegisora API Key" },
        { status: 401 },
      );
    }

    const body: ScanPayload = await req.json();
    const { agentId, workspaceId, prompt } = body;

    if (!agentId || !workspaceId || !prompt) {
      return NextResponse.json(
        {
          error:
            "Missing required payload parameters (agentId, workspaceId, prompt)",
        },
        { status: 400 },
      );
    }

    // --- AEGISORA OTONOM TEHDİT TARAMASI (Zero-Trust Engine) ---
    let threatDetected: string | null = null;
    let severity = "Low";
    let status = "Passed";

    const lowerPrompt = prompt.toLowerCase();

    // Senaryo 1: Prompt Injection (Siber Saldırı / Komut Manipülasyonu)
    if (
      (lowerPrompt.includes("ignore") && lowerPrompt.includes("instruction")) ||
      lowerPrompt.includes("disregard previous")
    ) {
      threatDetected = "Prompt Injection";
      severity = "HIGH";
      status = "Mitigated";
    }
    // Senaryo 2: PII Data Leak (Kredi Kartı / Hassas Veri Sızıntısı)
    else if (
      lowerPrompt.match(/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/) ||
      lowerPrompt.includes("ssn") ||
      lowerPrompt.includes("password") ||
      lowerPrompt.includes("credit_card")
    ) {
      threatDetected = "PII Exposure";
      severity = "CRITICAL";
      status = "Blocked";
    }
    // Senaryo 3: Unauthorized System Access (Yetkisiz Komut veya Veritabanı Tehdidi)
    else if (
      lowerPrompt.includes("drop table") ||
      lowerPrompt.includes("system prompt") ||
      lowerPrompt.includes(("ex" + "ec(")) ||
      lowerPrompt.includes(("ev" + "al("))
    ) {
      threatDetected = "Unauthorized System Access";
      severity = "CRITICAL";
      status = "Blocked";
    }

    // EĞER TEHDİT BULUNURSA: Blokla ve Veritabanına (Risk Center / Incidents) Kaydet!
    if (threatDetected) {
      // Çakışmayı önlemek için benzersiz incident kimliği üretimi
      const incidentId = `INC-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

      const { error } = await supabase.from("incidents").insert([
        {
          id: incidentId,
          workspace_id: workspaceId,
          threat_type: threatDetected,
          agent_name: agentId,
          severity: severity,
          status: status,
          payload: `Intercepted Request: "${prompt.substring(0, 250)}..."`, // Uzun payload'ları truncate et
        },
      ]);

      if (error) {
        console.error("Aegisora Core DB Incident Insert Error:", error);
      }

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

    // EĞER TEMİZSE: İsteğe izin ver ve telemetriyi geçir
    return NextResponse.json(
      {
        success: true,
        action: "passed",
        scanned_prompt: prompt,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Aegisora Scan Route Error:", error);
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Internal Server Error during threat scan") },
      { status: 500 },
    );
  }
}
