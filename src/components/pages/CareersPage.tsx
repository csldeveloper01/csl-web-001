import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, 
  Users, 
  Code2, 
  Briefcase, 
  ArrowRight, 
  ArrowDown, 
  Mail, 
  Phone, 
  MapPin,
  Building2,
  CheckCircle,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  Clock,
  Brain,
  BarChart3,
  Headphones,
  Palette
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { CareerModal } from '../sections/Careers/CareerModal';
import { CareerApplicationForm } from '../sections/Careers/CareerApplicationForm';

export interface CareerPosition {
  id: string;
  title: string;
  category: 'Marketing' | 'Human Resources' | 'Technical' | 'Business';
  experience: string;
  vacancies: string;
  vacancyCount: number;
  icon: typeof Megaphone;
  summary: string;
  responsibilities: string[];
  skills: string[];
  qualifications: string[];
  internshipStructure?: {
    duration: string;
    stages: string[];
    note?: string;
  };
  opportunity?: string;
}

export const careerPositions: CareerPosition[] = [
  {
    id: 'full-stack-devloper',
    title: 'Full stack devloper',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Code2,
    summary:
      'We are looking for a passionate and motivated Full Stack Development Intern to join our development team. This internship offers hands-on experience in building modern web applications using front-end and back-end technologies. Successful candidates will have the opportunity to transition into a full-time role based on performance. The ideal candidate should have a strong foundation in web development, problem-solving skills, and a willingness to learn new technologies while working on real-world projects in a collaborative environment.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Software Developer position.',
    responsibilities: [
      'Develop and maintain responsive web applications using modern front-end and back-end technologies.',
      'Build reusable, scalable, and maintainable code following industry best practices.',
      'Collaborate with designers, developers, and project managers to deliver high-quality applications.',
      'Develop RESTful APIs and integrate third-party APIs.',
      'Work with databases to design, develop, and optimize data storage solutions.',
      'Debug, test, and optimize applications for maximum performance.',
      'Participate in code reviews and team discussions.',
    ],
    skills: [
      'Strong knowledge of HTML5, CSS3, and JavaScript.',
      'Experience with React.js, Angular, or Vue.js.',
      'Knowledge of Node.js and Express.js, TypeScript.',
      'Understanding of REST APIs and API integration.',
      'Experience with MongoDB, MySQL, or PostgreSQL.',
    ],
    qualifications: [
      "Bachelor's Degree in Computer Science, Information Technology, Software Engineering, or a related discipline.",
      'Freshers are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'ai-ml-engineer-developer',
    title: 'AI/ML Engineer Developer',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Brain,
    summary:
      'We are looking for enthusiastic and passionate Artificial Intelligence & Machine Learning (AI/ML) Engineer Interns to join our technology team. This internship provides an excellent opportunity to work on real-world AI and Machine Learning projects, gain hands-on experience with industry-standard tools, and build intelligent solutions. Successful candidates who demonstrate strong technical skills, problem-solving ability, and consistent performance will have the opportunity to transition into a full-time AI/ML Engineer role.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time AI/ML Engineer Developer position.',
    responsibilities: [
      'Develop, train, and evaluate Machine Learning models.',
      'Work on Artificial Intelligence solutions for real-world business problems.',
      'Perform data collection, cleaning, preprocessing, and feature engineering.',
      'Build predictive models using supervised and unsupervised learning algorithms.',
      'Implement Deep Learning models using TensorFlow or PyTorch.',
      'Work with Natural Language Processing (NLP) and Computer Vision applications.',
      'Develop APIs to deploy Machine Learning models.',
    ],
    skills: [
      'Strong understanding of Python Programming.',
      'Knowledge of Machine Learning algorithms.',
      'Understanding of Data Structures and Algorithms.',
      'Familiarity with NumPy, Pandas, Matplotlib, and Scikit-learn.',
      'Basic knowledge of TensorFlow or PyTorch.',
      'Understanding of Statistics and Probability.',
      'Knowledge of SQL and database concepts.',
    ],
    qualifications: [
      "Bachelor's Degree in Computer Science, Information Technology, Software Engineering, or a related discipline.",
      'Freshers are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'ui-ux-designer-graphic-designer',
    title: 'UI/UX Designer & Graphic Designer',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Palette,
    summary:
      'We are looking for a creative and enthusiastic UI/UX Design Intern to join our design team. This internship provides hands-on experience in designing intuitive, user-friendly, and visually appealing digital products. You will work closely with developers, product managers, and senior designers to create engaging user experiences for web and mobile applications. Candidates who successfully complete the internship and demonstrate strong design skills, creativity, and professionalism will have the opportunity to transition into a full-time UI/UX Designer role.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time UI/UX Designer position.',
    responsibilities: [
      'Design intuitive and user-friendly interfaces for web and mobile applications.',
      'Conduct user research to understand user behavior and requirements.',
      'Create user flows, wireframes, mockups, and interactive prototypes.',
      'Develop visually appealing UI designs following modern design principles.',
      'Collaborate with developers to ensure accurate implementation of designs.',
      'Improve user experience by identifying usability issues and proposing solutions.',
    ],
    skills: [
      'Basic understanding of UI/UX Design Principles.',
      'Knowledge of Figma, Adobe XD, or Sketch.',
      'Understanding of wireframing and prototyping.',
      'Basic knowledge of typography, color theory, and layout design.',
      'Familiarity with responsive and mobile-first design.',
      'Understanding of user-centered design methodologies.',
      'Basic knowledge of HTML and CSS is an added advantage.',
    ],
    qualifications: [
      "Bachelor's Degree in Computer Science, Information Technology, Design, Multimedia, Visual Communication, or a related field.",
      'Freshers with strong design skills and a creative portfolio are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'voice-process-executive',
    title: 'Voice Process Executive',
    category: 'Business',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Headphones,
    summary:
      'We are looking for enthusiastic and customer-focused Voice Process Executives to join our team. This internship provides hands-on experience in customer interaction, communication, client support, and business operations. The ideal candidate should possess excellent verbal communication skills, a positive attitude, and a willingness to learn. Successful candidates who demonstrate outstanding communication, customer handling, and performance during the internship will have the opportunity to transition into a full-time role.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Design intuitive and user-friendly interfaces for web and mobile applications.',
      'Conduct user research to understand user behavior and requirements.',
      'Create user flows, wireframes, mockups, and interactive prototypes.',
      'Develop visually appealing UI designs following modern design principles.',
      'Collaborate with developers to ensure accurate implementation of designs.',
      'Improve user experience by identifying usability issues and proposing solutions.',
    ],
    skills: [
      'Handle inbound and outbound customer calls professionally.',
      'Understand customer requirements and provide accurate information.',
      'Resolve customer queries and concerns effectively.',
      'Maintain high standards of customer satisfaction and service quality.',
      'Record customer interactions and update CRM systems accurately.',
      'Follow communication scripts and company guidelines.',
      'Coordinate with internal teams to resolve customer issues.',
      'Meet daily, weekly, and monthly performance targets.',
    ],
    qualifications: [
      "Bachelor's Degree in Computer Science, Information Technology, Design, Multimedia, Visual Communication, or a related field.",
      'Freshers with strong design skills and a creative portfolio are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Megaphone,
    summary:
      'We are looking for creative, enthusiastic, and self-motivated Digital Marketing Interns to join our marketing team. This internship provides hands-on experience in digital marketing strategies, social media management, SEO, paid advertising, content creation, and campaign execution. Candidates will work on live projects and gain practical exposure to modern digital marketing tools and techniques. Successful candidates who demonstrate creativity, analytical skills, and consistent performance during the internship will have the opportunity to transition into a full-time Digital Marketing Executive role.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Plan and execute digital marketing campaigns across multiple platforms.',
      'Manage and optimize social media accounts (Instagram, Facebook, LinkedIn, YouTube, and X).',
      'Create engaging content, including posts, blogs, banners, and promotional materials.',
      'Assist in Search Engine Optimization (SEO) and Search Engine Marketing (SEM) activities.',
      'Run and optimize paid advertising campaigns on Google Ads and Meta Ads.',
    ],
    skills: [
      'Basic understanding of Digital Marketing concepts.',
      'Knowledge of Social Media Marketing (SMM).',
      'Basic understanding of SEO and SEM.',
      'Familiarity with Google Analytics and Google Search Console.',
      'Basic knowledge of Google Ads and Meta Ads Manager.',
    ],
    qualifications: [
      'Bachelor Degree, Computer Science, Information Technology, Mass Communication, or any related field.',
      'Freshers are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Training Period',
        'Month 3: Live Project Execution',
        'Month 4: Advanced Campaign Tasks',
        'Month 5: Client Strategy & Optimization',
        'Month 6: Independent Marketing Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'hr-operations',
    title: 'HR Operations',
    category: 'Human Resources',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Users,
    summary:
      'We are looking for an organized and proactive HR Operations professional/intern to support day-to-day HR activities, employee coordination, recruitment support, documentation, and HR administration. The ideal candidate should have good communication skills, attention to detail, and a strong interest in building a career in Human Resources.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Support day-to-day HR operations and employee coordination.',
      'Assist with recruitment coordination and interview scheduling.',
      'Coordinate employee onboarding and joining formalities.',
      'Maintain employee records, attendance, and leave details.',
      'Prepare and maintain HR documents and employee records.',
      'Coordinate HR communication with employees and internal teams.',
      'Assist in implementing HR policies and processes.',
      'Support employee engagement and internal HR activities.',
      'Prepare basic HR reports and documentation.',
      'Maintain confidentiality of employee information.',
    ],
    skills: [
      'Basic understanding of HR Operations concepts.',
      'Good verbal and written communication skills.',
      'Strong coordination and organizational skills.',
      'Basic knowledge of HR processes.',
      'Proficiency in MS Office / Google Workspace.',
      'Good documentation and record-keeping skills.',
      'Attention to detail and time management.',
      'Professional attitude and willingness to learn.',
    ],
    qualifications: [
      "Master's degree in Human Resources, Business Administration, Management, or a related field.",
      'Freshers and candidates with HR internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Live Project Operations',
        'Month 4: Indepth HR Tasks',
        'Month 5: Employee & Team Coordination',
        'Month 6: Independent HR Operations Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'python-college-trainer-dev',
    title: 'Python College Trainer & Dev',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Code2,
    summary:
      'We are looking for an analytical and detail-oriented Data Analyst Intern to support data collection, analysis, reporting, and business insights. The ideal candidate should have strong analytical thinking, basic technical knowledge, and an interest in using data to support business decisions.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Collect, clean, and analyze data.',
      'Identify trends, patterns, and insights.',
      'Prepare reports and dashboards.',
      'Create data visualizations.',
      'Validate and maintain data accuracy.',
      'Support data-driven business decisions.',
      'Work with teams on data requirements.',
    ],
    skills: [
      'Basic understanding of Data Analyst concepts.',
      'Analytical and problem-solving skills.',
      'Basic knowledge of Python, SQL & Excel.',
      'Familiarity with Power BI/Tableau.',
      'Data visualization and reporting skills.',
      'Good communication and attention to detail.',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, IT, Statistics, Mathematics, Data Science, or related fields.",
      'Freshers with relevant projects or internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: BarChart3,
    summary:
      'We are looking for an analytical and detail-oriented Data Analyst Intern to support data collection, analysis, reporting, and business insights. The ideal candidate should have strong analytical thinking, basic technical knowledge, and an interest in using data to support business decisions.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Collect, clean, and analyze data.',
      'Identify trends, patterns, and insights.',
      'Prepare reports and dashboards.',
      'Create data visualizations.',
      'Validate and maintain data accuracy.',
      'Support data-driven business decisions.',
      'Work with teams on data requirements.',
    ],
    skills: [
      'Basic understanding of Data Analyst concepts.',
      'Analytical and problem-solving skills.',
      'Basic knowledge of Python, SQL & Excel.',
      'Familiarity with Power BI/Tableau.',
      'Data visualization and reporting skills.',
      'Good communication and attention to detail.',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, IT, Statistics, Mathematics, Data Science, or related fields.",
      'Freshers with relevant projects or internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Working on Live Project',
        'Month 4: Indepth Development Tasks',
        'Month 5: Working with Client',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Briefcase,
    summary:
      'We are looking for a Business Analyst who can analyse business requirements, translate them into actionable insights, and help teams improve processes and deliver better outcomes.',
    opportunity:
      'Candidates who successfully complete the internship and demonstrate strong technical skills, learning ability, teamwork, and professionalism will be offered a full-time Voice Process Executive position.',
    responsibilities: [
      'Gather and analyse business requirements.',
      'Analyse existing business processes and identify areas for improvement.',
      'Prepare functional documentation and business requirement documents.',
      'Collaborate with technical and product teams.',
      'Perform data analysis and prepare reports.',
      'Support project planning, coordination, and delivery.',
    ],
    skills: [
      'Advanced Microsoft Excel.',
      'Data analysis and interpretation.',
      'Business requirement documentation.',
      'Strong analytical and problem-solving abilities.',
      'Good communication and teamwork skills.',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, IT or related fields.",
      'Freshers with relevant projects or internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      stages: [
        'Month 1, 2: Technical Training',
        'Month 3: Live Project Analysis',
        'Month 4: Advanced Process Tasks',
        'Month 5: Client & Stakeholder Work',
        'Month 6: Independent Project Exposure',
      ],
      note: 'Progression is performance-based and subject to successful completion of assigned tasks and evaluations.',
    },
  },
];

const categoryTabs = [
  'All Roles',
  'Marketing',
  'Human Resources',
  'Technical',
  'Business',
] as const;

export function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categoryTabs[number]>('All Roles');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [expandedPositionId, setExpandedPositionId] = useState<string | null>(null);

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const heroY = useTransform(scrollY, [0, 600], [0, -30]);

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.3, duration: 7 },
    { size: 'w-16 h-16', pos: 'top-[18%] right-[8%]', delay: 1.1, duration: 8.5 },
    { size: 'w-10 h-10', pos: 'bottom-[20%] left-[10%]', delay: 1.6, duration: 6 },
    { size: 'w-14 h-14', pos: 'bottom-[16%] right-[18%]', delay: 0.8, duration: 7.5 },
  ];

  const handleApplyClick = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setIsApplyModalOpen(true);
  };

  const toggleExpandPosition = (id: string) => {
    setExpandedPositionId((prev) => (prev === id ? null : id));
  };

  const filteredPositions = careerPositions.filter((pos) => {
    if (selectedCategory === 'All Roles') return true;
    return pos.category === selectedCategory;
  });

  const positionDropdownOptions = careerPositions.map((pos) => ({
    value: pos.title,
    label: pos.title,
  }));

  // Total openings count
  const totalOpenings = careerPositions.reduce((acc, curr) => acc + curr.vacancyCount, 0);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* ==================================================
          1. HERO & CAREERS AT A GLANCE
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center bg-[#FBF7F4] pt-28 pb-16 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Side: Headline & Introduction */}
              <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
                <div className="section-eyebrow">
                  <span>CAREERS</span>
                  <div></div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-csl-text leading-[1.1] tracking-tight mb-4 md:mb-5">
                  Build your career <br />
                  <span className="text-csl-blue">with CSL.</span>
                </h1>

                <p className="text-csl-muted font-medium text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl">
                  Creator Space Lab offers opportunities for people passionate about technology, continuous learning, professional development, and real-world work across our core multidisciplinary teams.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#openings"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Open Roles</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href="#apply-form"
                    className="inline-flex items-center justify-center gap-2 bg-white border border-csl-gold/40 text-csl-text hover:text-csl-blue hover:border-csl-blue px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    <span>General Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Side: Careers at a Glance Card */}
              <div className="lg:col-span-5 w-full">
                <div className="relative bg-white/90 backdrop-blur-md border border-csl-gold/35 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg shadow-csl-blue/5 overflow-hidden">
                  {/* Decorative subtle CSL tint */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-csl-blue/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-csl-gold/10 rounded-full blur-xl pointer-events-none -ml-8 -mb-8" />

                  {/* Card Title */}
                  <div className="relative z-10 flex items-center justify-between pb-3.5 mb-3.5 md:pb-4 md:mb-4 border-b border-csl-gold/25">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-csl-blue/10 flex items-center justify-center text-csl-blue">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-base sm:text-lg text-csl-text tracking-tight">
                        Careers at a Glance
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Active
                    </span>
                  </div>

                  {/* Compact Info Rows */}
                  <div className="relative z-10 flex flex-col divide-y divide-csl-gold/20 text-xs sm:text-sm">
                    {/* Row 1: Open Roles */}
                    <div className="flex items-center justify-between py-2.5 md:py-3">
                      <span className="text-csl-muted font-semibold">Open Roles</span>
                      <span className="font-extrabold text-csl-text text-right">
                        {careerPositions.length} Positions ({totalOpenings} Openings)
                      </span>
                    </div>

                    {/* Row 2: Interns / Freshers */}
                    <div className="flex items-center justify-between py-2.5 md:py-3">
                      <span className="text-csl-muted font-semibold">Interns / Freshers</span>
                      <span className="font-extrabold text-csl-blue text-right">
                        Eligible & Encouraged
                      </span>
                    </div>

                    {/* Row 3: Location */}
                    <div className="flex items-center justify-between py-2.5 md:py-3">
                      <span className="text-csl-muted font-semibold">Location</span>
                      <span className="font-extrabold text-csl-text text-right flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-csl-blue inline" />
                        Chennai (OMR)
                      </span>
                    </div>

                    {/* Row 4: Domain */}
                    <div className="flex items-center justify-between py-2.5 md:py-3">
                      <span className="text-csl-muted font-semibold">Domain</span>
                      <span className="font-extrabold text-csl-text text-right">
                        Tech • Digital • HR • Business
                      </span>
                    </div>

                    {/* Row 5: Work Format */}
                    <div className="flex items-center justify-between pt-2.5 md:pt-3">
                      <span className="text-csl-muted font-semibold">Environment</span>
                      <span className="font-extrabold text-csl-text text-right">
                        Collaborative & Hands-on
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================================================
            FOREGROUND SLIDING CONTENT WRAPPER
           ================================================== */}
        <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">
          
          {/* ==================================================
              2. CURRENT OPENINGS SECTION (WITH DETAILED EXPANDABLE JDS)
             ================================================== */}
          <section id="openings" className="relative w-full py-12 md:py-16 lg:py-24 section-container">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 lg:mb-12">
              <div>
                <div className="section-eyebrow">
                  <span>CURRENT OPENINGS</span>
                  <div></div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-2.5">
                  Open roles. Apply directly.
                </h2>
                <p className="text-csl-muted font-medium text-xs sm:text-sm md:text-base section-subheading max-w-xl">
                  Explore our official openings below. Click any role or "View Details" to inspect the job description, key responsibilities, and required qualifications.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categoryTabs.map((tab) => {
                  const isActive = selectedCategory === tab;
                  const count = tab === 'All Roles' 
                    ? careerPositions.length 
                    : careerPositions.filter(p => p.category === tab).length;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSelectedCategory(tab)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-csl-blue text-white shadow-sm shadow-csl-blue/20'
                          : 'bg-white/80 text-csl-text border border-csl-gold/25 hover:border-csl-gold hover:text-csl-blue'
                      }`}
                    >
                      <span>{tab}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-csl-gold/15 text-csl-text'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Grouped Job-List / Table Presentation */}
            <div className="bg-white/90 backdrop-blur-sm border border-csl-gold/30 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden">
              {/* Desktop Table Header (1024px+) */}
              <div className="hidden lg:grid grid-cols-12 gap-4 px-7 py-4 bg-[#FAF7F2] border-b border-csl-gold/25 text-xs font-bold text-csl-muted uppercase tracking-wider items-center">
                <div className="col-span-5">Role & Department</div>
                <div className="col-span-3">Experience / Eligibility</div>
                <div className="col-span-2 text-center">Vacancies</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Rows List */}
              <div className="divide-y divide-csl-gold/20">
                {filteredPositions.map((pos) => {
                  const Icon = pos.icon;
                  const isExpanded = expandedPositionId === pos.id;

                  return (
                    <div
                      key={pos.id}
                      className="p-4 sm:p-5 md:p-6 lg:px-7 lg:py-5 hover:bg-[#FAF8F5]/80 transition-colors duration-200"
                    >
                      {/* Desktop Full 12-Column Row (lg: 1024px+) */}
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        {/* Col 5: Role & Icon & Department */}
                        <div className="col-span-5 flex items-center gap-3 pr-2">
                          <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleExpandPosition(pos.id)}
                              className="font-extrabold text-base text-csl-text hover:text-csl-blue transition-colors text-left flex items-center gap-1.5 group/title cursor-pointer leading-snug"
                            >
                              <span className="truncate">{pos.title}</span>
                              <ChevronDown
                                className={`w-4 h-4 text-csl-muted shrink-0 transition-transform duration-200 group-hover/title:text-csl-blue ${
                                  isExpanded ? 'rotate-180 text-csl-blue' : ''
                                }`}
                              />
                            </button>
                            <span className="text-xs font-medium text-csl-muted block">
                              {pos.category}
                            </span>
                          </div>
                        </div>

                        {/* Col 3: Experience */}
                        <div className="col-span-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#F4EFE6] text-csl-text border border-csl-gold/20 max-w-full truncate">
                            {pos.experience}
                          </span>
                        </div>

                        {/* Col 2: Openings / Vacancies */}
                        <div className="col-span-2 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {pos.vacancies}
                          </span>
                        </div>

                        {/* Col 2: Actions (Details & Apply Now) */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpandPosition(pos.id)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-csl-muted hover:text-csl-blue hover:bg-csl-blue/5 transition-all cursor-pointer whitespace-nowrap"
                          >
                            {isExpanded ? 'Hide' : 'Details'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyClick(pos.title)}
                            className="inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white shadow-xs hover:shadow-md hover:shadow-csl-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                          >
                            <span>Apply</span>
                          </button>
                        </div>
                      </div>

                    {/* Mobile & Tablet (iPad Mini) Clean Stacked Layout (<1024px) */}
                    <div className="flex flex-col lg:hidden gap-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base md:text-lg text-csl-text leading-tight">
                              {pos.title}
                            </h3>
                            <span className="text-xs font-medium text-csl-muted">
                              {pos.category}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {pos.vacancies}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-[#FAF7F2] p-2.5 md:p-3 rounded-xl border border-csl-gold/20 text-xs md:text-sm">
                        <span className="text-csl-muted font-bold uppercase tracking-wider text-[10px] md:text-xs">
                          Experience / Eligibility
                        </span>
                        <span className="font-extrabold text-csl-text">
                          {pos.experience}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpandPosition(pos.id)}
                          className="py-2.5 md:py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm bg-white border border-csl-gold/35 text-csl-text hover:text-csl-blue flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyClick(pos.title)}
                          className="py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.99] hover:shadow-md transition-all"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Accordion: Full Official JD Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-csl-gold/25 bg-[#FCFAF6] rounded-2xl p-5 sm:p-7 flex flex-col gap-6">
                            {/* Job Summary */}
                            <div>
                              <span className="text-xs font-bold text-csl-blue uppercase tracking-wider block mb-1.5">
                                Job Summary
                              </span>
                              <p className="text-xs sm:text-sm text-csl-text font-medium leading-relaxed">
                                {pos.summary}
                              </p>
                            </div>

                            {/* Full-time Opportunity Callout if present */}
                            {pos.opportunity && (
                              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-xs sm:text-sm font-semibold text-emerald-900 leading-snug">
                                  <span className="font-extrabold">Full-Time Opportunity: </span>
                                  {pos.opportunity}
                                </div>
                              </div>
                            )}

                            {/* Key Responsibilities */}
                            <div>
                              <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-2.5">
                                Key Responsibilities
                              </span>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-csl-muted font-medium">
                                {pos.responsibilities.map((resp, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-csl-blue mt-1.5 shrink-0" />
                                    <span className="leading-relaxed text-csl-text/90">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Required Skills */}
                            <div>
                              <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-2.5">
                                Required Skills
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {pos.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-csl-gold/30 text-xs font-bold text-csl-text shadow-2xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Qualifications & Structure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-csl-gold/20">
                              {/* Qualifications */}
                              <div>
                                <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-1.5">
                                  Qualifications
                                </span>
                                <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-csl-muted font-medium">
                                  {pos.qualifications.map((qual, qIdx) => (
                                    <li key={qIdx} className="flex items-start gap-2">
                                      <GraduationCap className="w-4 h-4 text-csl-blue shrink-0 mt-0.5" />
                                      <span className="leading-snug text-csl-text/90">{qual}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Internship Structure */}
                              {pos.internshipStructure && (
                                <div>
                                  <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-1.5">
                                    Internship Structure
                                  </span>
                                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-csl-muted font-medium">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-csl-gold shrink-0" />
                                      <span className="text-csl-text/90">
                                        <strong className="text-csl-text">Duration:</strong> {pos.internshipStructure.duration}
                                      </span>
                                    </div>
                                    {pos.internshipStructure.stages && pos.internshipStructure.stages.length > 0 && (
                                      <ul className="flex flex-col gap-1 pl-6 list-disc list-outside text-csl-text/85 text-xs sm:text-[13px]">
                                        {pos.internshipStructure.stages.map((stage, stIdx) => (
                                          <li key={stIdx}>{stage}</li>
                                        ))}
                                      </ul>
                                    )}
                                    {pos.internshipStructure.note && (
                                      <p className="text-[11px] sm:text-xs text-csl-muted italic pt-1">
                                        <strong className="text-csl-text not-italic font-bold">Note: </strong>
                                        {pos.internshipStructure.note}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Bottom Apply Bar in expanded view */}
                            <div className="flex items-center justify-between pt-3 border-t border-csl-gold/20 flex-wrap gap-3">
                              <span className="text-xs font-semibold text-csl-muted">
                                Ready to join? Submit your details directly to our recruitment team.
                              </span>
                              <button
                                type="button"
                                onClick={() => handleApplyClick(pos.title)}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                              >
                                <span>Apply for {pos.title}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            3. CONCISE CSL CAREER ADVANTAGE HIGHLIGHTS
           ================================================== */}
        <section className="relative w-full py-12 md:py-16 border-t border-csl-gold/20 bg-[#FAF7F2]/60">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Continuous Learning
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Access to structured mentorship, training materials, and workshops across modern digital skills.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Collaborative Culture
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Work directly with cross-functional teams in technology, marketing, human resources, and business growth.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Direct Impact
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Engage with genuine client deliverables and educational initiatives from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            4. RESTORED ORIGINAL FULL-PAGE APPLICATION FORM
           ================================================== */}
        <section 
          id="apply-form" 
          className="relative w-full py-16 md:py-24 border-t border-csl-gold/20 bg-gradient-to-b from-transparent via-[#F7F4EE]/60 to-[#F2EDE3]/50"
        >
          <div className="section-container">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <div className="section-eyebrow justify-center">
                <span>DIRECT APPLICATION</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Submit Your Application
              </h2>
              <p className="text-csl-muted font-medium text-sm sm:text-base section-subheading">
                Prefer to apply right here? Fill out the form below to forward your profile directly to our recruitment team.
              </p>
            </div>

            {/* Layout: Main Form Box + Contact Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
              {/* Application Form Box */}
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-csl-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm w-full">
                <CareerApplicationForm
                  initialPosition={selectedPosition}
                  positions={positionDropdownOptions}
                  context="full-page"
                />
              </div>

              {/* Sidebar: Recruitment & Office Details */}
              <div className="flex flex-col gap-4 w-full">
                {/* Office Info Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-csl-deep-blue via-[#062B82] to-csl-blue backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-md text-white">
                  <MapPin 
                    className="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 pointer-events-none" 
                    strokeWidth={2.5}
                  />

                  <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                    <MapPin className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col relative z-10">
                    <h4 className="text-base font-bold text-white mb-1">
                      Office Location
                    </h4>
                    <p className="text-xs font-medium text-white/85 leading-relaxed">
                      No.48A, Rajiv Gandhi Salai (OMR) <br />
                      Karapakkam, <br />
                      Chennai – 600097, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* HR Contacts Card */}
                <div className="relative overflow-hidden bg-white/80 border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-base font-bold text-csl-text mb-1">
                      Recruitment Contact
                    </h4>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-csl-text">
                      <a
                        href="mailto:hr@creatorspacelab.org.in"
                        className="hover:text-csl-blue transition-colors break-words"
                      >
                        hr@creatorspacelab.org.in
                      </a>
                      <a
                        href="mailto:hr.info@creatorspacelab.org.in"
                        className="hover:text-csl-blue transition-colors break-words"
                      >
                        hr.info@creatorspacelab.org.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Phone Card */}
                <div className="relative overflow-hidden bg-white/80 border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-base font-bold text-csl-text mb-1">
                      Direct Helplines
                    </h4>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-csl-text">
                      <a
                        href="https://wa.me/918056052806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 80560 52806
                      </a>
                      <a
                        href="https://wa.me/919500802806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 95008 02806
                      </a>
                      <a
                        href="https://wa.me/919500802806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 96801 00306
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Career Application Modal (Triggered by Apply Now buttons) */}
      <CareerModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialPosition={selectedPosition}
        positions={positionDropdownOptions}
      />
    </div>
  );
}

export default CareersPage;
