// Elements icons
// @ts-ignore
import iconAI from '../../Elements/COURSES/AI and Machine Learning.png';
// @ts-ignore
import iconCloud from '../../Elements/COURSES/Cloud and AWS Development.png';
// @ts-ignore
import iconFullStack from '../../Elements/COURSES/Full Stack Development.png';
// @ts-ignore
import iconCyber from '../../Elements/COURSES/Cybersecurity and Ethical Hacking.png';
// @ts-ignore
import iconUIUX from '../../Elements/COURSES/UIUX Front End design.png';
// @ts-ignore
import iconBanner from '../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';

/**
 * Standard Course Specification & Hierarchy Types
 * COURSE -> BASIC -> MODULES -> TOPICS -> INTERMEDIATE -> MODULES -> TOPICS -> ADVANCED -> MODULES -> TOPICS
 */

export interface CourseTopicModule {
  moduleNumber: string;
  title: string;
  technicalContent?: string;
  duration?: string;
  topics: string[];
}

export interface CourseLevelSection {
  level: 'Basic' | 'Intermediate' | 'Advanced';
  purpose: string;
  expectedFocus: string;
  modules: CourseTopicModule[];
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'Development' | 'Design' | 'Data Science' | 'Data Analytics' | 'Marketing' | 'Cloud' | 'AI/ML' | 'Testing & QA' | 'Cybersecurity' | 'Enterprise Systems' | 'Business Analysis';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  format: 'Self-paced' | 'Intensive' | 'Comprehensive' | 'Flexible';
  students: string;
  rating: string;
  image: string;
  icon: any;

  levels: {
    basic: CourseLevelSection;
    intermediate: CourseLevelSection;
    advanced: CourseLevelSection;
  };

  /**
   * Flattened list of all modules for backward compatibility
   */
  modules: CourseTopicModule[];
  learningOutcomes: string[];
}

export const LEVEL_METADATA = {
  basic: {
    name: 'Basic',
    purpose: 'Foundation',
    expectedFocus: 'Fundamentals, terminology, environment/tools, practical exercises',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300'
  },
  intermediate: {
    name: 'Intermediate',
    purpose: 'Job-oriented capability',
    expectedFocus: 'Frameworks/tools, integration, practical implementation, problem solving',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-300'
  },
  advanced: {
    name: 'Advanced',
    purpose: 'Advanced / project capability',
    expectedFocus: 'Advanced implementation, automation/AI where relevant, deployment, project work',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-300'
  }
};

export const COMMON_LEARNING_OUTCOMES = [
  'Understand the core concepts and terminology of the selected domain.',
  'Use relevant tools and techniques through guided practical exercises.',
  'Apply intermediate concepts to real-world style tasks.',
  'Complete advanced practical work or a capstone project appropriate to the course.',
  'Demonstrate understanding through assessments and practical evaluation.'
];

function buildLevels(
  basicMods: CourseTopicModule[],
  interMods: CourseTopicModule[],
  advMods: CourseTopicModule[]
): {
  basic: CourseLevelSection;
  intermediate: CourseLevelSection;
  advanced: CourseLevelSection;
} {
  return {
    basic: {
      level: 'Basic',
      purpose: LEVEL_METADATA.basic.purpose,
      expectedFocus: LEVEL_METADATA.basic.expectedFocus,
      modules: basicMods
    },
    intermediate: {
      level: 'Intermediate',
      purpose: LEVEL_METADATA.intermediate.purpose,
      expectedFocus: LEVEL_METADATA.intermediate.expectedFocus,
      modules: interMods
    },
    advanced: {
      level: 'Advanced',
      purpose: LEVEL_METADATA.advanced.purpose,
      expectedFocus: LEVEL_METADATA.advanced.expectedFocus,
      modules: advMods
    }
  };
}

