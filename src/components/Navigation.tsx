import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Mail, FileText, GraduationCap, Award } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);

      // If within 50px of the bottom, always activate the last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      // Reverse so the last section whose top has passed the threshold wins
      const currentSection = [...sections].reverse().find(section => {
        const element = document.getElementById(section);
        if (element) {
          return element.getBoundingClientRect().top <= 100;
        }
        return false;
      });

      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="fixed top-8 left-0 right-0 mx-auto w-fit z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="glass rounded-full px-4 py-2.5 shadow-2xl">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground glow-purple'
                      : 'text-muted-foreground hover:text-foreground hover:glow-cyan'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        className="fixed top-6 right-6 z-50 md:hidden glass rounded-full p-3 glow-purple"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />
            <div className="flex items-center justify-center h-full">
              <motion.div
                className="glass rounded-3xl p-8 mx-6"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-primary text-primary-foreground glow-purple'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={24} />
                        <span className="text-lg font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;