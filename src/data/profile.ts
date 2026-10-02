export const profile = {
  name: 'Karthik N R',
  fullName: 'Karthik Nachiappan Rajendran',
  initials: 'NRK',
  role: 'System Development Engineer II',
  company: 'Amazon',
  location: 'Chennai, India',
  email: 'karthik180499@gmail.com',
  phone: '+91 73972 64570',
  phoneHref: 'tel:+917397264570',
  resumeUrl: 'https://docs.google.com/document/d/1gHh229TxQIq_3xwAEEwv08z-souR46bp/export?format=pdf',
  careerStart: new Date(2020, 5, 1), // June 2020
  github: { username: 'imkarthiknr', url: 'https://github.com/imkarthiknr' },
  medium: { username: 'ikarthiknr', url: 'https://medium.com/@ikarthiknr' },
  devto: { username: 'ikarthiknr', url: 'https://dev.to/ikarthiknr' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/imkarthiknr' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ikarthiknr/' },
    { label: 'X', href: 'https://x.com/ikarthiknr' },
    { label: 'Medium', href: 'https://medium.com/@ikarthiknr' },
    { label: 'DEV', href: 'https://dev.to/ikarthiknr' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/karthik180499/' },
    { label: 'Instagram', href: 'https://www.instagram.com/ikarthiknr/' },
  ],
} as const;

/** Years of experience since career start, e.g. "6+". */
export const yearsOfExperience = () => {
  const now = new Date();
  const start = profile.careerStart;
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years--;
  return `${years}+`;
};
