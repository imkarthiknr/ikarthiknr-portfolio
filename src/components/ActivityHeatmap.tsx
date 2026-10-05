import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type ActivityDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const levelStyle = (level: number) =>
  level === 0
    ? { backgroundColor: 'hsl(var(--heat-0))' }
    : { backgroundColor: `hsl(var(--primary) / ${[0, 0.3, 0.5, 0.75, 1][level]})` };

/** Splits days into week columns (Sun→Sat), padding the first week. */
const toWeeks = (days: ActivityDay[]) => {
  const weeks: (ActivityDay | null)[][] = [];
  let week: (ActivityDay | null)[] = Array(parseISO(days[0].date).getDay()).fill(null);
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

/** Builds the last 365 days from a { "YYYY-MM-DD": count } map, bucketing counts into levels. */
export const daysFromCounts = (counts: Record<string, number>): ActivityDay[] => {
  const today = new Date();
  return Array.from({ length: 365 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (364 - i));
    const date = format(d, 'yyyy-MM-dd');
    const count = counts[date] ?? 0;
    const level = (count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4) as ActivityDay['level'];
    return { date, count, level };
  });
};

type ActivityHeatmapProps = {
  days: ActivityDay[];
  /** Noun for the tooltip, e.g. "contribution" or "submission" */
  unit: string;
  summary: ReactNode;
};

const ActivityHeatmap = ({ days, unit, summary }: ActivityHeatmapProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const weeks = useMemo(() => (days.length ? toWeeks(days) : []), [days]);

  // On narrow screens, start scrolled to the most recent weeks
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [weeks.length]);

  return (
    <div>
      <div ref={scrollRef} className="overflow-x-auto pb-2 [scrollbar-width:thin]">
        <div className="inline-flex min-w-full flex-col gap-1.5">
          <div className="flex gap-[3px] text-[10px] text-muted-foreground">
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
                          {day.count} {unit}
                          {day.count === 1 ? '' : 's'}
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
      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>{summary}</span>
        <span className="flex shrink-0 items-center gap-1">
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

export default ActivityHeatmap;
