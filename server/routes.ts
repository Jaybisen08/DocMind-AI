import { Router, Request, Response } from "express";
import { extractTextFromPdf } from "./pdfParser";
import { generateSummary } from "./services/summaryService";
import { generateInsights } from "./services/insightsService";
import { generateQuiz } from "./services/quizService";
import { generateChatResponse } from "./services/chatService";
import { searchAcrossDocuments } from "./services/searchService";

export const apiRouter = Router();

// 0. HEALTH ROUTE
apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// In-memory document storage
export interface DocumentCacheItem {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  text: string;
  numPages: number;
}

export const documentCache = new Map<string, DocumentCacheItem>();

// Seed default sandbox documents so actions on preloaded files work immediately
const syllabusText = `DocMind Systems Course Syllabus
Course Name: Introduction to Computer Intelligence (CS 401)
Department: Department of Computer Intelligence, Bhopal Technology Institute
Instructor: Dr. Evelyn Stone (Instructor)
Lead Teaching Assistant: Marcus Vance (Lead TA)
Contact Emails: evelyn.stone@bhopal-tech.edu, marcus.vance@bhopal-tech.edu
Contact Phones: +91 755-555-0192, +91 755-555-0195

Course Description & Goals:
This course introduces foundational methodologies of machine learning, logic heuristics, and deep neural backbones. Students learn to implement and evaluate learning systems using Python-based model APIs. It combines heuristic searches, statistics, and neural models to enable automated feature extraction and smart decision pipelines.

Evaluation Criteria & Milestones:
- Final Project: 40% of the total grade. Spans Week 5 to Week 15. Team implementations of 3 students are due in Week 15, with weekly progress milestones starting in Week 5.
- Midterm Exam: 30% of the total grade. Covers units 1 to 6 and is scheduled in Week 8.
- Laboratory Deliverables: 20% of the total grade. Assessed weekly via git repository push.
- Participation & Contribution: 10% of the total grade. Evaluated based on active involvement in class discussions.

Grading Formula:
Final Grade = 0.40 * (Project) + 0.30 * (Midterm) + 0.20 * (Labs) + 0.10 * (Participation)

Key Academic Policies:
- Attendance Policy: A maximum of 3 unexcused absences are allowed. Exceeding this limit will result in direct penalties to the student's participation grade.
- Late Submissions: Late submissions are penalized at a rate of 10% score deduction per day, up to a maximum of 3 late days.`;

const researchText = `Global AI Alliance, DeepMind Laboratories & Google Research
Title: Scaling Laws of Hierarchical Networks
Authors: Dr. Sarah Chen, Aisha Al-Mansoor, Prof. Kenji Sato
Contact Emails: s.chen@globalai.org, almansoor@deepmind.com
Contact Phones: +1 650-555-3204, +44 20-7946-0921
Timeline:
- March 2026: Initial Draft Submitted and presented.
- May 2026: Final revisions accepted.
- June 2026: Official publication release date.

Abstract:
This research paper documents how deep neural architectures exhibit predictable mathematical scaling dynamics when parameters, tokens, and compute are varied synchronously over several orders of magnitude. Deep neural architectures show power-law performance gains when scaled properly under compute expansion.

Key Neural Architectures Analyzed:
1. Convolutional Neural Networks (CNNs): Exceptional for learning translation-invariant spatial features but bounded by receptive fields when handling complex global dependencies.
2. Recurrent Architectures (RNN/LSTM): Process sequential structures by passing memory states, though prone to gradient explosion/vanishing issues.
3. Attention Decoders: Provide quadratic routing over large context structures, scaling consistently with compute budgets and outperforming traditional RNNs.

Optimization Recommendation:
The authors strongly recommend the AdamW optimizer (Adam with decoupled weight decay) combined with cosine learning rate schedules for fast convergence over deep hyper-dimensional manifolds.

Mathematical Scaling Formula (Power Law):
L(N) = (N_c / N)^alpha_N
Where L is the model loss, N is the number of parameters, N_c is the scaling constant, and alpha_N is the scaling constant coefficient.`;

