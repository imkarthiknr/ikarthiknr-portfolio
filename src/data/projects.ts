export type ProjectCategory = 'AI' | 'Web App' | 'Developer Tools';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tags: string[];
  year: number;
  status: 'Live' | 'Alpha' | 'In development';
  github: string;
  demo?: string;
  /** Label for the demo link; defaults to "Live site" */
  demoLabel?: string;
  featured?: boolean;
  highlights: string[];
  /** Hue (0-360) for the generated cover art */
  hue: number;
};

export const projectCategories: ProjectCategory[] = ['AI', 'Web App', 'Developer Tools'];

// ─── Add new projects here (newest first) ────────────────────────────────────
export const projects: Project[] = [
  {
    slug: 'scrutai',
    title: 'Scrutai',
    tagline: 'Multi-agent PR reviewer where an adversarial critic kills the false positives.',
    description:
      'Instead of one model making one pass over a diff, a panel of specialist ReAct agents reviews the PR grounded in the real repository, then every finding is put on trial before a self-reflection critic. Only high-confidence issues ship — with a built-in eval harness that measures precision and false-positive rate.',
    categories: ['AI', 'Developer Tools'],
    tags: ['Python', 'LangGraph', 'LiteLLM', 'Multi-agent', 'Semgrep', 'CLI'],
    year: 2026,
    status: 'Alpha',
    github: 'https://github.com/imkarthiknr/Scrutai',
    demo: 'https://pypi.org/project/scrutai/',
    demoLabel: 'PyPI package',
    featured: true,
    highlights: [
      'Specialist agents with real tools — file reads, ripgrep, git blame, linters',
      'Adversarial critic loop runs until findings are stable',
      'Benchmark harness reports precision, recall and FPR',
    ],
    hue: 262,
  },
  {
    slug: 'nestiq',
    title: 'Nestiq',
    tagline: 'AI neighbourhood finder — describe your vibe, find where you belong.',
    description:
      'A conversational assistant for finding accommodation in India. Describe lifestyle, budget and commute in plain language; Nestiq extracts your needs with Claude, queries live listings via the Google Maps Places API and pins them on an interactive map.',
    categories: ['AI', 'Web App'],
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'Claude API', 'Google Maps', 'Firestore', 'Cloud Run'],
    year: 2026,
    status: 'Live',
    github: 'https://github.com/imkarthiknr/Nestiq',
    demo: 'https://nestiq-5a012.web.app/',
    featured: true,
    highlights: [
      'Streaming Claude responses over SSE',
      'Live property cards with photos, ratings and directions',
      'FastAPI backend on Cloud Run, Firestore persistence',
    ],
    hue: 188,
  },
  {
    slug: 'porulux',
    title: 'Porulux',
    tagline: 'Track wealth. Not just expenses.',
    description:
      'A personal wealth tracker that looks beyond monthly spending to the full picture of what you own — built as a TypeScript app with a Python service layer and a Supabase Postgres backend.',
    categories: ['Web App'],
    tags: ['TypeScript', 'Python', 'Supabase', 'PostgreSQL', 'Docker', 'Firebase App Hosting'],
    year: 2026,
    status: 'Live',
    github: 'https://github.com/imkarthiknr/Porulux',
    demo: 'https://porulux-web--porulux-app.us-east4.hosted.app/dashboard',
    featured: true,
    highlights: [
      'Net-worth view across assets, not just expenses',
      'Supabase Postgres with SQL migrations',
      'Containerised Python services',
    ],
    hue: 152,
  },
  {
    slug: 'sniplink',
    title: 'SnipLink',
    tagline: 'Open-source URL shortener with real analytics — no login required.',
    description:
      'A self-hostable, API-first URL shortener with a full analytics dashboard: click tracking, geo heatmaps, referrer tracing, expiry rules and QR codes — all without an account for basic use.',
    categories: ['Web App', 'Developer Tools'],
    tags: ['React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Firestore', 'Tailwind CSS'],
    year: 2026,
    status: 'Live',
    github: 'https://github.com/imkarthiknr/SnipLink',
    demo: 'https://sniplink-e2eed.web.app',
    highlights: [
      'Real-time click analytics and geo heatmaps',
      'Expiry by days, click count or date',
      'Public, API-key authenticated REST API',
    ],
    hue: 24,
  },
  {
    slug: 'notespro',
    title: 'NotesPro',
    tagline: 'URL-based minimalist notepad — no sign-up, just write and share.',
    description:
      'Every unique URL is its own note. Write instantly, share by sending the link, access it from anywhere. Auto-save, themes, multi-format export and a raw-text endpoint for shell scripting.',
    categories: ['Web App', 'Developer Tools'],
    tags: ['JavaScript', 'HTML', 'Firebase Realtime DB', 'Cloud Functions'],
    year: 2026,
    status: 'Live',
    github: 'https://github.com/imkarthiknr/NotesPro',
    demo: 'https://notespro-769cb.web.app/',
    highlights: [
      'Auto-save as you type',
      'Export to txt, md, json, yaml and more',
      'CLI-friendly raw text endpoint',
    ],
    hue: 45,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export const featuredProjects = projects.filter((p) => p.featured);
