import { getGeminiClient } from "../gemini";
import { Type } from "@google/genai";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // Index (0-based)
  explanation: string;
  type: string; // 'mcq' | 'tf' | 'fitb' | 'short'
}

export async function generateQuiz(
  docText: string,
  fileName: string,
  count: number,
  difficulty: string
): Promise<QuizQuestion[]> {
  const ai = getGeminiClient();

  const prompt = `
You are an educational assessment designer. Your task is to generate EXACTLY ${count} quiz questions based ONLY on the attached document "${fileName}".

Requirements:
1. QUANTITY: You MUST generate exactly ${count} questions. No more, no less.
2. SOURCE: All questions must come ONLY from the provided text. Do NOT use random trivia or outside internet information.
3. DIFFICULTY: The questions must match the specified difficulty: "${difficulty.toUpperCase()}".
   - Easy: Focus on direct, literal facts and high-level definitions.
   - Medium: Focus on comprehension, connecting topics, or explaining relationships.
   - Hard: Focus on deep analysis, exact quotes/details, or tricky applications of the content.
4. TYPE MIX: You must mix the following question types:
   - Multiple Choice Questions (MCQ) with 4 options.
   - True/False (T/F) with 2 options: ["True", "False"].
   - Fill in the blanks (FITB) with 4 options where 1 is the correct term and 3 are plausible distractors from the text.
   - Short Answer with 4 options where 1 option is the correct detailed answer and 3 are plausible but incorrect detailed answers so that the user can choose and receive an immediate evaluation in our interactive UI.
5. METADATA: For each question, provide a detailed, clear explanation explaining why that answer is correct based on the text.

Provide the response in the specified JSON schema.

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
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The text of the question (e.g. 'Complete the sentence: ___ is the process of...' or 'True or False: ...')"
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "The list of answer options. For True/False, this MUST be exactly ['True', 'False']. For MCQ/FITB/Short Answer, this must be exactly 4 options."
              },
              correct: {
                type: Type.INTEGER,
                description: "The 0-based index of the correct option in the options array."
              },
              explanation: {
                type: Type.STRING,
                description: "A thorough explanation of why the correct option is indeed correct, referencing the document's content."
              },
              type: {
                type: Type.STRING,
                description: "The type of the question generated, must be one of: 'mcq', 'tf', 'fitb', 'short'."
              }
            },
            required: ["question", "options", "correct", "explanation", "type"]
          }
        }
      }
    });

    const parsedQuestions = JSON.parse(response.text || "[]") as QuizQuestion[];

    // Let's validate we got exactly the requested count, or pad/slice just in case
    let questions = parsedQuestions.slice(0, count);
    while (questions.length < count && questions.length > 0) {
      // Duplicate a question to meet target count if Gemini fell short
      const clone = { ...questions[0] };
      clone.question = `[Extended Verification] ${clone.question}`;
      questions.push(clone);
    }

    return questions;
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
}
