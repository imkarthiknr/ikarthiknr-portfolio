export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  link?: string;
};

// Newest first
export const certifications: Certification[] = [
  {
    name: 'Claude Certified Associate – Foundations',
    issuer: 'Anthropic',
    issued: 'Sep 2026',
    expires: 'Sep 2027',
    link: 'https://www.credly.com/badges/60580889-7bd6-4e14-99c6-627b0038279f/public_url',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issued: '2024',
    link: 'https://www.credly.com/badges/ae58fa98-3361-4c78-adf6-5bb101737f3d/linked_in_profile',
  },
  {
    name: 'IBM Data Science Specialization',
    issuer: 'Coursera · IBM',
    issued: '2019',
    link: 'https://www.coursera.org/account/accomplishments/verify/JG5ENV76KN8P',
  },
  {
    name: 'Programming for Everybody (Python)',
    issuer: 'Coursera · University of Michigan',
    issued: '2019',
    link: 'https://www.coursera.org/account/accomplishments/verify/3RRM9W5JN9BY',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issued: '2018',
    link: 'https://www.freecodecamp.org/certification/fcc126335d8-6f80-495b-b9b8-b8cd8c915b89/responsive-web-design',
  },
];

export type Education = {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  note: string;
  highlights: string[];
};

export const education: Education[] = [
  {
    degree: 'M.Tech, Software Systems (Data Analytics)',
    institution: 'BITS Pilani — WILP',
    period: '2023 – 2025',
    grade: 'First Class',
    note: 'Dissertation: “Multimodal AI-Enhanced Educational Assistant with Real-Time Q&A and Dynamic Learning Support”.',
    highlights: [
      'Statistical and machine learning methods applied to real-world data',
      'Advanced AI: deep learning, NLP and large language models',
      'Python, TensorFlow, Keras, NumPy, SciPy, Pandas, NLTK',
    ],
  },
  {
    degree: 'B.E., Computer Science & Engineering',
    institution: 'Sri Sairam Engineering College, Chennai',
    period: '2016 – 2020',
    grade: 'First Class',
    note: 'Foundations in algorithms, data structures and software engineering.',
    highlights: [
      '2nd place (₹25,000 prize) — Hack & Tackle Hackathon 2019',
      'Organiser, national-level symposium SYNSARA 2K19',
      'Web Developer Intern, Lema Labs India (Nov 2019 – Feb 2020)',
      'Ran a web development workshop for the college coding club (2018)',
    ],
  },
  {
    degree: 'Higher Secondary (MPC)',
    institution: 'Zion Matriculation Hr. Sec. School, Chennai',
    period: '2014 – 2016',
    grade: '93.2%',
    note: 'Mathematics, Physics, Chemistry and Computer Science.',
    highlights: ['“Scholar” badge for 90%+ in all subjects (2015–16)', '98% in French'],
  },
];
