import { BadgeCheck, ExternalLink } from 'lucide-react';

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/ae58fa98-3361-4c78-adf6-5bb101737f3d/linked_in_profile",
    year: "2024"
  },
  {
    name: "IBM Data Science Specialization",
    issuer: "Coursera / IBM",
    link: "https://www.coursera.org/account/accomplishments/verify/JG5ENV76KN8P",
    year: "2019"
  },
  {
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan – Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/3RRM9W5JN9BY",
    year: "2019"
  },
  {
    name: "Responsive Web Design V8",
    issuer: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcc126335d8-6f80-495b-b9b8-b8cd8c915b89/responsive-web-design",
    year: "2018"
  }
];

const CertificationsSection = () => (
  <section id="certifications" className="py-20 relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
          Certifications
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Recognized credentials that validate my expertise and commitment to continuous learning.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certifications.map(cert => (
          <div key={cert.name} className="glass rounded-2xl p-6 border border-border/20 shadow-xl flex flex-col items-start hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <BadgeCheck className="text-primary" size={24} />
              <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{cert.issuer}</div>
            <div className="text-xs text-muted-foreground mb-4">{cert.year}</div>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
              >
                View Credential <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;