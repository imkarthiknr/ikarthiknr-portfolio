import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredProjects } from '@/data/projects';
import SectionHeading from '../SectionHeading';
import ProjectCard from '../ProjectCard';
import Reveal from '../Reveal';

const Projects = () => (
  <section id="projects" className="section">
    <div className="container-page">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I've built"
        description="Side projects where I explore AI agents, developer tooling and products people actually use."
        action={
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/projects">
              Browse all projects <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06} className="h-full">
            <ProjectCard project={p} showHighlights />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
