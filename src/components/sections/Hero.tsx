import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, FileDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { profile, yearsOfExperience } from '@/data/profile';
import { projects } from '@/data/projects';
import { certifications } from '@/data/credentials';
import { useGitHubUser } from '@/hooks/use-github';
import portrait from '@/assets/KarthikNR_Profile_Picture-PNG.png';
import { socialIcons } from '../icons';

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const Hero = () => {
  const { data: gh } = useGitHubUser();
  const latestCert = certifications[0];

  const stats = [
    { value: yearsOfExperience(), label: 'Years building software' },
    { value: `${projects.length}`, label: 'Shipped side projects' },
    { value: gh ? `${gh.public_repos}` : '—', label: 'Public repositories' },
    { value: `${certifications.length}`, label: 'Certifications' },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {profile.role} at {profile.company}
              </span>
            </motion.div>

            <motion.p {...fadeUp(0.08)} className="mt-6 text-lg text-muted-foreground">
              Hi, I'm <span className="font-medium text-foreground">{profile.name}</span> —
            </motion.p>

            <motion.h1
              {...fadeUp(0.14)}
              className="text-balance mt-2 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              I build reliable distributed systems and{' '}
              <span className="bg-gradient-to-r from-primary to-[hsl(200_90%_55%)] bg-clip-text text-transparent">
                AI&#8209;powered tools
              </span>
              .
            </motion.h1>

            <motion.p {...fadeUp(0.22)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {yearsOfExperience()} years designing cloud infrastructure on AWS — from evaluation platforms behind Amazon Q
              and CodeWhisperer to multi-agent developer tools I build on the side.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link to="/projects">
                  View my work <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-6">
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-1 h-4 w-4" /> Résumé
                </a>
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.38)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {profile.location}
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex gap-1">
                {profile.socials.slice(0, 5).map((s) => {
                  const Icon = socialIcons[s.label];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border bg-gradient-to-b from-primary/25 via-primary/5 to-transparent">
              <div className="absolute inset-0 bg-grid opacity-60" />
              <img
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                className="absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                fetchPriority="high"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="absolute -bottom-5 -left-3 flex max-w-[280px] items-center gap-3 rounded-2xl border bg-background/85 p-3 pr-4 shadow-xl backdrop-blur-xl sm:-left-6"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Newly certified · {latestCert.issued}
                </p>
                <p className="text-sm font-medium leading-snug">{latestCert.name}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.dl
          {...fadeUp(0.5)}
          className="mt-20 grid grid-cols-2 divide-border overflow-hidden rounded-2xl border bg-card/60 backdrop-blur md:grid-cols-4 md:divide-x"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-6 ${i < 2 ? 'border-b md:border-b-0' : ''} ${i % 2 === 0 ? 'border-r md:border-r-0' : ''}`}
            >
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default Hero;
