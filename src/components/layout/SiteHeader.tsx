import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { profile } from '@/data/profile';
import { useSectionNav } from '@/hooks/use-section-nav';
import ThemeToggle from '../ThemeToggle';
import { isMac, openCommandMenu } from '../CommandMenu';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(best && best[1] > 0 ? best[0] : null);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
};

const SiteHeader = () => {
  const { pathname } = useLocation();
  const goToSection = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(pathname === '/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (id: string) => (id === 'projects' && pathname === '/projects') || activeSection === id;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || pathname !== '/'
          ? 'border-b bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => pathname === '/' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground font-mono text-[11px] font-semibold text-background transition-transform group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-sm transition-colors',
                isActive(item.id) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive(item.id) && <span className="absolute inset-0 -z-10 rounded-full bg-secondary" />}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openCommandMenu}
            className="hidden h-9 items-center gap-2 rounded-full border bg-secondary/50 pl-3 pr-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="pr-4">Search…</span>
            <kbd className="rounded-md border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full md:hidden"
            onClick={openCommandMenu}
            aria-label="Open command menu"
          >
            <Search className="h-[18px] w-[18px]" />
          </Button>
          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full lg:hidden" aria-label="Open menu">
                <Menu className="h-[18px] w-[18px]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {[{ id: 'home', label: 'Home' }, ...navItems].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileOpen(false);
                      // wait for the sheet to close so scroll isn't locked
                      setTimeout(() => goToSection(item.id), 250);
                    }}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-left text-base transition-colors hover:bg-secondary',
                      isActive(item.id) ? 'bg-secondary font-medium' : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-muted-foreground hover:bg-secondary"
                >
                  All projects →
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
