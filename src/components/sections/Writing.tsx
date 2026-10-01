import { format, parseISO } from 'date-fns';
import { ArrowUpRight, Clock, PenLine } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { profile } from '@/data/profile';
import { useArticles, type Article } from '@/hooks/use-articles';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { DevIcon, MediumIcon } from '../icons';

const MAX_ARTICLES = 3;

const ArticleCard = ({ article }: { article: Article }) => {
  const SourceIcon = article.source === 'DEV' ? DevIcon : MediumIcon;
  return (
    <article className="surface surface-hover group relative flex h-full flex-col overflow-hidden">
      <div className="aspect-[2/1] overflow-hidden border-b bg-muted">
        {article.cover ? (
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-primary/20 to-transparent">
            <PenLine className="h-8 w-8 text-primary/60" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium text-foreground">
            <SourceIcon size={12} /> {article.source}
          </span>
          <time dateTime={article.publishedAt}>{format(parseISO(article.publishedAt), 'MMM d, yyyy')}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {article.readingMinutes} min
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {article.title}
          </a>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        {article.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 font-mono text-xs text-muted-foreground">
            {article.tags.slice(0, 4).map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

const FollowCard = ({ message }: { message: string }) => (
  <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed p-6">
    <div>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <PenLine className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-semibold">More on the way</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
    </div>
    <div className="mt-6 flex flex-wrap gap-2">
      <a
        href={profile.devto.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
      >
        <DevIcon size={14} /> Follow on DEV
      </a>
      <a
        href={profile.medium.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
      >
        <MediumIcon size={14} /> Medium
      </a>
    </div>
  </div>
);

const Writing = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const shown = articles?.slice(0, MAX_ARTICLES) ?? [];

  return (
    <section id="writing" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Writing"
          title="Notes on engineering"
          description="Articles I've published on DEV and Medium — pulled in automatically."
          action={
            articles && articles.length > MAX_ARTICLES ? (
              <a
                href={profile.devto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                All articles <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : undefined
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-[380px] rounded-2xl" />)}

          {!isLoading &&
            shown.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06} className="h-full">
                <ArticleCard article={a} />
              </Reveal>
            ))}

          {!isLoading && shown.length < MAX_ARTICLES && (
            <Reveal delay={0.1} className={cn('h-full', shown.length === 1 && 'lg:col-span-2', shown.length === 0 && 'md:col-span-2 lg:col-span-3')}>
              <FollowCard
                message={
                  isError
                    ? "Couldn't load articles right now — read them directly on DEV or Medium."
                    : 'I write about system design, performance and building with AI. Follow along for new posts.'
                }
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default Writing;
