import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero3D from './Hero3D';
import heroCharacter from '@/assets/hero-character.png';

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-accent text-lg font-medium">Hello, I'm</span>
            </motion.div>

            {/* Name with gradient */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="gradient-text">John Doe</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Full-Stack Developer & <br />
              <span className="text-accent">3D Experience Creator</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Crafting immersive digital experiences with modern web technologies. 
              Specialized in React, Three.js, and creating stunning interactive applications 
              that push the boundaries of web development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl glow-purple hover:glow-intense transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Me
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold rounded-xl glow-cyan hover:glow-intense transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="glass rounded-full p-3 text-muted-foreground hover:text-accent hover:glow-cyan transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.7 + index * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Scene */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* 3D Scene Container */}
            <div className="relative">
              <Hero3D />
              
              {/* Character Image Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <img 
                  src={heroCharacter} 
                  alt="Hero Character"
                  className="w-64 h-64 object-contain opacity-80 mix-blend-screen"
                />
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute top-10 right-10 w-4 h-4 bg-accent rounded-full glow-cyan"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-6 h-6 bg-primary rounded-full glow-purple"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-accent cursor-pointer transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;