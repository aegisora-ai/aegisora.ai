import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/utils/supabase/server";

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

    // ============================================================
    // AEGISORA AUTH BOUNDARY
    // Anonymous API access blocked
    // ============================================================
    const authClient = await createServerClient();

    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Authentication required." },
        { status: 401 },
      );
    }

    const body: GroqRequestPayload = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload: 'messages' array is required." },
        { status: 400 },
      );
    }

