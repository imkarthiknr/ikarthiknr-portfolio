import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "3D Portfolio Experience",
      description: "An immersive 3D portfolio website built with React Three Fiber, featuring interactive models and smooth animations.",
      tags: ["React", "Three.js", "Framer Motion", "TypeScript"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Modern dashboard with real-time analytics, inventory management, and beautiful data visualizations.",
      tags: ["React", "Node.js", "MongoDB", "Chart.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600",
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "AI-Powered Chat App",
      description: "Real-time messaging application with AI assistance, voice notes, and smart conversation insights.",
      tags: ["React", "Socket.io", "OpenAI", "Express"],
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=600",
      github: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "VR Web Experience",
      description: "Virtual reality experience accessible through web browsers using WebXR and immersive technologies.",
      tags: ["WebXR", "Three.js", "A-Frame", "JavaScript"],
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600",
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting platform built on blockchain technology with smart contracts.",
      tags: ["Solidity", "Web3", "React", "Ethereum"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600",
      github: "#",
      demo: "#"
    },
    {
      id: 6,
      title: "Music Visualization Tool",
      description: "Interactive music visualizer that creates stunning 3D graphics synchronized with audio frequencies.",
      tags: ["Web Audio API", "Three.js", "GLSL", "Canvas"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600",
      github: "#",
      demo: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects that showcase my skills in web development, 
              3D graphics, and interactive experiences.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className={`group relative overflow-hidden rounded-2xl glass ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: 1000 
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium glow-purple">
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center space-x-4">
                    <a 
                      href={project.demo}
                      className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Live
                    </a>
                    <a 
                      href={project.github}
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Source
                    </a>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div 
            variants={cardVariants}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              variant="outline"
              className="glass border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl glow-purple hover:glow-intense transition-all duration-300"
            >
              View All Projects
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};

export default ProjectsSection;