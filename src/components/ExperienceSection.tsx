import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Building2, Code, Database, Cloud, Users } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      id: "aws",
      company: "Amazon Web Services",
      role: "Software Development Engineer",
      duration: "2021 - Present",
      location: "Seattle, WA",
      type: "Full-time",
      icon: Cloud,
      color: "primary",
      responsibilities: [
        "Led development of Amazon Q Developer Assistant, improving developer productivity by 40%",
        "Built scalable microservices handling 10M+ requests/day using Java, Spring Boot, and AWS Lambda",
        "Designed and implemented real-time chat infrastructure using WebSocket and Redis",
        "Optimized application performance resulting in 60% reduction in response time",
        "Mentored junior developers and conducted technical interviews"
      ],
      achievements: [
        "Delivered 3 major features ahead of schedule",
        "Reduced system downtime by 85% through proactive monitoring",
        "Led cross-functional team of 8 engineers"
      ]
    },
    {
      id: "startup",
      company: "TechFlow Solutions",
      role: "Full Stack Developer",
      duration: "2020 - 2021",
      location: "Bangalore, India",
      type: "Full-time",
      icon: Code,
      color: "accent",
      responsibilities: [
        "Developed end-to-end web applications using React, Node.js, and MongoDB",
        "Integrated third-party APIs and payment gateways (Stripe, PayPal)",
        "Implemented CI/CD pipelines reducing deployment time by 70%",
        "Created responsive UI components with modern design patterns",
        "Collaborated with product teams to define technical requirements"
      ],
      achievements: [
        "Built 5 production applications serving 50K+ users",
        "Improved code coverage from 60% to 95%",
        "Reduced bug reports by 40%"
      ]
    },
    {
      id: "intern",
      company: "DataSync Technologies",
      role: "Software Engineering Intern",
      duration: "2019 - 2020",
      location: "Chennai, India",
      type: "Internship",
      icon: Database,
      color: "secondary",
      responsibilities: [
        "Developed database optimization scripts improving query performance by 35%",
        "Created automated testing frameworks using Python and Selenium",
        "Participated in code reviews and agile development processes",
        "Built data visualization dashboards using D3.js and Chart.js"
      ],
      achievements: [
        "Received 'Outstanding Intern' award",
        "Contributed to open-source projects",
        "Completed advanced certification in Cloud Computing"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey through the world of software development, building scalable systems and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={experience.id}
                  variants={cardVariants}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 transform md:-translate-x-1/2 -translate-y-1/2 top-8 md:top-auto">
                    <motion.div 
                      className={`w-full h-full rounded-full glass border-2 border-${experience.color} glow-${experience.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={12} className={`text-${experience.color}`} />
                    </motion.div>
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="glass rounded-2xl p-8 border border-border/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className={`p-3 rounded-xl bg-${experience.color}/10 border border-${experience.color}/20`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon size={24} className={`text-${experience.color}`} />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
                            <p className={`text-${experience.color} font-semibold`}>{experience.role}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${experience.color}/10 text-${experience.color} border border-${experience.color}/20`}>
                          {experience.type}
                        </span>
                      </div>

                      {/* Duration and Location */}
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Building2 size={16} />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {experience.responsibilities.map((responsibility, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <ArrowRight size={14} className={`text-${experience.color} mt-1 flex-shrink-0`} />
                              <span>{responsibility}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Users size={16} />
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {experience.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              className={`p-3 rounded-lg bg-${experience.color}/5 border border-${experience.color}/10`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="text-sm text-foreground font-medium">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-6">
            Interested in working together or learning more about my experience?
          </p>
          <motion.button
            className="glass px-8 py-4 rounded-full font-semibold text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;