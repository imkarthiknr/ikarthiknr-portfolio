import { ArrowUpRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { GithubIcon } from './icons';

const statusStyles: Record<Project['status'], string> = {
  Live: 'bg-success/15 text-success',
  Alpha: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  'In development': 'bg-muted text-muted-foreground',
};

export const ProjectCover = ({ project, className }: { project: Project; className?: string }) => {
  const h = project.hue;
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, hsl(${h} 85% 62%) 0%, transparent 60%),
                     radial-gradient(100% 100% at 100% 100%, hsl(${(h + 40) % 360} 80% 45%) 0%, transparent 65%),
                     hsl(${h} 45% 18%)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
        }}
      />
      <span className="absolute -bottom-6 -right-2 select-none font-semibold leading-none tracking-tighter text-white/15 transition-transform duration-700 group-hover:scale-105 text-[8rem]">
        {project.title.slice(0, 2)}
      </span>
      <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
        {project.categories.map((c) => (
          <span key={c} className="rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            {c}
          </span>
        ))}
      </div>
      <p className="absolute bottom-5 left-5 font-mono text-xs text-white/80">{project.year}</p>
    </div>
  );
};

type ProjectCardProps = { project: Project; showHighlights?: boolean };

const ProjectCard = ({ project, showHighlights = false }: ProjectCardProps) => {
  const primaryHref = project.demo ?? project.github;
  const extraTags = project.tags.length - 5;

  return (
    <article className="surface surface-hover group relative flex h-full flex-col overflow-hidden hover:-translate-y-0.5">
      <ProjectCover project={project} className="h-40" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            {/* stretched link makes the whole card clickable */}
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
              {project.title}
            </a>
          </h3>
          <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[project.status])}>
            {project.status}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>

        {showHighlights && (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {extraTags > 0 && <span className="chip text-muted-foreground">+{extraTags}</span>}
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-4 pt-6 text-sm font-medium">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground hover:text-primary"
            >
              {project.demoLabel ?? 'Live site'} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <GithubIcon size={15} /> Source
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
