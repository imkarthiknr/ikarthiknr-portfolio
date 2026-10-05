import { useMemo } from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { profile } from '@/data/profile';
import { useLeetCode, type LeetCodeStats } from '@/hooks/use-leetcode';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import ActivityHeatmap, { daysFromCounts } from '../ActivityHeatmap';
import { LeetCodeIcon } from '../icons';

const SOLUTIONS_REPO = 'https://github.com/imkarthiknr/LeetCode-Solutions';
// LeetCode reports this placeholder rank for accounts that aren't ranked yet
const UNRANKED = 5_000_000;

const difficulties = [
  { key: 'easy', label: 'Easy', color: '#1cb8b8' },
  { key: 'medium', label: 'Medium', color: '#ffb700' },
  { key: 'hard', label: 'Hard', color: '#f63737' },
] as const;

const SolvedRing = ({ solved, total }: { solved: number; total: number }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = total ? solved / total : 0;
  return (
    <div className="relative grid h-32 w-32 shrink-0 place-items-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="8" stroke="hsl(var(--heat-0))" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="hsl(var(--primary))"
          strokeDasharray={`${Math.max(pct * c, solved ? 4 : 0)} ${c}`}
        />
      </svg>
      <div className="text-center">
        <p className="text-3xl font-semibold tabular-nums tracking-tight">{solved}</p>
        <p className="text-xs text-muted-foreground">of {total.toLocaleString()}</p>
      </div>
    </div>
  );
};

const Progress = ({ data }: { data: LeetCodeStats }) => {
  const days = useMemo(() => daysFromCounts(data.calendar), [data.calendar]);
  const yearTotal = days.reduce((sum, d) => sum + d.count, 0);

  const stats = [
    { label: 'Global rank', value: data.ranking && data.ranking < UNRANKED ? `#${data.ranking.toLocaleString()}` : '—' },
    { label: 'Contest rating', value: data.contest ? data.contest.rating.toLocaleString() : '—' },
    { label: 'Active days', value: data.activeDays.toLocaleString() },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <SolvedRing solved={data.solved.all} total={data.totals.all} />
        <div className="flex-1 space-y-3">
          {difficulties.map((d) => {
            const solved = data.solved[d.key];
            const total = data.totals[d.key];
            return (
              <div key={d.key}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium" style={{ color: d.color }}>
                    {d.label}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    <span className="font-medium text-foreground">{solved}</span> / {total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[hsl(var(--heat-0))]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max((solved / total) * 100, solved ? 1.5 : 0)}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 divide-x rounded-xl border">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3">
            <dt className="text-xs text-muted-foreground">{s.label}</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t pt-5">
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Submissions</h4>
        <ActivityHeatmap
          days={days}
          unit="submission"
          summary={
            <>
              <span className="font-medium text-foreground">{yearTotal}</span> submissions in the last year
            </>
          }
        />
      </div>
    </>
  );
};

const Details = ({ data }: { data: LeetCodeStats }) => (
  <>
    <h3 className="mb-3 font-semibold">Recently solved</h3>
    {data.recent.length ? (
      <ul className="-mx-2">
        {data.recent.map((s) => (
          <li key={s.url + s.solvedAt}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-secondary"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium group-hover:text-primary">{s.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.lang} · {formatDistanceToNowStrict(parseISO(s.solvedAt), { addSuffix: true })}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm leading-relaxed text-muted-foreground">
        No recent accepted submissions. My worked solutions — with approach notes in Python and C++ — live in{' '}
        <a href={SOLUTIONS_REPO} target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">
          LeetCode-Solutions
        </a>
        .
      </p>
    )}

    {data.languages.length > 0 && (
      <div className="mt-6 border-t pt-5">
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Languages</h4>
        <div className="flex flex-wrap gap-1.5">
          {data.languages.map((l) => (
            <span key={l.name} className="chip">
              {l.name} <span className="ml-1.5 tabular-nums text-muted-foreground">{l.solved}</span>
            </span>
          ))}
        </div>
      </div>
    )}

    {data.topics.length > 0 && (
      <div className="mt-6 border-t pt-5">
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Top topics</h4>
        <div className="flex flex-wrap gap-1.5">
          {data.topics.map((t) => (
            <span key={t.name} className="rounded-md border bg-background px-2.5 py-1 text-[13px]">
              {t.name} <span className="ml-1 tabular-nums text-muted-foreground">×{t.solved}</span>
            </span>
          ))}
        </div>
      </div>
    )}
  </>
);

const LeetCodeActivity = () => {
  const { data, isLoading, isError } = useLeetCode();

  return (
    <section id="leetcode" className="section pt-0 md:pt-0">
      <div className="container-page">
        <SectionHeading
          eyebrow="Problem solving"
          title="LeetCode activity"
          description="Data structures and algorithms practice — synced from my LeetCode profile daily."
          action={
            <a
              href={data?.profileUrl ?? profile.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <LeetCodeIcon size={15} /> @{data?.username ?? profile.leetcode.username} <ArrowUpRight className="h-4 w-4" />
            </a>
          }
        />

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Skeleton className="h-[420px] rounded-2xl" />
            <Skeleton className="h-[420px] rounded-2xl" />
          </div>
        )}

        {isError && (
          <div className="surface p-8 text-center text-sm text-muted-foreground">
            LeetCode stats are unavailable right now —{' '}
            <a href={profile.leetcode.url} target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">
              view my profile
            </a>
            .
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Reveal className="surface p-6">
              <h3 className="mb-5 font-semibold">Problems solved</h3>
              <Progress data={data} />
            </Reveal>
            <Reveal delay={0.06} className="surface p-6">
              <Details data={data} />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCodeActivity;
