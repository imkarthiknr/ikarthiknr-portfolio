// GitHub linguist colours for the languages that show up in my repos
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#663399',
  PHP: '#4F5D95',
  Go: '#00ADD8',
};

export const languageColor = (lang: string | null) => (lang && languageColors[lang]) || '#8b8b93';