export const coursesCatalog: CourseItem[] = [
  // 1. Full Stack Development with AI - Java

  // 2. Full Stack Development with AI - Python
  {
    id: 'full-stack-ai-python',
    title: 'Full Stack Development with AI - Python',
    category: 'Development',
    level: 'Intermediate',
    description: 'Build modern full stack web applications with React, Python, APIs, databases, and AI-powered features',
    format: 'Comprehensive',
    students: '2,856',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Programming Fundamentals', technicalContent: 'Variables, data types, operators, conditions, loops, functions and basic problem solving.', topics: ['Variables & Data Types', 'Operators & Conditions', 'Loops & Functions', 'Problem Solving'] },
        { moduleNumber: 'Module 2', title: 'Object-Oriented Programming', technicalContent: 'Classes, objects, encapsulation, inheritance, polymorphism, abstraction and exception handling.', topics: ['Classes & Objects', 'Encapsulation & Inheritance', 'Polymorphism & Abstraction', 'Exception Handling'] },
        { moduleNumber: 'Module 3', title: 'Web Fundamentals', technicalContent: 'HTML, CSS, JavaScript basics, forms, browser concepts and HTTP basics.', topics: ['HTML & CSS', 'JavaScript Basics', 'Forms & Browser Concepts', 'HTTP Basics'] },
        { moduleNumber: 'Module 4', title: 'Database Fundamentals', technicalContent: 'Relational databases, tables, CRUD operations, joins and basic database design.', topics: ['Relational Databases', 'Tables & CRUD', 'SQL Joins', 'Database Design'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Backend Development', technicalContent: 'Java/Python backend concepts, REST APIs, requests/responses, authentication basics and API integration.', topics: ['Python Backend (FastAPI / Flask)', 'REST APIs', 'Requests & Responses', 'API Authentication'] },
        { moduleNumber: 'Module 6', title: 'Frontend Development', technicalContent: 'Modern frontend concepts, components, state/events, forms and API integration.', topics: ['React Components', 'State & Events', 'Forms Handling', 'API Integration'] },
        { moduleNumber: 'Module 7', title: 'Full Stack Integration', technicalContent: 'Frontend-backend integration, database connectivity, authentication and error handling.', topics: ['Full Stack Linking', 'Database Connectivity (SQLAlchemy)', 'JWT Authentication', 'Error Handling'] },
        { moduleNumber: 'Module 8', title: 'Development Tools', technicalContent: 'Git, GitHub, package management, debugging and API testing.', topics: ['Git & GitHub', 'Pip & Virtual Environments', 'Debugging Techniques', 'API Testing'] }
      ],
      [
        { moduleNumber: 'Module 9', title: 'AI Integration', technicalContent: 'AI concepts for developers, AI APIs, generative AI and integrating AI features into applications.', topics: ['AI Concepts for Developers', 'AI APIs Integration', 'Generative AI', 'AI Assistant Features'] },
        { moduleNumber: 'Module 10', title: 'Automation', technicalContent: 'Automated workflows, testing automation, build automation and deployment automation.', topics: ['Automated Workflows', 'Testing Automation', 'Build Automation', 'CI/CD Pipelines'] },
        { moduleNumber: 'Module 11', title: 'Production Application', technicalContent: 'Application security, performance, logging, deployment and monitoring concepts.', topics: ['Application Security', 'Performance & Caching', 'Logging & Auditing', 'Cloud Deployment'] },
        { moduleNumber: 'Module 12', title: 'Capstone Project', technicalContent: 'End-to-end AI-enabled full-stack application.', topics: ['Project Architecture', 'AI Feature Integration', 'Full Stack Production Deployment'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build responsive full stack web applications using React and Python',
      'Develop REST APIs using FastAPI or Flask',
      'Design and manage relational databases using PostgreSQL',
      'Implement authentication and secure API workflows',
      'Integrate AI and LLM capabilities into web applications',
      'Develop and deploy a complete AI-powered full stack capstone project'
    ]
  },

  {
    id: 'full-stack-ai-java',
    title: 'Full Stack Development with AI - Java',
    category: 'Development',
    level: 'Intermediate',
    description: 'Build enterprise-ready full stack applications with React, Java, Spring Boot, databases, and AI-powered features',
    format: 'Comprehensive',
    students: '2,634',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Programming Fundamentals', technicalContent: 'Variables, data types, operators, conditions, loops, functions and basic problem solving.', topics: ['Variables & Data Types', 'Operators & Conditions', 'Loops & Functions', 'Problem Solving'] },
        { moduleNumber: 'Module 2', title: 'Object-Oriented Programming', technicalContent: 'Classes, objects, encapsulation, inheritance, polymorphism, abstraction and exception handling.', topics: ['Classes & Objects', 'Encapsulation & Inheritance', 'Polymorphism & Abstraction', 'Exception Handling'] },
        { moduleNumber: 'Module 3', title: 'Web Fundamentals', technicalContent: 'HTML, CSS, JavaScript basics, forms, browser concepts and HTTP basics.', topics: ['HTML & CSS', 'JavaScript Basics', 'Forms & Browser Concepts', 'HTTP Basics'] },
        { moduleNumber: 'Module 4', title: 'Database Fundamentals', technicalContent: 'Relational databases, tables, CRUD operations, joins and basic database design.', topics: ['Relational Databases', 'Tables & CRUD', 'SQL Joins', 'Database Design'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Backend Development', technicalContent: 'Java/Python backend concepts, REST APIs, requests/responses, authentication basics and API integration.', topics: ['Spring Boot Backend', 'REST APIs', 'Requests & Responses', 'API Authentication'] },
        { moduleNumber: 'Module 6', title: 'Frontend Development', technicalContent: 'Modern frontend concepts, components, state/events, forms and API integration.', topics: ['React Components', 'State & Events', 'Forms Handling', 'API Integration'] },
        { moduleNumber: 'Module 7', title: 'Full Stack Integration', technicalContent: 'Frontend-backend integration, database connectivity, authentication and error handling.', topics: ['Full Stack Linking', 'Database Connectivity', 'Spring Security / Auth', 'Error Handling'] },
        { moduleNumber: 'Module 8', title: 'Development Tools', technicalContent: 'Git, GitHub, package management, debugging and API testing.', topics: ['Git & GitHub', 'Maven / Gradle', 'Debugging Techniques', 'API Testing (Postman)'] }
      ],
      [
        { moduleNumber: 'Module 9', title: 'AI Integration', technicalContent: 'AI concepts for developers, AI APIs, generative AI and integrating AI features into applications.', topics: ['AI Concepts for Developers', 'AI APIs Integration', 'Generative AI', 'AI Assistant Features'] },
        { moduleNumber: 'Module 10', title: 'Automation', technicalContent: 'Automated workflows, testing automation, build automation and deployment automation.', topics: ['Automated Workflows', 'Testing Automation', 'Build Automation', 'CI/CD Pipelines'] },
        { moduleNumber: 'Module 11', title: 'Production Application', technicalContent: 'Application security, performance, logging, deployment and monitoring concepts.', topics: ['Application Security', 'Performance & Caching', 'Logging & Auditing', 'Cloud Deployment'] },
        { moduleNumber: 'Module 12', title: 'Capstone Project', technicalContent: 'End-to-end AI-enabled full-stack application.', topics: ['Enterprise Architecture', 'AI Feature Integration', 'Full Stack Production Deployment'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build responsive full stack web applications using React and Java',
      'Develop production-ready REST APIs using Spring Boot',
      'Design and manage relational databases using PostgreSQL / MySQL',
      'Implement authentication and authorization using Spring Security',
      'Integrate AI and LLM capabilities into enterprise applications',
      'Containerize and deploy full stack applications using cloud platforms'
    ]
  },

  // 17. Artificial Intelligence Fundamentals (corresponds to Technical Course 2: AI/ML WITH AUTOMATION PROCESS)
  {
    id: 'ai-fundamentals',
    title: 'AI/ML with Automation Process',
    category: 'AI/ML',
    level: 'Beginner',
    description: 'Learn AI and Machine Learning concepts, algorithms, and automated workflows with hands-on projects',
    format: 'Self-paced',
    students: '3,421',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1745674684539-d90293d659a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    icon: iconAI,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'AI Fundamentals', technicalContent: 'AI concepts, AI vs ML, types of AI and applications.', topics: ['AI Concepts', 'AI vs ML', 'Types of AI', 'Real-world Applications'] },
        { moduleNumber: 'Module 2', title: 'Machine Learning Fundamentals', technicalContent: 'Supervised and unsupervised learning, features, labels, training and testing data.', topics: ['Supervised Learning', 'Unsupervised Learning', 'Features & Labels', 'Training & Testing Data'] },
        { moduleNumber: 'Module 3', title: 'Data and Python Basics', technicalContent: 'Programming basics, data handling, preprocessing and basic visualization.', topics: ['Python for Data', 'Data Handling', 'Preprocessing', 'Data Visualization'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Machine Learning Algorithms', technicalContent: 'Regression, classification, decision trees, random forest, KNN and clustering.', topics: ['Regression', 'Classification', 'Decision Trees & Random Forest', 'KNN & Clustering'] },
        { moduleNumber: 'Module 5', title: 'Model Development', technicalContent: 'Data preparation, feature engineering, training, evaluation and performance metrics.', topics: ['Data Preparation', 'Feature Engineering', 'Model Training', 'Evaluation Metrics'] },
        { moduleNumber: 'Module 6', title: 'AI Automation', technicalContent: 'Automated data processing, prediction workflows and API-based AI integration.', topics: ['Automated Data Processing', 'Prediction Pipelines', 'API AI Integration'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Advanced Machine Learning', technicalContent: 'Ensemble methods, hyperparameter tuning and model optimization.', topics: ['Ensemble Methods', 'Hyperparameter Tuning', 'Model Optimization'] },
        { moduleNumber: 'Module 8', title: 'AI Deployment', technicalContent: 'Model serving, APIs, application integration and monitoring concepts.', topics: ['Model Serving', 'API Architecture', 'App Integration', 'Model Monitoring'] },
        { moduleNumber: 'Module 9', title: 'Intelligent Automation', technicalContent: 'AI-powered workflows, automation pipelines and AI-agent concepts.', topics: ['AI Workflows', 'Automation Pipelines', 'AI-Agent Concepts'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Automated AI/ML application.', topics: ['Automated AI/ML Application', 'Deployment & Evaluation'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Understand core AI concepts, algorithms, and applications',
      'Implement supervised and unsupervised machine learning models',
      'Develop automated prediction workflows and API integrations',
      'Deploy AI/ML models to production serving environments',
      'Build end-to-end intelligent automation applications'
    ]
  },

  {
    id: 'data-science-analytics',
    title: 'Data Science & Machine Learning',
    category: 'Data Science',
    level: 'Advanced',
    description: 'Analyze complex data and build predictive models using statistical foundations, Python, and machine learning',
    format: 'Comprehensive',
    students: '1,456',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconAI,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Data Science Fundamentals', technicalContent: 'Data science lifecycle, data types, collection and cleaning.', topics: ['Data Science Lifecycle', 'Data Types', 'Data Collection', 'Data Cleaning'] },
        { moduleNumber: 'Module 2', title: 'Statistics Fundamentals', technicalContent: 'Mean, median, mode, variance, standard deviation and probability basics.', topics: ['Descriptive Statistics', 'Variance & Standard Deviation', 'Probability Basics', 'Distributions'] },
        { moduleNumber: 'Module 3', title: 'Data Analysis Basics', technicalContent: 'Data manipulation, filtering, aggregation and basic visualization.', topics: ['Data Manipulation', 'Filtering & Slicing', 'Aggregation', 'Visualization'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Exploratory Data Analysis', technicalContent: 'Data exploration, missing values, outliers, correlation and visualization.', topics: ['Data Exploration', 'Handling Missing Values', 'Outliers Detection', 'Correlation Analysis'] },
        { moduleNumber: 'Module 5', title: 'Machine Learning', technicalContent: 'Regression, classification, clustering and model evaluation.', topics: ['Regression Models', 'Classification', 'Clustering Techniques', 'Model Evaluation'] },
        { moduleNumber: 'Module 6', title: 'Feature Engineering', technicalContent: 'Feature selection, transformation and preprocessing.', topics: ['Feature Selection', 'Data Transformation', 'Encoding & Scaling'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Advanced ML', technicalContent: 'Ensemble learning, hyperparameter tuning and model optimization.', topics: ['Ensemble Learning', 'Hyperparameter Tuning', 'Model Optimization'] },
        { moduleNumber: 'Module 8', title: 'Advanced Data Science', technicalContent: 'Time-series basics, recommendation systems and NLP fundamentals.', topics: ['Time-Series Basics', 'Recommendation Systems', 'NLP Fundamentals'] },
        { moduleNumber: 'Module 9', title: 'ML Deployment', technicalContent: 'Model APIs, deployment concepts and monitoring.', topics: ['Model APIs', 'Deployment Architecture', 'Performance Monitoring'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'End-to-end data science and machine learning project.', topics: ['End-to-end Data Science Project', 'Model Presentation'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Perform comprehensive data analysis and exploratory visualization',
      'Build and train supervised and unsupervised machine learning models',
      'Engineer robust features and optimize model performance',
      'Apply advanced methods including NLP and recommendation systems',
      'Deploy models via APIs and monitor performance'
    ]
  },

{
    id: 'data-analyst-professional',
    title: 'Data Analyst with AI & Automation',
    category: 'Data Analytics',
    level: 'Beginner',
    description: 'Master business analytics, reporting, and data visualization with Excel, SQL, Power BI, and AI automation',
    format: 'Flexible',
    students: '2,876',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconBanner,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Data Analytics Fundamentals', technicalContent: 'Data analyst role, data types, collection and cleaning.', topics: ['Data Analyst Role', 'Data Types', 'Data Collection', 'Data Cleaning'] },
        { moduleNumber: 'Module 2', title: 'Excel', technicalContent: 'Formulas, functions, sorting/filtering, pivot tables and charts.', topics: ['Advanced Formulas', 'Sorting & Filtering', 'Pivot Tables', 'Interactive Charts'] },
        { moduleNumber: 'Module 3', title: 'SQL', technicalContent: 'SELECT, WHERE, GROUP BY, ORDER BY, joins and subqueries.', topics: ['SELECT & WHERE', 'GROUP BY & ORDER BY', 'SQL Joins', 'Subqueries'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Power BI', technicalContent: 'Data import, transformation, data modeling, visualizations and dashboards.', topics: ['Data Import & Clean', 'Data Modeling', 'Visualizations', 'Interactive Dashboards'] },
        { moduleNumber: 'Module 5', title: 'Advanced SQL', technicalContent: 'Advanced joins, CTEs, window functions and complex queries.', topics: ['Advanced Joins', 'CTEs', 'Window Functions', 'Complex Queries'] },
        { moduleNumber: 'Module 6', title: 'Business Analytics', technicalContent: 'KPIs, metrics, reports and data-driven decision making.', topics: ['KPI Development', 'Business Metrics', 'Executive Reports', 'Data-driven Decisions'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'AI for Data Analytics', technicalContent: 'AI-assisted analysis, natural-language queries, AI-generated insights and predictive analytics basics.', topics: ['AI-Assisted Analysis', 'Natural-Language Queries', 'AI-Generated Insights', 'Predictive Analytics'] },
        { moduleNumber: 'Module 8', title: 'Analytics Automation', technicalContent: 'Automated reporting, data refresh, dashboard automation and workflow automation.', topics: ['Automated Reporting', 'Data Refresh Automation', 'Dashboard Workflows'] },
        { moduleNumber: 'Module 9', title: 'Advanced Dashboarding', technicalContent: 'Interactive dashboards, advanced KPIs and automated reporting concepts.', topics: ['Interactive Dashboard Design', 'Advanced KPIs', 'Automated Reporting'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Business analytics project.', topics: ['Comprehensive Business Analytics Project'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Analyze business data using Excel and advanced SQL',
      'Create interactive dashboards and reports in Power BI',
      'Implement AI-assisted natural-language analytics',
      'Automate reporting workflows and refresh cycles',
      'Present executive-level data insights for decision making'
    ]
  },

  {
    id: 'software-testing-automation',
    title: 'Software Testing with Automation (Selenium)',
    category: 'Testing & QA',
    level: 'Intermediate',
    description: 'Build progressive testing capability from manual and agile fundamentals to core Java and full Selenium automation frameworks',
    format: 'Comprehensive',
    students: '1,845',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Software Testing Fundamentals', technicalContent: 'SDLC, STLC, testing principles, verification and validation.', topics: ['SDLC & STLC', 'Testing Principles', 'Verification vs Validation'] },
        { moduleNumber: 'Module 2', title: 'Manual Testing', technicalContent: 'Test scenarios, test cases, test data, defect reporting, severity, priority, smoke, sanity and regression testing.', topics: ['Test Scenarios & Cases', 'Test Data Preparation', 'Defect Reporting', 'Severity & Priority', 'Regression Testing'] },
        { moduleNumber: 'Module 3', title: 'Agile Testing', technicalContent: 'Agile, Scrum, sprint, user story, acceptance criteria and QA role.', topics: ['Agile & Scrum', 'Sprints & User Stories', 'Acceptance Criteria', 'QA Role in Agile'] },
        { moduleNumber: 'Module 4', title: 'API and Database Testing Basics', technicalContent: 'API concepts, HTTP methods, status codes and basic SQL validation.', topics: ['API Concepts', 'HTTP Methods & Status Codes', 'SQL Validation Basics'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Core Java for Automation', technicalContent: 'OOP, collections, exception handling, strings and methods.', topics: ['OOP Principles', 'Collections Framework', 'Exception Handling', 'Strings & Methods'] },
        { moduleNumber: 'Module 6', title: 'Selenium WebDriver', technicalContent: 'Selenium architecture, WebDriver, browser automation, locators, XPath and CSS selectors.', topics: ['Selenium Architecture', 'Browser Automation', 'Locators', 'XPath & CSS Selectors'] },
        { moduleNumber: 'Module 7', title: 'Selenium Automation', technicalContent: 'Forms, dropdowns, alerts, frames, windows, mouse/keyboard actions and waits.', topics: ['Forms & Dropdowns', 'Alerts & Frames', 'Window Handling', 'Waits & Synchronization'] },
        { moduleNumber: 'Module 8', title: 'Test Framework', technicalContent: 'TestNG, annotations, assertions, execution and reporting.', topics: ['TestNG Framework', 'Annotations', 'Assertions', 'Test Execution & Reports'] }
      ],
      [
        { moduleNumber: 'Module 9', title: 'Automation Framework', technicalContent: 'Page Object Model, data-driven testing, parameterization, reusable utilities and framework structure.', topics: ['Page Object Model (POM)', 'Data-Driven Testing', 'Reusable Utilities', 'Framework Structure'] },
        { moduleNumber: 'Module 10', title: 'Advanced Automation', technicalContent: 'Parallel execution, cross-browser testing, screenshots, logging and reporting.', topics: ['Parallel Execution', 'Cross-Browser Testing', 'Screenshot Capture', 'Logging & Reporting'] },
        { moduleNumber: 'Module 11', title: 'CI/CD', technicalContent: 'Git/GitHub, Jenkins basics and automated test execution.', topics: ['Git & GitHub', 'Jenkins CI Basics', 'Automated Execution'] },
        { moduleNumber: 'Module 12', title: 'Capstone Project', technicalContent: 'End-to-end Selenium automation framework.', topics: ['End-to-End Automation Framework Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Understand manual, agile, and automated software testing methodologies',
      'Write robust automation test scripts using Core Java and Selenium WebDriver',
      'Design modular Page Object Model (POM) and data-driven testing frameworks',
      'Integrate automated tests into continuous integration (CI/CD) pipelines',
      'Execute cross-browser and parallel testing with comprehensive test reporting'
    ]
  },

  {
    id: 'ui-ux-design-mastery',
    title: 'UI/UX Design Mastery',
    category: 'Design',
    level: 'Beginner',
    description: 'Create stunning user interfaces and exceptional user experiences with modern design tools and systems',
    format: 'Flexible',
    students: '1,923',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconUIUX,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'UI/UX Fundamentals', technicalContent: 'UI vs UX, design principles and user-centered design.', topics: ['UI vs UX', 'Design Principles', 'User-Centered Design'] },
        { moduleNumber: 'Module 2', title: 'Design Basics', technicalContent: 'Typography, colors, spacing, layout and visual hierarchy.', topics: ['Typography', 'Color Theory', 'Spacing & Layout', 'Visual Hierarchy'] },
        { moduleNumber: 'Module 3', title: 'Design Tools', technicalContent: 'Figma basics, frames, components and assets.', topics: ['Figma Interface', 'Frames & Constraints', 'Components & Assets'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'UX Research', technicalContent: 'User research, personas, user journeys and user flows.', topics: ['User Research Methods', 'User Personas', 'User Journey Mapping', 'User Flows'] },
        { moduleNumber: 'Module 5', title: 'Wireframing and Prototyping', technicalContent: 'Low-fidelity wireframes, high-fidelity designs and interactive prototypes.', topics: ['Low-Fidelity Wireframes', 'High-Fidelity Mockups', 'Interactive Prototyping'] },
        { moduleNumber: 'Module 6', title: 'Design Systems', technicalContent: 'Components, consistency, responsive design and UI patterns.', topics: ['Design Systems', 'Component Libraries', 'Responsive Design', 'UI Patterns'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Advanced UX', technicalContent: 'Usability testing, accessibility and UX evaluation.', topics: ['Usability Testing', 'Accessibility Standards', 'UX Evaluation'] },
        { moduleNumber: 'Module 8', title: 'Product Design', technicalContent: 'Design thinking, problem solving and product workflows.', topics: ['Design Thinking', 'Problem Solving', 'Product Workflows'] },
        { moduleNumber: 'Module 9', title: 'AI in UI/UX', technicalContent: 'AI-assisted design, idea generation and design automation concepts.', topics: ['AI-Assisted Design', 'Idea Generation', 'Design Automation'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Complete website or mobile product design.', topics: ['Complete Product Design Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Conduct comprehensive user research',
      'Create wireframes and interactive prototypes',
      'Design accessible and inclusive interfaces',
      'Build professional design systems and portfolios',
      'Present design solutions effectively'
    ]
  },

    {
    id: 'full-stack-mobile-development',
    title: 'Full Stack Mobile Development',
    category: 'Development',
    level: 'Intermediate',
    description: 'Build progressive mobile development knowledge from foundational UI and programming concepts to backend APIs and production mobile apps',
    format: 'Comprehensive',
    students: '1,720',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Mobile Development Fundamentals', technicalContent: 'Mobile application concepts, platform concepts, UI components and navigation.', topics: ['Mobile App Architecture', 'Platform Concepts', 'UI Components', 'Mobile Navigation'] },
        { moduleNumber: 'Module 2', title: 'Programming Fundamentals', technicalContent: 'Variables, functions, OOP, collections and error handling.', topics: ['Language Syntax', 'Functions & OOP', 'Collections', 'Error Handling'] },
        { moduleNumber: 'Module 3', title: 'Mobile UI Development', technicalContent: 'Screens, forms, lists, navigation and responsive layouts.', topics: ['Screen Building', 'Forms & Inputs', 'Lists & Grid Layouts', 'Responsive UI'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Backend Fundamentals', technicalContent: 'REST APIs, authentication, database and CRUD operations.', topics: ['REST APIs', 'Mobile Authentication', 'Database Concepts', 'CRUD Operations'] },
        { moduleNumber: 'Module 5', title: 'Mobile and API Integration', technicalContent: 'API requests, JSON, authentication and data handling.', topics: ['API Requests', 'JSON Serialization', 'Token Auth', 'Data Management'] },
        { moduleNumber: 'Module 6', title: 'Local Storage', technicalContent: 'Local database, preferences and offline data concepts.', topics: ['Local Storage', 'Offline Data Caching', 'Preferences & State'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Advanced Mobile Development', technicalContent: 'Notifications, device features and performance optimization.', topics: ['Push Notifications', 'Device APIs', 'Performance Optimization'] },
        { moduleNumber: 'Module 8', title: 'Mobile Security', technicalContent: 'Authentication, secure storage and API security.', topics: ['Secure Storage', 'Token Management', 'Mobile API Security'] },
        { moduleNumber: 'Module 9', title: 'Deployment', technicalContent: 'Build generation, release process and version management.', topics: ['Build Generation', 'Release Pipelines', 'Version Management'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Complete full-stack mobile application.', topics: ['Complete Full-Stack Mobile Application'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Understand core mobile architecture, UI components, and stateful navigation',
      'Integrate mobile applications with backend REST APIs and secure databases',
      'Implement local caching, offline sync, and device feature integrations',
      'Apply mobile security best practices and token-based authentication',
      'Build, bundle, and release a complete full-stack mobile application'
    ]
  },

  {
    id: 'devops-engineering',
    title: 'DevOps with AWS, AI & Automation Deployment',
    category: 'Cloud',
    level: 'Advanced',
    description: 'Master modern DevOps practices, AWS cloud services, CI/CD automation pipelines, and infrastructure management',
    format: 'Comprehensive',
    students: '1,876',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconCloud,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'DevOps Fundamentals', technicalContent: 'DevOps concepts, SDLC, CI/CD and DevOps lifecycle.', topics: ['DevOps Concepts', 'SDLC Models', 'CI/CD Principles', 'DevOps Lifecycle'] },
        { moduleNumber: 'Module 2', title: 'Linux Fundamentals', technicalContent: 'Linux commands, files/directories, permissions and processes.', topics: ['Linux Commands', 'Files & Directories', 'Permissions', 'Process Management'] },
        { moduleNumber: 'Module 3', title: 'Git and Version Control', technicalContent: 'Git basics, branches, merge and GitHub.', topics: ['Git Fundamentals', 'Branching & Merging', 'GitHub Collaboration'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'CI/CD', technicalContent: 'Continuous integration, continuous delivery, pipelines, build and deployment.', topics: ['Continuous Integration', 'Delivery Pipelines', 'Build & Test Automation', 'Deployment Stages'] },
        { moduleNumber: 'Module 5', title: 'AWS Fundamentals', technicalContent: 'AWS concepts, EC2, S3, IAM and VPC basics.', topics: ['AWS Core Infrastructure', 'EC2 Compute', 'S3 Storage', 'IAM & VPC Basics'] },
        { moduleNumber: 'Module 6', title: 'Containers', technicalContent: 'Docker concepts, images, containers and Docker Compose.', topics: ['Docker Concepts', 'Container Images', 'Container Management', 'Docker Compose'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'AWS Deployment', technicalContent: 'Application deployment, cloud infrastructure, monitoring and scaling concepts.', topics: ['Cloud App Deployment', 'Infrastructure Scaling', 'Monitoring & Metrics'] },
        { moduleNumber: 'Module 8', title: 'Infrastructure Automation', technicalContent: 'Infrastructure as Code concepts and automated provisioning.', topics: ['Infrastructure as Code', 'Automated Cloud Provisioning'] },
        { moduleNumber: 'Module 9', title: 'AI and Intelligent Automation', technicalContent: 'AI-assisted DevOps, automated monitoring and intelligent workflows.', topics: ['AI-Assisted DevOps', 'Automated Monitoring', 'Intelligent Workflows'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Cloud CI/CD deployment project.', topics: ['End-to-End Cloud CI/CD Deployment Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Implement robust CI/CD pipelines',
      'Manage containerized applications with Docker',
      'Automate infrastructure provisioning and cloud deployment on AWS',
      'Apply AI-assisted monitoring and intelligent automation workflows',
      'Deploy enterprise cloud projects to production'
    ]
  },

  {
    id: 'cyber-security-ethical-hacking',
    title: 'Cyber Security & Ethical Hacking',
    category: 'Cybersecurity',
    level: 'Intermediate',
    description: 'Learn cybersecurity principles, network defenses, vulnerability assessments, and authorized penetration testing methodologies',
    format: 'Comprehensive',
    students: '2,150',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconCyber,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Cybersecurity Fundamentals', technicalContent: 'Cybersecurity concepts, threats, vulnerabilities and security principles.', topics: ['Security Concepts', 'Threat Landscape', 'Vulnerability Fundamentals', 'Core Principles'] },
        { moduleNumber: 'Module 2', title: 'Networking Fundamentals', technicalContent: 'IP, TCP/IP, DNS, HTTP/HTTPS and ports.', topics: ['IP & TCP/IP', 'DNS & Domain Resolution', 'HTTP/HTTPS Protocols', 'Network Ports'] },
        { moduleNumber: 'Module 3', title: 'Security Fundamentals', technicalContent: 'Authentication, authorization, encryption and password security.', topics: ['Authentication Methods', 'Access Authorization', 'Encryption Basics', 'Password Security'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Ethical Hacking Fundamentals', technicalContent: 'Reconnaissance, vulnerability assessment and security testing methodology.', topics: ['Reconnaissance Techniques', 'Vulnerability Assessment', 'Testing Methodologies'] },
        { moduleNumber: 'Module 5', title: 'Web Security', technicalContent: 'Common web vulnerabilities, authentication issues, input validation and session security.', topics: ['Web Vulnerabilities', 'Authentication Pitfalls', 'Input Validation', 'Session Security'] },
        { moduleNumber: 'Module 6', title: 'Network Security', technicalContent: 'Network attacks, firewalls and security monitoring.', topics: ['Network Defense', 'Firewalls & Filters', 'Traffic Monitoring'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Penetration Testing', technicalContent: 'Authorized penetration testing methodology, vulnerability analysis and controlled security testing.', topics: ['Authorized Penetration Testing', 'Vulnerability Analysis', 'Controlled Security Testing'] },
        { moduleNumber: 'Module 8', title: 'Security Tools', technicalContent: 'Security testing tools, scanning, monitoring and reporting.', topics: ['Security Testing Tools', 'Scanning Tools', 'Security Reporting'] },
        { moduleNumber: 'Module 9', title: 'Incident Response', technicalContent: 'Incident detection, response process, evidence handling and security reporting.', topics: ['Incident Detection', 'Response Process', 'Evidence Handling', 'Post-Incident Reports'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Authorized security assessment project.', topics: ['Authorized Security Assessment Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Understand core cybersecurity terminology, networking fundamentals, and threat vectors',
      'Conduct authorized vulnerability assessments and web security testing',
      'Configure firewalls, network monitoring, and system defenses',
      'Follow ethical penetration testing frameworks and controlled testing practices',
      'Execute incident detection, evidence handling, and security reporting'
    ]
  },

  {
    id: 'servicenow-salesforce-crm',
    title: 'ServiceNow, Salesforce & CRM',
    category: 'Enterprise Systems',
    level: 'Intermediate',
    description: 'Master leading enterprise CRM platforms, workflow automation, cloud administration, and system integrations',
    format: 'Comprehensive',
    students: '1,630',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconCloud,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'CRM Fundamentals', technicalContent: 'CRM concepts, customer lifecycle, sales process and customer data.', topics: ['CRM Concepts', 'Customer Lifecycle', 'Sales Process', 'Customer Data Management'] },
        { moduleNumber: 'Module 2', title: 'ServiceNow Fundamentals', technicalContent: 'Platform concepts, applications, tables, records, users and roles.', topics: ['ServiceNow Platform', 'Applications & Tables', 'Records Management', 'Users & Roles'] },
        { moduleNumber: 'Module 3', title: 'Salesforce Fundamentals', technicalContent: 'Platform concepts, objects, records, fields and relationships.', topics: ['Salesforce Architecture', 'Standard & Custom Objects', 'Fields & Relationships'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'ServiceNow Administration', technicalContent: 'Users, roles, workflows, forms and reports.', topics: ['User & Role Admin', 'Workflows Customization', 'Form Design', 'Reporting'] },
        { moduleNumber: 'Module 5', title: 'Salesforce Administration', technicalContent: 'Objects, data management, reports, dashboards and automation.', topics: ['Data Management', 'Reports & Dashboards', 'Process Automation'] },
        { moduleNumber: 'Module 6', title: 'CRM Processes', technicalContent: 'Lead management, opportunity management, customer support and service management.', topics: ['Lead Management', 'Opportunity Workflows', 'Customer Support', 'Service Management'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Workflow Automation', technicalContent: 'Business workflows, process automation and notifications.', topics: ['Business Workflows', 'Process Automation', 'Automated Notifications'] },
        { moduleNumber: 'Module 8', title: 'Integration', technicalContent: 'APIs, external systems and data integration concepts.', topics: ['REST APIs', 'System Integration', 'Data Synchronization'] },
        { moduleNumber: 'Module 9', title: 'Advanced CRM', technicalContent: 'Reporting, analytics, automation and customization.', topics: ['Advanced Analytics', 'Automation Pipelines', 'Customizations'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'CRM implementation project.', topics: ['End-to-End CRM Implementation Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Master CRM processes, customer lifecycles, and enterprise data models',
      'Administer ServiceNow tables, user roles, forms, and business workflows',
      'Manage Salesforce objects, custom fields, reports, and dashboards',
      'Automate business processes using workflows and notification triggers',
      'Implement enterprise CRM integrations and API connectivity'
    ]
  },

  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business Analysis',
    level: 'Beginner',
    description: 'Learn requirements engineering, process mapping, business modeling, agile frameworks, and BA documentation tools',
    format: 'Comprehensive',
    students: '1,940',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconBanner,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Business Analysis Fundamentals', technicalContent: 'Business Analyst role, SDLC, Agile and stakeholders.', topics: ['BA Role & Responsibilities', 'SDLC in Business Analysis', 'Agile Principles', 'Stakeholder Mapping'] },
        { moduleNumber: 'Module 2', title: 'Requirement Engineering', technicalContent: 'Business requirements, functional/non-functional requirements and requirement gathering.', topics: ['Business Requirements', 'Functional & Non-Functional', 'Elicitation Techniques'] },
        { moduleNumber: 'Module 3', title: 'Documentation', technicalContent: 'BRD, FRD, user stories and acceptance criteria.', topics: ['BRD Preparation', 'FRD Authoring', 'User Stories', 'Acceptance Criteria'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Requirement Analysis', technicalContent: 'Requirement elicitation, validation, prioritization and gap analysis.', topics: ['Elicitation Workflows', 'Requirement Validation', 'Prioritization Techniques', 'Gap Analysis'] },
        { moduleNumber: 'Module 5', title: 'Process Analysis', technicalContent: 'Business processes, AS-IS, TO-BE and process mapping.', topics: ['Business Processes', 'AS-IS Analysis', 'TO-BE Design', 'Process Mapping'] },
        { moduleNumber: 'Module 6', title: 'Agile Business Analysis', technicalContent: 'Scrum, product backlog, user stories, sprint planning and acceptance criteria.', topics: ['Scrum Ceremonies', 'Product Backlog Management', 'Sprint Planning'] }
      ],
      [
        { moduleNumber: 'Module 7', title: 'Business Modelling', technicalContent: 'Use cases, process models, data flow and UML basics.', topics: ['Use Cases', 'Process Modeling', 'Data Flow Diagrams', 'UML Basics'] },
        { moduleNumber: 'Module 8', title: 'BA Tools', technicalContent: 'Jira, Confluence, documentation tools and reporting.', topics: ['Jira Management', 'Confluence Documentation', 'Stakeholder Reporting'] },
        { moduleNumber: 'Module 9', title: 'Advanced Business Analysis', technicalContent: 'Stakeholder management, risk analysis, solution evaluation and change management.', topics: ['Stakeholder Management', 'Risk Analysis', 'Solution Evaluation', 'Change Management'] },
        { moduleNumber: 'Module 10', title: 'Capstone Project', technicalContent: 'Complete business requirement and project documentation.', topics: ['Complete BRD / Project Documentation Capstone'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Master requirement elicitation, engineering, and documentation (BRD / FRD)',
      'Map AS-IS and TO-BE business processes and create data flow diagrams',
      'Operate within Agile / Scrum frameworks with backlog grooming and user stories',
      'Utilize industry BA tools including Jira, Confluence, and modeling platforms',
      'Execute stakeholder management, risk analysis, and solution evaluation'
    ]
  },
  
  // 3. Python Programming
  {
    id: 'python-programming',
    title: 'Python Programming',
    category: 'Development',
    level: 'Beginner',
    description: 'Learn Python from basics to intermediate level with hands-on projects',
    format: 'Self-paced',
    students: '4,521',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Python Fundamentals', duration: '10 hours', topics: ['Variables & Data Types', 'Control Structures', 'Functions', 'Error Handling'] },
        { moduleNumber: 'Module 2', title: 'Data Structures', duration: '12 hours', topics: ['Lists & Tuples', 'Dictionaries & Sets', 'String Manipulation', 'File Operations'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Object-Oriented Programming', duration: '15 hours', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation'] },
        { moduleNumber: 'Module 4', title: 'Libraries & Modules', duration: '10 hours', topics: ['Standard Library', 'Third-party Packages', 'Package Management', 'Virtual Environments'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Projects & Applications', duration: '18 hours', topics: ['Web Scraping', 'API Integration', 'GUI Development', 'Final Project'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Write clean and efficient Python code',
      'Understand object-oriented programming concepts',
      'Work with external libraries and APIs',
      'Build complete Python applications',
      'Debug and test Python programs effectively'
    ]
  },

  // 4. Advanced Python
  {
    id: 'advanced-python',
    title: 'Advanced Python',
    category: 'Development',
    level: 'Advanced',
    description: 'Master advanced Python concepts, design patterns, and performance optimization',
    format: 'Intensive',
    students: '2,134',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Advanced Data Structures', duration: '15 hours', topics: ['Generators & Iterators', 'Decorators', 'Context Managers', 'Metaclasses'] }
      ],
      [
        { moduleNumber: 'Module 2', title: 'Concurrency & Parallelism', duration: '18 hours', topics: ['Threading', 'Multiprocessing', 'Asyncio', 'Concurrent Futures'] },
        { moduleNumber: 'Module 3', title: 'Design Patterns', duration: '20 hours', topics: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Python-specific Patterns'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Performance Optimization', duration: '15 hours', topics: ['Profiling & Benchmarking', 'Memory Management', 'Cython Integration', 'Code Optimization'] },
        { moduleNumber: 'Module 5', title: 'Advanced Applications', duration: '22 hours', topics: ['Network Programming', 'Database Integration', 'Testing Frameworks', 'Deployment Strategies'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Implement advanced Python design patterns',
      'Optimize Python applications for performance',
      'Handle concurrent and parallel programming',
      'Build scalable and maintainable Python systems',
      'Apply advanced testing and debugging techniques'
    ]
  },

  // 5. Java Programming
  {
    id: 'java-programming',
    title: 'Java Programming',
    category: 'Development',
    level: 'Beginner',
    description: 'Learn Java programming from fundamentals to building robust applications',
    format: 'Self-paced',
    students: '3,876',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Java Fundamentals', duration: '12 hours', topics: ['Syntax & Variables', 'Data Types', 'Operators', 'Control Flow'] },
        { moduleNumber: 'Module 2', title: 'Object-Oriented Programming', duration: '16 hours', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Abstraction'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Core Java APIs', duration: '14 hours', topics: ['Collections Framework', 'Exception Handling', 'I/O Operations', 'String Processing'] },
        { moduleNumber: 'Module 4', title: 'Advanced Concepts', duration: '18 hours', topics: ['Generics', 'Lambda Expressions', 'Stream API', 'Multithreading'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Application Development', duration: '20 hours', topics: ['GUI with Swing', 'Database Connectivity', 'Unit Testing', 'Build Tools'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Master Java syntax and object-oriented principles',
      'Build desktop applications with GUI',
      'Work with databases using JDBC',
      'Implement multithreaded applications',
      'Apply best practices in Java development'
    ]
  },

  // 6. Advanced Java
  {
    id: 'advanced-java',
    title: 'Advanced Java',
    category: 'Development',
    level: 'Advanced',
    description: 'Master enterprise Java development with Spring, microservices, and advanced patterns',
    format: 'Comprehensive',
    students: '1,987',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Enterprise Java', duration: '20 hours', topics: ['Spring Framework', 'Dependency Injection', 'Spring Boot', 'RESTful Services'] },
        { moduleNumber: 'Module 2', title: 'Data Persistence', duration: '18 hours', topics: ['JPA & Hibernate', 'Spring Data', 'Database Transactions', 'Query Optimization'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Microservices Architecture', duration: '22 hours', topics: ['Service Design', 'API Gateway', 'Service Discovery', 'Circuit Breakers'] },
        { moduleNumber: 'Module 4', title: 'Security & Testing', duration: '16 hours', topics: ['Spring Security', 'OAuth2 & JWT', 'Integration Testing', 'Performance Testing'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'DevOps & Deployment', duration: '24 hours', topics: ['Containerization', 'CI/CD Pipelines', 'Monitoring', 'Cloud Deployment'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build enterprise-grade Java applications',
      'Implement microservices architecture',
      'Secure applications with Spring Security',
      'Deploy and monitor Java applications in production',
      'Apply advanced testing and debugging strategies'
    ]
  },

  // 7. Python Full Stack
  {
    id: 'full-stack-python',
    title: 'Python Full Stack',
    category: 'Development',
    level: 'Intermediate',
    description: 'Build complete web applications using Python, Django, and modern frontend technologies',
    format: 'Comprehensive',
    students: '2,756',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Programming Fundamentals', technicalContent: 'Variables, data types, operators, conditions, loops, functions and basic problem solving.', topics: ['Variables & Data Types', 'Operators & Conditions', 'Loops & Functions', 'Problem Solving'] },
        { moduleNumber: 'Module 2', title: 'Object-Oriented Programming', technicalContent: 'Classes, objects, encapsulation, inheritance, polymorphism, abstraction and exception handling.', topics: ['Classes & Objects', 'Encapsulation & Inheritance', 'Polymorphism & Abstraction', 'Exception Handling'] },
        { moduleNumber: 'Module 3', title: 'Web Fundamentals', technicalContent: 'HTML, CSS, JavaScript basics, forms, browser concepts and HTTP basics.', topics: ['HTML & CSS', 'JavaScript Basics', 'Forms & Browser Concepts', 'HTTP Basics'] },
        { moduleNumber: 'Module 4', title: 'Database Fundamentals', technicalContent: 'Relational databases, tables, CRUD operations, joins and basic database design.', topics: ['Relational Databases', 'Tables & CRUD', 'SQL Joins', 'Database Design'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Backend Development', technicalContent: 'Java/Python backend concepts, REST APIs, requests/responses, authentication basics and API integration.', topics: ['Python Backend (Django / REST)', 'REST APIs', 'Requests & Responses', 'API Authentication'] },
        { moduleNumber: 'Module 6', title: 'Frontend Development', technicalContent: 'Modern frontend concepts, components, state/events, forms and API integration.', topics: ['Modern Frontend Concepts', 'Components', 'State & Events', 'API Integration'] },
        { moduleNumber: 'Module 7', title: 'Full Stack Integration', technicalContent: 'Frontend-backend integration, database connectivity, authentication and error handling.', topics: ['Frontend-Backend Integration', 'Database Connectivity', 'Authentication', 'Error Handling'] },
        { moduleNumber: 'Module 8', title: 'Development Tools', technicalContent: 'Git, GitHub, package management, debugging and API testing.', topics: ['Git', 'GitHub', 'Package Management', 'Debugging & Testing'] }
      ],
      [
        { moduleNumber: 'Module 9', title: 'AI Integration', technicalContent: 'AI concepts for developers, AI APIs, generative AI and integrating AI features into applications.', topics: ['AI Concepts for Developers', 'AI APIs', 'Generative AI', 'Integrating AI Features'] },
        { moduleNumber: 'Module 10', title: 'Automation', technicalContent: 'Automated workflows, testing automation, build automation and deployment automation.', topics: ['Automated Workflows', 'Testing Automation', 'Build Automation', 'Deployment Automation'] },
        { moduleNumber: 'Module 11', title: 'Production Application', technicalContent: 'Application security, performance, logging, deployment and monitoring concepts.', topics: ['Application Security', 'Performance', 'Logging', 'Deployment & Monitoring'] },
        { moduleNumber: 'Module 12', title: 'Capstone Project', technicalContent: 'End-to-end AI-enabled full-stack application.', topics: ['End-to-end AI-enabled full-stack application'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build full-stack web applications with Python and Django',
      'Create RESTful APIs and integrate with frontend',
      'Implement user authentication and authorization',
      'Deploy applications to cloud platforms',
      'Optimize application performance and security'
    ]
  },

  // 8. Java Full Stack
  {
    id: 'java-full-stack',
    title: 'Java Full Stack',
    category: 'Development',
    level: 'Intermediate',
    description: 'Master full-stack development with Java Spring Boot backend and React frontend',
    format: 'Comprehensive',
    students: '2,341',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Programming Fundamentals', technicalContent: 'Variables, data types, operators, conditions, loops, functions and basic problem solving.', topics: ['Variables & Data Types', 'Operators & Conditions', 'Loops & Functions', 'Problem Solving'] },
        { moduleNumber: 'Module 2', title: 'Object-Oriented Programming', technicalContent: 'Classes, objects, encapsulation, inheritance, polymorphism, abstraction and exception handling.', topics: ['Classes & Objects', 'Encapsulation & Inheritance', 'Polymorphism & Abstraction', 'Exception Handling'] },
        { moduleNumber: 'Module 3', title: 'Web Fundamentals', technicalContent: 'HTML, CSS, JavaScript basics, forms, browser concepts and HTTP basics.', topics: ['HTML & CSS', 'JavaScript Basics', 'Forms & Browser Concepts', 'HTTP Basics'] },
        { moduleNumber: 'Module 4', title: 'Database Fundamentals', technicalContent: 'Relational databases, tables, CRUD operations, joins and basic database design.', topics: ['Relational Databases', 'Tables & CRUD', 'SQL Joins', 'Database Design'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Backend Development', technicalContent: 'Java/Python backend concepts, REST APIs, requests/responses, authentication basics and API integration.', topics: ['Spring Boot Backend', 'REST APIs', 'Requests & Responses', 'API Authentication'] },
        { moduleNumber: 'Module 6', title: 'Frontend Development', technicalContent: 'Modern frontend concepts, components, state/events, forms and API integration.', topics: ['Modern Frontend Concepts', 'Components', 'State & Events', 'API Integration'] },
        { moduleNumber: 'Module 7', title: 'Full Stack Integration', technicalContent: 'Frontend-backend integration, database connectivity, authentication and error handling.', topics: ['Frontend-Backend Integration', 'Database Connectivity', 'Authentication', 'Error Handling'] },
        { moduleNumber: 'Module 8', title: 'Development Tools', technicalContent: 'Git, GitHub, package management, debugging and API testing.', topics: ['Git', 'GitHub', 'Package Management', 'Debugging & Testing'] }
      ],
      [
        { moduleNumber: 'Module 9', title: 'AI Integration', technicalContent: 'AI concepts for developers, AI APIs, generative AI and integrating AI features into applications.', topics: ['AI Concepts for Developers', 'AI APIs', 'Generative AI', 'Integrating AI Features'] },
        { moduleNumber: 'Module 10', title: 'Automation', technicalContent: 'Automated workflows, testing automation, build automation and deployment automation.', topics: ['Automated Workflows', 'Testing Automation', 'Build Automation', 'Deployment Automation'] },
        { moduleNumber: 'Module 11', title: 'Production Application', technicalContent: 'Application security, performance, logging, deployment and monitoring concepts.', topics: ['Application Security', 'Performance', 'Logging', 'Deployment & Monitoring'] },
        { moduleNumber: 'Module 12', title: 'Capstone Project', technicalContent: 'End-to-end AI-enabled full-stack application.', topics: ['End-to-end AI-enabled full-stack application'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build enterprise full-stack applications with Java and React',
      'Implement secure authentication and authorization',
      'Design and optimize database schemas',
      'Deploy scalable applications to production',
      'Apply industry best practices and design patterns'
    ]
  },

  // 9. UI/UX Design Mastery (corresponds to Technical Course 6: UI/UX)

  // 10. Data Science & Analytics (corresponds to Technical Course 3: DATA SCIENCE & MACHINE LEARNING)
  
  // 11. Digital Marketing Strategy
  {
    id: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    category: 'Marketing',
    level: 'Intermediate',
    description: 'Master digital marketing channels and grow your online presence',
    format: 'Intensive',
    students: '3,241',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconBanner,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'Marketing Fundamentals', duration: '8 hours', topics: ['Marketing Strategy', 'Target Audience', 'Brand Positioning', 'Customer Journey'] },
        { moduleNumber: 'Module 2', title: 'Content Marketing', duration: '10 hours', topics: ['Content Strategy', 'SEO Optimization', 'Blog Writing', 'Video Marketing'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Social Media Marketing', duration: '10 hours', topics: ['Platform Strategies', 'Community Management', 'Influencer Marketing', 'Social Advertising'] },
        { moduleNumber: 'Module 4', title: 'Paid Advertising', duration: '10 hours', topics: ['Google Ads', 'Facebook Ads', 'Campaign Optimization', 'Budget Management'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Analytics & Optimization', duration: '8 hours', topics: ['Google Analytics', 'Conversion Tracking', 'A/B Testing', 'ROI Measurement'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Develop comprehensive digital marketing strategies',
      'Create engaging content across multiple channels',
      'Manage and optimize paid advertising campaigns',
      'Analyze marketing performance and ROI',
      'Build and grow online communities'
    ]
  },

  // 12. PHP Programming
  {
    id: 'php-programming',
    title: 'PHP Programming',
    category: 'Development',
    level: 'Beginner',
    description: 'Learn PHP from basics to building dynamic web applications and APIs',
    format: 'Self-paced',
    students: '2,987',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'PHP Fundamentals', duration: '12 hours', topics: ['PHP Syntax', 'Variables & Data Types', 'Control Structures', 'Functions'] },
        { moduleNumber: 'Module 2', title: 'Web Development Basics', duration: '15 hours', topics: ['HTML Integration', 'Forms Handling', 'Sessions & Cookies', 'File Operations'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Database Integration', duration: '18 hours', topics: ['MySQL Basics', 'PDO & MySQLi', 'CRUD Operations', 'Database Security'] },
        { moduleNumber: 'Module 4', title: 'Object-Oriented PHP', duration: '16 hours', topics: ['Classes & Objects', 'Inheritance', 'Namespaces', 'Autoloading'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Advanced PHP', duration: '19 hours', topics: ['API Development', 'Composer', 'Error Handling', 'Security Best Practices'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Build dynamic web applications with PHP',
      'Integrate databases with PHP applications',
      'Create RESTful APIs and web services',
      'Implement secure coding practices',
      'Use modern PHP development tools and frameworks'
    ]
  },

  // 13. WordPress Development
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    category: 'Development',
    level: 'Intermediate',
    description: 'Master WordPress theme and plugin development with custom functionality',
    format: 'Flexible',
    students: '3,456',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'WordPress Fundamentals', duration: '14 hours', topics: ['WordPress Architecture', 'Theme Structure', 'Template Hierarchy', 'The Loop'] },
        { moduleNumber: 'Module 2', title: 'Custom Theme Development', duration: '18 hours', topics: ['Custom Post Types', 'Custom Fields', 'Theme Customizer', 'Responsive Design'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Plugin Development', duration: '20 hours', topics: ['Plugin Architecture', 'Hooks & Filters', 'Database Operations', 'Admin Interfaces'] },
        { moduleNumber: 'Module 4', title: 'Advanced Features', duration: '16 hours', topics: ['REST API', 'Custom Gutenberg Blocks', 'WooCommerce Integration', 'Multisite'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Performance & Security', duration: '12 hours', topics: ['Optimization Techniques', 'Security Best Practices', 'Deployment', 'Maintenance'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Develop custom WordPress themes from scratch',
      'Create powerful WordPress plugins',
      'Implement advanced WordPress features and APIs',
      'Optimize WordPress sites for performance',
      'Secure and maintain WordPress installations'
    ]
  },

  // 14. DevOps Engineering (corresponds to Technical Course 8: DEVOPS WITH AWS, AI & AUTOMATION DEPLOYMENT)

  // 15. AWS Cloud Computing
  {
    id: 'aws-cloud-computing',
    title: 'AWS Cloud Computing',
    category: 'Cloud',
    level: 'Intermediate',
    description: 'Master Amazon Web Services and build scalable cloud applications',
    format: 'Comprehensive',
    students: '2,654',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconCloud,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'AWS Fundamentals', duration: '18 hours', topics: ['AWS Global Infrastructure', 'IAM & Security', 'EC2 Instances', 'VPC Networking'] },
        { moduleNumber: 'Module 2', title: 'Storage & Databases', duration: '16 hours', topics: ['S3 Storage', 'EBS Volumes', 'RDS Databases', 'DynamoDB NoSQL'] }
      ],
      [
        { moduleNumber: 'Module 3', title: 'Application Services', duration: '20 hours', topics: ['Lambda Functions', 'API Gateway', 'SQS & SNS', 'CloudWatch Monitoring'] },
        { moduleNumber: 'Module 4', title: 'DevOps on AWS', duration: '18 hours', topics: ['CodePipeline', 'CodeBuild', 'CloudFormation', 'Elastic Beanstalk'] }
      ],
      [
        { moduleNumber: 'Module 5', title: 'Advanced Architecture', duration: '22 hours', topics: ['Microservices', 'Auto Scaling', 'Load Balancing', 'Cost Optimization'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Design and deploy scalable AWS architectures',
      'Implement serverless applications with Lambda',
      'Manage AWS security and compliance',
      'Optimize costs and performance in the cloud',
      'Deploy scalable architectures across multiple AWS regions'
    ]
  },

  // 16. Data Analyst Professional (corresponds to Technical Course 4: DATA ANALYST WITH AI & AUTOMATION)
  
  

  // 18. Machine Learning Engineering
  {
    id: 'machine-learning-engineering',
    title: 'Machine Learning Engineering',
    category: 'AI/ML',
    level: 'Advanced',
    description: 'Build, deploy, and scale machine learning systems in production environments',
    format: 'Comprehensive',
    students: '2,187',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    icon: iconAI,
    levels: buildLevels(
      [
        { moduleNumber: 'Module 1', title: 'ML System Design', duration: '20 hours', topics: ['ML Pipeline Architecture', 'Data Engineering', 'Feature Stores', 'Model Versioning'] }
      ],
      [
        { moduleNumber: 'Module 2', title: 'Advanced Algorithms', duration: '24 hours', topics: ['Ensemble Methods', 'Deep Learning', 'Reinforcement Learning', 'Transfer Learning'] },
        { moduleNumber: 'Module 3', title: 'Model Deployment', duration: '22 hours', topics: ['MLOps Practices', 'Container Deployment', 'API Development', 'Model Serving'] }
      ],
      [
        { moduleNumber: 'Module 4', title: 'Production Monitoring', duration: '18 hours', topics: ['Model Drift Detection', 'Performance Monitoring', 'A/B Testing', 'Continuous Learning'] },
        { moduleNumber: 'Module 5', title: 'Scalable ML Systems', duration: '26 hours', topics: ['Distributed Training', 'Cloud ML Platforms', 'AutoML', 'Edge Deployment'] }
      ]
    ),
    get modules() { return [...this.levels.basic.modules, ...this.levels.intermediate.modules, ...this.levels.advanced.modules]; },
    learningOutcomes: [
      'Design end-to-end machine learning systems',
      'Deploy ML models at scale in production',
      'Implement MLOps best practices and workflows',
      'Monitor and maintain ML systems effectively',
      'Optimize ML performance and resource utilization'
    ]
  },

  // 19. Software Testing with Automation (Selenium) — New from Document

  // 20. Full Stack Mobile Development — New from Document

  // 21. Cyber Security & Ethical Hacking — New from Document

  // 22. ServiceNow, Salesforce & CRM — New from Document

  // 23. Business Analyst — New from Document

];

export const CATEGORY_OPTIONS = [
  'All',
  'Development',
  'Design',
  'Data Science',
  'Data Analytics',
  'Cloud',
  'AI/ML',
  'Testing & QA',
  'Cybersecurity',
  'Enterprise Systems',
  'Business Analysis',
  'Marketing'
];

export const LEVEL_OPTIONS = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];