const financialText = `DocMind Systems Inc. Corporate Briefing
Title: Q3 Financial Report & Outlook
Location: Secure Local Node Workspace, Bhopal Enterprise Center
Key Corporate Officers:
- Devashish Roy (CFO)
- Priya Sharma (VP of Engineering)
Contact Emails: devashish.roy@docmind-systems.com, priya.sharma@docmind-systems.com
Contact Phones: +91 755-432-1081, +1 415-555-9018
Important Dates:
- October 20th: Audited financial statements due filing.
- November 1st: Next fiscal Q4 planning rollout and launch.

Financial Achievements (Q3):
- Gross Revenue: Record Q3 gross revenue of $12.4M, representing a 24% year-over-year (YoY) growth rate.
- R&D Allocation: Research budget of $3.2M dedicated to scaling multi-modal Gemini API integrations and proprietary model expansion.
- Customer Acquisition Cost (CAC): Improved by 15% due to optimized marketing strategies.
- Net Operating Margin: Stable at 34.5% overall.

Q4 Expansion & Strategic Goals:
- The board of directors authorized expansion capital allocations for scaling regional sales offices in Tokyo and Bangalore.
- Establishing a dedicated AI research center in Bhopal, India.

Margin Calculations Formula:
Net Margin = (Net Profit / Gross Revenue) * 100 = 34.5%`;

documentCache.set("syllabus_intelligence_pdf", {
  id: "syllabus_intelligence_pdf",
  fileName: "syllabus_intelligence.pdf",
  fileSize: "142 KB",
  uploadDate: "Jul 12, 2026",
  text: syllabusText,
  numPages: 3,
});

documentCache.set("advanced_neural_research_docx", {
  id: "advanced_neural_research_docx",
  fileName: "advanced_neural_research.docx",
  fileSize: "1.8 MB",
  uploadDate: "Jul 13, 2026",
  text: researchText,
  numPages: 12,
});

documentCache.set("financial_quarterly_brief_txt", {
  id: "financial_quarterly_brief_txt",
  fileName: "financial_quarterly_brief.txt",
  fileSize: "48 KB",
  uploadDate: "Jul 14, 2026",
  text: financialText,
  numPages: 1,
});

// Helper to format date
function getFormattedDate(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return today.toLocaleDateString('en-US', options);
}

