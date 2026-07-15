import { getGeminiClient } from "../gemini";
import { Type } from "@google/genai";

export interface InsightCardData {
  title: string;
  items: string[];
  icon: string;
  colorClass: string;
  isMono?: boolean;
}

export interface InsightsResult {
  isResearchPaper: boolean;
  cards: InsightCardData[];
}

export async function generateInsights(docText: string, fileName: string): Promise<InsightsResult> {
  const ai = getGeminiClient();

  const prompt = `
You are an advanced AI document understanding engine. Analyze the text content of "${fileName}" and generate detailed intellectual insights that help users understand the document deeply.

First, determine if the document is a research paper, scientific article, academic paper, or technical study.
Then, extract the relevant details from the text. If any section (like formulas or algorithms) is not present in the document, return an empty array for that section rather than hallucinating.

Identify the following categories:
- Main Topic
- Sub Topics
- Important Concepts
- Key Definitions (e.g. Terms and their exact meaning)
- Important Formulas (Mathematical, statistical, or logical equations, explicitly written out)
- Important Algorithms (Step-by-step procedures or pseudo-codes discussed)
- Important Theories (Scientific theories, physical laws, or fundamental theorems)
- Advantages (Strengths, pros, benefits)
- Disadvantages (Weaknesses, cons, limitations)
- Applications (Practical uses and implementations)
- Future Scope (Where this topic is heading next)
- Conclusion (The final synthesis or wrap-up of the document)

If it IS a research paper, you MUST also extract:
- Research Problem (What specific issue or question is the paper addressing?)
- Methodology (What experiments, dataset, neural nets, or procedures did they use?)
- Results (Key findings, statistical gains, performance metrics)

Provide the results in the specified JSON format. Ensure all extracted items are direct, concise statements (not just single words, but descriptive 1-sentence or half-sentence details). Make sure they are extracted ONLY from the document content, not dummy data.

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
            isResearchPaper: {
              type: Type.BOOLEAN,
              description: "True if the document is a research paper or scientific study, false otherwise."
            },
            mainTopic: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "1-2 bullets explaining the overarching topic."
            },
            subTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 subtopics identified in the document."
            },
            importantConcepts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 critical concepts to understand."
            },
            keyDefinitions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Definitions of key terms."
            },
            importantFormulas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Mathematical or mathematical-logic formulas found."
            },
            importantAlgorithms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Algorithms or key steps."
            },
            importantTheories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Important academic or practical theories."
            },
            advantages: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Core pros, benefits or strengths."
            },
            disadvantages: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Core cons, limitations or weaknesses."
            },
            applications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Practical applications of the content."
            },
            futureScope: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Future outlook or development paths."
            },
            conclusion: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Main takeaway conclusion points."
            },
            researchProblem: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Only required if isResearchPaper is true: The problem the paper solves."
            },
            methodology: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Only required if isResearchPaper is true: The methods, math models or setups used."
            },
            results: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Only required if isResearchPaper is true: The quantitative/qualitative results."
            }
          },
          required: [
            "isResearchPaper",
            "mainTopic",
            "subTopics",
            "importantConcepts",
            "keyDefinitions",
            "importantFormulas",
            "importantAlgorithms",
            "importantTheories",
            "advantages",
            "disadvantages",
            "applications",
            "futureScope",
            "conclusion"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    const cards: InsightCardData[] = [];

    // Map the fields to clean InsightCardData structures
    cards.push({
      title: "Main Topic",
      items: parsedData.mainTopic,
      icon: "fa-solid fa-brain",
      colorClass: "text-blue",
    });

    cards.push({
      title: "Sub Topics",
      items: parsedData.subTopics,
      icon: "fa-solid fa-list-ul",
      colorClass: "text-purple",
    });

    cards.push({
      title: "Important Concepts",
      items: parsedData.importantConcepts,
      icon: "fa-solid fa-lightbulb",
      colorClass: "text-orange",
    });

    if (parsedData.isResearchPaper) {
      cards.push({
        title: "Research Problem",
        items: parsedData.researchProblem || [],
        icon: "fa-solid fa-triangle-exclamation",
        colorClass: "text-red",
      });

      cards.push({
        title: "Methodology",
        items: parsedData.methodology || [],
        icon: "fa-solid fa-vial",
        colorClass: "text-blue",
      });

      cards.push({
        title: "Results & Findings",
        items: parsedData.results || [],
        icon: "fa-solid fa-chart-line",
        colorClass: "text-green",
      });
    }

    cards.push({
      title: "Key Definitions",
      items: parsedData.keyDefinitions,
      icon: "fa-solid fa-book",
      colorClass: "text-green",
    });

    if (parsedData.importantFormulas && parsedData.importantFormulas.length > 0) {
      cards.push({
        title: "Important Formulas",
        items: parsedData.importantFormulas,
        icon: "fa-solid fa-square-root-variable",
        colorClass: "text-red",
        isMono: true,
      });
    }

    if (parsedData.importantAlgorithms && parsedData.importantAlgorithms.length > 0) {
      cards.push({
        title: "Algorithms & Steps",
        items: parsedData.importantAlgorithms,
        icon: "fa-solid fa-code",
        colorClass: "text-blue",
        isMono: true,
      });
    }

    if (parsedData.importantTheories && parsedData.importantTheories.length > 0) {
      cards.push({
        title: "Theoretical Frameworks",
        items: parsedData.importantTheories,
        icon: "fa-solid fa-scroll",
        colorClass: "text-purple",
      });
    }

    cards.push({
      title: "Advantages & Benefits",
      items: parsedData.advantages,
      icon: "fa-solid fa-circle-plus",
      colorClass: "text-green",
    });

    cards.push({
      title: "Disadvantages & Limits",
      items: parsedData.disadvantages,
      icon: "fa-solid fa-circle-minus",
      colorClass: "text-red",
    });

    cards.push({
      title: "Applications",
      items: parsedData.applications,
      icon: "fa-solid fa-laptop-code",
      colorClass: "text-blue",
    });

    cards.push({
      title: "Future Scope",
      items: parsedData.futureScope,
      icon: "fa-solid fa-arrow-trend-up",
      colorClass: "text-orange",
    });

    cards.push({
      title: "Conclusion Summary",
      items: parsedData.conclusion,
      icon: "fa-solid fa-circle-check",
      colorClass: "text-green",
    });

    return {
      isResearchPaper: parsedData.isResearchPaper,
      cards,
    };
  } catch (error: any) {
    console.error("Error generating insights:", error);
    throw new Error(`Failed to generate insights: ${error.message}`);
  }
}
