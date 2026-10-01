import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'writing', label: 'Writing' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Scrolls to a home-page section, navigating back to "/" first when on another page. */
export const useSectionNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname !== '/') {
        navigate(`/#${id}`);
        return;
      }
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', id === 'home' ? '/' : `#${id}`);
    },
    [navigate, pathname],
  );
};
