import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Load Firebase (analytics) once the page is idle, keeping it off the critical path
const loadFirebase = () => import('./lib/firebase');
if ('requestIdleCallback' in window) window.requestIdleCallback(loadFirebase, { timeout: 4000 });
else setTimeout(loadFirebase, 2000);
