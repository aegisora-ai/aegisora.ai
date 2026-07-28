import { NextResponse } from "next/server";

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
              content: `You are Aegisora Intelligence Core, an expert enterprise AI security and governance assistant. 
If you need clarification or want to give the user quick choices to narrow down their request (like Claude Artifacts / interactive options), you MUST include a JSON block at the very end of your response formatted exactly like this:
\`\`\`json
{
  "options": ["Option 1", "Option 2", "Option 3"]
}
\`\`\`
If no choices are needed, do not include this json block. Be professional, technical, and precise.`,
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

    // JSON seçeneklerini ve metni birbirinden ayıralım
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
        // Parse hatası olursa sessizce geç
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
