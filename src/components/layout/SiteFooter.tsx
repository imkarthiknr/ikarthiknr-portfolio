import { profile } from '@/data/profile';
import { socialIcons } from '../icons';
import { isMac, openCommandMenu } from '../CommandMenu';

const SiteFooter = () => (
  <footer className="border-t">
    <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        <p className="text-sm font-medium">{profile.name}</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} · Built with React & Tailwind · Hosted on Firebase
        </p>
        <button onClick={openCommandMenu} className="text-sm text-muted-foreground hover:text-foreground">
          Press{' '}
          <kbd className="rounded border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">{isMac ? '⌘' : 'Ctrl'} K</kbd>{' '}
          to navigate anywhere
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {profile.socials.map((s) => {
          const Icon = socialIcons[s.label];
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon size={16} />
            </a>
          );
        })}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
