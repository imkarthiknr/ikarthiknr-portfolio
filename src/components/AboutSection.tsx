import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Expertise in React, Node.js, TypeScript, and modern web frameworks"
    },
    {
      icon: Palette,
      title: "3D & Animation",
      description: "Creating immersive experiences with Three.js, WebGL, and Framer Motion"
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Building fast, scalable applications with best practices"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Always exploring new technologies and pushing creative boundaries"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <motion.p
                  className="text-xl leading-relaxed"
                  variants={itemVariants}
                >
                  I'm a passionate <span className="text-accent font-semibold">full-stack developer</span> who 
                  loves creating digital experiences that blend creativity with cutting-edge technology.
                </motion.p>
                
                <motion.p variants={itemVariants}>
                  With over <span className="text-primary font-semibold">5 years of experience</span>, 
                  I specialize in building interactive web applications using React, Three.js, and modern 
                  JavaScript frameworks. My journey began with a curiosity about how websites work, 
                  and has evolved into a passion for creating immersive 3D experiences on the web.
                </motion.p>
                
                <motion.p variants={itemVariants}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or experimenting with 3D art and animations. I believe in 
                  the power of continuous learning and love sharing knowledge with the developer community.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-wrap gap-4 pt-6"
                variants={itemVariants}
              >
                {['React', 'TypeScript', 'Three.js', 'Node.js', 'Python', 'WebGL', 'Framer Motion', 'GraphQL'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 glass rounded-full text-sm font-medium text-accent border border-accent/20"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Skills Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="glass p-6 rounded-2xl group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px hsl(270 91% 65% / 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <skill.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};

export default AboutSection;