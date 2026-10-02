import { Bot, Cloud, Gauge, Network } from 'lucide-react';
import { yearsOfExperience } from '@/data/profile';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const focusAreas = [
  {
    icon: Network,
    title: 'Distributed systems',
    body: 'Highly available, fault-tolerant services with partial execution and graceful recovery.',
  },
  {
    icon: Cloud,
    title: 'Cloud infrastructure',
    body: 'Serverless and batch workloads on AWS — Lambda, Batch, SQS, DynamoDB — defined with CDK.',
  },
  {
    icon: Bot,
    title: 'Applied AI',
    body: 'LLM-powered products and multi-agent tools, from evaluation platforms to code review agents.',
  },
  {
    icon: Gauge,
    title: 'Performance & ops',
    body: 'Observability, CI/CD and the unglamorous work that turns a 5-day pipeline into 45 hours.',
  },
];

const About = () => (
  <section id="about" className="section">
    <div className="container-page">
      <SectionHeading eyebrow="About" title="Engineer by trade, builder by habit." />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm a <span className="text-foreground">System Development Engineer II at Amazon</span> with{' '}
            {yearsOfExperience()} years of experience building scalable backend systems and developer tools. I work on
            the infrastructure behind large-scale AI evaluation — the kind of systems that have to be fast, observable
            and boringly reliable.
          </p>
          <p>
            Before that I was an Application Engineer at AWS contributing to platforms behind{' '}
            <span className="text-foreground">Amazon Q</span> and <span className="text-foreground">CodeWhisperer</span>,
            and started my career shipping full-stack apps at Prodapt.
          </p>
          <p>
            Outside work I build side projects around AI agents and developer productivity, solve problems on LeetCode
            and Codeforces, and write about engineering on DEV and Medium. I hold an M.Tech in Software Systems from BITS
            Pilani.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.06} className="surface surface-hover p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <area.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
