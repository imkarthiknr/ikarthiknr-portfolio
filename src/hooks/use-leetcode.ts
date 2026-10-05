import { useQuery } from '@tanstack/react-query';

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

export type LeetCodeStats = {
  username: string;
  profileUrl: string;
  fetchedAt: string;
  solved: Record<Difficulty, number>;
  totals: Record<Difficulty, number>;
  ranking: number;
  contest: { rating: number; attended: number; topPercentage: number | null } | null;
  badges: number;
  streak: number;
  activeDays: number;
  /** { "YYYY-MM-DD": submissions } */
  calendar: Record<string, number>;
  languages: { name: string; solved: number }[];
  topics: { name: string; solved: number }[];
  recent: { title: string; url: string; solvedAt: string; lang: string }[];
};

/** Snapshot written at build time by scripts/fetch-leetcode.mjs (LeetCode's API blocks browser CORS). */
export const useLeetCode = () =>
  useQuery({
    queryKey: ['leetcode'],
    queryFn: async () => {
      const res = await fetch('/leetcode.json');
      if (!res.ok) throw new Error(`leetcode.json: ${res.status}`);
      const data = (await res.json()) as LeetCodeStats | null;
      if (!data) throw new Error('LeetCode stats unavailable');
      return data;
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
