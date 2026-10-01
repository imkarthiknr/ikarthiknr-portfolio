export type SkillGroup = { title: string; description: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: 'What I write every day',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL'],
  },
  {
    title: 'Cloud & AWS',
    description: 'Serverless and batch at scale',
    skills: ['Lambda', 'S3', 'AWS Batch', 'DynamoDB', 'SQS', 'ECR', 'CDK', 'Firebase', 'GCP Cloud Run'],
  },
  {
    title: 'AI & Data',
    description: 'LLM apps and agents',
    skills: ['LLM Applications', 'Multi-agent Systems', 'LangGraph', 'Claude API', 'TensorFlow', 'Keras', 'Pandas', 'NLTK'],
  },
  {
    title: 'Backend & Systems',
    description: 'Reliable services',
    skills: ['Distributed Systems', 'System Design', 'FastAPI', 'Flask', 'Node.js', 'REST APIs', 'Fault Tolerance'],
  },
  {
    title: 'Frontend',
    description: 'Clean, fast interfaces',
    skills: ['React', 'Tailwind CSS', 'Angular', 'HTML & CSS'],
  },
  {
    title: 'DevOps & Observability',
    description: 'Ship safely, see everything',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Splunk', 'Monitoring & Logging'],
  },
];
