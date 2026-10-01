import { useQuery } from '@tanstack/react-query';
import { fetchCached } from '@/lib/fetch-cached';
import { profile } from '@/data/profile';

export type Article = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  cover?: string;
  source: 'DEV' | 'Medium';
};

type DevToArticle = {
  id: number;
  title: string;
  url: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  cover_image: string | null;
};

type Rss2JsonResponse = {
  status: string;
  items: {
    guid: string;
    title: string;
    link: string;
    pubDate: string;
    description: string;
    content: string;
    thumbnail: string;
    categories: string[];
  }[];
};

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
};

const fetchDevTo = async (): Promise<Article[]> => {
  const data = await fetchCached<DevToArticle[]>(
    `https://dev.to/api/articles?username=${profile.devto.username}&per_page=20`,
  );
  return data.map((a) => ({
    id: `dev-${a.id}`,
    title: a.title,
    url: a.url,
    excerpt: a.description,
    publishedAt: a.published_at,
    readingMinutes: a.reading_time_minutes,
    tags: a.tag_list,
    cover: a.cover_image ?? undefined,
    source: 'DEV',
  }));
};

const fetchMedium = async (): Promise<Article[]> => {
  const feed = encodeURIComponent(`https://medium.com/feed/@${profile.medium.username}`);
  const data = await fetchCached<Rss2JsonResponse>(`https://api.rss2json.com/v1/api.json?rss_url=${feed}`);
  if (data.status !== 'ok') throw new Error('Medium feed unavailable');
  return data.items.map((item) => {
    const text = stripHtml(item.content || item.description);
    return {
      id: `medium-${item.guid}`,
      title: item.title,
      url: item.link,
      excerpt: text.slice(0, 180) + (text.length > 180 ? '…' : ''),
      publishedAt: item.pubDate.replace(' ', 'T') + 'Z',
      readingMinutes: Math.max(1, Math.round(text.split(' ').length / 220)),
      tags: item.categories,
      cover: item.thumbnail || undefined,
      source: 'Medium',
    };
  });
};

/** Articles from DEV.to and Medium, merged newest first. Fails only if both sources fail. */
export const useArticles = () =>
  useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const results = await Promise.allSettled([fetchDevTo(), fetchMedium()]);
      const ok = results.filter((r): r is PromiseFulfilledResult<Article[]> => r.status === 'fulfilled');
      if (ok.length === 0) throw new Error('Could not load articles');
      return ok
        .flatMap((r) => r.value)
        .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
