import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Play, Zap, Moon, Type, Download, Terminal, Wifi, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

type ProjectFeature = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

type Project = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
  featured?: boolean;
  features?: ProjectFeature[];
};

// ─── Add new projects here ───────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    title: "NotesPro",
    tagline: "URL-based minimalist notepad — no sign-up, just write and share.",
    description:
      "A minimalist web notepad where every unique URL is its own note. Write instantly, share by sending the link, and access your note from anywhere — no accounts, no friction. Built with a focus on simplicity and speed.",
    tags: ["HTML", "JavaScript", "Firebase Realtime DB", "Firebase Hosting", "Cloud Functions"],
    github: "https://github.com/imkarthiknr/NotesPro",
    demo: "https://notespro-769cb.web.app/",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=600&fit=crop",
    featured: true,
    features: [
      { icon: Zap,      label: "Auto-save",          desc: "Saves automatically after you stop typing" },
      { icon: Moon,     label: "Dark / Light",        desc: "Theme switching built in" },
      { icon: Type,     label: "Font size",           desc: "Adjustable from 8 – 40 px" },
      { icon: Download, label: "Multi-format export", desc: "txt, md, js, json, sql, yaml & more" },
      { icon: Terminal, label: "CLI support",         desc: "Raw text endpoint for shell scripting" },
      { icon: Wifi,     label: "Offline-first",       desc: "Works locally with zero external deps" },
    ],
  },
  // Add more projects below — featured cards span full width, regular cards tile in a grid
];
// ─────────────────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const FeaturedCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={cardVariants}
    className="group relative overflow-hidden rounded-3xl glass col-span-full"
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.3 }}
  >
    {/* Hero Image */}
    <div className="relative overflow-hidden h-72 md:h-96">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Play className="w-4 h-4 mr-2" />Live Demo
            </a>
          </Button>
          <Button size="sm" variant="outline" className="glass border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} /><span className="ml-2">Source</span>
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute top-5 left-5">
        <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold glow-purple">
          Featured
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-accent font-medium mb-4">{project.tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-3 shrink-0">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple hover:glow-intense transition-all duration-300" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />View Live
            </a>
          </Button>
          <Button variant="outline" className="glass border-border hover:border-primary transition-all duration-300" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} /><span className="ml-2">GitHub</span>
            </a>
          </Button>
        </div>
      </div>

      {project.features && project.features.length > 0 && (
        <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-3 gap-4">
          {project.features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start space-x-3 group/feat">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/feat:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    </div>
  </motion.div>
);

const RegularCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={cardVariants}
    className="group relative overflow-hidden rounded-2xl glass"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative overflow-hidden h-52">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-3">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Play className="w-4 h-4 mr-1" />Demo
            </a>
          </Button>
          <Button size="sm" variant="outline" className="glass border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={14} /><span className="ml-1">Code</span>
            </a>
          </Button>
        </div>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-accent text-sm font-medium mb-3">{project.tagline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <a href={project.demo} className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4 mr-1" />View Live
        </a>
        <a href={project.github} className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" target="_blank" rel="noopener noreferrer">
          <GithubIcon size={14} /><span className="ml-1">Source</span>
        </a>
      </div>
    </div>

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl" />
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects.filter((p) => p.featured);
  const regular  = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects that showcase my skills in building useful, well-crafted software.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Grid — featured cards span full width, regular cards tile in columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => <FeaturedCard key={p.id} project={p} />)}
            {regular.map((p)  => <RegularCard  key={p.id} project={p} />)}
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};

export default ProjectsSection;
