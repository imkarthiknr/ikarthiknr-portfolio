import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen, Trophy } from 'lucide-react';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const education = [
    {
      level: "Masters in Technology",
      degree: "M.Tech in Software Systems",
      institution: "BITS Pilani - WILP",
      location: "Pilani, India",
      year: "2023 - 2025",
      grade: "6.7 CGPA",
      icon: Trophy,
      color: "primary",
      description: "Specialized in Data Analytics. Completed Dissertation titled - \"Multimodal AI-Enhanced Educational Assistant with Real-Time Q&A and Dynamic Learning Support\".",
      highlights: [
        "Applied principles behind modern Data Analytics techniques",
        "Applied Statistical and Machine Learning methods on Real data.",
        "Built Expertise in Advanced AI Topics such as Deep Learning, NLM and LLMs.",
        "Part of programme worked on different platforms & libraries - Python, Tensorflow, NumPy, SciPi, Pandas, NLTK, Keras."
      ]
    },
    {
      level: "Bachelor's in Engineering", 
      degree: "B.E., in Computer Science & Engineering",
      institution: "Sri Sairam Engineering College",
      location: "Chennai, India",
      year: "2016 - 2020",
      grade: "7.7 CGPA",
      icon: GraduationCap,
      color: "accent",
      description: "Comprehensive study of computer science fundamentals including mathematical concepts, algorithms, data structures, and software engineering principles.",
      highlights: [
        "Ablility to solve problems using algorithms and data structures.",
        "Attended multiple hackathons and coding competitions.",
        "One of the organizer of the National Level Symposium - SYNSARA 2K19",
        "Won 2nd place (Rs. 25,000 Cash prize) in Hack & Tackle Hackathon 2019.",
        "Took Web Development workshop being part of Coding club on 2018.",
        "Web Developer Intern - Lema labs India - 11/2019 to 02/2020"
      ]
    },
    {
      level: "Higher Secondary Certificate",
      degree: "HSC - MPC Stream",
      institution: "Zion Matriculation Higher Secondary School",
      location: "Chennai, India", 
      year: "2014 - 2016",
      grade: "93.2%",
      icon: BookOpen,
      color: "secondary",
      description: "Focused on Mathematics, Physics, and Chemistry with additional computer science subjects. Foundation for engineering career.",
      highlights: [
        "Acquired \"Scholar\" Badge - given for 90% and above in all subjects in academic year 2015-16.",
        "Took \"French\" as second language and scored 98% in it.",
        "Participated in various inter-school competitions in Annual Sports Day."
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="education" className="min-h-screen flex items-center py-20 relative scroll-mt-20 bg-background/50">{/* Added background for visibility */}
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
              My <span className="gradient-text">Education</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A journey of continuous learning and academic excellence
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Education Timeline */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Timeline Navigation */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">
                Academic Journey
              </h3>
              
              {education.map((edu, index) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={index}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      activeIndex === index ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    variants={cardVariants}
                    whileHover={{ x: 10 }}
                  >
                    {/* Timeline connector */}
                    {index < education.length - 1 && (
                      <div className="absolute left-6 top-16 w-px h-20 bg-gradient-to-b from-primary/50 to-accent/50" />
                    )}
                    
                    <div className={`glass p-6 rounded-2xl border-l-4 ${
                      activeIndex === index 
                        ? (edu.color === 'primary' ? 'border-primary glow-purple' : 
                           edu.color === 'accent' ? 'border-accent glow-cyan' : 'border-secondary')
                        : 'border-muted'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${
                          activeIndex === index 
                            ? (edu.color === 'primary' ? 'bg-primary/20' : 
                               edu.color === 'accent' ? 'bg-accent/20' : 'bg-secondary/20')
                            : 'bg-muted/20'
                        } flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${
                            activeIndex === index 
                              ? (edu.color === 'primary' ? 'text-primary' : 
                                 edu.color === 'accent' ? 'text-accent' : 'text-secondary')
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-semibold text-lg ${
                            activeIndex === index ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {edu.level}
                          </h4>
                          <p className="text-sm text-accent font-medium">{edu.degree}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {edu.year}
                            </span>
                            <span className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              {edu.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Detailed Card */}
            <motion.div 
              variants={itemVariants}
              className="lg:sticky lg:top-20"
            >
              <motion.div
                key={activeIndex}
                className="glass p-8 rounded-3xl glow-purple"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {(() => {
                  const ActiveIcon = education[activeIndex].icon;
                  return (
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                        education[activeIndex].color === 'primary' ? 'bg-primary/20' :
                        education[activeIndex].color === 'accent' ? 'bg-accent/20' : 'bg-secondary/20'
                      }`}>
                        <ActiveIcon className={`w-8 h-8 ${
                          education[activeIndex].color === 'primary' ? 'text-primary' :
                          education[activeIndex].color === 'accent' ? 'text-accent' : 'text-secondary'
                        }`} />
                      </div>
                    </div>
                  );
                })()}
                <h3 className="text-2xl font-bold mb-2">
                  {education[activeIndex].level}
                </h3>
                <p className="text-accent font-semibold text-lg">
                  {education[activeIndex].degree}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                    <span className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      {education[activeIndex].institution}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {education[activeIndex].location}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {education[activeIndex].year}
                    </span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {education[activeIndex].grade}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  {education[activeIndex].description}
                </p>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Key Highlights</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {education[activeIndex].highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};

export default EducationSection;