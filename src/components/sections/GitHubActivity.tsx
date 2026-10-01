import { useEffect, useMemo, useRef } from 'react';
import { formatDistanceToNowStrict, format, parseISO } from 'date-fns';
import { ArrowUpRight, GitCommitHorizontal, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { profile } from '@/data/profile';
import { useContributions, useGitHubRepos, useGitHubUser, type ContributionDay } from '@/hooks/use-github';
import { languageColor } from '@/lib/languages';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { GithubIcon } from '../icons';

const levelStyle = (level: number) =>
  level === 0
    ? { backgroundColor: 'hsl(var(--heat-0))' }
    : { backgroundColor: `hsl(var(--primary) / ${[0, 0.3, 0.5, 0.75, 1][level]})` };

/** Splits days into week columns (Sun→Sat), padding the first week. */
const toWeeks = (days: ContributionDay[]) => {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = Array(parseISO(days[0].date).getDay()).fill(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
};

const Heatmap = () => {
  const { data, isLoading, isError } = useContributions();
  const scrollRef = useRef<HTMLDivElement>(null);
  const weeks = useMemo(() => (data ? toWeeks(data.days) : []), [data]);

  // On narrow screens, start scrolled to the most recent weeks
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [weeks.length]);

  if (isLoading) return <Skeleton className="h-[150px] w-full rounded-xl" />;
  if (isError || !data)
    return <p className="py-10 text-center text-sm text-muted-foreground">Contribution graph is unavailable right now.</p>;

  return (
    <div>
      <div ref={scrollRef} className="overflow-x-auto pb-2 [scrollbar-width:thin]">
        <div className="inline-flex min-w-full flex-col gap-1.5">
          {/* Month labels */}
          <div className="flex gap-[3px] pl-0 text-[10px] text-muted-foreground">
            {weeks.map((w, i) => {
              const first = w.find(Boolean);
              const label = first && parseISO(first.date).getDate() <= 7 ? format(parseISO(first.date), 'MMM') : '';
              return (
                <span key={i} className="w-[11px] shrink-0 overflow-visible whitespace-nowrap">
                  {label}
                </span>
              );
            })}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, d) => {
                  const day = w[d];
                  if (!day) return <span key={d} className="h-[11px] w-[11px]" />;
                  return (
                    <Tooltip key={d} delayDuration={50}>
                      <TooltipTrigger asChild>
                        <span className="h-[11px] w-[11px] rounded-[3px]" style={levelStyle(day.level)} />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <span className="font-medium">
                          {day.count} contribution{day.count === 1 ? '' : 's'}
                        </span>{' '}
                        on {format(parseISO(day.date), 'MMM d, yyyy')}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{data.total}</span> contributions in the last year
        </span>
        <span className="flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="h-[10px] w-[10px] rounded-[2px]" style={levelStyle(l)} />
          ))}
          More
        </span>
      </div>
    </div>
  );
};

const LanguageBar = () => {
  const { data: repos } = useGitHubRepos();
  const langs = useMemo(() => {
    if (!repos) return [];
    const counts = new Map<string, number>();
    repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, pct: (n / total) * 100 }));
  }, [repos]);

  if (!langs.length) return <Skeleton className="h-12 w-full" />;

  return (
    <div>
      <div className="flex h-2 overflow-hidden rounded-full">
        {langs.map((l) => (
          <span key={l.name} style={{ width: `${l.pct}%`, backgroundColor: languageColor(l.name) }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {langs.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(l.name) }} />
            <span className="text-foreground">{l.name}</span> {Math.round(l.pct)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecentRepos = () => {
  const { data: repos, isLoading } = useGitHubRepos();

  if (isLoading)
    return (
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  if (!repos?.length) return <p className="text-sm text-muted-foreground">Recent activity is unavailable right now.</p>;

  return (
    <ul className="-mx-2">
      {repos.slice(0, 4).map((r) => (
        <li key={r.id}>
          <a
            href={r.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-secondary"
          >
            <GitCommitHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium group-hover:text-primary">{r.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDistanceToNowStrict(parseISO(r.pushed_at), { addSuffix: true })}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                {r.language && (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(r.language) }} />
                    {r.language}
                  </span>
                )}
                {r.stargazers_count > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3" /> {r.stargazers_count}
                  </span>
                )}
                {r.description && <span className="truncate">{r.description}</span>}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

const GitHubActivity = () => {
  const { data: user } = useGitHubUser();

  return (
    <section id="github" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Open source"
          title="GitHub activity"
          description="Live from my GitHub — what I've been shipping lately."
          action={
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <GithubIcon size={16} /> @{profile.github.username} <ArrowUpRight className="h-4 w-4" />
            </a>
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Reveal className="surface flex flex-col p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold">Contributions</h3>
              <div className="flex gap-5 text-sm">
                <span className="text-muted-foreground">
                  <span className="font-semibold tabular-nums text-foreground">{user?.public_repos ?? '—'}</span> repos
                </span>
                <span className="text-muted-foreground">
                  <span className="font-semibold tabular-nums text-foreground">{user?.followers ?? '—'}</span> followers
                </span>
              </div>
            </div>
            <Heatmap />
            <div className="mt-6 border-t pt-5">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">Languages across repos</h4>
              <LanguageBar />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="surface p-6">
            <h3 className="mb-3 font-semibold">Recently pushed</h3>
            <RecentRepos />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
