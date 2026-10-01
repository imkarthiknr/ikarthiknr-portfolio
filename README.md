# Karthik NR — Portfolio

Personal portfolio website for **Karthik NR**, System Development Engineer at Amazon and AI Enthusiast. Built with React, TypeScript and Tailwind, and deployed on Firebase Hosting.

**Live:** [ikarthiknr-portfolio.web.app](https://ikarthiknr-portfolio.web.app)

---

## Sections

| Section | Description |
|---|---|
| Hero | Intro, CTAs, socials, latest certification and live stats |
| About | Summary and focus areas |
| Experience | Timeline of Amazon, AWS and Prodapt roles |
| Projects | Featured projects + a full filterable [`/projects`](https://ikarthiknr-portfolio.web.app/projects) page |
| Skills | Grouped toolkit |
| GitHub | Live contribution heatmap, language breakdown and recently pushed repos |
| Writing | Articles pulled live from DEV.to and Medium |
| Credentials | Certifications and education |
| Contact | Contact form (Firestore + Firebase Trigger Email) and links |

**Features:** light/dark theme (follows the OS by default), ⌘K / Ctrl+K command palette, shareable project filters (`/projects?category=AI&tech=Python`), reduced-motion support.

---

## Updating content

All content lives in `src/data/` — no UI code changes needed:

| File | What it holds |
|---|---|
| `profile.ts` | Name, role, email, résumé link, social links |
| `experience.ts` | Work history |
| `projects.ts` | Curated projects (set `featured: true` to show on the home page) |
| `skills.ts` | Skill groups |
| `credentials.ts` | Certifications (newest first) and education |

GitHub stats, repos and articles are fetched at runtime (cached for 30 minutes in `localStorage`).

---

## Tech Stack

- React 18 + TypeScript, Vite 5
- Tailwind CSS + shadcn/ui (Radix UI), `next-themes`, `cmdk`
- Framer Motion
- TanStack Query for GitHub / DEV.to / Medium data
- Firebase Firestore + Trigger Email (contact form), Firebase Hosting

---

## Getting Started

```sh
# Clone
git clone https://github.com/imkarthiknr/ikarthiknr-portfolio.git
cd prism-pulse-port

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:8080`.

---

## Deployment

```sh
# Build
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

Firebase serves the `dist/` folder. Always run `npm run build` before `firebase deploy` to include latest changes.

---

## Contact Form Setup

The contact form saves submissions to Firestore (`contacts` collection) and triggers an email via the [Firebase Trigger Email extension](https://extensions.dev/extensions/firebase/firestore-send-email).

**Requirements:**
- Firebase project on Blaze plan
- Firebase Trigger Email extension installed (Cloud Functions location: `us-central1`)
- Gmail App Password configured as the SMTP credential

---

## Connect

- GitHub: [imkarthiknr](https://github.com/imkarthiknr)
- LinkedIn: [ikarthiknr](https://www.linkedin.com/in/ikarthiknr/)
- X: [@ikarthiknr](https://x.com/ikarthiknr)
- Medium: [@ikarthiknr](https://medium.com/@ikarthiknr)
- DEV: [ikarthiknr](https://dev.to/ikarthiknr)
