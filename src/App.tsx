import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommandMenu from '@/components/CommandMenu';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const ProjectsPage = lazy(() => import('./pages/Projects'));

const queryClient = new QueryClient();

/** Scrolls to #hash targets after navigation (e.g. "/#contact" from another page). */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    // wait a frame for the target page to render
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
};

const Layout = () => (
  <>
    <SiteHeader />
    <Outlet />
    <SiteFooter />
    <CommandMenu />
    <ScrollToHash />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="theme">
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={200}>
          <Toaster position="bottom-right" />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route
                  path="/projects"
                  element={
                    <Suspense fallback={<div className="min-h-screen" />}>
                      <ProjectsPage />
                    </Suspense>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
