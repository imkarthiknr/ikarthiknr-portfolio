import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { experiences, type Experience as ExperienceItem } from '@/data/experience';
import { yearsOfExperience } from '@/data/profile';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const VISIBLE_HIGHLIGHTS = 3;

const ExperienceCard = ({ item, current }: { item: ExperienceItem; current: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const hidden = item.highlights.length - VISIBLE_HIGHLIGHTS;
  const shown = expanded ? item.highlights : item.highlights.slice(0, VISIBLE_HIGHLIGHTS);

  return (
    <div className="relative grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
      {/* Date column */}
      <div className="pl-10 md:pl-0 md:pt-6 md:text-right">
        <p className="font-mono text-sm text-muted-foreground">
          {item.start} — {item.end}
        </p>
        {current && (
          <span className="mt-2 inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            Current
          </span>
        )}
      </div>

      {/* Timeline node */}
      <span
        className={cn(
          'absolute left-[11px] top-1 h-[11px] w-[11px] rounded-full border-2 border-background ring-2 md:left-[calc(180px+20px-5px)] md:top-8',
          current ? 'bg-primary ring-primary/30' : 'bg-muted-foreground/50 ring-border',
        )}
      />

      <div className="surface surface-hover ml-10 p-6 md:ml-0">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border bg-white p-2">
            <img src={item.logo} alt="" className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold leading-snug">{item.role}</h3>
            <p className="text-sm text-muted-foreground">
              {item.company} <span className="mx-1">·</span>
              <MapPin className="mb-0.5 inline h-3 w-3" /> {item.location}
            </p>
          </div>
        </div>

        {item.summary && <p className="mt-4 text-[15px] leading-relaxed">{item.summary}</p>}

        {shown.length > 0 && (
        <ul className="mt-4 space-y-2">
          {shown.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
              {h}
            </li>
          ))}
        </ul>
        )}
        {hidden > 0 && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `Show ${hidden} more`}
            <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
          </button>
        )}

        {item.stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => (
  <section id="experience" className="section">
    <div className="container-page">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description={`${yearsOfExperience()} years across Amazon, AWS and Prodapt — mostly backend, mostly at scale.`}
      />

      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:left-[200px]"
        />
        <div className="space-y-8">
          {experiences.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <ExperienceCard item={item} current={item.end === 'Present'} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
