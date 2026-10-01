import ErrorBoundary from '@/components/ErrorBoundary';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import GitHubActivity from '@/components/sections/GitHubActivity';
import Writing from '@/components/sections/Writing';
import Credentials from '@/components/sections/Credentials';
import Contact from '@/components/sections/Contact';

const sections = [Hero, About, Experience, Projects, Skills, GitHubActivity, Writing, Credentials, Contact];

const Index = () => (
  <main>
    {sections.map((Section, i) => (
      <ErrorBoundary key={i}>
        <Section />
      </ErrorBoundary>
    ))}
  </main>
);

export default Index;
