import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown,
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Star, 
  X, 
  Phone, 
  MessageSquare, 
  Code2, 
  Cpu,
  Users,
  Layers
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { sendCourseCallback, sendCourseCallbackForm, EmailJSResult } from '../../services/emailService';
import { useDeepLinkHighlight } from '../../hooks/useDeepLinkHighlight';
import { NavigationRail, SectionInfo } from '../layout/NavigationRail';

const coursesSections: SectionInfo[] = [
  { id: 'hero', title: 'COURSES' },
  { id: 'featured-course', title: 'FEATURED' },
  { id: 'catalogue', title: 'CATALOGUE' },
  { id: 'learning-journey', title: 'LEARNING' },
  { id: 'practical', title: 'PRACTICAL' },
];

// @ts-ignore
import iconAI from '../../../Elements/COURSES/AI and Machine Learning.png';
// @ts-ignore
import iconCloud from '../../../Elements/COURSES/Cloud and AWS Development.png';
// @ts-ignore
import iconFullStack from '../../../Elements/COURSES/Full Stack Development.png';
// @ts-ignore
import iconCyber from '../../../Elements/COURSES/Cybersecurity and Ethical Hacking.png';
// @ts-ignore
import iconUIUX from '../../../Elements/COURSES/UIUX Front End design.png';
// @ts-ignore
import iconBanner from '../../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';

// 1. CANONICAL TYPES FROM AUTHORITATIVE SOURCE DOCUMENT
export interface CourseModule {
  moduleNumber: string; // e.g. "Module 1"
  title: string;        // e.g. "Python Fundamentals"
  duration: string;     // e.g. "10 hours"
  topics: string[];     // e.g. ["Variables & Data Types", "Control Structures", ...]
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'Development' | 'Design' | 'Data Science' | 'Data Analytics' | 'Marketing' | 'Cloud' | 'AI/ML';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  format: 'Self-paced' | 'Intensive' | 'Comprehensive' | 'Flexible';
  students: string;     // e.g. "4,521"
  rating: string;       // e.g. "4.9"
  image: string;
  icon: any;
  modules: CourseModule[];
  learningOutcomes: string[];
}

