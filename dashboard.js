/**
 * DocMind AI - Premium Workspace Dashboard JS
 * Pure modular Vanilla JS implementing fully interactive sandbox data 
 * and robust tab state switching systems.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // SANDBOX INITIAL DATA (Rich mock datasets for 3 seeded documents)
  // ==========================================================================
  const sandboxDatabase = {
    "syllabus_intelligence_pdf": {
      id: "syllabus_intelligence_pdf",
      fileName: "syllabus_intelligence.pdf",
      fileSize: "142 KB",
      uploadDate: "Jul 12, 2026",
      keyPoints: [
        "Final Project carries 40% weight and spans Week 5 to Week 15.",
        "Midterm Exam accounts for 30% of the total score in Week 8.",
        "Maximum of 3 unexcused absences allowed before participation grade is affected."
      ],
      importantTopics: [
        "Machine Learning Foundational Heuristics",
        "Deep Neural Backbone Implementations",
        "Practical Weekly Laboratory Exercises"
      ],
      summary: {
        detailed: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Syllabus: Introduction to Computer Intelligence</h4>
            <span class="render-doc-meta">syllabus_intelligence.pdf • Course Overview Summary</span>
            
            <div class="render-block-section">
              <h5 class="render-block-heading">1. Course Description & Goals</h5>
              <p class="render-paragraph">This course introduces foundational methodologies of machine learning, logic heuristics, and deep neural backbones. Students learn to implement and evaluate learning systems using Python-based model APIs.</p>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">2. Evaluation & Milestones</h5>
              <ul class="render-bullets">
                <li><strong>Final Project:</strong> 40% (Weekly milestones starting Week 5, implementation due Week 15).</li>
                <li><strong>Midterm Exam:</strong> 30% (Covers units 1 to 6, scheduled for Week 8).</li>
                <li><strong>Laboratory Deliverables:</strong> 20% (Assessed weekly via repository push).</li>
                <li><strong>Participation & Contribution:</strong> 10% (Evaluated based on class discussions).</li>
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">3. Key Policies</h5>
              <p class="render-paragraph">Late submissions are penalized at 10% per day up to 3 days. A maximum of 3 unexcused absences are permitted before participation points are fully deducted.</p>
            </div>
          </div>
        `,
        short: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Syllabus Executive Brief</h4>
            <span class="render-doc-meta">syllabus_intelligence.pdf • Executive Summary</span>
            <p class="render-paragraph">This document outlines the curriculum and grading metrics for "Intro to Computer Intelligence". Major graded gates are the <strong>Final Project (40%)</strong> and the <strong>Midterm Exam (30%)</strong>. Standard university attendance rules apply with a limit of 3 unexcused absences.</p>
          </div>
        `,
        bullets: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Syllabus Key Deliverables</h4>
            <span class="render-doc-meta">syllabus_intelligence.pdf • Action Bullet Points</span>
            <ul class="render-bullets">
              <li><strong>Attendance Cap:</strong> Permitted limit of 3 unexcused absences.</li>
              <li><strong>Final Project weight:</strong> 40% (Team implementations due Week 15).</li>
              <li><strong>Midterm Exam date:</strong> Week 8, accounting for 30%.</li>
              <li><strong>Late penalty rule:</strong> 10% score deduction per day.</li>
            </ul>
          </div>
        `
      },
      insights: {
        dates: ["Week 5: Project proposals", "Week 8: Midterm Exam", "Week 15: Final project submission"],
        names: ["Dr. Evelyn Stone (Instructor)", "Marcus Vance (Lead TA)"],
        organizations: ["Department of Computer Intelligence", "Bhopal Technology Institute"],
        emails: ["evelyn.stone@bhopal-tech.edu", "marcus.vance@bhopal-tech.edu"],
        phones: ["+91 755-555-0192", "+91 755-555-0195"],
        keywords: ["Neural networks", "Heuristics", "Attendance policy", "Grading criteria", "Git workflow"],
        actionItems: ["Form a final project team of 3 by Week 5", "Complete git terminal setup before Lab 1"]
      },
      chatResponses: {
        "hello": "Hi! I am DocMind AI. I have analyzed <strong>syllabus_intelligence.pdf</strong> completely. Ask me about grading, exams, or attendance!",
        "summarize this document": "The document is the course syllabus for 'Introduction to Computer Intelligence'. The grading is split into: Final Project (40%), Midterm (30%), Labs (20%), and Participation (10%). It enforces a strict 3-absence limit.",
        "explain this topic simply": "This syllabus outlines computer intelligence, which combines heuristic searches, statistics, and neural models to enable automated feature extraction and smart decision pipelines.",
        "extract important dates & deadlines": "The primary deadlines are: <br>• <strong>Week 5:</strong> Project team formation and proposals.<br>• <strong>Week 8:</strong> Midterm Examination (30% weight).<br>• <strong>Week 15:</strong> Final Project code and report submission (40% weight).",
        "list action items and tasks": "Action items:<br>1. Team up with 2 classmates for the final project.<br>2. Complete laboratory assignments before each weekly deadline.<br>3. Keep track of attendance to avoid unexcused penalties.",
        "find important formulas & models": "Grading Formula:<br><strong>Final Grade</strong> = 0.40*(Project) + 0.30*(Midterm) + 0.20*(Labs) + 0.10*(Participation).",
        "default": "Based on syllabus_intelligence.pdf, the course covers computer intelligence systems. Let me know if you want information on specific items such as the Midterm date (Week 8) or project requirements."
      },
      quiz: [
        {
          question: "What percentage of the final grade is allocated to the Final Project?",
          options: ["20%", "30%", "40%", "50%"],
          correct: 2
        },
        {
          question: "What is the maximum number of unexcused absences allowed before participation points suffer direct penalties?",
          options: ["1 absence", "2 absences", "3 absences", "5 absences"],
          correct: 2
        },
        {
          question: "When is the Midterm Examination scheduled according to the course outline?",
          options: ["Week 5", "Week 8", "Week 12", "Week 15"],
          correct: 1
        }
      ]
    },
    "advanced_neural_research_docx": {
      id: "advanced_neural_research_docx",
      fileName: "advanced_neural_research.docx",
      fileSize: "1.8 MB",
      uploadDate: "Jul 13, 2026",
      keyPoints: [
        "Deep neural architectures show power-law performance gains when scaled.",
        "AdamW with decoupled weight decay is the optimal optimizer for convergence.",
        "Attention decoders scale more consistently than CNNs and RNNs."
      ],
      importantTopics: [
        "Mathematical Scaling Equations",
        "Neural Architecture Design Paradigms",
        "AdamW Convergence and Tuning"
      ],
      summary: {
        detailed: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Paper: Scaling Laws of Hierarchical Networks</h4>
            <span class="render-doc-meta">advanced_neural_research.docx • Research Summary</span>
            
            <div class="render-block-section">
              <h5 class="render-block-heading">Abstract Overview</h5>
              <p class="render-paragraph">This research paper documents how deep neural architectures exhibit predictable mathematical scaling dynamics when parameters, tokens, and compute are varied synchronously over several orders of magnitude.</p>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">Key Neural Architectures Analyzed</h5>
              <ul class="render-bullets">
                <li><strong>CNN (Convolutional Networks):</strong> Exceptional for translation-invariant spatial features but bounded by receptive fields.</li>
                <li><strong>Recurrent Architectures (RNN/LSTM):</strong> Process sequential structures by passing memory states, though prone to gradient explosion.</li>
                <li><strong>Attention Decoders:</strong> Provide quadratic routing over large context structures, scaling consistently with compute budgets.</li>
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">Optimization Recommendation</h5>
              <p class="render-paragraph">The authors recommend the <strong>AdamW</strong> optimizer (Adam with decoupled weight decay) combined with cosine learning rate schedules for fast convergence over deep hyper-dimensional manifolds.</p>
            </div>
          </div>
        `,
        short: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Neural Scaling Law Brief</h4>
            <span class="render-doc-meta">advanced_neural_research.docx • Short Executive Summary</span>
            <p class="render-paragraph">The paper reviews optimization and scaling behaviors of <strong>CNNs, RNNs, and Attention models</strong>. It proves that scaling parameters and token budgets systematically optimizes model performance, and recommends <strong>AdamW optimization</strong> with adaptive schedules to prevent loss divergence.</p>
          </div>
        `,
        bullets: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Core Research Findings</h4>
            <span class="render-doc-meta">advanced_neural_research.docx • Action Bullet Points</span>
            <ul class="render-bullets">
              <li><strong>Attention scaling:</strong> Demonstrates power-law parameter gains under compute expansion.</li>
              <li><strong>CNN limits:</strong> Bounded when processing complex global dependencies.</li>
              <li><strong>Recommended Optimizer:</strong> AdamW (Decoupled weight decay).</li>
              <li><strong>Schedule type:</strong> Cosine learning decay.</li>
            </ul>
          </div>
        `
      },
      insights: {
        dates: ["March 2026 (Draft Submitted)", "May 2026 (Final Revision)", "June 2026 (Publication Date)"],
        names: ["Dr. Sarah Chen", "Aisha Al-Mansoor", "Prof. Kenji Sato"],
        organizations: ["Global AI Alliance", "DeepMind Laboratories", "Google Research"],
        emails: ["s.chen@globalai.org", "almansoor@deepmind.com"],
        phones: ["+1 650-555-3204", "+44 20-7946-0921"],
        keywords: ["Scaling laws", "Attention Decoder", "AdamW", "Weight Decay", "Gradient descent", "Context window"],
        actionItems: ["Reproduce Figure 3 scaling curves on standard A100 GPU cluster", "Verify weight decay hyperparameters on smaller models"]
      },
      chatResponses: {
        "hello": "Hello! I am ready to help you analyze the <strong>advanced_neural_research.docx</strong>. Ask me about CNN vs RNN, AdamW optimizer, or scaling formulas!",
        "summarize this document": "This paper investigates scaling laws for deep neural architectures. It analyzes Convolutional, Recurrent, and Attention models, highlighting how loss scales linearly in logarithmic plots against computing metrics.",
        "explain this topic simply": "Think of scaling laws like fuel efficiency: as you build larger models (more neurons) and feed them more data (tokens), their accuracy improves in a predictable mathematical pattern.",
        "extract important dates & deadlines": "Key publications timelines mentioned: <br>• <strong>March 2026:</strong> Initial draft presentation.<br>• <strong>May 2026:</strong> Revisions accepted.<br>• <strong>June 2026:</strong> Main public release.",
        "list action items and tasks": "Action tasks:<br>1. Run validation benchmarks with <strong>AdamW optimizer</strong>.<br>2. Re-compute power-law trends shown in curves.<br>3. Adjust hyperparameter weight decay coefficients.",
        "find important formulas & models": "Scaling Formula (Power Law):<br><strong>L(N) = (N_c / N)<sup>α_N</sup></strong>, where L is loss, N is parameters, and α_N is the scaling constant.",
        "default": "In advanced_neural_research.docx, the authors find that attention models consistently outperform traditional RNNs when computing scale increases. Let me know if you would like info on their optimization or parameter setups."
      },
      quiz: [
        {
          question: "Which optimization algorithm is strongly recommended by the authors of the deep learning paper?",
          options: ["Vanilla SGD", "RMSprop", "AdamW", "Adagrad"],
          correct: 2
        },
        {
          question: "What type of scaling relationship does model loss exhibit against the compute/parameter sizes?",
          options: ["Linear scaling", "Quadratic scaling", "Exponential growth", "Power-law decay"],
          correct: 3
        },
        {
          question: "Which neural architecture handles spatial translational-invariant structures best but is bounded by receptive fields?",
          options: ["Convolutional Neural Network (CNN)", "Recurrent Neural Network (RNN)", "Standard MLP", "LSTM Networks"],
          correct: 0
        }
      ]
    },
    "financial_quarterly_brief_txt": {
      id: "financial_quarterly_brief_txt",
      fileName: "financial_quarterly_brief.txt",
      fileSize: "48 KB",
      uploadDate: "Jul 14, 2026",
      keyPoints: [
        "Record Q3 gross revenue of $12.4M representing 24% YoY growth.",
        "Customer Acquisition Cost (CAC) improved by 15%.",
        "Research budget of $3.2M dedicated to proprietary model expansion."
      ],
      importantTopics: [
        "Corporate Financial SaaS Metrics",
        "Strategic Global Sales Expansion",
        "R&D Asset Allocation and Planning"
      ],
      summary: {
        detailed: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Q3 Financial Report & Outlook</h4>
            <span class="render-doc-meta">financial_quarterly_brief.txt • Corporate Performance</span>
            
            <div class="render-block-section">
              <h5 class="render-block-heading">1. Financial Achievements</h5>
              <p class="render-paragraph">DocMind Systems reported record-breaking revenue metrics for Q3, showing resilient growth trends in automated SaaS enterprise registrations.</p>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">2. Performance Metrics</h5>
              <ul class="render-bullets">
                <li><strong>Gross Revenue:</strong> $12.4M (Up 24% year-over-year).</li>
                <li><strong>R&amp;D Allocation:</strong> $3.2M (Dedicated to scaling multi-modal Gemini API integrations).</li>
                <li><strong>Customer Acquisition Cost (CAC):</strong> Reduced by 15% due to optimized marketing strategies.</li>
                <li><strong>Net Margin:</strong> 34.5% overall.</li>
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading">3. Q4 Expansion Goals</h5>
              <p class="render-paragraph">The board of directors authorized expansion capital allocations for scaling regional sales offices in Tokyo and Bangalore, alongside establishing a dedicated AI research center in Bhopal.</p>
            </div>
          </div>
        `,
        short: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Q3 Financial Summary Brief</h4>
            <span class="render-doc-meta">financial_quarterly_brief.txt • Quick Report</span>
            <p class="render-paragraph">DocMind Systems reached <strong>$12.4M in Q3 gross revenue</strong> (24% YoY growth) with a <strong>34.5% net margin</strong>. CAC was optimized down by 15%, while R&D capital of $3.2M was allocated to advance proprietary multi-modal models.</p>
          </div>
        `,
        bullets: `
          <div class="summary-document-render">
            <h4 class="render-doc-title">Q3 Key Metric Highlights</h4>
            <span class="render-doc-meta">financial_quarterly_brief.txt • Action Bullet Points</span>
            <ul class="render-bullets">
              <li><strong>Revenue:</strong> $12.4 Million gross (Up 24%).</li>
              <li><strong>Research budget:</strong> $3.2 Million.</li>
              <li><strong>CAC decline:</strong> 15% improvement.</li>
              <li><strong>Net margins:</strong> Stable at 34.5%.</li>
              <li><strong>Expansion Targets:</strong> Bhopal, Tokyo, Bangalore offices.</li>
            </ul>
          </div>
        `
      },
      insights: {
        dates: ["Q3 Period (July - September)", "Q4 Planning Launch (November 1st)", "Audited Statements due October 20th"],
        names: ["Devashish Roy (CFO)", "Priya Sharma (VP of Engineering)"],
        organizations: ["DocMind Systems Inc.", "Venture Capital Board Group", "Bhopal Enterprise Center"],
        emails: ["devashish.roy@docmind-systems.com", "priya.sharma@docmind-systems.com"],
        phones: ["+91 755-432-1081", "+1 415-555-9018"],
        keywords: ["Gross revenue", "CAC optimization", "Operating margins", "SaaS Growth", "R&D expense", "Corporate expansion"],
        actionItems: ["Finalize regional tax filing structures for Bhopal office", "Approve R&D funding allocations by October 15th"]
      },
      chatResponses: {
        "hello": "Hello! I have completed analyzing <strong>financial_quarterly_brief.txt</strong>. You can ask me about Q3 earnings, CAC costs, or expansion layouts!",
        "summarize this document": "The corporate brief highlights record revenues of $12.4M for Q3 (up 24% YoY). Operating with a 34.5% net margin, CAC decreased by 15%, and $3.2M was invested into AI R&D.",
        "explain this topic simply": "This is a corporate progress report showing that our company is making more money ($12.4 million) while spending less to acquire new clients (15% savings).",
        "extract important dates & deadlines": "Dates in brief: <br>• <strong>October 20th:</strong> Final audited statements filing.<br>• <strong>November 1st:</strong> Next fiscal Q4 planning rollout.",
        "list action items and tasks": "Strategic Actions:<br>1. Confirm compliance rules for Bhopal office setup.<br>2. Finalize tax audit briefs before October 20th.",
        "find important formulas & models": "Margin Formula:<br><strong>Net Margin</strong> = (Net Profit / Gross Revenue) * 100 = 34.5%.",
        "default": "According to the financial brief, DocMind Systems reports robust SaaS revenue margins. Contact me for specific calculations or expansion goals!"
      },
      quiz: [
        {
          question: "What gross revenue did DocMind Systems report for Q3?",
          options: ["$8.5 Million", "$10.2 Million", "$12.4 Million", "$15.0 Million"],
          correct: 2
        },
        {
          question: "By what percentage did the Customer Acquisition Cost (CAC) improve during this quarter?",
          options: ["5% reduction", "10% reduction", "15% reduction", "20% reduction"],
          correct: 2
        },
        {
          question: "What is the targeted city for the newly authorized Indian enterprise expansion?",
          options: ["Mumbai", "Bhopal", "Delhi", "Chennai"],
          correct: 1
        }
      ]
    }
  };

  // State Management
  let documents = { ...sandboxDatabase };
  let activeSection = 'dashboard';
  let activeQuizAnswers = {}; // Stores questionIndex: optionIndex
  let currentNotificationsCount = 2;

  // ==========================================================================
  // DOM ELEMENT SELECTORS
  // ==========================================================================
  const menuItems = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('.dashboard-section');
  const navbarPageTitle = document.getElementById('navbar-page-title');
  const sidebar = document.getElementById('sidebar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  // Stats Counters
  const statDocsCount = document.getElementById('stat-docs-count');
  const statQuestionsCount = document.getElementById('stat-questions-count');
  const statSummariesCount = document.getElementById('stat-summaries-count');
  const statQuizzesCount = document.getElementById('stat-quizzes-count');
  const filesBadgeCount = document.getElementById('files-badge-count');

  // File Upload Handlers
  const dropZone = document.getElementById('drop-zone');
  const documentFileInput = document.getElementById('document-file-input');
  const selectFilesBtn = document.getElementById('select-files-btn');
  const documentsCardsGrid = document.getElementById('documents-cards-grid');

  // Chat Selectors
  const chatMessagesView = document.getElementById('chat-messages-view');
  const chatFileSelector = document.getElementById('chat-file-selector');
  const chatQueryForm = document.getElementById('chat-query-form');
  const chatInputField = document.getElementById('chat-input-field');
  const chatTypingSpinner = document.getElementById('chat-typing-spinner');
  const suggestedChips = document.querySelectorAll('.suggested-prompt-chip');

  // Summary Selectors
  const summaryDocSelect = document.getElementById('summary-doc-select');
  const summaryTypeSelect = document.getElementById('summary-type-select');
  const generateSummaryBtn = document.getElementById('generate-summary-btn');
  const summaryResultOutputArea = document.getElementById('summary-result-output-area');
  const summaryCopyBtn = document.getElementById('summary-copy-btn');
  const summaryDownloadBtn = document.getElementById('summary-download-btn');

  // Insights Selectors
  const insightsDocSelect = document.getElementById('insights-doc-select');
  const generateInsightsBtn = document.getElementById('generate-insights-btn');
  const insightsContainer = document.getElementById('insights-container');

  // Quiz Selectors
  const quizDocSelect = document.getElementById('quiz-doc-select');
  const quizDifficulty = document.getElementById('quiz-difficulty');
  const quizCount = document.getElementById('quiz-count');
  const generateQuizBtn = document.getElementById('generate-quiz-btn');
  const quizArenaQuestionsContainer = document.getElementById('quiz-arena-questions-container');
  const quizActiveScore = document.getElementById('quiz-active-score');
  const quizScoreNum = document.getElementById('quiz-score-num');
  const quizTotalNum = document.getElementById('quiz-total-num');

  // Settings Selectors
  const settingsNameInput = document.getElementById('settings-name-input');
  const settingsEmailInput = document.getElementById('settings-email-input');
  const saveProfileBtn = document.getElementById('save-profile-btn');
  const themeSwitchToggle = document.getElementById('theme-switch-toggle');
  const themeIconIndicator = document.getElementById('theme-icon-indicator');
  const globalSearchInput = document.getElementById('global-search-input');

  // Quick Action Buttons
  const quickActionButtons = document.querySelectorAll('.action-btn-item');

  // Timeline / Activity List
  const recentActivityList = document.getElementById('recent-activity-list');

  // Notifications Toggle
  const notificationsToggle = document.getElementById('notifications-toggle');
  const notificationsPanel = document.getElementById('notifications-panel');


  // ==========================================================================
  // VIEW ROUTING SYSTEM (VANILLA ROUTING & TAB NAVIGATION)
  // ==========================================================================
  const navigateToSection = (targetId) => {
    activeSection = targetId;
    
    // Update active Sidebar item visually
    menuItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Page Header Title
    const activeMenuItem = document.querySelector(`.menu-item[data-target="${targetId}"]`);
    if (activeMenuItem) {
      navbarPageTitle.textContent = activeMenuItem.querySelector('span').textContent;
    }

    // Toggle Visible Section Card
    sections.forEach(sec => {
      if (sec.id === `section-${targetId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Handle Mobile Drawer Closing automatically on route
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');

    // Trigger sub-renders to keep inputs synced
    if (targetId === 'ask-ai') {
      initChatUI();
    } else if (targetId === 'summary') {
      initSummaryUI();
    } else if (targetId === 'insights') {
      initInsightsUI();
    } else if (targetId === 'quiz') {
      initQuizUI();
    }
  };

  // Bind sidebar buttons
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      navigateToSection(target);
    });
  });

  // Bind Quick Action items
  quickActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-action');
      navigateToSection(target);
    });
  });

  // Mobile Menu Toggling Drawer
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });
  }


  // ==========================================================================
  // SHARED UTILITIES & CENTRALIZED STATS MANAGER
  // ==========================================================================
  const syncDynamicSelectors = () => {
    const keys = Object.keys(documents);
    
    // Helper to regenerate options
    const populateDropdown = (elem) => {
      if (!elem) return;
      elem.innerHTML = '';
      keys.forEach(k => {
        const option = document.createElement('option');
        option.value = k;
        option.textContent = documents[k].fileName;
        elem.appendChild(option);
      });
    };

    populateDropdown(chatFileSelector);
    populateDropdown(summaryDocSelect);
    populateDropdown(insightsDocSelect);
    populateDropdown(quizDocSelect);
  };

  const updateDashboardStats = () => {
    const docCount = Object.keys(documents).length;
    
    if (statDocsCount) statDocsCount.textContent = docCount;
    if (filesBadgeCount) filesBadgeCount.textContent = `${docCount} Files`;

    // Retrieve other stored values or use defaults
    const questionsCountValue = localStorage.getItem('stat_questions') || "42";
    const summariesCountValue = localStorage.getItem('stat_summaries') || "12";
    const quizzesCountValue = localStorage.getItem('stat_quizzes') || "5";

    if (statQuestionsCount) statQuestionsCount.textContent = questionsCountValue;
    if (statSummariesCount) statSummariesCount.textContent = summariesCountValue;
    if (statQuizzesCount) statQuizzesCount.textContent = quizzesCountValue;
  };

  const incrementStatValue = (statKey, domElement) => {
    let currentVal = parseInt(localStorage.getItem(statKey) || domElement.textContent);
    currentVal++;
    localStorage.setItem(statKey, currentVal.toString());
    domElement.textContent = currentVal.toString();
  };

  const addTimelineEvent = (text, type = "info") => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';

    let badgeClass = "bg-blue-light text-blue";
    let badgeIcon = "fa-solid fa-bolt";

    if (type === "upload") {
      badgeClass = "bg-blue-light text-blue";
      badgeIcon = "fa-solid fa-arrow-up-from-bracket";
    } else if (type === "summary") {
      badgeClass = "bg-green-light text-green";
      badgeIcon = "fa-solid fa-file-lines";
    } else if (type === "ask") {
      badgeClass = "bg-purple-light text-purple";
      badgeIcon = "fa-solid fa-comment-dots";
    } else if (type === "quiz") {
      badgeClass = "bg-orange-light text-orange";
      badgeIcon = "fa-solid fa-graduation-cap";
    }

    timelineItem.innerHTML = `
      <div class="timeline-badge ${badgeClass}">
        <i class="${badgeIcon}"></i>
      </div>
      <div class="timeline-body">
        <p class="timeline-text">${text}</p>
        <span class="timeline-time">Just now</span>
      </div>
    `;

    recentActivityList.insertBefore(timelineItem, recentActivityList.firstChild);
  };


  // ==========================================================================
  // SECTION 2: MY DOCUMENTS MANAGER (CRUD sandbox)
  // ==========================================================================
  const renderDocumentsGrid = () => {
    if (!documentsCardsGrid) return;
    documentsCardsGrid.innerHTML = '';

    Object.keys(documents).forEach(key => {
      const doc = documents[key];
      const card = document.createElement('div');
      card.className = 'doc-card';
      card.id = `doc-card-${key}`;

      // Custom icon styling for formats
      let fileIcon = "fa-regular fa-file-pdf";
      if (doc.fileName.endsWith('.docx')) {
        fileIcon = "fa-regular fa-file-word";
      } else if (doc.fileName.endsWith('.txt')) {
        fileIcon = "fa-regular fa-file-lines";
      }

      card.innerHTML = `
        <div class="doc-card-top">
          <div class="doc-icon-badge">
            <i class="${fileIcon}"></i>
          </div>
          <div class="doc-meta-info">
            <span class="doc-title-text" title="${doc.fileName}">${doc.fileName}</span>
            <span class="doc-sub-size-text">${doc.fileSize}</span>
          </div>
        </div>
        <span class="doc-date-text"><i class="fa-regular fa-calendar-days"></i> ${doc.uploadDate}</span>
        <div class="doc-card-actions">
          <button class="btn btn-outline btn-sm view-doc-trigger" data-key="${key}">
            <i class="fa-solid fa-magnifying-glass"></i> View
          </button>
          <button class="btn btn-danger btn-sm delete-doc-trigger" data-key="${key}">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      `;

      documentsCardsGrid.appendChild(card);
    });

    // Bind triggers
    document.querySelectorAll('.view-doc-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = btn.getAttribute('data-key');
        // Let's redirect to Ask AI with this document selected
        chatFileSelector.value = key;
        navigateToSection('ask-ai');
      });
    });

    document.querySelectorAll('.delete-doc-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = btn.getAttribute('data-key');
        const confirmDelete = confirm(`Are you sure you want to delete ${documents[key].fileName}?`);
        if (confirmDelete) {
          delete documents[key];
          renderDocumentsGrid();
          syncDynamicSelectors();
          updateDashboardStats();
        }
      });
    });
  };

  // Drag & drop listeners
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleUploadedFiles(files);
    });
  }

  if (selectFilesBtn) {
    selectFilesBtn.addEventListener('click', () => {
      documentFileInput.click();
    });
  }

  if (documentFileInput) {
    documentFileInput.addEventListener('change', (e) => {
      handleUploadedFiles(e.target.files);
    });
  }

  const uploadFileToBackend = (file) => {
    const dropZone = document.getElementById('drop-zone');
    const originalContent = dropZone ? dropZone.innerHTML : '';
    if (dropZone) {
      dropZone.innerHTML = `
        <div class="upload-progress-wrapper" style="text-align: center; padding: 20px;">
          <i class="fa-solid fa-arrows-spin fa-spin text-blue" style="font-size: 36px; color: var(--primary); margin-bottom: 12px;"></i>
          <p style="font-weight: 600; font-size: 14px; color: var(--text-dark); margin: 0 0 4px;">Processing: ${file.name}</p>
          <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Extracting document text context and building AI weights...</p>
        </div>
      `;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Str = e.target.result.split(',')[1];
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fileName: file.name,
            fileSize: file.size > 1024 * 1024 
              ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
              : (file.size / 1024).toFixed(0) + " KB",
            fileBase64: base64Str
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to parse file');
        }

        const data = await response.json();
        const keyName = data.id;

        documents[keyName] = {
          id: keyName,
          fileName: data.fileName,
          fileSize: data.fileSize,
          uploadDate: data.uploadDate,
          numPages: data.numPages,
          text: data.text,
          keyPoints: [
            "Document parsing is fully completed.",
            "Semantics processed and indexed.",
            "Memory context established."
          ],
          importantTopics: [],
          summary: {
            detailed: "",
            short: "",
            bullets: ""
          },
          insights: {
            dates: [],
            names: [],
            organizations: [],
            emails: [],
            phones: [],
            keywords: [],
            actionItems: []
          },
          chatResponses: {},
          quiz: []
        };

        addTimelineEvent(`Uploaded and Indexed <strong>${file.name}</strong>`, "upload");

        if (dropZone) dropZone.innerHTML = originalContent;

        renderDocumentsGrid();
        syncDynamicSelectors();
        updateDashboardStats();

        // Auto select newly uploaded file and switch to Ask AI
        if (chatFileSelector) {
          chatFileSelector.value = keyName;
          chatFileSelector.dispatchEvent(new Event('change'));
        }
        navigateToSection('ask-ai');

      } catch (err) {
        console.error(err);
        alert(`Error uploading file: ${err.message}`);
        if (dropZone) dropZone.innerHTML = originalContent;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadedFiles = (fileList) => {
    if (fileList.length === 0) return;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        alert("DocMind AI currently supports PDF documents only. Please upload a valid PDF file.");
        continue;
      }
      uploadFileToBackend(file);
    }
  };


  // ==========================================================================
  // SECTION 3: ASK AI TAB (ChatGPT Interface with document context selectors)
  // ==========================================================================
  
  // Helpers for persistent chat history
  const getChatHistory = (docKey) => {
    const data = localStorage.getItem(`docmind_chat_${docKey}`);
    return data ? JSON.parse(data) : [];
  };

  const saveChatHistory = (docKey, history) => {
    localStorage.setItem(`docmind_chat_${docKey}`, JSON.stringify(history));
  };

  const getUserInitials = () => {
    const nameVal = (settingsNameInput && settingsNameInput.value) || "John Doe";
    const parts = nameVal.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return "JD";
  };

  const renderChatHistory = () => {
    const currentDocKey = chatFileSelector.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    const doc = documents[currentDocKey];
    const history = getChatHistory(currentDocKey);

    if (history.length === 0) {
      // Empty State Message
      chatMessagesView.innerHTML = `
        <div class="chat-empty-state">
          <div class="chat-empty-icon-wrap" style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--primary-light); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <i class="fa-solid fa-comments text-blue" style="font-size: 24px; color: var(--primary);"></i>
          </div>
          <h4 class="chat-empty-title" style="font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--text-dark); margin-bottom: 6px; text-align: center;">Start a Conversation</h4>
          <p class="chat-empty-desc" style="font-size: 13px; color: var(--text-muted); text-align: center; max-width: 320px; margin: 0 auto;">Ask anything about <strong>${doc.fileName}</strong>. Select a suggested prompt above or type a custom question below!</p>
        </div>
      `;
      return;
    }

    const userInitials = getUserInitials();

    chatMessagesView.innerHTML = history.map((msg, index) => {
      if (msg.sender === 'user') {
        return `
          <div class="chat-msg-row user-msg">
            <div class="chat-avatar-bubble">${userInitials}</div>
            <div class="chat-content-container">
              <div class="chat-content-bubble">
                <p>${msg.text}</p>
              </div>
              <div class="chat-message-actions">
                <span class="chat-timestamp">${msg.timestamp}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        const likedClass = msg.liked ? 'active' : '';
        const dislikedClass = msg.disliked ? 'active' : '';
        return `
          <div class="chat-msg-row ai-msg" data-index="${index}">
            <div class="chat-avatar-bubble">AI</div>
            <div class="chat-content-container">
              <div class="chat-content-bubble">
                <p>${msg.text}</p>
              </div>
              <div class="chat-message-actions">
                <span class="chat-timestamp">${msg.timestamp}</span>
                <button class="chat-action-btn copy-msg-btn" title="Copy Response">
                  <i class="fa-regular fa-copy"></i>
                </button>
                <button class="chat-action-btn regenerate-msg-btn" title="Regenerate Response">
                  <i class="fa-solid fa-rotate-right"></i>
                </button>
                <button class="chat-action-btn like-msg-btn ${likedClass}" title="Like Response">
                  <i class="fa-solid fa-thumbs-up" style="display: ${msg.liked ? 'inline-block' : 'none'};"></i>
                  <i class="fa-regular fa-thumbs-up" style="display: ${msg.liked ? 'none' : 'inline-block'};"></i>
                </button>
                <button class="chat-action-btn dislike-msg-btn ${dislikedClass}" title="Dislike Response">
                  <i class="fa-solid fa-thumbs-down" style="display: ${msg.disliked ? 'inline-block' : 'none'};"></i>
                  <i class="fa-regular fa-thumbs-down" style="display: ${msg.disliked ? 'none' : 'inline-block'};"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');

    chatMessagesView.scrollTop = chatMessagesView.scrollHeight;
  };

  const initChatUI = () => {
    renderChatHistory();
  };

  const triggerAIResponse = async (messageText) => {
    const currentDocKey = chatFileSelector.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    const docData = documents[currentDocKey];

    // Show typewriter loading spinner (with exact "thinking" text)
    const spinner = document.getElementById('chat-typing-spinner');
    if (spinner) {
      const spinnerText = spinner.querySelector('.spinner-text');
      if (spinnerText) spinnerText.textContent = "DocMind AI is thinking...";
      spinner.style.display = 'flex';
    }
    if (chatMessagesView) chatMessagesView.scrollTop = chatMessagesView.scrollHeight;

    try {
      const history = getChatHistory(currentDocKey);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          docId: currentDocKey,
          message: messageText,
          chatHistory: history.map(h => ({ sender: h.sender, text: h.text }))
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate AI response');
      }

      const data = await response.json();
      
      let responseBody = `
        <div class="ai-chat-response">
          <p class="ai-answer-body" style="margin: 0; line-height: 1.6; font-size: 14px;">${data.answer}</p>
      `;

      if (data.keyPoints && data.keyPoints.length > 0) {
        responseBody += `
          <div class="ai-key-points-section" style="margin-top: 14px; padding: 12px; background-color: var(--primary-light); border-left: 3px solid var(--primary); border-radius: 6px;">
            <strong style="font-size: 12px; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;"><i class="fa-solid fa-star"></i> Key Takeaways:</strong>
            <ul style="margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.5; color: var(--text-dark);">
              ${data.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      responseBody += `
          <div class="ai-source-badge" style="margin-top: 12px; font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; border-top: 1px dashed var(--border-color); padding-top: 8px;">
            <i class="fa-solid fa-file-invoice" style="color: var(--primary);"></i>
            <span>Source: <strong>${data.sourceFile}</strong> &bull; ${data.sourceSection} &bull; ${data.sourcePage}</span>
          </div>
        </div>
      `;

      if (spinner) spinner.style.display = 'none';

      const updatedHistory = getChatHistory(currentDocKey);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      updatedHistory.push({
        sender: 'ai',
        text: responseBody,
        timestamp: timeStr,
        id: "msg_" + Date.now()
      });

      saveChatHistory(currentDocKey, updatedHistory);
      renderChatHistory();

      incrementStatValue('stat_questions', statQuestionsCount);
      addTimelineEvent(`AI Answered: <em>"${messageText.length > 30 ? messageText.slice(0, 27) + '...' : messageText}"</em>`, "ask");

    } catch (err) {
      console.error(err);
      if (spinner) spinner.style.display = 'none';
      
      const history = getChatHistory(currentDocKey);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      history.push({
        sender: 'ai',
        text: `<p style="color: var(--red); margin: 0;">Error communicating with Gemini: ${err.message}</p>`,
        timestamp: timeStr,
        id: "msg_" + Date.now()
      });
      saveChatHistory(currentDocKey, history);
      renderChatHistory();
    }
  };

  const sendChatMessage = (messageText) => {
    const currentDocKey = chatFileSelector.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    const history = getChatHistory(currentDocKey);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    history.push({
      sender: 'user',
      text: messageText,
      timestamp: timeStr,
      id: "msg_" + Date.now()
    });

    saveChatHistory(currentDocKey, history);
    renderChatHistory();

    triggerAIResponse(messageText);
  };

  // Chat bar form submission
  if (chatQueryForm) {
    chatQueryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInputField.value.trim();
      if (!text) return;

      chatInputField.value = '';
      chatInputField.style.height = 'auto'; // Reset textarea height if any
      sendChatMessage(text);
    });
  }

  // Handle Textarea Enter Key to Send and Shift+Enter for New Line
  if (chatInputField) {
    chatInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatQueryForm.dispatchEvent(new Event('submit'));
      }
    });

    // Auto grow textarea height
    chatInputField.addEventListener('input', () => {
      chatInputField.style.height = 'auto';
      chatInputField.style.height = chatInputField.scrollHeight + 'px';
    });
  }

  // Handle Suggested Chip clicks
  suggestedChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      if (promptText) {
        sendChatMessage(promptText);
      }
    });
  });

  // Re-init chat if doc selector changes
  if (chatFileSelector) {
    chatFileSelector.addEventListener('change', () => {
      initChatUI();
    });
  }

  // Chat message actions delegation (Copy, Regenerate, Like, Dislike)
  if (chatMessagesView) {
    chatMessagesView.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-action-btn');
      if (!btn) return;

      const row = btn.closest('.chat-msg-row');
      if (!row) return;

      const index = parseInt(row.getAttribute('data-index'));
      const currentDocKey = chatFileSelector.value;
      if (isNaN(index) || !currentDocKey) return;

      const history = getChatHistory(currentDocKey);
      const msg = history[index];
      if (!msg) return;

      if (btn.classList.contains('copy-msg-btn')) {
        const textToCopy = msg.text.replace(/<[^>]*>/g, '');
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--green);"></i>';
          setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
        });
      } else if (btn.classList.contains('regenerate-msg-btn')) {
        // Find preceding user prompt
        let userPrompt = "Explain this topic simply";
        for (let i = index - 1; i >= 0; i--) {
          if (history[i].sender === 'user') {
            userPrompt = history[i].text;
            break;
          }
        }
        triggerAIResponse(userPrompt);
      } else if (btn.classList.contains('like-msg-btn')) {
        msg.liked = !msg.liked;
        if (msg.liked) msg.disliked = false;
        saveChatHistory(currentDocKey, history);
        renderChatHistory();
      } else if (btn.classList.contains('dislike-msg-btn')) {
        msg.disliked = !msg.disliked;
        if (msg.disliked) msg.liked = false;
        saveChatHistory(currentDocKey, history);
        renderChatHistory();
      }
    });
  }

  // Attach File Button Logic
  const chatAttachBtn = document.getElementById('chat-attach-btn');
  const chatAttachmentInput = document.getElementById('chat-attachment-input');

  if (chatAttachBtn && chatAttachmentInput) {
    chatAttachBtn.addEventListener('click', () => {
      chatAttachmentInput.click();
    });

    chatAttachmentInput.addEventListener('change', (e) => {
      const fileList = e.target.files;
      if (fileList.length === 0) return;

      const file = fileList[0];
      const keyName = "attached_" + file.name.toLowerCase().replace(/[^a-z0-9]/g, '_');

      const formattedSize = file.size > 1024 * 1024 
        ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
        : (file.size / 1024).toFixed(0) + " KB";

      const today = new Date();
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const uploadString = today.toLocaleDateString('en-US', options);

      documents[keyName] = {
        id: keyName,
        fileName: file.name,
        fileSize: formattedSize,
        uploadDate: uploadString,
        keyPoints: [
          `File "${file.name}" was uploaded successfully to secure space.`,
          `Payload of ${formattedSize} parsed dynamically in the active session.`,
          `Full local search capability established.`
        ],
        importantTopics: [
          "Secure Document Verification",
          "Workspace Attachment Ingestion",
          "Dynamic Chat Response Modeling"
        ],
        summary: {
          detailed: `
            <div class="summary-document-render">
              <h4 class="render-doc-title">Summary Outline: ${file.name}</h4>
              <span class="render-doc-meta">${file.name} • Chat Attachment Ingestion</span>
              <div class="render-block-section">
                <h5 class="render-block-heading">Executive Abstract Overview</h5>
                <p class="render-paragraph">This custom document was uploaded directly within the active AI chat panel as a session attachment.</p>
              </div>
            </div>
          `,
          short: `
            <div class="summary-document-render">
              <h4 class="render-doc-title">Attachment Outline</h4>
              <p class="render-paragraph">The custom file <strong>${file.name}</strong> (${formattedSize}) has been ingested securely.</p>
            </div>
          `,
          bullets: `
            <div class="summary-document-render">
              <h4 class="render-doc-title">File Specifications</h4>
              <ul class="render-bullets">
                <li><strong>Filename:</strong> ${file.name}</li>
                <li><strong>Byte Payload:</strong> ${formattedSize}</li>
                <li><strong>Status:</strong> Analyzed.</li>
              </ul>
            </div>
          `
        },
        insights: {
          dates: [uploadString],
          names: ["Interactive User (Viewer)"],
          organizations: ["Secure Local Node Workspace"],
          emails: ["user.workspace@docmind-systems.com"],
          phones: ["Unavailable in sandboxed mode"],
          keywords: ["Attachment", file.name, "Active session", "Dynamic import"],
          actionItems: ["Verify extracted paragraphs", "Run semantic insights on the custom structure"]
        },
        chatResponses: {
          "hello": `Hello! I have completed analyzing your custom file <strong>${file.name}</strong>. What would you like to ask?`,
          "summarize this document": `Here is an automated overview of <strong>${file.name}</strong>. It is a custom document uploaded on ${uploadString} with a total payload size of ${formattedSize}.`,
          "explain this topic simply": `This document covers localized data from <strong>${file.name}</strong>. Let me know if you would like me to break down specific keywords.`,
          "extract important dates & deadlines": `I found the following date markers in your custom document: <br>• <strong>${uploadString}:</strong> Upload date into DocMind workspace.`,
          "list action items and tasks": `Strategic activities for ${file.name}:<br>1. Generate structured summaries of the body content.<br>2. Build training parameters or interactive quizzes.`,
          "find important formulas & models": `I found standard unstructured formatting models in <strong>${file.name}</strong>.`,
          "default": `Regarding your uploaded file ${file.name}, I can extract keywords, map timelines, or compile study cards.`
        },
        quiz: [
          {
            question: `What is the payload size of "${file.name}"?`,
            options: ["Under 1 KB", formattedSize, "100 MB", "None of the above"],
            correct: 1
          }
        ]
      };

      addTimelineEvent(`Attached <strong>${file.name}</strong> in Chat`, "upload");

      renderDocumentsGrid();
      syncDynamicSelectors();
      updateDashboardStats();

      chatFileSelector.value = keyName;

      const history = getChatHistory(keyName);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      history.push({
        sender: 'ai',
        text: `System: File <strong>${file.name}</strong> (${formattedSize}) attached and parsed successfully! Ask me anything about it.`,
        timestamp: timeStr,
        id: "msg_" + Date.now()
      });
      saveChatHistory(keyName, history);
      renderChatHistory();
    });
  }


  // ==========================================================================
  // SECTION 4: AI SUMMARY TAB
  // ==========================================================================
  const initSummaryUI = () => {
    const currentDocKey = summaryDocSelect.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    summaryResultOutputArea.innerHTML = `
      <div class="quiz-prompt-empty-card">
        <i class="fa-solid fa-file-invoice quiz-prompt-icon"></i>
        <p>Selected file: <strong>${documents[currentDocKey].fileName}</strong></p>
        <p class="panel-desc" style="margin-bottom: 0;">Click "Generate Summary" to run extraction layers.</p>
      </div>
    `;
  };

  const generateSummaryPDF = (docData, summaryType) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const contentWidth = 170;
    const margin = 20;
    let y = 20;

    const checkPageBreak = (neededHeight) => {
      if (y + neededHeight > 275) {
        doc.addPage();
        y = 20;
        drawPageHeaderLine();
      }
    };

    const drawPageHeaderLine = () => {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + contentWidth, y);
      y += 8;
    };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("DocMind AI", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text("AI Generated Summary Report", margin, y);
    y += 10;

    // Divider
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // Meta
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Document Name:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(docData.fileName, margin + 40, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Uploaded On:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(docData.uploadDate, margin + 40, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("File Size:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(docData.fileSize, margin + 40, y);
    y += 10;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // HTML stripping helper
    const stripHtml = (html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const headings = tempDiv.querySelectorAll('h4, h5, h6');
      headings.forEach(h => { h.outerHTML = '\n\n' + h.textContent.toUpperCase() + '\n'; });
      const lis = tempDiv.querySelectorAll('li');
      lis.forEach(li => { li.outerHTML = '\n- ' + li.textContent; });
      return tempDiv.textContent || tempDiv.innerText || "";
    };

    const rawSummaryText = stripHtml(docData.summary[summaryType]);
    const cleanSummaryLines = rawSummaryText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // Section 1: AI Generated Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("AI GENERATED SUMMARY", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    for (const line of cleanSummaryLines) {
      const wrappedLines = doc.splitTextToSize(line, contentWidth);
      for (const wl of wrappedLines) {
        checkPageBreak(6);
        doc.text(wl, margin, y);
        y += 6;
      }
      y += 3;
    }
    y += 4;

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // Section 2: Key Points
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("KEY POINTS", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    const keyPoints = docData.keyPoints || [
      "Comprehensive metadata analysis successfully finalized.",
      "System indexes identify primary core nouns and themes.",
      "Data optimized for workspace search capabilities."
    ];

    for (const kp of keyPoints) {
      const wrappedLines = doc.splitTextToSize("- " + kp, contentWidth);
      for (const line of wrappedLines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 6;
      }
    }
    y += 4;

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // Section 3: Important Topics
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("IMPORTANT TOPICS", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    const importantTopics = docData.importantTopics || [
      "Secure Client-Side Document Analysis",
      "Predictive Semantic Topic Identification",
      "Adaptive Information Architectures"
    ];

    for (const topic of importantTopics) {
      const wrappedLines = doc.splitTextToSize("- " + topic, contentWidth);
      for (const line of wrappedLines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 6;
      }
    }
    y += 4;

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // Section 4: Action Items
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("ACTION ITEMS", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    const actionItems = docData.insights.actionItems || [
      "Review outline details",
      "Identify custom testing workflows"
    ];

    for (const item of actionItems) {
      const wrappedLines = doc.splitTextToSize("- " + item, contentWidth);
      for (const line of wrappedLines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 6;
      }
    }
    y += 4;

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // Section 5: Keywords
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("KEYWORDS", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    const keywordsString = (docData.insights.keywords || ["Analysis", "Systems", "Workspace"]).join(", ");
    const wrappedKeywords = doc.splitTextToSize(keywordsString, contentWidth);
    for (const line of wrappedKeywords) {
      checkPageBreak(6);
      doc.text(line, margin, y);
      y += 6;
    }
    y += 10;

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    const totalPages = doc.getNumberOfPages();
    const currentDateStr = new Date().toLocaleString();

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      doc.setPage(pageNum);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Generated dynamically by DocMind AI on ${currentDateStr}`, margin, 287);
      doc.text(`Page ${pageNum} of ${totalPages}`, margin + contentWidth - 20, 287);
    }

    doc.save(`${docData.fileName.split('.')[0]}_AI_Summary_Report.pdf`);
  };

  const printSummaryReport = (docData, summaryType) => {
    const keyPoints = docData.keyPoints || [];
    const importantTopics = docData.importantTopics || [];
    const actionItems = docData.insights.actionItems || [];
    const keywords = docData.insights.keywords || [];
    const currentDateStr = new Date().toLocaleString();

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to print the report!");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DocMind AI Summary Report - ${docData.fileName}</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #0F172A;
            line-height: 1.6;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 2px solid #2563EB;
            padding-bottom: 15px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #2563EB;
          }
          .meta-info {
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 30px;
            font-size: 14px;
          }
          .meta-row {
            display: flex;
            margin-bottom: 8px;
          }
          .meta-label {
            font-weight: bold;
            width: 150px;
            color: #64748B;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #2563EB;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
          }
          .bullets {
            padding-left: 20px;
            margin-bottom: 20px;
            list-style-type: none;
          }
          .bullets li {
            margin-bottom: 8px;
            position: relative;
            padding-left: 15px;
          }
          .bullets li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #2563EB;
            font-weight: bold;
          }
          .keyword-pill {
            display: inline-block;
            background-color: #EFF6FF;
            color: #2563EB;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 500;
            margin-right: 8px;
            margin-bottom: 8px;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #E2E8F0;
            padding-top: 15px;
            font-size: 12px;
            color: #94A3B8;
            display: flex;
            justify-content: space-between;
          }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">DocMind AI</div>
            <div style="font-size: 14px; color: #64748B;">AI Generated Summary Report</div>
          </div>
          <button onclick="window.print();" style="background-color: #2563EB; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; cursor: pointer;">Print Document</button>
        </div>

        <div class="meta-info">
          <div class="meta-row">
            <div class="meta-label">Document Name:</div>
            <div>${docData.fileName}</div>
          </div>
          <div class="meta-row">
            <div class="meta-label">Uploaded On:</div>
            <div>${docData.uploadDate}</div>
          </div>
          <div class="meta-row">
            <div class="meta-label">File Size:</div>
            <div>${docData.fileSize}</div>
          </div>
        </div>

        <div class="section-title">AI Generated Summary</div>
        <div>${docData.summary[summaryType]}</div>

        <div class="section-title">Key Points</div>
        <ul class="bullets">
          ${keyPoints.map(kp => `<li>${kp}</li>`).join('')}
        </ul>

        <div class="section-title">Important Topics</div>
        <ul class="bullets">
          ${importantTopics.map(topic => `<li>${topic}</li>`).join('')}
        </ul>

        <div class="section-title">Action Items</div>
        <ul class="bullets">
          ${actionItems.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <div class="section-title">Keywords</div>
        <div style="margin-top: 10px;">
          ${keywords.map(kw => `<span class="keyword-pill">${kw}</span>`).join('')}
        </div>

        <div class="footer">
          <div>Generated dynamically by DocMind AI on ${currentDateStr}</div>
          <div>Page 1 of 1</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (generateSummaryBtn) {
    generateSummaryBtn.addEventListener('click', async () => {
      const currentDocKey = summaryDocSelect.value;
      const type = summaryTypeSelect.value;
      if (!currentDocKey || !documents[currentDocKey]) return;

      const docData = documents[currentDocKey];

      // Visual loading placeholder
      summaryResultOutputArea.innerHTML = `
        <div class="quiz-prompt-empty-card">
          <i class="fa-solid fa-arrows-spin fa-spin quiz-prompt-icon" style="color: var(--primary);"></i>
          <p style="font-weight: 600; font-size: 14px; margin-top: 10px;">Analyzing document semantics...</p>
          <p style="font-size: 11px; color: var(--text-muted);">Extracting hierarchical concepts, key takeaways, and action lists using Gemini API...</p>
        </div>
      `;

      try {
        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            docId: currentDocKey,
            summaryType: type
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to generate summary');
        }

        const data = await response.json();
        
        // Save back to documents state so that Copy, PDF, and Print have access to it!
        docData.summary[type] = data[type] || data.detailed;
        docData.keyPoints = data.keyPoints;
        docData.importantTopics = data.importantTopics;
        docData.insights.actionItems = data.actionItems;
        docData.insights.keywords = data.keywords;

        const keyPoints = data.keyPoints;
        const importantTopics = data.importantTopics;
        const actionItems = data.actionItems;
        const keywords = data.keywords;

        summaryResultOutputArea.innerHTML = `
          <div class="summary-document-render animate-fade-in">
            <h4 class="render-doc-title">${docData.fileName}</h4>
            <span class="render-doc-meta">${docData.fileName} &bull; AI Summary Report</span>

            <div class="render-block-section">
              <h5 class="render-block-heading"><i class="fa-solid fa-file-text text-blue" style="color: var(--primary);"></i> AI Generated Summary</h5>
              <div class="render-paragraph" style="line-height: 1.7; font-size: 14px; color: var(--text-dark);">${docData.summary[type]}</div>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading"><i class="fa-solid fa-star text-orange" style="color: var(--orange);"></i> Key Points</h5>
              <ul class="render-bullets">
                ${keyPoints.map(kp => `<li>${kp}</li>`).join('')}
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading"><i class="fa-solid fa-tags text-purple" style="color: var(--purple);"></i> Important Topics</h5>
              <ul class="render-bullets">
                ${importantTopics.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading"><i class="fa-solid fa-list-check text-green" style="color: var(--green);"></i> Action Items</h5>
              <ul class="render-bullets">
                ${actionItems.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="render-block-section">
              <h5 class="render-block-heading"><i class="fa-solid fa-key text-red" style="color: var(--red);"></i> Keywords</h5>
              <div class="render-keywords-pills-row" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                ${keywords.map(kw => `<span class="keyword-pill-badge" style="background-color: var(--primary-light); color: var(--primary); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;">${kw}</span>`).join('')}
              </div>
            </div>

            <!-- Action buttons exactly below summary -->
            <div class="summary-actions-footer-row" style="display: flex; gap: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color);">
              <button class="btn btn-primary" id="summary-btn-copy" style="flex: 1;">
                <i class="fa-solid fa-copy"></i> Copy Summary
              </button>
              <button class="btn btn-primary" id="summary-btn-download" style="flex: 1;">
                <i class="fa-solid fa-file-pdf"></i> Download Summary PDF
              </button>
              <button class="btn btn-outline" id="summary-btn-print" style="flex: 1;">
                <i class="fa-solid fa-print"></i> Print Summary
              </button>
            </div>
          </div>
        `;

        // Bind copy, download, print
        const btnCopy = document.getElementById('summary-btn-copy');
        const btnDownload = document.getElementById('summary-btn-download');
        const btnPrint = document.getElementById('summary-btn-print');

        if (btnCopy) {
          btnCopy.addEventListener('click', () => {
            const formattedText = `DocMind AI - Summary Report\n\n` +
              `Document Name: ${docData.fileName}\n` +
              `Uploaded On: ${docData.uploadDate}\n` +
              `File Size: ${docData.fileSize}\n\n` +
              `AI GENERATED SUMMARY:\n${docData.summary[type]}\n\n` +
              `KEY POINTS:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}\n\n` +
              `IMPORTANT TOPICS:\n${importantTopics.map(topic => `- ${topic}`).join('\n')}\n\n` +
              `ACTION ITEMS:\n${actionItems.map(item => `- ${item}`).join('\n')}\n\n` +
              `KEYWORDS:\n${keywords.join(', ')}`;

            navigator.clipboard.writeText(formattedText).then(() => {
              const originalHTML = btnCopy.innerHTML;
              btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
              setTimeout(() => { btnCopy.innerHTML = originalHTML; }, 2000);
            });
          });
        }

        if (btnDownload) {
          btnDownload.addEventListener('click', () => {
            generateSummaryPDF(docData, type);
          });
        }

        if (btnPrint) {
          btnPrint.addEventListener('click', () => {
            printSummaryReport(docData, type);
          });
        }

        incrementStatValue('stat_summaries', statSummariesCount);
        addTimelineEvent(`Generated Summary for <strong>${docData.fileName}</strong>`, "summary");

      } catch (err) {
        console.error(err);
        summaryResultOutputArea.innerHTML = `
          <div class="quiz-prompt-empty-card">
            <i class="fa-solid fa-triangle-exclamation text-red quiz-prompt-icon" style="color: var(--red);"></i>
            <p>Error generating summary: ${err.message}</p>
          </div>
        `;
      }
    });
  }

  // Bind the top/actions bar copy & download buttons too, to keep them functional
  if (summaryCopyBtn) {
    summaryCopyBtn.addEventListener('click', () => {
      const currentDocKey = summaryDocSelect.value;
      if (!currentDocKey || !documents[currentDocKey]) return;
      const docData = documents[currentDocKey];
      const keyPoints = docData.keyPoints || [];
      const importantTopics = docData.importantTopics || [];
      const actionItems = docData.insights.actionItems || [];
      const keywords = docData.insights.keywords || [];
      const type = summaryTypeSelect.value;
      
      const sumText = docData.summary[type] || "Please generate a summary first.";

      const formattedText = `DocMind AI - Summary Report\n\n` +
        `Document Name: ${docData.fileName}\n` +
        `Uploaded On: ${docData.uploadDate}\n` +
        `File Size: ${docData.fileSize}\n\n` +
        `AI GENERATED SUMMARY:\n${sumText}\n\n` +
        `KEY POINTS:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}\n\n` +
        `IMPORTANT TOPICS:\n${importantTopics.map(topic => `- ${topic}`).join('\n')}\n\n` +
        `ACTION ITEMS:\n${actionItems.map(item => `- ${item}`).join('\n')}\n\n` +
        `KEYWORDS:\n${keywords.join(', ')}`;

      navigator.clipboard.writeText(formattedText).then(() => {
        alert("Summary report copied to clipboard!");
      });
    });
  }

  if (summaryDownloadBtn) {
    summaryDownloadBtn.addEventListener('click', () => {
      const currentDocKey = summaryDocSelect.value;
      const type = summaryTypeSelect.value;
      if (!currentDocKey || !documents[currentDocKey]) return;
      generateSummaryPDF(documents[currentDocKey], type);
    });
  }


  // ==========================================================================
  // SECTION 5: AI INSIGHTS TAB (Individual cards generation)
  // ==========================================================================
  const initInsightsUI = () => {
    const currentDocKey = insightsDocSelect.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    insightsContainer.innerHTML = `
      <div class="quiz-prompt-empty-card colspan-2" style="grid-column: span 3; background-color: var(--card-bg);">
        <i class="fa-solid fa-lightbulb quiz-prompt-icon" style="color: var(--primary);"></i>
        <p>Selected file: <strong>${documents[currentDocKey].fileName}</strong></p>
        <p class="panel-desc">Click "Generate Insights" to run deep entity-recognition passes.</p>
      </div>
    `;
  };

  if (insightsDocSelect) {
    insightsDocSelect.addEventListener('change', () => {
      initInsightsUI();
    });
  }

  if (generateInsightsBtn) {
    generateInsightsBtn.addEventListener('click', async () => {
      const currentDocKey = insightsDocSelect.value;
      if (!currentDocKey || !documents[currentDocKey]) return;

      const docData = documents[currentDocKey];

      // Render loaders
      insightsContainer.innerHTML = `
        <div class="quiz-prompt-empty-card" style="grid-column: span 3; background-color: var(--card-bg);">
          <i class="fa-solid fa-arrows-spin fa-spin quiz-prompt-icon" style="color: var(--primary);"></i>
          <p style="font-weight: 600; font-size: 14px; margin-top: 10px;">Extracting topics, definitions, advantages, and scientific frameworks...</p>
        </div>
      `;

      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            docId: currentDocKey
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to generate insights');
        }

        const data = await response.json();
        
        insightsContainer.innerHTML = '';

        const createInsightCard = (title, items, icon, colorClass, isMono = false) => {
          const card = document.createElement('div');
          card.className = 'insight-card animate-fade-in';

          let listHtml = '';
          if (items && items.length > 0) {
            items.forEach(it => {
              listHtml += `<div class="insight-tag ${isMono ? 'mono' : ''}">${it}</div>`;
            });
          } else {
            listHtml = `<div class="no-insights-label">No entries extracted</div>`;
          }

          card.innerHTML = `
            <div class="insight-card-header">
              <i class="${icon} ${colorClass}" style="font-size: 16px;"></i>
              <h4 class="insight-card-title">${title}</h4>
            </div>
            <div class="insight-items-list">
              ${listHtml}
            </div>
          `;
          return card;
        };

        // Render cards returned from Gemini
        data.cards.forEach(card => {
          insightsContainer.appendChild(createInsightCard(card.title, card.items, card.icon, card.colorClass, card.isMono));
        });

      } catch (err) {
        console.error(err);
        insightsContainer.innerHTML = `
          <div class="quiz-prompt-empty-card" style="grid-column: span 3; background-color: var(--card-bg);">
            <i class="fa-solid fa-triangle-exclamation text-red quiz-prompt-icon" style="color: var(--red);"></i>
            <p>Error generating insights: ${err.message}</p>
          </div>
        `;
      }
    });
  }


  // ==========================================================================
  // SECTION 6: QUIZ GENERATOR TAB (Multiple Choice interactive arena)
  // ==========================================================================
  const initQuizUI = () => {
    const currentDocKey = quizDocSelect.value;
    if (!currentDocKey || !documents[currentDocKey]) return;

    quizArenaQuestionsContainer.innerHTML = `
      <div class="quiz-prompt-empty-card">
        <i class="fa-solid fa-graduation-cap quiz-prompt-icon" style="color: var(--primary);"></i>
        <p>Document context ready: <strong>${documents[currentDocKey].fileName}</strong></p>
        <p class="panel-desc">Configure difficulty metrics on the left, then trigger "Generate Quiz".</p>
      </div>
    `;
    quizActiveScore.style.display = 'none';
  };

  if (quizDocSelect) {
    quizDocSelect.addEventListener('change', () => {
      initQuizUI();
    });
  }

  if (generateQuizBtn) {
    generateQuizBtn.addEventListener('click', async () => {
      const currentDocKey = quizDocSelect.value;
      if (!currentDocKey || !documents[currentDocKey]) return;

      const docData = documents[currentDocKey];
      const selectedDifficulty = quizDifficulty.value;
      const countValue = quizCount.value;

      // Loading state
      quizArenaQuestionsContainer.innerHTML = `
        <div class="quiz-prompt-empty-card">
          <i class="fa-solid fa-arrows-spin fa-spin quiz-prompt-icon" style="color: var(--primary);"></i>
          <p style="font-weight: 600; font-size: 14px; margin-top: 10px;">Compiling context segments into interactive questions...</p>
          <p style="font-size: 11px; color: var(--text-muted);">Generating fully validated, syllabus-mapped quizzes using Gemini Pro...</p>
        </div>
      `;
      quizActiveScore.style.display = 'none';

      try {
        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            docId: currentDocKey,
            difficulty: selectedDifficulty,
            count: countValue
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to generate quiz');
        }

        const data = await response.json();
        
        // Save the questions to our local state so answer click handlers can access them
        docData.quiz = data.quiz;

        quizArenaQuestionsContainer.innerHTML = '';
        activeQuizAnswers = {};

        // Render questions
        docData.quiz.forEach((qItem, qIndex) => {
          const qCard = document.createElement('div');
          qCard.className = 'quiz-question-card animate-fade-in';
          qCard.id = `quiz-q-${qIndex}`;

          let optionsHtml = '';
          qItem.options.forEach((optText, optIdx) => {
            optionsHtml += `
              <button class="quiz-opt-btn" data-q-idx="${qIndex}" data-opt-idx="${optIdx}">
                ${String.fromCharCode(65 + optIdx)}. ${optText}
              </button>
            `;
          });

          const typeLabels = {
            mcq: "Multiple Choice",
            tf: "True / False",
            fitb: "Fill in the Blank",
            short: "Short Answer Evaluation"
          };
          const typeLabel = typeLabels[qItem.type] || "Multiple Choice";

          qCard.innerHTML = `
            <div class="quiz-q-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span>Question ${qIndex + 1}: ${qItem.question}</span>
              <span style="font-size: 11px; background-color: var(--primary-light); color: var(--primary); padding: 2px 8px; border-radius: 9999px; font-weight: 600;">${typeLabel}</span>
            </div>
            <div class="quiz-options-block">
              ${optionsHtml}
            </div>
            <!-- Dynamic explanation section (initially hidden) -->
            <div class="quiz-explanation-block" id="quiz-explain-${qIndex}" style="display: none; margin-top: 12px; padding: 12px; border-radius: 6px; background-color: #F8FAFC; border-left: 4px solid var(--primary); font-size: 13px; line-height: 1.5; color: var(--text-dark);">
              <strong>Explanation:</strong> <span class="explain-text">${qItem.explanation}</span>
            </div>
          `;

          quizArenaQuestionsContainer.appendChild(qCard);
        });

        // Setup scorecard metrics
        quizActiveScore.style.display = 'block';
        quizScoreNum.textContent = "0";
        quizTotalNum.textContent = docData.quiz.length;

        // Bind clicks on generated options
        document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const qIndex = parseInt(btn.getAttribute('data-q-idx'));
            const optIndex = parseInt(btn.getAttribute('data-opt-idx'));
            handleQuizAnswerSelection(qIndex, optIndex, docData);
          });
        });

        // Increment quizzes count stats
        incrementStatValue('stat_quizzes', statQuizzesCount);
        addTimelineEvent(`Generated ${docData.quiz.length} MCQs for <strong>${docData.fileName}</strong>`, "quiz");

      } catch (err) {
        console.error(err);
        quizArenaQuestionsContainer.innerHTML = `
          <div class="quiz-prompt-empty-card">
            <i class="fa-solid fa-triangle-exclamation text-red quiz-prompt-icon" style="color: var(--red);"></i>
            <p>Error generating quiz: ${err.message}</p>
          </div>
        `;
      }
    });
  }

  const handleQuizAnswerSelection = (qIndex, optIndex, docData) => {
    // If already answered, skip
    if (activeQuizAnswers[qIndex] !== undefined) return;

    activeQuizAnswers[qIndex] = optIndex;
    const correctOption = docData.quiz[qIndex].correct;

    // Find options inside card
    const card = document.getElementById(`quiz-q-${qIndex}`);
    const optionBtns = card.querySelectorAll('.quiz-opt-btn');

    optionBtns.forEach(btn => {
      const currentOptIdx = parseInt(btn.getAttribute('data-opt-idx'));
      btn.classList.add('disabled');

      if (currentOptIdx === correctOption) {
        btn.classList.add('correct');
      } else if (currentOptIdx === optIndex && optIndex !== correctOption) {
        btn.classList.add('wrong');
      }
    });

    // Reveal explanation block
    const explainBlock = document.getElementById(`quiz-explain-${qIndex}`);
    if (explainBlock) {
      explainBlock.style.display = 'block';
      explainBlock.style.borderLeftColor = (optIndex === correctOption) ? 'var(--green)' : 'var(--red)';
    }

    // Recalculate score
    let score = 0;
    Object.keys(activeQuizAnswers).forEach(qKey => {
      const chosen = activeQuizAnswers[qKey];
      if (chosen === docData.quiz[qKey].correct) {
        score++;
      }
    });

    quizScoreNum.textContent = score;
  };


  // ==========================================================================
  // SECTION 7: SETTINGS & APPEARANCE (Theme Toggling light/dark)
  // ==========================================================================
  
  // Profile settings update triggers
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      const name = settingsNameInput.value.trim();
      const email = settingsEmailInput.value.trim();

      if (!name || !email) {
        alert("Please provide a valid name and email!");
        return;
      }

      // Update UI Header displaying User's Name
      document.querySelectorAll('.profile-display-name').forEach(elem => {
        elem.textContent = name;
      });

      // Update avatar letter
      const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      document.querySelectorAll('.avatar-circle').forEach(elem => {
        elem.textContent = initials;
      });

      alert("Settings Profile updated successfully!");
    });
  }

  // Theme Toggler
  if (themeSwitchToggle) {
    // Read from localStorage to respect settings preferences
    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeIconIndicator.className = 'fa-solid fa-moon';
    }

    themeSwitchToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        themeIconIndicator.className = 'fa-solid fa-sun';
        localStorage.setItem('theme-mode', 'light');
      } else {
        document.body.classList.add('dark-theme');
        themeIconIndicator.className = 'fa-solid fa-moon';
        localStorage.setItem('theme-mode', 'dark');
      }
    });
  }

  // Global search input enter click and keyup filters
  if (globalSearchInput) {
    globalSearchInput.addEventListener('keyup', async (e) => {
      const value = e.target.value.toLowerCase().trim();
      if (!value) {
        renderDocumentsGrid();
        return;
      }

      // Live search local grid
      document.querySelectorAll('.doc-card').forEach(card => {
        const text = card.querySelector('.doc-title-text').textContent.toLowerCase();
        if (text.includes(value)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (e.key === 'Enter') {
        runDeepSemanticSearch(value);
      }
    });
  }

  const runDeepSemanticSearch = async (query) => {
    let modal = document.getElementById('search-result-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'search-result-modal';
      modal.style = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(15, 23, 42, 0.4);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999; backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease-out;
      `;
      document.body.appendChild(modal);
    }

    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="search-modal-card" style="
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        width: 100%; max-width: 600px;
        padding: 24px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
        display: flex; flex-direction: column; gap: 16px;
        animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--text-dark); display: flex; align-items: center; gap: 8px; margin: 0;">
            <i class="fa-solid fa-wand-magic-sparkles text-blue" style="color: var(--primary);"></i> AI Semantic Search
          </h3>
          <button id="close-search-modal" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 16px;"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div id="search-modal-content" style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 13px;">
            <i class="fa-solid fa-arrows-spin fa-spin" style="color: var(--primary);"></i>
            <span>Searching all uploaded document contents for "${query}" using Gemini...</span>
          </div>
        </div>
      </div>
    `;

    document.getElementById('close-search-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      const contentContainer = document.getElementById('search-modal-content');

      if (!data.found) {
        contentContainer.innerHTML = `
          <div style="text-align: center; padding: 20px 0;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 32px; color: var(--red); margin-bottom: 12px;"></i>
            <p style="font-size: 14px; font-weight: 600; color: var(--text-dark); margin: 0 0 4px;">No match found</p>
            <p style="font-size: 12px; color: var(--text-muted); margin: 0;">${data.explanation}</p>
          </div>
        `;
        return;
      }

      contentContainer.innerHTML = `
        <div style="font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; background-color: var(--primary-light); padding: 8px 12px; border-radius: 6px;">
          <i class="fa-solid fa-circle-check" style="color: var(--green);"></i>
          <span>Found match in: <strong>${data.documentName}</strong></span>
        </div>
        <div style="font-size: 14px; line-height: 1.6; color: var(--text-dark); background-color: var(--bg-main); padding: 16px; border-radius: 8px; max-height: 300px; overflow-y: auto;">
          ${data.explanation}
        </div>
        <div style="font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <span>Source: <strong>${data.sourceSection}</strong> &bull; ${data.sourcePage}</span>
          <button id="search-modal-jump-btn" class="btn btn-primary btn-sm" style="font-size: 11px; padding: 4px 10px;">
            <i class="fa-solid fa-comments"></i> Open in Ask AI
          </button>
        </div>
      `;

      document.getElementById('search-modal-jump-btn').addEventListener('click', () => {
        modal.style.display = 'none';
        if (chatFileSelector) {
          chatFileSelector.value = data.documentId;
          chatFileSelector.dispatchEvent(new Event('change'));
        }
        navigateToSection('ask-ai');
      });

    } catch (err) {
      console.error(err);
      document.getElementById('search-modal-content').innerHTML = `
        <div style="text-align: center; padding: 20px 0; color: var(--red);">
          <i class="fa-solid fa-circle-xmark" style="font-size: 32px; margin-bottom: 12px;"></i>
          <p style="font-size: 14px; font-weight: 600; margin: 0;">Failed to process semantic search</p>
          <p style="font-size: 12px; margin-top: 4px;">${err.message}</p>
        </div>
      `;
    }
  };

  // Handle simple notifications panel toggle
  if (notificationsToggle) {
    notificationsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationsPanel.classList.toggle('show');
      
      const dot = notificationsToggle.querySelector('.notification-dot');
      if (dot) dot.style.display = 'none';
    });

    document.addEventListener('click', () => {
      if (notificationsPanel) {
        notificationsPanel.classList.remove('show');
      }
    });

    if (notificationsPanel) {
      notificationsPanel.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }


  // ==========================================================================
  // APP INITIALIZATION CHANNELS
  // ==========================================================================
  const bootstrapWorkspace = () => {
    // Populate dropdown parameters
    syncDynamicSelectors();
    
    // Update numerical stat indicators
    updateDashboardStats();

    // Render original card decks
    renderDocumentsGrid();

    // Trigger initial sub-UI defaults
    initChatUI();
    initSummaryUI();
    initInsightsUI();
    initQuizUI();
  };

  bootstrapWorkspace();

});
