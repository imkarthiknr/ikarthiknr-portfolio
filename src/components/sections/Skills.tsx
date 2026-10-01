import { skillGroups } from '@/data/skills';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const Skills = () => (
  <section id="skills" className="section">
    <div className="container-page">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        description="The stack I reach for at work and on side projects."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.05} className="bg-card p-6 md:p-7">
            <h3 className="font-semibold">{group.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border bg-background px-2.5 py-1 text-[13px] transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