// 2. AUTHORITATIVE CANONICAL COURSES DATASET (16 COURSES FROM SOURCE DOCUMENT)
export const coursesCatalog: CourseItem[] = [
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Python Fundamentals',
        duration: '10 hours',
        topics: ['Variables & Data Types', 'Control Structures', 'Functions', 'Error Handling']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Data Structures',
        duration: '12 hours',
        topics: ['Lists & Tuples', 'Dictionaries & Sets', 'String Manipulation', 'File Operations']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Object-Oriented Programming',
        duration: '15 hours',
        topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Libraries & Modules',
        duration: '10 hours',
        topics: ['Standard Library', 'Third-party Packages', 'Package Management', 'Virtual Environments']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Projects & Applications',
        duration: '18 hours',
        topics: ['Web Scraping', 'API Integration', 'GUI Development', 'Final Project']
      }
    ],
    learningOutcomes: [
      'Write clean and efficient Python code',
      'Understand object-oriented programming concepts',
      'Work with external libraries and APIs',
      'Build complete Python applications',
      'Debug and test Python programs effectively'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Advanced Data Structures',
        duration: '15 hours',
        topics: ['Generators & Iterators', 'Decorators', 'Context Managers', 'Metaclasses']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Concurrency & Parallelism',
        duration: '18 hours',
        topics: ['Threading', 'Multiprocessing', 'Asyncio', 'Concurrent Futures']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Design Patterns',
        duration: '20 hours',
        topics: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Python-specific Patterns']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Performance Optimization',
        duration: '15 hours',
        topics: ['Profiling & Benchmarking', 'Memory Management', 'Cython Integration', 'Code Optimization']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Advanced Applications',
        duration: '22 hours',
        topics: ['Network Programming', 'Database Integration', 'Testing Frameworks', 'Deployment Strategies']
      }
    ],
    learningOutcomes: [
      'Implement advanced Python design patterns',
      'Optimize Python applications for performance',
      'Handle concurrent and parallel programming',
      'Build scalable and maintainable Python systems',
      'Apply advanced testing and debugging techniques'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Java Fundamentals',
        duration: '12 hours',
        topics: ['Syntax & Variables', 'Data Types', 'Operators', 'Control Flow']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Object-Oriented Programming',
        duration: '16 hours',
        topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Abstraction']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Core Java APIs',
        duration: '14 hours',
        topics: ['Collections Framework', 'Exception Handling', 'I/O Operations', 'String Processing']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Advanced Concepts',
        duration: '18 hours',
        topics: ['Generics', 'Lambda Expressions', 'Stream API', 'Multithreading']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Application Development',
        duration: '20 hours',
        topics: ['GUI with Swing', 'Database Connectivity', 'Unit Testing', 'Build Tools']
      }
    ],
    learningOutcomes: [
      'Master Java syntax and object-oriented principles',
      'Build desktop applications with GUI',
      'Work with databases using JDBC',
      'Implement multithreaded applications',
      'Apply best practices in Java development'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Enterprise Java',
        duration: '20 hours',
        topics: ['Spring Framework', 'Dependency Injection', 'Spring Boot', 'RESTful Services']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Data Persistence',
        duration: '18 hours',
        topics: ['JPA & Hibernate', 'Spring Data', 'Database Transactions', 'Query Optimization']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Microservices Architecture',
        duration: '22 hours',
        topics: ['Service Design', 'API Gateway', 'Service Discovery', 'Circuit Breakers']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Security & Testing',
        duration: '16 hours',
        topics: ['Spring Security', 'OAuth2 & JWT', 'Integration Testing', 'Performance Testing']
      },
      {
        moduleNumber: 'Module 5',
        title: 'DevOps & Deployment',
        duration: '24 hours',
        topics: ['Containerization', 'CI/CD Pipelines', 'Monitoring', 'Cloud Deployment']
      }
    ],
    learningOutcomes: [
      'Build enterprise-grade Java applications',
      'Implement microservices architecture',
      'Secure applications with Spring Security',
      'Deploy and monitor Java applications in production',
      'Apply advanced testing and debugging strategies'
    ]
  },
  {
    id: 'full-stack-python',
    title: 'Full Stack Python',
    category: 'Development',
    level: 'Intermediate',
    description: 'Build complete web applications using Python, Django, and modern frontend technologies',
    format: 'Comprehensive',
    students: '2,756',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconFullStack,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Backend with Django',
        duration: '20 hours',
        topics: ['Django Framework', 'Models & ORM', 'Views & Templates', 'Admin Interface']
      },
      {
        moduleNumber: 'Module 2',
        title: 'API Development',
        duration: '18 hours',
        topics: ['Django REST Framework', 'Serializers', 'Authentication', 'API Documentation']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Frontend Integration',
        duration: '22 hours',
        topics: ['React Basics', 'State Management', 'API Integration', 'Component Design']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Database & Deployment',
        duration: '16 hours',
        topics: ['PostgreSQL', 'Database Design', 'Docker', 'Cloud Deployment']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Advanced Features',
        duration: '24 hours',
        topics: ['Real-time Features', 'Payment Integration', 'Testing', 'Performance Optimization']
      }
    ],
    learningOutcomes: [
      'Build full-stack web applications with Python and Django',
      'Create RESTful APIs and integrate with frontend',
      'Implement user authentication and authorization',
      'Deploy applications to cloud platforms',
      'Optimize application performance and security'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Spring Boot Backend',
        duration: '22 hours',
        topics: ['Spring Boot Setup', 'REST Controllers', 'Data JPA', 'Service Layer']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Database Integration',
        duration: '18 hours',
        topics: ['MySQL/PostgreSQL', 'Entity Relationships', 'Repository Pattern', 'Data Validation']
      },
      {
        moduleNumber: 'Module 3',
        title: 'React Frontend',
        duration: '20 hours',
        topics: ['React Components', 'Hooks & State', 'Routing', 'API Integration']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Security & Authentication',
        duration: '16 hours',
        topics: ['Spring Security', 'JWT Tokens', 'Role-based Access', 'Frontend Security']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Production Deployment',
        duration: '24 hours',
        topics: ['Build Optimization', 'Docker Containers', 'CI/CD Pipeline', 'Monitoring']
      }
    ],
    learningOutcomes: [
      'Build enterprise full-stack applications with Java and React',
      'Implement secure authentication and authorization',
      'Design and optimize database schemas',
      'Deploy scalable applications to production',
      'Apply industry best practices and design patterns'
    ]
  },
  {
    id: 'ui-ux-design-mastery',
    title: 'UI/UX Design Mastery',
    category: 'Design',
    level: 'Beginner',
    description: 'Create stunning user interfaces and exceptional user experiences',
    format: 'Flexible',
    students: '1,923',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconUIUX,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Design Fundamentals',
        duration: '6 hours',
        topics: ['Design Principles', 'Color Theory', 'Typography', 'Layout & Composition']
      },
      {
        moduleNumber: 'Module 2',
        title: 'User Research & Analysis',
        duration: '10 hours',
        topics: ['User Personas', 'Journey Mapping', 'Competitive Analysis', 'Usability Testing']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Wireframing & Prototyping',
        duration: '12 hours',
        topics: ['Low-fi Wireframes', 'High-fi Mockups', 'Interactive Prototypes', 'Design Systems']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Advanced UI Design',
        duration: '10 hours',
        topics: ['Component Libraries', 'Responsive Design', 'Micro-interactions', 'Accessibility']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Portfolio & Presentation',
        duration: '6 hours',
        topics: ['Case Study Creation', 'Design Portfolio', 'Client Presentation', 'Design Handoff']
      }
    ],
    learningOutcomes: [
      'Conduct comprehensive user research',
      'Create wireframes and interactive prototypes',
      'Design accessible and inclusive interfaces',
      'Build professional design portfolios',
      'Present design solutions effectively'
    ]
  },
  {
    id: 'data-science-analytics',
    title: 'Data Science & Analytics',
    category: 'Data Science',
    level: 'Advanced',
    description: 'Analyze complex data and build predictive models using Python and ML',
    format: 'Comprehensive',
    students: '1,456',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconAI,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Python for Data Science',
        duration: '10 hours',
        topics: ['NumPy & Pandas', 'Data Manipulation', 'Jupyter Notebooks', 'Statistical Foundations']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Data Visualization',
        duration: '15 hours',
        topics: ['Matplotlib & Seaborn', 'Plotly & Dash', 'Interactive Dashboards', 'Storytelling with Data']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Machine Learning',
        duration: '20 hours',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Advanced Analytics',
        duration: '15 hours',
        topics: ['Time Series Analysis', 'Deep Learning Basics', 'Natural Language Processing', 'Computer Vision']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Real-world Projects',
        duration: '20 hours',
        topics: ['Industry Case Studies', 'Model Deployment', 'A/B Testing', 'Business Intelligence']
      }
    ],
    learningOutcomes: [
      'Perform comprehensive data analysis and visualization',
      'Build and deploy machine learning models',
      'Create interactive dashboards and reports',
      'Apply statistical methods to business problems',
      'Communicate insights to stakeholders effectively'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Marketing Fundamentals',
        duration: '8 hours',
        topics: ['Marketing Strategy', 'Target Audience', 'Brand Positioning', 'Customer Journey']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Content Marketing',
        duration: '10 hours',
        topics: ['Content Strategy', 'SEO Optimization', 'Blog Writing', 'Video Marketing']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Social Media Marketing',
        duration: '10 hours',
        topics: ['Platform Strategies', 'Community Management', 'Influencer Marketing', 'Social Advertising']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Paid Advertising',
        duration: '10 hours',
        topics: ['Google Ads', 'Facebook Ads', 'Campaign Optimization', 'Budget Management']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Analytics & Optimization',
        duration: '8 hours',
        topics: ['Google Analytics', 'Conversion Tracking', 'A/B Testing', 'ROI Measurement']
      }
    ],
    learningOutcomes: [
      'Develop comprehensive digital marketing strategies',
      'Create engaging content across multiple channels',
      'Manage and optimize paid advertising campaigns',
      'Analyze marketing performance and ROI',
      'Build and grow online communities'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'PHP Fundamentals',
        duration: '12 hours',
        topics: ['PHP Syntax', 'Variables & Data Types', 'Control Structures', 'Functions']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Web Development Basics',
        duration: '15 hours',
        topics: ['HTML Integration', 'Forms Handling', 'Sessions & Cookies', 'File Operations']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Database Integration',
        duration: '18 hours',
        topics: ['MySQL Basics', 'PDO & MySQLi', 'CRUD Operations', 'Database Security']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Object-Oriented PHP',
        duration: '16 hours',
        topics: ['Classes & Objects', 'Inheritance', 'Namespaces', 'Autoloading']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Advanced PHP',
        duration: '19 hours',
        topics: ['API Development', 'Composer', 'Error Handling', 'Security Best Practices']
      }
    ],
    learningOutcomes: [
      'Build dynamic web applications with PHP',
      'Integrate databases with PHP applications',
      'Create RESTful APIs and web services',
      'Implement secure coding practices',
      'Use modern PHP development tools and frameworks'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'WordPress Fundamentals',
        duration: '14 hours',
        topics: ['WordPress Architecture', 'Theme Structure', 'Template Hierarchy', 'The Loop']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Custom Theme Development',
        duration: '18 hours',
        topics: ['Custom Post Types', 'Custom Fields', 'Theme Customizer', 'Responsive Design']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Plugin Development',
        duration: '20 hours',
        topics: ['Plugin Architecture', 'Hooks & Filters', 'Database Operations', 'Admin Interfaces']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Advanced Features',
        duration: '16 hours',
        topics: ['REST API', 'Custom Gutenberg Blocks', 'WooCommerce Integration', 'Multisite']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Performance & Security',
        duration: '12 hours',
        topics: ['Optimization Techniques', 'Security Best Practices', 'Deployment', 'Maintenance']
      }
    ],
    learningOutcomes: [
      'Develop custom WordPress themes from scratch',
      'Create powerful WordPress plugins',
      'Implement advanced WordPress features and APIs',
      'Optimize WordPress sites for performance',
      'Secure and maintain WordPress installations'
    ]
  },
  {
    id: 'devops-engineering',
    title: 'DevOps Engineering',
    category: 'Cloud',
    level: 'Advanced',
    description: 'Master DevOps practices, automation, and infrastructure management',
    format: 'Comprehensive',
    students: '1,876',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconCloud,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'DevOps Fundamentals',
        duration: '16 hours',
        topics: ['DevOps Culture', 'Version Control', 'Git Workflows', 'Collaboration Tools']
      },
      {
        moduleNumber: 'Module 2',
        title: 'CI/CD Pipelines',
        duration: '20 hours',
        topics: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Automated Testing']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Containerization',
        duration: '24 hours',
        topics: ['Docker Fundamentals', 'Docker Compose', 'Container Orchestration', 'Kubernetes']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Infrastructure as Code',
        duration: '22 hours',
        topics: ['Terraform', 'Ansible', 'Configuration Management', 'Infrastructure Automation']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Monitoring & Operations',
        duration: '18 hours',
        topics: ['Logging & Monitoring', 'Prometheus & Grafana', 'Incident Response', 'Performance Tuning']
      }
    ],
    learningOutcomes: [
      'Implement robust CI/CD pipelines',
      'Manage containerized applications with Docker and Kubernetes',
      'Automate infrastructure provisioning and management',
      'Monitor and optimize system performance',
      'Apply DevOps best practices in enterprise environments'
    ]
  },
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
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'AWS Fundamentals',
        duration: '18 hours',
        topics: ['AWS Global Infrastructure', 'IAM & Security', 'EC2 Instances', 'VPC Networking']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Storage & Databases',
        duration: '16 hours',
        topics: ['S3 Storage', 'EBS Volumes', 'RDS Databases', 'DynamoDB NoSQL']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Application Services',
        duration: '20 hours',
        topics: ['Lambda Functions', 'API Gateway', 'SQS & SNS', 'CloudWatch Monitoring']
      },
      {
        moduleNumber: 'Module 4',
        title: 'DevOps on AWS',
        duration: '18 hours',
        topics: ['CodePipeline', 'CodeBuild', 'CloudFormation', 'Elastic Beanstalk']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Advanced Architecture',
        duration: '22 hours',
        topics: ['Microservices', 'Auto Scaling', 'Load Balancing', 'Cost Optimization']
      }
    ],
    learningOutcomes: [
      'Design and deploy scalable AWS architectures',
      'Implement serverless applications with Lambda',
      'Manage AWS security and compliance',
      'Optimize costs and performance in the cloud',
      'Prepare for AWS certification exams'
    ]
  },
  {
    id: 'data-analyst-professional',
    title: 'Data Analyst Professional',
    category: 'Data Analytics',
    level: 'Beginner',
    description: 'Master business analytics, reporting, and data visualization for business insights',
    format: 'Flexible',
    students: '2,876',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconBanner,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Data Analysis Fundamentals',
        duration: '12 hours',
        topics: ['Data Types & Sources', 'Excel Advanced Functions', 'Data Cleaning', 'Statistical Basics']
      },
      {
        moduleNumber: 'Module 2',
        title: 'SQL for Business Analytics',
        duration: '16 hours',
        topics: ['Database Queries', 'Joins & Aggregations', 'Data Extraction', 'Report Automation']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Data Visualization Tools',
        duration: '18 hours',
        topics: ['Tableau Fundamentals', 'Power BI Dashboards', 'Chart Selection', 'Interactive Reports']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Business Intelligence',
        duration: '14 hours',
        topics: ['KPI Development', 'Performance Metrics', 'Trend Analysis', 'Forecasting Basics']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Analytics Projects',
        duration: '16 hours',
        topics: ['Business Case Studies', 'Stakeholder Presentations', 'Report Design', 'Data Storytelling']
      }
    ],
    learningOutcomes: [
      'Analyze business data using Excel and SQL',
      'Create professional dashboards and reports',
      'Identify trends and patterns in business data',
      'Present data insights to business stakeholders',
      'Automate reporting processes and workflows'
    ]
  },
  {
    id: 'ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    category: 'AI/ML',
    level: 'Beginner',
    description: 'Learn AI concepts, algorithms, and applications with hands-on projects',
    format: 'Self-paced',
    students: '3,421',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconAI,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'Introduction to AI',
        duration: '14 hours',
        topics: ['AI History & Evolution', 'Types of AI', 'Problem Solving', 'Search Algorithms']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Knowledge Representation',
        duration: '16 hours',
        topics: ['Logic & Reasoning', 'Expert Systems', 'Knowledge Graphs', 'Semantic Networks']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Machine Learning Basics',
        duration: '18 hours',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Cross Validation']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Neural Networks',
        duration: '20 hours',
        topics: ['Perceptrons', 'Backpropagation', 'Deep Learning Intro', 'Activation Functions']
      },
      {
        moduleNumber: 'Module 5',
        title: 'AI Applications',
        duration: '22 hours',
        topics: ['Computer Vision', 'Natural Language Processing', 'Robotics', 'AI Ethics']
      }
    ],
    learningOutcomes: [
      'Understand core AI concepts and algorithms',
      'Implement basic machine learning models',
      'Apply AI techniques to real-world problems',
      'Evaluate AI system performance and limitations',
      'Consider ethical implications of AI development'
    ]
  },
  {
    id: 'machine-learning-engineering',
    title: 'Machine Learning Engineering',
    category: 'AI/ML',
    level: 'Advanced',
    description: 'Build, deploy, and scale machine learning systems in production environments',
    format: 'Comprehensive',
    students: '2,187',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800&h=550',
    icon: iconAI,
    modules: [
      {
        moduleNumber: 'Module 1',
        title: 'ML System Design',
        duration: '20 hours',
        topics: ['ML Pipeline Architecture', 'Data Engineering', 'Feature Stores', 'Model Versioning']
      },
      {
        moduleNumber: 'Module 2',
        title: 'Advanced Algorithms',
        duration: '24 hours',
        topics: ['Ensemble Methods', 'Deep Learning', 'Reinforcement Learning', 'Transfer Learning']
      },
      {
        moduleNumber: 'Module 3',
        title: 'Model Deployment',
        duration: '22 hours',
        topics: ['MLOps Practices', 'Container Deployment', 'API Development', 'Model Serving']
      },
      {
        moduleNumber: 'Module 4',
        title: 'Production Monitoring',
        duration: '18 hours',
        topics: ['Model Drift Detection', 'Performance Monitoring', 'A/B Testing', 'Continuous Learning']
      },
      {
        moduleNumber: 'Module 5',
        title: 'Scalable ML Systems',
        duration: '26 hours',
        topics: ['Distributed Training', 'Cloud ML Platforms', 'AutoML', 'Edge Deployment']
      }
    ],
    learningOutcomes: [
      'Design end-to-end machine learning systems',
      'Deploy ML models at scale in production',
      'Implement MLOps best practices and workflows',
      'Monitor and maintain ML systems effectively',
      'Optimize ML performance and resource utilization'
    ]
  }
];

