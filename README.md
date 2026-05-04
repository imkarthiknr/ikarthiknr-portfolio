# Karthik NR — Portfolio

Personal portfolio website for **Karthik NR**, System Development Engineer at Amazon and AI Enthusiast. Built with a modern React stack, 3D animations, and deployed on Firebase Hosting.

**Live:** [ikarthiknr-portfolio.web.app](https://ikarthiknr-portfolio.web.app)

---

## Sections

| Section | Description |
|---|---|
| Hero | Intro, role, CTA buttons, and social links |
| About | Summary, background, and core expertise areas |
| Experience | Work history at Amazon, AWS, and Prodapt |
| Education | M.Tech at BITS Pilani, B.E. at Sri Sairam Engineering College |
| Skills | Frontend, backend, cloud, DevOps, and observability skills |
| Certifications | AWS, IBM, Coursera, and freeCodeCamp certifications |
| Projects | Featured projects — currently NotesPro |
| Contact | Contact form (Firestore + Firebase Trigger Email) and social links |

---

## Tech Stack

**Core**
- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui (Radix UI)

**Animations & 3D**
- Framer Motion
- Three.js + React Three Fiber

**Backend & Database**
- Firebase Firestore — contact form submissions
- Firebase Hosting — deployment
- Firebase Trigger Email extension — email notifications on new contact

**Forms**
- React Hook Form + Zod

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

App runs at `http://localhost:5173`.

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
