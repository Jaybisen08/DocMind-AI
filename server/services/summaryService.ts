import { getGeminiClient } from "../gemini";
import { Type } from "@google/genai";

export interface SummaryResult {
  detailed: string;
  short: string;
  bullets: string;
  keyPoints: string[];
  importantTopics: string[];
  actionItems: string[];
  keywords: string[];
}

export async function generateSummary(
  docText: string,
  fileName: string,
  pageCount: number
): Promise<SummaryResult> {
  const ai = getGeminiClient();

  // Determine the target detailed summary length description based on pageCount
  let lengthTarget = "approx 400-500 words (comparable to a 1-page report)";
  if (pageCount >= 6 && pageCount <= 12) {
    lengthTarget = "approx 1000-1500 words (comparable to a 2-3 page report)";
  } else if (pageCount > 12) {
    lengthTarget = "approx 2000-3000 words (comparable to a 5-6 page report)";
  }

  const prompt = `
You are an expert document summarization assistant. Analyze the text content of the uploaded document "${fileName}" which has a page count of ${pageCount}.

You must generate:
1. A detailed summary. The detailed summary MUST scale proportionally based on the original document's page count of ${pageCount}:
   - Currently, the original document is ${pageCount} pages, so the detailed summary length should be ${lengthTarget}.
   - It MUST contain the following exact structural headings:
     - "Introduction"
     - "Important Concepts"
     - "Main Topics"
     - "Key Takeaways"
     - "Conclusion"
   - Please write naturally and in depth. Use high-quality professional language. Use standard paragraphs and subtle HTML tags (like <strong> for emphasis, <p> for paragraphs) to keep the formatting polished. Do not use raw markdown headings like ###, use clean text flow or paragraph structures.

2. A short summary: A fast, concise executive brief (approx 100-150 words).
3. A bullets summary: Bullet-point style actionable key facts (approx 3-5 bullets).
4. Key Points: An array of 3-5 distinct bullet items summarizing important highlights.
5. Important Topics: An array of 3-5 distinct titles representing the main subjects covered.
6. Action Items: An array of 3-5 actionable checklist tasks suggested by the document's contents.
7. Keywords: An array of 5-8 relevant tags or index words.

Here is the document text:
---
${docText.slice(0, 100000)}
---
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
            detailed: {
              type: Type.STRING,
              description: `A highly thorough and detailed summary that must be ${lengthTarget} long, written with clean paragraphs, and structured with distinct parts: Introduction, Important Concepts, Main Topics, Key Takeaways, Conclusion.`
            },
            short: {
              type: Type.STRING,
              description: "A quick, concise executive summary (approx 100-150 words)."
            },
            bullets: {
              type: Type.STRING,
              description: "A bulleted list format of the summary highlighting primary deliverables."
            },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 high-impact key points."
            },
            importantTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 important topics."
            },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 action items derived from the text."
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5-8 keywords or core terms."
            }
          },
          required: [
            "detailed",
            "short",
            "bullets",
            "keyPoints",
            "importantTopics",
            "actionItems",
            "keywords"
          ]
        }
      }
    });

    const resultText = response.text || "{}";
    return JSON.parse(resultText) as SummaryResult;
  } catch (error: any) {
    console.error("Error generating summary via Gemini:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}
