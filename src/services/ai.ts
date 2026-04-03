import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function summarizeText(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `Summarize the following text concisely and clearly:\n\n${text}` }] }],
    });
    
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Summarization error:", error);
    throw new Error("Failed to summarize text. Please check your API key or try again later.");
  }
}

export async function* summarizeTextStream(text: string) {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `Summarize the following text concisely and clearly:\n\n${text}` }] }],
    });

    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Summarization streaming error:", error);
    throw new Error("Failed to stream summary. Please check your API key or try again later.");
  }
}
