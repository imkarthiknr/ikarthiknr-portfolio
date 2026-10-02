import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { ArrowLeft, ArrowUpRight, Search, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { languageColor } from '@/lib/languages';
import { projectCategories, projects, type Project } from '@/data/projects';
import { profile } from '@/data/profile';
import { useGitHubRepos } from '@/hooks/use-github';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';

type Sort = 'newest' | 'az';

const matchesQuery = (q: string, ...fields: (string | null | undefined)[]) =>
  !q || fields.some((f) => f?.toLowerCase().includes(q));

const ProjectsPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const selectedTech = useMemo(() => params.getAll('tech'), [params]);
  const sort = (params.get('sort') as Sort) ?? 'newest';

  const { data: repos, isLoading: reposLoading } = useGitHubRepos();

  useEffect(() => {
    document.title = 'Projects — Karthik N R';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Karthik N R — System Development Engineer II at Amazon';
    };
  }, []);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === '' || value === 'All' || (key === 'sort' && value === 'newest')) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const toggleTech = (tech: string) => {
    const next = new URLSearchParams(params);
    const current = next.getAll('tech');
    next.delete('tech');
    (current.includes(tech) ? current.filter((t) => t !== tech) : [...current, tech]).forEach((t) =>
      next.append('tech', t),
    );
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  // Technologies ranked by how many projects use them
  const techOptions = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, []);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = projects.filter(
      (p: Project) =>
        (category === 'All' || p.categories.includes(category as Project['categories'][number])) &&
        selectedTech.every((t) => p.tags.includes(t)) &&
        matchesQuery(q, p.title, p.tagline, p.description, ...p.tags),
    );
    return sort === 'az' ? [...list].sort((a, b) => a.title.localeCompare(b.title)) : list;
  }, [category, selectedTech, q, sort]);

  // Other public repos not already showcased above
  const curatedRepoNames = useMemo(
    () => new Set(projects.map((p) => p.github.split('/').pop()!.toLowerCase())),
    [],
  );
  const otherRepos = useMemo(
    () =>
      (repos ?? []).filter(
        (r) =>
          !curatedRepoNames.has(r.name.toLowerCase()) &&
          matchesQuery(q, r.name, r.description, r.language) &&
          (selectedTech.length === 0 || selectedTech.some((t) => t === r.language)),
      ),
    [repos, curatedRepoNames, q, selectedTech],
  );

  const hasFilters = !!q || category !== 'All' || selectedTech.length > 0;

  return (
    <main className="pb-24 pt-28 md:pt-32">
      <div className="container-page">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <p className="eyebrow mb-3 mt-8">Projects</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Everything I've built</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Curated side projects, plus everything else on my GitHub. Filter by category or technology.
          </p>
        </Reveal>

        {/* Filters */}
        <div className="sticky top-16 z-30 -mx-5 mt-10 border-b bg-background/80 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Category">
              {['All', ...projectCategories].map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setParam('category', c)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                    category === c ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  {c}
                  <span className="ml-1.5 text-xs opacity-60">
                    {c === 'All' ? projects.length : projects.filter((p) => p.categories.includes(c as Project['categories'][number])).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setParam('q', e.target.value)}
                  placeholder="Search projects…"
                  className="h-9 rounded-full pl-9"
                  aria-label="Search projects"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
                className="h-9 rounded-full border bg-background px-3 text-sm"
                aria-label="Sort"
              >
                <option value="newest">Newest</option>
                <option value="az">A – Z</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {techOptions.map((t) => {
              const on = selectedTech.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTech(t)}
                  aria-pressed={on}
                  className={cn(
                    'shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                    on ? 'border-primary bg-primary/10 text-primary' : 'text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium text-foreground">{filtered.length}</span> of {projects.length} projects
          </p>
          {hasFilters && (
            <button onClick={clearAll} className="inline-flex items-center gap-1 font-medium hover:text-foreground">
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>

        <motion.div layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProjectCard project={p} showHighlights />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed p-12 text-center">
            <p className="font-medium">No projects match those filters.</p>
            <button onClick={clearAll} className="mt-2 text-sm font-medium text-primary hover:underline">
              Clear filters
            </button>
          </div>
        )}

        {/* More from GitHub */}
        <section className="mt-24">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">From GitHub</p>
              <h2 className="text-2xl font-semibold tracking-tight">More repositories</h2>
              <p className="mt-2 text-muted-foreground">Experiments, coursework and earlier projects — live from GitHub.</p>
            </div>
            <a
              href={`${profile.github.url}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View on GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {reposLoading && [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
            {otherRepos.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="surface surface-hover group flex flex-col p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-medium group-hover:text-primary">{r.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description ?? 'No description'}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(r.language) }} />
                      {r.language}
                    </span>
                  )}
                  {r.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {r.stargazers_count}
                    </span>
                  )}
                  <span>Updated {formatDistanceToNowStrict(parseISO(r.pushed_at), { addSuffix: true })}</span>
                </div>
              </a>
            ))}
            {!reposLoading && otherRepos.length === 0 && (
              <p className="text-sm text-muted-foreground md:col-span-2">No other repositories match.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
