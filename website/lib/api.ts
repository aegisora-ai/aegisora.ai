// Aegisora Enterprise Backend Entegrasyon Katmanı
// Gerçek ortamda burası process.env.NEXT_PUBLIC_API_URL üzerinden REST/gRPC endpoint'lerine bağlanır.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.aegisora.org/v1";

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('aegisora_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend bağlantısı simüle ediliyor (Local Mock Mode Active):", error);
    return null;
  }
}

// Agent Fleet Verilerini Çek
export async function getAgents() {
  const data = await fetchWithAuth('/agents');
  return data || [
    { id: "agt_001", name: "Customer Support Bot", provider: "OpenAI (gpt-4o)", status: "Active", latency: "42ms", requests: "842k" },
    { id: "agt_002", name: "Internal HR Assistant", provider: "Anthropic (claude-3)", status: "Active", latency: "65ms", requests: "12k" },
  ];
}

// Policy Listesini Çek
export async function getPolicies() {
  const data = await fetchWithAuth('/policies');
  return data || [
    { id: "pol_strict_pii", name: "Strict PII Redaction", mode: "Blocking", type: "Data Privacy", violations: "1,204" },
    { id: "pol_anti_jailbreak", name: "Heuristic Anti-Jailbreak", mode: "Blocking", type: "Security", violations: "853" },
  ];
}