// Exact categories from source document
const categoryFilterOptions = [
  'All',
  'Development',
  'Design',
  'Data Science',
  'Data Analytics',
  'Marketing',
  'Cloud',
  'AI/ML'
];

// Exact difficulty levels from source document
const levelFilterOptions = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');
  const [activeCourseDetails, setActiveCourseDetails] = useState<CourseItem | null>(null);
  const [callbackCourse, setCallbackCourse] = useState<CourseItem | null>(null);

  const highlightedId = useDeepLinkHighlight();

  // Client-side Filtered Courses
  const filteredCourses = coursesCatalog.filter((course) => {
    const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  const featuredCourse = coursesCatalog[0]; // Python Programming

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -20% 0px' }
    );

    coursesSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Page Internal Navigation Rail */}
      <NavigationRail sections={coursesSections} activeSection={activeSection} />
      
      {/* ==================================================
          1. COURSES HERO SECTION
         ================================================== */}
      <section id="hero" className="relative z-10 w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden">
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Mobile Order 1: Title & Eyebrow */}
          <div className="order-1 lg:order-none flex flex-col items-start max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                COURSES
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold text-csl-text leading-[1.06] tracking-tight mb-2">
              Build skills. <br />
              Build things. <br />
              <span className="text-csl-blue">Build your future.</span>
            </h1>
          </div>

          {/* Mobile Order 2: Hero Visual Asset */}
          <div className="order-2 lg:order-none flex items-center justify-center relative w-full">
            <motion.div
              className="relative w-full max-w-[460px] sm:max-w-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />
              <img 
                src={iconBanner} 
                alt="CSL Courses Visual Ecosystem" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>
          </div>

          {/* Mobile Order 3: Description & CTA */}
          <div className="order-3 lg:order-none flex flex-col items-start max-w-xl">
            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              Industry-focused courses designed around practical skills, real projects, and technologies that actually get used.
            </p>

            <a 
              href="#featured-course" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Courses
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>

      {/* FOREGROUND CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. FEATURED COURSE ("Start Here")
           ================================================== */}
        <section id="featured-course" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                FEATURED PROGRAM
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-3">
              Start <span className="text-csl-blue">Here</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Build a strong foundation with practical, structured learning designed around real-world skills.
            </p>
          </div>

          {/* Two-Column Featured Editorial Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-csl-gold/5">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Badges */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full bg-csl-blue/10 border border-csl-blue/20 text-csl-blue font-bold text-xs uppercase tracking-wider">
                    {featuredCourse.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-csl-gold/15 border border-csl-gold/30 text-csl-text font-bold text-xs uppercase tracking-wider">
                    {featuredCourse.level}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    Format: {featuredCourse.format}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-csl-gold">
                    <Star className="w-4 h-4 fill-csl-gold text-csl-gold" />
                    <span>{featuredCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-muted">
                    <Users className="w-4 h-4 text-csl-blue" />
                    <span>{featuredCourse.students} Enrolled</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-csl-text tracking-tight mb-4">
                  {featuredCourse.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-csl-muted font-medium leading-relaxed mb-6">
                  {featuredCourse.description}
                </p>

                {/* Syllabus Module Preview */}
                <div className="bg-csl-bg/80 border border-csl-gold/20 rounded-2xl p-5 mb-8">
                  <span className="text-xs font-extrabold text-csl-blue uppercase tracking-wider block mb-3">
                    Syllabus Overview ({featuredCourse.modules.length} Modules)
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {featuredCourse.modules.slice(0, 3).map((mod, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-bold text-csl-text bg-white/70 p-2.5 rounded-xl border border-csl-gold/15">
                        <div className="flex items-center gap-2">
                          <span className="text-csl-gold font-mono">{mod.moduleNumber}:</span>
                          <span>{mod.title}</span>
                        </div>
                        <span className="text-csl-muted font-normal text-[11px]">{mod.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setCallbackCourse(featuredCourse)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Enroll / Request Callback
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveCourseDetails(featuredCourse)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-csl-gold/30 text-csl-text hover:text-csl-blue px-6 py-4 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Syllabus / View Details
                </button>
              </div>
            </div>

            {/* Right Large Course Visual */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden border border-csl-gold/25 bg-csl-bg shadow-md group">
              <img 
                src={featuredCourse.image} 
                alt={featuredCourse.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-csl-deep-blue/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-csl-gold/30 shadow-md">
                <span className="text-xs font-bold text-csl-text flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-csl-blue" />
                  Students: <strong>{featuredCourse.students}</strong>
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* ==================================================
            3. COURSE DISCOVERY & CATALOGUE
           ================================================== */}
        <section id="catalogue" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 border-t border-csl-gold/20">
          
          {/* Header */}
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                EXPLORE CATALOGUE
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Find Your Next <span className="text-csl-blue">Skill</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Explore courses across development, design, data science, data analytics, marketing, cloud, and AI/ML.
            </p>
          </div>

          {/* Category Filter Pills (Exact Categories from Source Document) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 w-full max-w-5xl mx-auto">
            {categoryFilterOptions.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-csl-blue text-white shadow-md shadow-csl-blue/20 scale-105'
                      : 'bg-white/80 text-csl-text hover:bg-white hover:text-csl-blue border border-csl-gold/25'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Level Filter Pills (Exact Levels from Source Document) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 w-full max-w-2xl mx-auto">
            <span className="text-xs font-bold text-csl-muted uppercase mr-2">Level:</span>
            {levelFilterOptions.map((lvl) => {
              const isActive = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-csl-gold text-csl-text shadow-xs scale-105'
                      : 'bg-csl-bg/80 text-csl-muted hover:text-csl-text border border-csl-gold/20'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Course Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredCourses.map((course) => {
              const isHighlighted = highlightedId === course.id;

              return (
                <motion.div
                  key={course.id}
                  id={course.id}
                  data-deep-link-id={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  animate={
                    isHighlighted
                      ? { scale: [1, 1.04, 1], filter: ['brightness(1)', 'brightness(1.25)', 'brightness(1)'] }
                      : { scale: 1, filter: 'brightness(1)' }
                  }
                  transition={
                    isHighlighted
                      ? { duration: 0.45, ease: 'easeInOut' }
                      : { duration: 0.4 }
                  }
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 border border-csl-gold/25 hover:border-csl-gold/70 hover:shadow-xl hover:shadow-csl-gold/10"
                >
                {/* Course Image */}
                <div 
                  className="relative w-full h-48 sm:h-52 overflow-hidden bg-csl-bg cursor-pointer"
                  onClick={() => setActiveCourseDetails(course)}
                >
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-csl-deep-blue/50 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill Top-Left */}
                  <div className="absolute top-3.5 left-3.5 bg-csl-deep-blue/90 backdrop-blur-md px-3 py-1 rounded-lg border border-csl-blue/30 shadow-md">
                    <span className="text-[11px] font-bold text-csl-gold uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>

                  {/* Level Pill Top-Right */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-csl-gold/30 shadow-xs">
                    <span className="text-[10px] font-bold text-csl-text uppercase">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Format, Rating & Student Meta from Source */}
                    <div className="flex items-center justify-between text-xs font-semibold text-csl-muted mb-2">
                      <span className="flex items-center gap-1 text-csl-blue font-bold">
                        <Clock className="w-3.5 h-3.5 text-csl-gold" />
                        {course.format}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-csl-gold font-bold">
                          <Star className="w-3.5 h-3.5 fill-csl-gold" />
                          {course.rating}
                        </span>
                        <span className="text-csl-muted text-[11px]">
                          ({course.students})
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setActiveCourseDetails(course)}
                      className="text-lg font-bold text-csl-text group-hover:text-csl-blue transition-colors mb-2 cursor-pointer leading-snug"
                    >
                      {course.title}
                    </h3>

                    {/* Exact Source Description */}
                    <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                      {course.description}
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-csl-gold/20 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveCourseDetails(course)}
                      className="text-xs font-bold text-csl-muted hover:text-csl-blue transition-colors cursor-pointer"
                    >
                      Syllabus
                    </button>

                    <button
                      onClick={() => setCallbackCourse(course)}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm group-hover:shadow-md group-hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Enroll →
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
          </div>

        </section>

        {/* ==================================================
            4. LEARNING JOURNEY ("Choose Your Starting Point")
           ================================================== */}
        <section id="learning-journey" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            
            {/* Header */}
            <div className="mb-12 text-center flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                  PROGRESSION
                </span>
                <div className="h-[2px] w-8 bg-csl-gold/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
                Choose Your <span className="text-csl-blue">Starting Point</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
                Clear skill progressions structured from beginner fundamentals to advanced specialization.
              </p>
            </div>

            {/* Progression Pipeline (Beginner -> Intermediate -> Advanced) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              
              {/* Beginner Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-gold/20 text-csl-text font-extrabold text-xs uppercase">
                      STAGE 01
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-gold">BEGINNER</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Foundations & Core Skills</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Start here with zero prior experience. Learn programming logic, basic UI design, and fundamental computer science concepts.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Beginner').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-gold/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Intermediate Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-blue/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative">
                <div className="absolute -top-3 right-6 bg-csl-blue text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-blue/15 text-csl-blue font-extrabold text-xs uppercase">
                      STAGE 02
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-blue">INTERMEDIATE</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Applied Engineering</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Build real applications, connect APIs, work with databases, and architect cloud deployments.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Intermediate').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-blue/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-csl-blue shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-gold/20 text-csl-text font-extrabold text-xs uppercase">
                      STAGE 03
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-gold">ADVANCED</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Production & Specialization</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Specialized advanced engineering in MLOps, LLM fine-tuning, Kubernetes cluster orchestration, and defensive cybersecurity.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Advanced').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-gold/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================================================
            5. LEARN BY DOING
           ================================================== */}
        <section id="practical" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                METHODOLOGY
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Learn by <span className="text-csl-blue">Doing.</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Our curriculum prioritizes hands-on project building over passive lectures.
            </p>
          </div>

          {/* 4 Editorial Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              {
                icon: Code2,
                title: 'HANDS-ON PROJECTS',
                desc: 'Build practical applications while learning.'
              },
              {
                icon: Cpu,
                title: 'INDUSTRY TOOLS',
                desc: 'Work with technologies used in modern development, cloud, data, and AI.'
              },
              {
                icon: Layers,
                title: 'STRUCTURED LEARNING',
                desc: 'Follow clearly organized modules from fundamentals to advanced concepts.'
              },
              {
                icon: Sparkles,
                title: 'CAREER-FOCUSED SKILLS',
                desc: 'Develop skills that can be applied to real-world projects.'
              }
            ].map((block, idx) => {
              const BlockIcon = block.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md border border-csl-gold/25 rounded-2xl p-6 flex flex-col justify-between hover:border-csl-gold/60 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-5 shrink-0">
                    <BlockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-wider text-csl-text uppercase mb-2">
                      {block.title}
                    </h3>
                    <p className="text-xs text-csl-muted font-medium leading-relaxed">
                      "{block.desc}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            6. FINAL CLOSING CTA SECTION
           ================================================== */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white/40 via-[#FBF7F4] to-csl-bg border-t border-csl-gold/20">
          <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            
            <div className="w-12 h-12 rounded-2xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-6 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Your next skill <span className="text-csl-blue">starts here.</span>
            </h2>

            <p className="text-csl-muted font-medium text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Pick a course, start learning, and turn knowledge into something you can build.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#course-discovery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Explore All Courses
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setCallbackCourse(coursesCatalog[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Request a Callback →
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* ==================================================
          MODAL 1: COURSE DETAILS / SYLLABUS EXPANDED MODAL
         ================================================== */}
      <AnimatePresence>
        {activeCourseDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCourseDetails(null)}
              className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-csl-gold/20">
                <div>
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full bg-csl-blue/10 text-csl-blue font-bold text-[11px] uppercase">
                      {activeCourseDetails.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-csl-gold/20 text-csl-text font-bold text-[11px] uppercase">
                      {activeCourseDetails.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase border border-emerald-200">
                      {activeCourseDetails.format}
                    </span>
                    <span className="text-xs font-bold text-csl-gold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-csl-gold" />
                      {activeCourseDetails.rating}
                    </span>
                    <span className="text-xs font-semibold text-csl-muted flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-csl-blue" />
                      {activeCourseDetails.students} Enrolled
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-csl-text">
                    {activeCourseDetails.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCourseDetails(null)}
                  className="w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-6 pr-2 flex flex-col gap-6">
                <p className="text-sm text-csl-muted font-medium leading-relaxed">
                  {activeCourseDetails.description}
                </p>

                {/* Course Modules Section (Exact Source Structure) */}
                <div>
                  <h4 className="text-xs font-extrabold text-csl-blue uppercase tracking-wider mb-3">
                    Course Modules ({activeCourseDetails.modules.length} Modules)
                  </h4>
                  <div className="flex flex-col gap-3">
                    {activeCourseDetails.modules.map((mod, idx) => (
                      <div key={idx} className="bg-white/80 border border-csl-gold/20 p-4 rounded-2xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-sm text-csl-text">
                            <span className="text-csl-gold font-mono">{mod.moduleNumber}:</span>
                            <span>{mod.title}</span>
                          </div>
                          <span className="text-xs font-semibold text-csl-muted flex items-center gap-1">
                            <Clock className="w-3 h-3 text-csl-gold" />
                            {mod.duration}
                          </span>
                        </div>
                        {/* Topics List */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[11px] font-bold text-csl-muted uppercase mr-1">Topics:</span>
                          {mod.topics.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-lg bg-csl-bg border border-csl-gold/15 text-[11px] font-medium text-csl-text">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes Section (Exact Source Outcomes) */}
                <div>
                  <h4 className="text-xs font-extrabold text-csl-blue uppercase tracking-wider mb-3">
                    Learning Outcomes
                  </h4>
                  <div className="flex flex-col gap-2">
                    {activeCourseDetails.learningOutcomes.map((item, idx) => (
                      <div key={idx} className="bg-csl-bg/80 border border-csl-gold/20 p-3 rounded-xl flex items-start gap-2.5 text-xs font-medium text-csl-text">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-csl-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-csl-muted">
                  <span>Format: <strong>{activeCourseDetails.format}</strong></span>
                  <span>•</span>
                  <span>Students: <strong>{activeCourseDetails.students}</strong></span>
                </div>

                <button
                  onClick={() => {
                    const courseToEnroll = activeCourseDetails;
                    setActiveCourseDetails(null);
                    setCallbackCourse(courseToEnroll);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Enroll / Request Callback
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================
          MODAL 2: CALLBACK REQUEST POPUP (With Auto-Selected Course & EmailJS)
         ================================================== */}
      <AnimatePresence>
        {callbackCourse && (
          <CallbackModal 
            course={callbackCourse} 
            onClose={() => setCallbackCourse(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

{/* CALLBACK MODAL COMPONENT */}
function CallbackModal({ course, onClose }: { course: CourseItem; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call',
    message: ''
  });

  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [dotsIndex, setDotsIndex] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock background scroll while modal is open & add Escape key listener
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formRef = useRef<HTMLFormElement>(null);

  // Submitting ellipsis animation
  useEffect(() => {
    if (submitState !== 'submitting') return;
    const interval = setInterval(() => {
      setDotsIndex((prev) => (prev % 3) + 1);
    }, 300);
    return () => clearInterval(interval);
  }, [submitState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill out your Name, Phone Number, and Email Address.');
      return;
    }

    setSubmitState('submitting');

    let result: EmailJSResult;
    if (formRef.current) {
      result = await sendCourseCallbackForm(formRef.current);
    } else {
      result = await sendCourseCallback({
        courseName: course.title,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        institution: formData.institution,
        preferredContactMethod: formData.preferredContactMethod,
        message: formData.message
      });
    }

    if (result.success) {
      setSubmitState('success');
    } else {
      setSubmitState('idle');
      setErrorMessage(result.message || 'Failed to submit callback request.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
      />

      {/* Modal Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-1">
            Request a Callback
          </span>
          <h3 className="text-2xl font-extrabold text-csl-text tracking-tight mb-2">
            Callback Request Form
          </h3>
          <p className="text-xs text-csl-muted font-medium leading-relaxed">
            Leave your details and we'll contact you via WhatsApp or phone call to discuss the course, schedule, fees, and enrollment process.
          </p>
        </div>

        {/* Read-Only Auto-Associated Course Field */}
        <div className="bg-white/90 border border-csl-gold/30 rounded-2xl p-3.5 mb-5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-extrabold text-csl-gold uppercase tracking-wider block">
              Selected Course
            </span>
            <span className="text-sm font-bold text-csl-text">
              {course.title}
            </span>
          </div>
          <span className="text-xs font-bold text-csl-blue bg-csl-blue/10 px-2.5 py-1 rounded-lg">
            {course.format}
          </span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {submitState === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-csl-text mb-2">
              Callback Requested ✓
            </h4>
            <p className="text-xs text-csl-muted font-medium leading-relaxed max-w-xs mb-6">
              Thanks! We've received your request. Our team will contact you shortly via your preferred method.
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="course" value={course.title} />
            <input type="hidden" name="preferred_contact_method" value={formData.preferredContactMethod} />
            <input type="hidden" name="subject" value={`Course callback request from ${formData.name}`} />
            
            {/* Name */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your WhatsApp / phone number"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Institution / College (Optional)
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Enter your institution"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1.5">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredContactMethod: 'WhatsApp' })}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                    formData.preferredContactMethod === 'WhatsApp'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                      : 'bg-white border-csl-gold/30 text-csl-muted'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredContactMethod: 'Phone Call' })}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                    formData.preferredContactMethod === 'Phone Call'
                      ? 'bg-csl-blue/10 border-csl-blue text-csl-blue shadow-xs'
                      : 'bg-white border-csl-gold/30 text-csl-muted'
                  }`}
                >
                  <Phone className="w-4 h-4 text-csl-blue" />
                  Phone Call
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Message (Optional)
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Anything you'd like to ask about the course?"
                className="w-full bg-white border border-csl-gold/30 rounded-xl p-3 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className={`w-full mt-2 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                submitState === 'submitting'
                  ? 'bg-gray-600 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white hover:shadow-lg cursor-pointer'
              }`}
            >
              {submitState === 'submitting' ? (
                <span>Requesting Callback{'.'.repeat(dotsIndex)}</span>
              ) : (
                <>
                  Request Callback
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}
      </motion.div>
    </div>
  );
}
