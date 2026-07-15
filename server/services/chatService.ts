import { getGeminiClient } from "../gemini";
import { Type } from "@google/genai";

export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export interface ChatResponseResult {
  answer: string;
  keyPoints: string[];
  sourceFile: string;
  sourceSection: string;
  sourcePage: string;
}

export async function generateChatResponse(
  docText: string,
  fileName: string,
  message: string,
  chatHistory: ChatMessage[]
): Promise<ChatResponseResult> {
  const ai = getGeminiClient();

  // Map history to simple formatted text for Gemini
  const conversationContext = chatHistory
    .slice(-10) // Limit to last 10 messages for token safety
    .map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`)
    .join("\n");

  const prompt = `
You are DocMind AI, a helpful, professional, and thorough AI Document Assistant.
Your task is to answer the user's question about the uploaded document "${fileName}".

Rules for your response:
1. GROUNDING: You MUST base your response ONLY on the provided document text. Do NOT hallucinate or refer to outside knowledge. If the answer cannot be found in the document, reply stating that the document does not contain this information.
2. ANSWER DETAIL: Provide a clear, long, and detailed response whenever required. Use formatting like paragraphs, bullet points, and strong text where necessary.
3. STRUCTURE: Break your response into:
   - "answer": The complete text of your response.
   - "keyPoints": An optional array of 2-4 primary bullet takeaways summarizing the response.
   - "sourceSection": The specific section or chapter title in the document where the answer resides.
   - "sourcePage": The approximate or exact page number in the document where the answer resides (e.g. "Page 15").

Here is the document text:
---
${docText.slice(0, 100000)}
---

Previous Conversation History:
${conversationContext}

CURRENT USER QUESTION: ${message}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "The core detailed answer, written in professional prose with standard paragraphs or bullet points."
            },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-4 key bullet points summarizing the answer."
            },
            sourceSection: {
              type: Type.STRING,
              description: "The chapter, heading, or section of the document where this information was found."
            },
            sourcePage: {
              type: Type.STRING,
              description: "The estimated or exact page number in the document (e.g. 'Page 4' or 'Section 2.1')."
            }
          },
          required: ["answer", "keyPoints", "sourceSection", "sourcePage"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}") as ChatResponseResult;
    return {
      answer: parsed.answer,
      keyPoints: parsed.keyPoints || [],
      sourceFile: fileName,
      sourceSection: parsed.sourceSection || "Main Text",
      sourcePage: parsed.sourcePage || "Page 1",
    };
  } catch (error: any) {
    console.error("Error generating chat response:", error);
    return {
      answer: `I apologize, but an error occurred while analyzing the document text for your question: ${error.message}`,
      keyPoints: [],
      sourceFile: fileName,
      sourceSection: "N/A",
      sourcePage: "N/A",
    };
  }
}
