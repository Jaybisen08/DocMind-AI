/**
 * DocMind AI - Premium Landing Page Interactive Logic
 * Fully custom, modular, vanilla JavaScript engine
 * Built for Hacks Day Bhopal 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. HERO ANIMATIONS ON INITIAL LOAD
     ========================================================================== */
  const initHeroAnimations = () => {
    const fadeUpItems = document.querySelectorAll('.fade-up-init');
    fadeUpItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('fade-up-active');
      }, 150 * index); // Clean staggered entry effect
    });
  };
  initHeroAnimations();

  /* ==========================================================================
     2. NAVBAR TRANSITION & BACKGROUND CHANGE ON SCROLL
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const scrollOffset = 50;

  const handleNavbarScroll = () => {
    if (window.scrollY > scrollOffset) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial execution in case of immediate load mid-page


  /* ==========================================================================
     3. MOBILE BURGER MENU TOGGLE & MOBILE DRAWER LINKS
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  const toggleMobileMenu = () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scrolling when the menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer when clicking a link
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  /* ==========================================================================
     4. SMOOTH SCROLLING & ACTIVE SECTION LINK HIGHLIGHTING (SCROLL SPY)
     ========================================================================== */
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  const updateActiveNavLink = () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 160; // Offset for accuracy

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentActiveId}`) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Execute once on mount


  /* ==========================================================================
     5. SCROLL FADE-UP ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const scrollRevealItems = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Unobserve to animate only once
        }
      });
    }, {
      threshold: 0.12, // Trigger when 12% of the element is visible
      rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealItems.forEach(item => {
      revealObserver.observe(item);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    scrollRevealItems.forEach(item => {
      item.classList.add('active');
    });
  }


  /* ==========================================================================
     6. HIGH FIDELITY SANDBOX DEMO INTERACTION ENGINE
     ========================================================================== */
  
  // Sandbox Database (Self-contained, production-quality mockup mock content)
  const sandboxDb = {
    syllabus: {
      fileName: 'syllabus.pdf',
      welcomeMsg: 'Hi there! I have analyzed <strong>syllabus.pdf</strong> completely. What would you like to know? Here are a few sample queries you can click on:',
      suggestions: [
        'When is the midterm exam?',
        'What is the attendance policy?',
        'List the course prerequisites.'
      ],
      chatResponses: {
        'when is the midterm exam?': 'According to the Syllabus (Page 2), the <strong>Midterm Exam</strong> is scheduled for <strong>October 15th at 2:00 PM</strong> in Room 402. It accounts for 30% of your final grade.',
        'what is the attendance policy?': 'The policy states that <strong>attendance is mandatory</strong>. You are permitted up to <strong>3 unexcused absences</strong>. Any further absences will trigger a direct penalty of 5% on your final participation score.',
        'list the course prerequisites.': 'The prerequisites for this course are: <br>1. <strong>Introduction to Computing (CS 100)</strong> with a minimum C- grade.<br>2. <strong>Basic Algebra (MATH 101)</strong>.'
      },
      fallbackResponse: 'That\'s a great question about the course syllabus! The document highlights standard course procedures, laboratory assignments (accounting for 20%), a final project (40%), and midterms. If you ask about specific metrics like grades or schedules, I will fetch them directly.',
      summary: {
        title: 'Course Syllabus: Intro to Computer Intelligence',
        meta: 'syllabus.pdf • Parsed October 2026',
        sections: [
          {
            heading: 'Course Overview',
            bullets: [
              '15-week immersive curriculum covering standard neural backbones, classification, and heuristic search.',
              'Weekly coding assignments in Python utilizing lightweight machine learning APIs.'
            ]
          },
          {
            heading: 'Grading Structure & Milestones',
            bullets: [
              '<strong>Final Project:</strong> 40% (Due week 15, group-based implementation).',
              '<strong>Midterm Examination:</strong> 30% (Week 8, covering modules 1 through 6).',
              '<strong>Laboratory Tasks:</strong> 20% (Assessed weekly).',
              '<strong>Participation & Attendance:</strong> 10% (Calculated automatically).'
            ]
          },
          {
            heading: 'Key Academic Policies',
            bullets: [
              '<strong>Late Submission Rule:</strong> penalized by 10% per day, capped at a maximum of 3 days. Subsequent submissions earn a 0 score.',
              '<strong>Absences:</strong> Maximum of 3 unexcused absences are permitted.'
            ]
          }
        ]
      },
      quiz: [
        {
          question: 'What percentage of the final grade is allocated to the Final Project?',
          options: ['20%', '30%', '40%', '50%'],
          correct: 2
        },
        {
          question: 'What is the maximum number of unexcused absences allowed before participation penalties apply?',
          options: ['1 absence', '2 absences', '3 absences', '5 absences'],
          correct: 2
        },
        {
          question: 'When is the Midterm Exam scheduled in the syllabus?',
          options: ['October 1st', 'October 15th', 'November 1st', 'December 10th'],
          correct: 1
        }
      ]
    },
    research: {
      fileName: 'deep-learning-paper.docx',
      welcomeMsg: 'Hello! I have completed parsing the <strong>deep-learning-paper.docx</strong>. How can I assist you in understanding this neural research? Click any of the topics below:',
      suggestions: [
        'Explain backpropagation simply.',
        'What is the difference between CNN and RNN?',
        'What optimizer is recommended?'
      ],
      chatResponses: {
        'explain backpropagation simply.': '<strong>Backpropagation</strong> is the mathematical core of network learning. It propagates the error backwards from output to input using the <strong>Chain Rule</strong> of calculus. This process calculates gradients to systematically tune the nodes\' weights and minimize prediction error.',
        'what is the difference between cnn and rnn?': 'The paper outlines clear boundaries:<br>• <strong>CNN (Convolutional Neural Net):</strong> processes spatial grid inputs like images, using sliding kernel filters.<br>• <strong>RNN (Recurrent Neural Net):</strong> processes sequential data like language or timeseries by maintaining internal looping states (hidden memory matrices).',
        'what optimizer is recommended?': 'The authors strongly recommend the <strong>Adam (Adaptive Moment Estimation)</strong> optimizer, citing its robust self-tuning learning rates and fast gradient convergence over deep loss manifolds compared to standard SGD.'
      },
      fallbackResponse: 'That question aligns with the research paper\'s thesis. The document reviews advanced multi-layered neural architectures, structural backpropagation pipelines, optimization functions, and computational costs. Ask me about specific architectures or mathematical parameters, and I\'ll summarize!',
      summary: {
        title: 'Research Paper: Modern Deep Neural Networks',
        meta: 'deep-learning-paper.docx • Published 2026',
        sections: [
          {
            heading: 'Executive Summary',
            bullets: [
              'A critical evaluation of hierarchical representations which autonomously discover features in large unstructured datasets.',
              'Demonstrates massive scaling capabilities when networks are combined with high-performance computing hardware.'
            ]
          },
          {
            heading: 'Comparative Architectures',
            bullets: [
              '<strong>Convolutional Layers (CNN):</strong> Designed for translation-invariant features, excellent for computer vision.',
              '<strong>Recurrent Neural Networks (RNN):</strong> Leverages chronological hidden parameters, ideal for audio, language, and real-time streams.'
            ]
          },
          {
            heading: 'Learning Optimizations',
            bullets: [
              'Explores why Adaptive Gradient Descents (primarily <strong>Adam</strong>) avoid vanishing gradients on non-convex training manifolds.',
              'Highlights computational cost parameters, noting layer depth constraints.'
            ]
          }
        ]
      },
      quiz: [
        {
          question: 'Which optimization algorithm does the paper recommend for fast deep-network convergence?',
          options: ['RMSprop', 'Adagrad', 'Adam', 'Vanilla Stochastic Gradient Descent (SGD)'],
          correct: 2
        },
        {
          question: 'What architectural model is best suited for spatial, grid-like data like computer vision?',
          options: ['Recurrent Neural Network (RNN)', 'Convolutional Neural Network (CNN)', 'Transformer Decoder Only', 'Feed-Forward Perceptron'],
          correct: 1
        },
        {
          question: 'Which calculus derivative rule is the core foundation of backpropagation algorithms?',
          options: ['Quotient Rule', 'Product Rule', 'Chain Rule', 'Power Rule'],
          correct: 2
        }
      ]
    }
  };

  // State Management
  let activeDocumentKey = 'syllabus'; // Default document
  let activeTabKey = 'chat'; // Default active panel
  let quizUserAnswers = [null, null, null]; // Track answers [q0, q1, q2]

  // DOM Handles for Demo Modal
  const demoModal = document.getElementById('demo-modal');
  const triggerDemoButtons = document.querySelectorAll('.trigger-demo');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = demoModal.querySelector('.modal-backdrop');

  // Open Modal function
  const openDemoModal = () => {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
    
    // Auto-initialize default view states
    activeDocumentKey = 'syllabus';
    activeTabKey = 'chat';
    resetQuizState();
    switchDocument(activeDocumentKey);
    switchTab(activeTabKey);
  };

  // Close Modal function
  const closeDemoModal = () => {
    demoModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  };

  // Attach Open/Close Event Listeners
  triggerDemoButtons.forEach(btn => btn.addEventListener('click', openDemoModal));
  modalCloseBtn.addEventListener('click', closeDemoModal);
  modalBackdrop.addEventListener('click', closeDemoModal);

  // 7. GET STARTED & TRY DEMO BUTTONS INTEGRATION
  const heroGetStartedBtn = document.getElementById('hero-get-started-btn');
  const navGetStartedBtn = document.getElementById('nav-get-started-btn');
  const mobileGetStartedBtn = document.getElementById('mobile-get-started-btn');

  const redirectToLogin = () => {
    window.location.href = "login.html";
  };

  if (heroGetStartedBtn) {
    heroGetStartedBtn.addEventListener('click', redirectToLogin);
  }
  if (navGetStartedBtn) {
    navGetStartedBtn.addEventListener('click', redirectToLogin);
  }
  if (mobileGetStartedBtn) {
    mobileGetStartedBtn.addEventListener('click', redirectToLogin);
  }

  const heroDemoBtn = document.getElementById('hero-demo-btn');
  const ctaDemoBtn = document.getElementById('cta-demo-btn');

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (heroDemoBtn) {
    heroDemoBtn.addEventListener('click', scrollToFeatures);
  }
  if (ctaDemoBtn) {
    ctaDemoBtn.addEventListener('click', scrollToFeatures);
  }


  /* --- Tab Switching System in Modal --- */
  const tabButtons = {
    chat: document.getElementById('tab-chat'),
    quiz: document.getElementById('tab-quiz'),
    summary: document.getElementById('tab-summary')
  };

  const tabPanes = {
    chat: document.getElementById('pane-chat'),
    quiz: document.getElementById('pane-quiz'),
    summary: document.getElementById('pane-summary')
  };

  const switchTab = (tabKey) => {
    activeTabKey = tabKey;
    
    // Update button states
    Object.keys(tabButtons).forEach(key => {
      if (key === tabKey) {
        tabButtons[key].classList.add('active');
      } else {
        tabButtons[key].classList.remove('active');
      }
    });

    // Update panel visibility
    Object.keys(tabPanes).forEach(key => {
      if (key === tabKey) {
        tabPanes[key].classList.add('active');
      } else {
        tabPanes[key].classList.remove('active');
      }
    });
  };

  tabButtons.chat.addEventListener('click', () => switchTab('chat'));
  tabButtons.quiz.addEventListener('click', () => switchTab('quiz'));
  tabButtons.summary.addEventListener('click', () => switchTab('summary'));


  /* --- Document Switching logic --- */
  const fileItems = document.querySelectorAll('.file-item');

  const switchDocument = (docKey) => {
    activeDocumentKey = docKey;
    const docData = sandboxDb[docKey];

    // Visual file item activation
    fileItems.forEach(item => {
      if (item.getAttribute('data-file') === docKey) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 1. Reset Chat History for this doc
    initChatForDocument(docData);

    // 2. Load Summary for this doc
    renderSummaryForDocument(docData);

    // 3. Setup Quiz for this doc
    resetQuizState();
    renderQuizForDocument(docData);
  };

  fileItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const docKey = e.currentTarget.getAttribute('data-file');
      if (docKey && docKey !== activeDocumentKey) {
        switchDocument(docKey);
      }
    });
  });


  /* --- Interactive Chat System Logic --- */
  const chatHistory = document.getElementById('chat-history');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  const initChatForDocument = (docData) => {
    chatHistory.innerHTML = ''; // Clear prior chat content
    
    // Inject system welcome message
    const welcomeBubble = document.createElement('div');
    welcomeBubble.className = 'message system-msg';
    
    let chipsHtml = '';
    docData.suggestions.forEach(query => {
      chipsHtml += `<button class="query-chip">${query}</button>`;
    });

    welcomeBubble.innerHTML = `
      <div class="msg-avatar">AI</div>
      <div class="msg-content">
        <p>Hi there! I have analyzed <strong>${docData.fileName}</strong> completely. What would you like to know? Here are a few sample queries you can click on:</p>
        <div class="suggested-queries">${chipsHtml}</div>
      </div>
    `;

    chatHistory.appendChild(welcomeBubble);

    // Attach click events to the suggestions chips
    const chips = welcomeBubble.querySelectorAll('.query-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const queryText = e.target.textContent;
        handleUserMessage(queryText);
      });
    });
  };

  // Helper: Append single message bubble
  const appendChatBubble = (sender, text) => {
    const bubble = document.createElement('div');
    bubble.className = `message ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
    
    const avatarLabel = sender === 'user' ? 'U' : 'AI';
    bubble.innerHTML = `
      <div class="msg-avatar">${avatarLabel}</div>
      <div class="msg-content">
        <p>${text}</p>
      </div>
    `;
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll
    return bubble;
  };

  // Append a typing placeholder loading state
  const appendTypingIndicator = () => {
    const bubble = document.createElement('div');
    bubble.className = 'message system-msg typing-indicator-bubble';
    bubble.innerHTML = `
      <div class="msg-avatar">AI</div>
      <div class="msg-content">
        <div class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return bubble;
  };

  // Complete User query pipeline
  const handleUserMessage = (msgText) => {
    if (!msgText || msgText.trim() === '') return;

    // Append user query bubble
    appendChatBubble('user', msgText);
    chatInput.value = ''; // Clean input
    
    // Append Typing status
    const typingIndicator = appendTypingIndicator();

    // Get current doc data
    const docData = sandboxDb[activeDocumentKey];
    const normalizedQuery = msgText.toLowerCase().trim();

    // Determine mock reply based on preloaded responses
    let answerText = docData.chatResponses[normalizedQuery];
    if (!answerText) {
      // Loop check for sub-keyword matching
      const keywords = Object.keys(docData.chatResponses);
      for (const kw of keywords) {
        if (normalizedQuery.includes(kw) || kw.includes(normalizedQuery)) {
          answerText = docData.chatResponses[kw];
          break;
        }
      }
    }
    // Fallback response if no matches
    if (!answerText) {
      answerText = docData.fallbackResponse;
    }

    // Simulate thinking delay (1.2 seconds)
    setTimeout(() => {
      // Remove typing bubble
      if (typingIndicator && typingIndicator.parentNode) {
        typingIndicator.parentNode.removeChild(typingIndicator);
      }
      // Render AI answer
      appendChatBubble('ai', answerText);
    }, 1100);
  };

  // Handle Chat Input Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value;
    handleUserMessage(text);
  });


  /* --- Interactive Quiz System Implementation --- */
  const quizQuestionsWrapper = document.getElementById('quiz-questions-wrapper');
  const quizScoreDisplay = document.getElementById('quiz-score-display');
  const quizScoreVal = document.getElementById('quiz-score-val');
  const quizDocTitle = document.getElementById('quiz-doc-title');
  const btnResetQuiz = document.getElementById('btn-reset-quiz');

  const renderQuizForDocument = (docData) => {
    quizDocTitle.textContent = docData.fileName;
    quizQuestionsWrapper.innerHTML = ''; // Clear prior quiz markup

    docData.quiz.forEach((qItem, qIndex) => {
      const qCard = document.createElement('div');
      qCard.className = 'quiz-card-q';
      qCard.setAttribute('data-q-index', qIndex);

      let optionsHtml = '';
      qItem.options.forEach((optionText, optIndex) => {
        optionsHtml += `
          <button class="option-btn" data-opt-index="${optIndex}">
            ${String.fromCharCode(65 + optIndex)}. ${optionText}
          </button>
        `;
      });

      qCard.innerHTML = `
        <div class="q-text">Question ${qIndex + 1}: ${qItem.question}</div>
        <div class="quiz-options">${optionsHtml}</div>
      `;

      quizQuestionsWrapper.appendChild(qCard);

      // Attach Click events to options in this card
      const optionButtons = qCard.querySelectorAll('.option-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => handleQuizOptionClick(qIndex, parseInt(e.target.getAttribute('data-opt-index')), e.target, optionButtons));
      });
    });

    updateQuizScoreUI();
  };

  const handleQuizOptionClick = (qIndex, selectedOptIndex, clickedBtn, siblingButtons) => {
    // If already answered, ignore
    if (quizUserAnswers[qIndex] !== null) return;

    const docData = sandboxDb[activeDocumentKey];
    const correctOptIndex = docData.quiz[qIndex].correct;

    // Save answer
    quizUserAnswers[qIndex] = selectedOptIndex;

    // Apply Styles to siblings
    siblingButtons.forEach(btn => {
      const optIdx = parseInt(btn.getAttribute('data-opt-index'));
      btn.classList.add('disabled');
      
      if (optIdx === correctOptIndex) {
        btn.classList.add('correct'); // Highlights correct answer green
      } else if (optIdx === selectedOptIndex && selectedOptIndex !== correctOptIndex) {
        btn.classList.add('wrong'); // Highlights clicked wrong answer red
      }
    });

    updateQuizScoreUI();
  };

  const updateQuizScoreUI = () => {
    const docData = sandboxDb[activeDocumentKey];
    const totalQuestions = docData.quiz.length;
    let score = 0;
    let answeredCount = 0;

    quizUserAnswers.forEach((ans, idx) => {
      if (ans !== null) {
        answeredCount++;
        if (ans === docData.quiz[idx].correct) {
          score++;
        }
      }
    });

    if (answeredCount > 0) {
      quizScoreDisplay.style.display = 'block';
      quizScoreVal.textContent = score;
    } else {
      quizScoreDisplay.style.display = 'none';
    }
  };

  const resetQuizState = () => {
    quizUserAnswers = [null, null, null];
    updateQuizScoreUI();
  };

  btnResetQuiz.addEventListener('click', () => {
    resetQuizState();
    renderQuizForDocument(sandboxDb[activeDocumentKey]);
  });


  /* --- Document Summary Rendering --- */
  const summaryContentWrapper = document.getElementById('summary-content-wrapper');

  const renderSummaryForDocument = (docData) => {
    summaryContentWrapper.innerHTML = ''; // Clear prior summary content
    
    const sumPaper = document.createElement('div');
    sumPaper.className = 'summary-paper';

    let sectionsHtml = '';
    docData.summary.sections.forEach(sec => {
      let bulletsHtml = '';
      sec.bullets.forEach(b => {
        bulletsHtml += `<li>${b}</li>`;
      });

      sectionsHtml += `
        <h4>${sec.heading}</h4>
        <ul class="summary-bullets">
          ${bulletsHtml}
        </ul>
      `;
    });

    sumPaper.innerHTML = `
      <h3 class="summary-heading">${docData.summary.title}</h3>
      <span class="summary-doc">${docData.summary.meta}</span>
      <div class="summary-body">
        ${sectionsHtml}
      </div>
    `;

    summaryContentWrapper.appendChild(sumPaper);
  };

  /* ==========================================================================
     7. ANIMATED SCROLL COUNTER (STATS)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Set all initial values to 0 for counting
  statNumbers.forEach(stat => {
    stat.textContent = '0';
  });

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds animation
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
          // Format with commas if target is 10,000+
          if (target >= 1000) {
            stat.textContent = target.toLocaleString() + suffix;
          } else {
            stat.textContent = target + suffix;
          }
          return;
        }

        const progress = elapsedTime / duration;
        // Ease-out quad formula
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);

        if (currentValue >= 1000) {
          stat.textContent = currentValue.toLocaleString() + suffix;
        } else {
          stat.textContent = currentValue + suffix;
        }

        requestAnimationFrame(updateCounter);
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Run the stats counters animation using IntersectionObserver
  if ('IntersectionObserver' in window) {
    const statsSection = document.getElementById('about');
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  } else {
    // Fallback if no IntersectionObserver
    animateCounters();
  }


  /* ==========================================================================
     8. FAQ ACCORDION INTERACTIVITY
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq-item');
      const answer = parentItem.querySelector('.faq-answer');
      const answerInner = parentItem.querySelector('.faq-answer-inner');

      // Check if item is already active
      const isActive = parentItem.classList.contains('active');

      // Close all other accordion items first (optional, but premium)
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0px';
      });

      // Toggle active status and maxHeight for the clicked item
      if (!isActive) {
        parentItem.classList.add('active');
        // Set dynamic scrollHeight for smooth transition
        answer.style.maxHeight = answerInner.offsetHeight + 'px';
      } else {
        parentItem.classList.remove('active');
        answer.style.maxHeight = '0px';
      }
    });
  });

});