// 1. PDF UPLOAD ENDPOINT
apiRouter.post("/upload", async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileName, fileSize, fileBase64 } = req.body;

    if (!fileName || !fileBase64) {
      res.status(400).json({ error: "fileName and fileBase64 are required fields." });
      return;
    }

    // Convert Base64 to Buffer
    const buffer = Buffer.from(fileBase64, "base64");

    // Extract Text and Pages
    console.log(`Extracting text from uploaded PDF: ${fileName} (${fileSize || "unknown size"})`);
    const { text, numPages } = await extractTextFromPdf(buffer);

    // Prevent duplicate uploads
    let matchedDoc: DocumentCacheItem | null = null;
    for (const doc of documentCache.values()) {
      if (
        (doc.fileName === fileName && doc.fileSize === fileSize) ||
        (doc.text === text && text.length > 0)
      ) {
        matchedDoc = doc;
        break;
      }
    }

    if (matchedDoc) {
      console.log(`Duplicate upload detected for file: ${fileName}. Reusing existing document: ${matchedDoc.id}`);
      res.json({
        id: matchedDoc.id,
        fileName: matchedDoc.fileName,
        fileSize: matchedDoc.fileSize,
        uploadDate: matchedDoc.uploadDate,
        text: matchedDoc.text,
        numPages: matchedDoc.numPages,
        duplicate: true
      });
      return;
    }

    // Generate unique ID
    const docId = "doc_" + Date.now();
    const uploadDate = getFormattedDate();

    const newDoc: DocumentCacheItem = {
      id: docId,
      fileName,
      fileSize: fileSize || "Unknown size",
      uploadDate,
      text,
      numPages,
    };

    // Store in cache
    documentCache.set(docId, newDoc);

    console.log(`Successfully processed and cached PDF: ${fileName} with ID: ${docId}, Pages: ${numPages}`);
    res.json({
      id: docId,
      fileName,
      fileSize: newDoc.fileSize,
      uploadDate,
      text,
      numPages,
      duplicate: false
    });
  } catch (error: any) {
    console.error("Upload handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. ASK AI CHAT ENDPOINT
apiRouter.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { docId, message, chatHistory } = req.body;

    if (!docId || !message) {
      res.status(400).json({ error: "docId and message are required fields." });
      return;
    }

    const doc = documentCache.get(docId);
    if (!doc) {
      res.status(404).json({ error: "Document not found or expired. Please upload it again." });
      return;
    }

    console.log(`Generating chat response for docId: ${docId}, message: ${message.slice(0, 30)}...`);
    const chatResponse = await generateChatResponse(doc.text, doc.fileName, message, chatHistory || []);
    res.json(chatResponse);
  } catch (error: any) {
    console.error("Chat handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. AI SUMMARY ENDPOINT
apiRouter.post("/summary", async (req: Request, res: Response): Promise<void> => {
  try {
    const { docId, summaryType } = req.body;

    if (!docId) {
      res.status(400).json({ error: "docId is required." });
      return;
    }

    const doc = documentCache.get(docId);
    if (!doc) {
      res.status(404).json({ error: "Document not found or expired. Please upload it again." });
      return;
    }

    console.log(`Generating summary for docId: ${docId}, type: ${summaryType || "detailed"}`);
    const summaryResult = await generateSummary(doc.text, doc.fileName, doc.numPages);
    res.json(summaryResult);
  } catch (error: any) {
    console.error("Summary handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4. AI INSIGHTS ENDPOINT
apiRouter.post("/insights", async (req: Request, res: Response): Promise<void> => {
  try {
    const { docId } = req.body;

    if (!docId) {
      res.status(400).json({ error: "docId is required." });
      return;
    }

    const doc = documentCache.get(docId);
    if (!doc) {
      res.status(404).json({ error: "Document not found or expired. Please upload it again." });
      return;
    }

    console.log(`Generating insights for docId: ${docId}`);
    const insightsResult = await generateInsights(doc.text, doc.fileName);
    res.json(insightsResult);
  } catch (error: any) {
    console.error("Insights handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 5. QUIZ GENERATOR ENDPOINT
apiRouter.post("/quiz", async (req: Request, res: Response): Promise<void> => {
  try {
    const { docId, difficulty, count } = req.body;

    if (!docId) {
      res.status(400).json({ error: "docId is required." });
      return;
    }

    const doc = documentCache.get(docId);
    if (!doc) {
      res.status(404).json({ error: "Document not found or expired. Please upload it again." });
      return;
    }

    const targetDifficulty = difficulty || "medium";
    const targetCount = parseInt(count) || 5;

    console.log(`Generating quiz for docId: ${docId}, difficulty: ${targetDifficulty}, count: ${targetCount}`);
    const quizResult = await generateQuiz(doc.text, doc.fileName, targetCount, targetDifficulty);
    res.json({ quiz: quizResult });
  } catch (error: any) {
    console.error("Quiz handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 6. MULTI-DOC SEMANTIC SEARCH ENDPOINT
apiRouter.post("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ error: "query is required." });
      return;
    }

    console.log(`Searching across all documents for: ${query}`);
    const docs = Array.from(documentCache.values()).map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      text: doc.text,
    }));

    const searchResult = await searchAcrossDocuments(query, docs);
    res.json(searchResult);
  } catch (error: any) {
    console.error("Search handler failed:", error);
    res.status(500).json({ error: error.message });
  }
});
