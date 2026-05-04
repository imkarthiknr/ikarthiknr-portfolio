import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
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

const frontendSkills = [
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'React', color: '#61DAFB' },
];

const backendSkills = [
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#007396' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Distributed Systems', color: '#6366F1' },
  { name: 'System Reliability', color: '#0EA5E9' },
  { name: 'Fault Tolerance', color: '#F59E42' },
  { name: 'High Availability', color: '#10B981' },
];

const devopsSkills = [
  { name: 'AWS (Lambda, S3, Batch, DynamoDB, SQS, ECR, CDK)', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Jenkins', color: '#D24939' },
  { name: 'CI/CD', color: '#6366F1' },
  { name: 'Workflow Orchestration', color: '#6366F1' },
];

const observabilitySkills = [
  { name: 'Monitoring', color: '#6366F1' },
  { name: 'Logging', color: '#6366F1' },
  { name: 'Metrics', color: '#6366F1' },
  { name: 'Debugging (Splunk)', color: '#00A651' },
  { name: 'Performance Optimization', color: '#F59E42' },
];

const skillCategories = [
  { title: 'Frontend', skills: frontendSkills, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'Backend', skills: backendSkills, gradient: 'from-green-500 to-emerald-500' },
  { title: 'DevOps & Cloud', skills: devopsSkills, gradient: 'from-yellow-500 to-orange-500' },
  { title: 'Observability & Automation', skills: observabilitySkills, gradient: 'from-purple-500 to-pink-500' }
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
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    <div className="flex justify-between items-center">
      <span className="text-foreground font-medium">{skill.name}</span>
    </div>
    <div className="h-3 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: skill.color }}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: delay + 0.2, duration: 1 }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Dynamic repo count state
  const [repoCount, setRepoCount] = useState<number | null>(null);
  // Dynamic years of experience state
  const [yearsExp, setYearsExp] = useState<string>('...');
  // Dynamic technologies worked count
  const [techCount, setTechCount] = useState<number>(0);


  useEffect(() => {
    fetch('https://api.github.com/users/imkarthiknr/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Only count public repos (not forks)
          const publicRepos = data.filter((repo: any) => !repo.fork);
          setRepoCount(publicRepos.length);
        }
      })
      .catch(() => setRepoCount(null));

      // Calculate years of experience from June 1, 2020
    const startDate = new Date(2020, 5, 1); // Month is 0-indexed: 5 = June
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    // Show as "X.Y+" (e.g., 3.9+)
    const yearsDisplay = months > 0 ? `${years}.${months}+` : `${years}+`;
    setYearsExp(yearsDisplay);

    // Count unique technologies from all skill categories
    const allSkills = skillCategories.flatMap(cat => cat.skills.map(skill => skill.name));
    const uniqueSkills = Array.from(new Set(allSkills));
    setTechCount(uniqueSkills.length);
  }, []);

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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

          <div className="w-full">
            {/* Skill Categories Grid */}
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            >
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
              { number: repoCount !== null ? `${repoCount}+` : '...', label: 'Stand-alone Projects' },
              { number: yearsExp, label: 'Years Experience' },
              { number: `${techCount}+`, label: 'Technologies Worked' },
              { number: '3', label: 'Certifications Earned' },
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