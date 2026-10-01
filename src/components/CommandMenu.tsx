import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  ArrowRight,
  Copy,
  FileDown,
  FolderGit2,
  Hash,
  Home,
  LayoutGrid,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { sections, useSectionNav } from '@/hooks/use-section-nav';
import { socialIcons } from './icons';

const OPEN_EVENT = 'open-command-menu';

export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** Word-prefix matches rank above plain substring matches; no fuzzy matching. */
const filter = (value: string, search: string) => {
  const v = value.toLowerCase();
  const s = search.toLowerCase().trim();
  if (!s) return 1;
  if (v.split(/\s+/).some((word) => word.startsWith(s))) return 1;
  return v.includes(s) ? 0.5 : 0;
};

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const goToSection = useSectionNav();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success('Email copied', { description: profile.email });
    } catch {
      toast.error('Could not copy — email is ' + profile.email);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} filter={filter}>
      <CommandInput placeholder="Search pages, projects, actions…" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={run(() => goToSection('home'))}>
            <Home className="mr-2" /> Home
          </CommandItem>
          {sections.map((s) => (
            <CommandItem key={s.id} value={`section ${s.label}`} onSelect={run(() => goToSection(s.id))}>
              <Hash className="mr-2" /> {s.label}
            </CommandItem>
          ))}
          <CommandItem value="all projects page filter" onSelect={run(() => navigate('/projects'))}>
            <LayoutGrid className="mr-2" /> All projects
            <CommandShortcut>page</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle theme dark light mode"
            onSelect={run(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}
          >
            {resolvedTheme === 'dark' ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
            Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
          </CommandItem>
          <CommandItem value="copy email address" onSelect={run(copyEmail)}>
            <Copy className="mr-2" /> Copy email address
          </CommandItem>
          <CommandItem value="send email contact" onSelect={run(() => (window.location.href = `mailto:${profile.email}`))}>
            <Mail className="mr-2" /> Send an email
          </CommandItem>
          <CommandItem value="download resume cv" onSelect={run(() => openUrl(profile.resumeUrl))}>
            <FileDown className="mr-2" /> Download résumé
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem
              key={p.slug}
              value={`project ${p.title} ${p.tags.join(' ')}`}
              onSelect={run(() => openUrl(p.demo ?? p.github))}
            >
              <FolderGit2 className="mr-2" />
              <span>{p.title}</span>
              <span className="ml-2 truncate text-xs text-muted-foreground">{p.tagline}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Elsewhere">
          {profile.socials.map((s) => {
            const Icon = socialIcons[s.label] ?? ArrowRight;
            return (
              <CommandItem key={s.label} value={`social ${s.label}`} onSelect={run(() => openUrl(s.href))}>
                <Icon className="mr-2" /> {s.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
