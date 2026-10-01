import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import { certifications, education } from '@/data/credentials';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const Credentials = () => (
  <section id="credentials" className="section">
    <div className="container-page">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & education"
        description="Formal learning that backs up the day job."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="surface p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-semibold">
            <Award className="h-5 w-5 text-primary" /> Certifications
          </h3>
          <ul className="mt-6 divide-y">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium leading-snug">
                    {cert.name}
                    {i === 0 && (
                      <span className="ml-2 inline-flex translate-y-[-1px] rounded-full bg-primary/10 px-2 py-0.5 align-middle text-[11px] font-medium text-primary">
                        New
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer} · {cert.issued}
                    {cert.expires && <> — valid until {cert.expires}</>}
                  </p>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted-foreground hover:text-primary"
                    aria-label={`Verify ${cert.name}`}
                  >
                    Verify <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06} className="surface p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-5 w-5 text-primary" /> Education
          </h3>
          <ol className="mt-6 space-y-6">
            {education.map((ed) => (
              <li key={ed.degree} className="relative border-l pl-5">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-medium">{ed.degree}</p>
                  <p className="font-mono text-xs text-muted-foreground">{ed.period}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {ed.institution} · {ed.grade}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ed.note}</p>
                <ul className="mt-2 space-y-1">
                  {ed.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Credentials;
