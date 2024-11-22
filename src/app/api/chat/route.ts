import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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" // Utilise ta clé OpenAI depuis .env.local
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Récupérer le corps de la requête
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json(
        { success: false, message: "Aucun prompt fourni." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.31,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const completion = response.choices[0].message;

    return NextResponse.json({ success: true, message: completion });
  } catch (error: any) {
    console.error("Erreur GPT:", error.message);
    return NextResponse.json(
      { success: false, message: "Erreur interne lors de la communication avec OpenAI" },
      { status: 500 }
    );
  }
}
