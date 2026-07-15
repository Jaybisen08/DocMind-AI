import { getGeminiClient } from "../gemini";
import { Type } from "@google/genai";

export interface SearchResult {
  found: boolean;
  documentId: string;
  documentName: string;
  explanation: string;
  sourceSection: string;
  sourcePage: string;
}

export async function searchAcrossDocuments(
  query: string,
  uploadedDocs: { id: string; fileName: string; text: string }[]
): Promise<SearchResult> {
  if (uploadedDocs.length === 0) {
    return {
      found: false,
      documentId: "",
      documentName: "",
      explanation: "No documents have been uploaded yet. Please upload a PDF to begin searching.",
      sourceSection: "",
      sourcePage: "",
    };
  }

  const ai = getGeminiClient();

  // Create a condensed summary of the documents to pass to Gemini
  const docSnippets = uploadedDocs.map(doc => {
    return `DOCUMENT ID: ${doc.id}\nDOCUMENT NAME: ${doc.fileName}\nCONTENT EXCERPT:\n${doc.text.slice(0, 8000)}`;
  }).join("\n\n---\n\n");

  const prompt = `
You are a semantic search assistant for DocMind AI. A user is searching across their uploaded documents for: "${query}"

You have access to the following uploaded documents:
${docSnippets}

Your job is to:
1. Determine if the search query is discussed in any of the uploaded documents.
2. If YES:
   - Identify the primary document ID and Document Name.
   - Write a clear, comprehensive, and detailed explanation of the query based ONLY on the content of that document.
   - Pinpoint the exact source section (e.g., Chapter, Title, or Section Name) and page number (approximate or exact based on text indices) where this is found.
3. If NO:
   - Search across all documents and see if you can synthesize a helpful answer, but make sure to state that a direct match was not explicitly found in their uploads.

Provide the response in the specified JSON schema.

---
QUERY: ${query}
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
            found: {
              type: Type.BOOLEAN,
              description: "True if the query was successfully answered using the uploaded documents, false otherwise."
            },
            documentId: {
              type: Type.STRING,
              description: "The ID of the document containing the answer."
            },
            documentName: {
              type: Type.STRING,
              description: "The fileName of the document containing the answer."
            },
            explanation: {
              type: Type.STRING,
              description: "The complete, detailed semantic answer explaining the query using content from the PDF."
            },
            sourceSection: {
              type: Type.STRING,
              description: "The chapter or section title where this was located (e.g. 'Chapter 3: Advanced Optimization')."
            },
            sourcePage: {
              type: Type.STRING,
              description: "The page or estimated page number where this topic is detailed (e.g. 'Page 12')."
            }
          },
          required: ["found", "documentId", "documentName", "explanation", "sourceSection", "sourcePage"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}") as SearchResult;
    return parsed;
  } catch (error: any) {
    console.error("Error searching across documents:", error);
    return {
      found: false,
      documentId: uploadedDocs[0].id,
      documentName: uploadedDocs[0].fileName,
      explanation: `An error occurred while performing semantic search: ${error.message}. Searching for keywords instead.`,
      sourceSection: "Index",
      sourcePage: "Unknown",
    };
  }
}
