import awsLogo from '@/assets/aws.png';
import prodaptLogo from '@/assets/prodapt.png';

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  logo: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    id: 'amazon-sde',
    company: 'Amazon',
    role: 'System Development Engineer I',
    start: 'Aug 2024',
    end: 'Present',
    location: 'Chennai, India',
    logo: awsLogo,
    summary:
      'Designing and operating highly available distributed systems for large-scale AI evaluation platforms supporting multi-language workloads.',
    highlights: [
      'Cut end-to-end execution time from 5 days to 45 hours by redesigning orchestration and parallelism.',
      'Built scalable infrastructure on AWS (Lambda, S3, Batch, SQS, CDK) for high-throughput, fault-tolerant execution.',
      'Designed partial-execution and failure-recovery mechanisms, improving resilience and reducing downtime.',
      'Developed automation frameworks for orchestration, dependency handling and execution workflows across services.',
      'Implemented Splunk-based monitoring and logging for real-time observability, debugging and incident analysis.',
      'Built Jenkins CI/CD pipelines for safe, reproducible releases; own production operations and release management.',
    ],
    stack: ['AWS Lambda', 'S3', 'AWS Batch', 'SQS', 'CDK', 'Python', 'Jenkins', 'Splunk'],
  },
  {
    id: 'aws-appeng',
    company: 'Amazon Web Services',
    role: 'Application Engineer III',
    start: 'Oct 2022',
    end: 'Jul 2024',
    location: 'Chennai, India',
    logo: awsLogo,
    summary:
      'Built backend systems for large-scale evaluation and processing platforms supporting 80+ programming languages — contributing to Amazon Q and CodeWhisperer.',
    highlights: [
      'Built distributed workflows using AWS Lambda, DynamoDB, S3, Batch and ECR.',
      'Designed systems for scalable, reliable data processing across distributed services.',
      'Automated execution pipelines and improved efficiency through workflow optimization.',
      'Drove monitoring, debugging and performance improvements in production.',
    ],
    stack: ['AWS', 'DynamoDB', 'ECR', 'Python', 'Docker'],
  },
  {
    id: 'prodapt',
    company: 'Prodapt Solutions',
    role: 'Software Engineer',
    start: 'Jun 2020',
    end: 'Sep 2022',
    location: 'Chennai, India',
    logo: prodaptLogo,
    summary: 'Developed backend and full-stack applications for production telecom systems.',
    highlights: [
      'Built REST APIs and backend workflows using Python (Flask), PHP and SQL.',
      'Developed Angular front-ends for internal production tools.',
      'Wrote automation scripts and improved application performance.',
      'Supported production systems through debugging and issue resolution.',
    ],
    stack: ['Python', 'Flask', 'PHP', 'Angular', 'SQL'],
  },
];
