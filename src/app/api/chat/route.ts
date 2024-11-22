import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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"
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
  } catch (error: unknown) {
    // Gestion des erreurs sans utiliser `any`
    if (error instanceof Error) {
      console.error("Erreur GPT:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Erreur interne lors de la communication avec OpenAI",
        },
        { status: 500 }
      );
    } else {
      console.error("Erreur inconnue:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Une erreur inconnue est survenue.",
        },
        { status: 500 }
      );
    }
  }
}
