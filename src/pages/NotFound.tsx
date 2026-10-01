import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isMac, openCommandMenu } from '@/components/CommandMenu';

const NotFound = () => (
  <main className="grid min-h-[80vh] place-items-center px-5 pt-16">
    <div className="text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back home
          </Link>
        </Button>
        <Button variant="outline" className="rounded-full" onClick={openCommandMenu}>
          Search ({isMac ? '⌘' : 'Ctrl'} K)
        </Button>
      </div>
    </div>
  </main>
);

export default NotFound;
