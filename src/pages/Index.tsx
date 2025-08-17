import ErrorBoundary from '@/components/ErrorBoundary';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <ErrorBoundary>
      <main className="min-h-screen relative">
        {/* Background Elements */}
        <ErrorBoundary>
          <ParticleBackground />
        </ErrorBoundary>
        
        {/* Navigation */}
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
        
        {/* Main Content Sections */}
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <AboutSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ExperienceSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <EducationSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <SkillsSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ProjectsSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ContactSection />
        </ErrorBoundary>
        
        {/* Footer */}
        <footer className="relative z-10 glass border-t border-border py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="text-muted-foreground text-sm">
                © 2024 Karthik NR. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </ErrorBoundary>
  );
};

export default Index;