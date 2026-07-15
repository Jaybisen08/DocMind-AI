import { createRequire } from "module";
import { getGeminiClient } from "./gemini";
import { Type } from "@google/genai";

const require = createRequire(import.meta.url);
// @ts-ignore
const pdf = require("pdf-parse");

export interface ParsedPdf {
  text: string;
  numPages: number;
}

export async function extractTextFromPdf(buffer: Buffer): Promise<ParsedPdf> {
  try {
    console.log("Attempting local PDF text extraction via pdf-parse...");
    const result = await pdf(buffer);
    
    if (result && typeof result.text === "string" && result.text.trim().length > 0) {
      console.log(`Local PDF parsing successful. Extracted ${result.text.length} characters.`);
      return {
        text: result.text,
        numPages: typeof result.numpages === "number" ? result.numpages : 1,
      };
    }
    throw new Error("Local parser returned empty text.");
  } catch (localError: any) {
    console.warn("Local PDF parsing failed, falling back to Gemini API...", localError.message);
    
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: buffer.toString("base64"),
              mimeType: "application/pdf"
            }
          },
          "Extract the complete text from this PDF and determine the total number of pages. Return the results in structured JSON format."
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The complete, unabridged text content extracted from all pages of the PDF."
              },
              numPages: {
                type: Type.INTEGER,
                description: "The total number of pages in the PDF document."
              }
            },
            required: ["text", "numPages"]
          }
        }
      });

      const resultText = response.text || "{}";
      const data = JSON.parse(resultText);

      return {
        text: data.text || "",
        numPages: typeof data.numPages === "number" ? data.numPages : 1,
      };
    } catch (geminiError: any) {
      console.error("Gemini PDF extraction failed:", geminiError.message);
      
      // Secondary fallback: plain text search / regex extraction from raw stream content
      try {
        const textFromBuffer = extractPlainTextFromPdfBuffer(buffer);
        const estimatedPages = estimatePdfPagesFromBuffer(buffer);
        console.log(`Using raw binary stream parser fallback. Estimated pages: ${estimatedPages}`);
        return {
          text: textFromBuffer || "No readable text found.",
          numPages: estimatedPages,
        };
      } catch (fallbackError: any) {
        throw new Error(`Failed to extract text from PDF: ${geminiError.message}`);
      }
    }
  }
}

// Resilient helper to extract plain text from PDF stream objects as a fallback
function extractPlainTextFromPdfBuffer(buffer: Buffer): string {
  const str = buffer.toString("binary");
  const regex = /\((.*?)\)\s*Tj/g;
  let match;
  let text = "";
  while ((match = regex.exec(str)) !== null) {
    text += match[1] + " ";
  }
  // Let's also support BT/ET blocks if Tj is not found
  if (!text.trim()) {
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let streamMatch;
    while ((streamMatch = streamRegex.exec(str)) !== null) {
      const streamContent = streamMatch[1];
      // Basic text character filtering
      const filtered = streamContent.replace(/[^\x20-\x7E\s]/g, "");
      if (filtered.length > 100) {
        text += filtered + "\n";
      }
    }
  }
  return text.trim();
}

// Resilient helper to estimate pages from raw PDF buffer
function estimatePdfPagesFromBuffer(buffer: Buffer): number {
  const str = buffer.toString("utf8");
  
  // Method 1: Count /Type /Page (and avoid /Pages)
  const pageMatches = str.match(/\/Type\s*\/Page\b/g);
  if (pageMatches) {
    return pageMatches.length;
  }
  
  // Method 2: Look for /Count field
  const countMatch = str.match(/\/Count\s+(\d+)/);
  if (countMatch && countMatch[1]) {
    return parseInt(countMatch[1], 10);
  }
  
  return 1;
}


