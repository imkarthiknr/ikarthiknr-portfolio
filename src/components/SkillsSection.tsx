import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

// 3D Skill Orb Component - Simple glowing sphere
const SkillOrb = ({ position, color }: { 
  position: [number, number, number]; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const frontendSkills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, color: '#3178C6' },
    { name: 'Next.js', level: 88, color: '#000000' },
    { name: 'Vue.js', level: 85, color: '#4FC08D' },
    { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
    { name: 'Framer Motion', level: 87, color: '#FF0055' },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 92, color: '#339933' },
    { name: 'Python', level: 88, color: '#3776AB' },
    { name: 'GraphQL', level: 85, color: '#E10098' },
    { name: 'PostgreSQL', level: 90, color: '#4169E1' },
    { name: 'MongoDB', level: 87, color: '#47A248' },
    { name: 'Redis', level: 82, color: '#DC382D' },
  ];

  const toolsSkills = [
    { name: 'Three.js', level: 89, color: '#000000' },
    { name: 'WebGL', level: 85, color: '#990000' },
    { name: 'Docker', level: 88, color: '#2496ED' },
    { name: 'AWS', level: 86, color: '#FF9900' },
    { name: 'Git', level: 95, color: '#F05032' },
    { name: 'Figma', level: 83, color: '#F24E1E' },
  ];

  const skillCategories = [
    { title: 'Frontend', skills: frontendSkills, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Backend', skills: backendSkills, gradient: 'from-green-500 to-emerald-500' },
    { title: 'Tools & 3D', skills: toolsSkills, gradient: 'from-purple-500 to-pink-500' },
  ];

  const orbSkills = [
    { position: [0, 0, 0] as [number, number, number], color: '#a855f7' },
    { position: [3, 1, -1] as [number, number, number], color: '#06b6d4' },
    { position: [-2, -1, 1] as [number, number, number], color: '#8b5cf6' },
    { position: [1, -2, 2] as [number, number, number], color: '#06b6d4' },
    { position: [-3, 1, -2] as [number, number, number], color: '#a855f7' },
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const SkillBar = ({ skill, delay = 0 }: { skill: any; delay?: number }) => (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-foreground font-medium">{skill.name}</span>
        <span className="text-muted-foreground text-sm">{skill.level}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1 }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and the tools I use 
              to bring ideas to life.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - 3D Skills Visualization */}
            <motion.div variants={itemVariants} className="relative">
              <div className="h-96 md:h-[500px] relative">
                <Canvas
                  camera={{ position: [0, 0, 8], fov: 45 }}
                  gl={{ alpha: true, antialias: true }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
                  
                  {orbSkills.map((orb, index) => (
                    <SkillOrb
                      key={index}
                      position={orb.position}
                      color={orb.color}
                    />
                  ))}
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={1}
                  />
                </Canvas>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
              <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse-glow" />
            </motion.div>

            {/* Right Column - Skill Categories */}
            <motion.div variants={itemVariants} className="space-y-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="glass p-6 rounded-2xl"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px hsl(270 91% 65% / 0.2)"
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.gradient} mr-3`} />
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar 
                        key={skill.name}
                        skill={skill} 
                        delay={categoryIndex * 0.3 + skillIndex * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '20+', label: 'Technologies Mastered' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center glass p-6 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};

export default SkillsSection;