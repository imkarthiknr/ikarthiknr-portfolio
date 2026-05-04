import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import amazonLogo from '@/assets/aws.png';
import prodaptLogo from '@/assets/prodapt.png';

const experiences = [
  {
    id: "amazon-sde",
    company: "Amazon Inc.",
    role: "System Development Engineer I",
    duration: "Aug 2024 - Present",
    location: "Chennai, India",
    type: "Full-time",
    logo: amazonLogo,
    responsibilities: [
      "Designed and operated highly available distributed systems for large-scale AI evaluation platforms supporting multi-language workloads.",
      "Built scalable infrastructure using AWS (Lambda, S3, Batch, SQS, CDK) for high-throughput processing and fault-tolerant execution.",
      "Improved system performance by reducing execution time from 5 days to 45 hours, increasing system efficiency and reliability.",
      "Developed automation frameworks for orchestration, dependency handling, and execution workflows across distributed services.",
      "Implemented monitoring and logging systems (Splunk) for real-time observability, debugging, and incident analysis.",
      "Designed mechanisms for partial execution and failure recovery, improving system resilience and reducing downtime.",
      "Built CI/CD pipelines and automated deployment workflows using Jenkins, ensuring safe and reproducible releases.",
      "Handled production operations, including debugging issues, release management, and system performance optimization."
    ]
  },
  {
    id: "aws-appeng",
    company: "Amazon Web Services",
    role: "Application Engineer III",
    duration: "Oct 2022 – Jul 2024",
    location: "Chennai, India",
    type: "Full-time",
    logo: amazonLogo,
    responsibilities: [
      "Developed backend systems for large-scale evaluation and processing platforms supporting 80+ programming languages.",
      "Built distributed workflows using AWS services (Lambda, DynamoDB, S3, Batch, ECR).",
      "Designed systems for scalable and reliable data processing across distributed services.",
      "Automated execution pipelines and improved system efficiency through workflow optimization.",
      "Contributed to system monitoring, debugging, and performance improvements in production environments."
    ]
  },
  {
    id: "prodapt",
    company: "Prodapt Solutions Pvt. Ltd.",
    role: "Software Engineer",
    duration: "Jun 2020 – Sep 2022",
    location: "Chennai, India",
    type: "Full-time",
    logo: prodaptLogo,
    responsibilities: [
      "Developed backend and full-stack applications using Python (Flask), PHP, Angular, and SQL.",
      "Built REST APIs and backend workflows for production systems.",
      "Implemented automation scripts and improved application performance.",
      "Supported production systems through debugging and issue resolution."
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

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={experience.id}
                  variants={cardVariants}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Dot with Logo */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 transform md:-translate-x-1/2 -translate-y-1/2 top-8 md:top-auto">
                    <motion.div 
                      className="w-full h-full rounded-full glass border-2 border-primary flex items-center justify-center bg-white"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="w-6 h-6 object-contain"
                      />
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
                            className="p-3 rounded-xl bg-primary/10 border border-primary/20"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <img
                              src={experience.logo}
                              alt={`${experience.company} logo`}
                              className="w-8 h-8 object-contain"
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
                            <p className="text-primary font-semibold">{experience.role}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
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
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {experience.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="mt-1 text-primary">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
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