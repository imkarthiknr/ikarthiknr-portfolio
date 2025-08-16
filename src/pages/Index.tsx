import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="glass border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">
              © 2024 John Doe. All rights reserved.
            </div>
            <div className="text-muted-foreground text-sm mt-4 md:mt-0">
              Built with ❤️ using React, Three.js & Framer Motion
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
