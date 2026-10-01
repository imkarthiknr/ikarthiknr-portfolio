import { useQuery } from '@tanstack/react-query';
import { fetchCached } from '@/lib/fetch-cached';
import { profile } from '@/data/profile';

const USER = profile.github.username;

export type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  size: number;
  pushed_at: string;
  topics?: string[];
};

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContributionsResponse = { total: Record<string, number>; contributions: ContributionDay[] };

const queryDefaults = { staleTime: 30 * 60 * 1000, retry: 1, refetchOnWindowFocus: false } as const;

export const useGitHubUser = () =>
  useQuery({
    queryKey: ['github', 'user', USER],
    queryFn: () => fetchCached<GitHubUser>(`https://api.github.com/users/${USER}`),
    ...queryDefaults,
  });

/** Public, non-fork, non-empty repos, most recently pushed first. */
export const useGitHubRepos = () =>
  useQuery({
    queryKey: ['github', 'repos', USER],
    queryFn: () =>
      fetchCached<GitHubRepo[]>(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
    select: (repos) => repos.filter((r) => !r.fork && r.size > 0 && r.name !== USER),
    ...queryDefaults,
  });

/** Last 12 months of contributions (public proxy of the GitHub contribution graph). */
export const useContributions = () =>
  useQuery({
    queryKey: ['github', 'contributions', USER],
    queryFn: () =>
      fetchCached<ContributionsResponse>(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
    select: (d) => ({ total: d.total.lastYear ?? 0, days: d.contributions }),
    ...queryDefaults,
  });
