# Rahul Teja - Personal Portfolio Website

A modern, production-grade personal portfolio website for **Rahul Teja**, Software Developer focused on Backend Engineering and AI/ML.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and modern web standards.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React 19 + Vite
- **Language**: TypeScript (Strict Mode)
- **Routing**: React Router DOM (Multi-page client-side SPA)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React + React Icons (Vector Brand & Language Logotypes)
- **Animations & Visuals**: Interactive Canvas Particle Network, CSS Parallax Effects
- **Deployment**: Vercel (Edge Network with Single Page Application rewrites)

---

## 📂 Project Structure

```
portfolio/
├── public/                  # Static assets, verified letters, and imagery
│   └── assets/
│       ├── images/          # Optimized production visual assets
│       └── letters/         # Experience and verification documents
├── src/
│   ├── components/          # Reusable UI components, header, footer, modals
│   ├── context/             # ThemeContext (Dark/Light mode state)
│   ├── data/                # Data models (projects, skills, certs, timeline)
│   ├── pages/               # Routed pages (Home, Projects, Skills, Experience, Certifications, TIL, Contact)
│   ├── utils/               # Timezone, date, and string formatting helpers
│   ├── App.tsx              # Root routing configuration
│   ├── main.tsx             # Application entrypoint
│   └── index.css            # Tailwind directives and custom animation styles
├── vercel.json              # Vercel SPA rewrite configuration
├── tailwind.config.js       # Design tokens, custom colors, and typography
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## 💻 Local Development

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rahul-1909/Portfolio.git
cd Portfolio
npm install
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🚀 Deployment on Vercel

This portfolio is configured for zero-configuration deployment on **Vercel**:

1. Log into your **Vercel Dashboard**.
2. Click **Add New...** > **Project**.
3. Import your GitHub repository (`Portfolio`).
4. Keep the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

The included `vercel.json` file ensures that all client-side routes (e.g., `/projects`, `/work/experience`, `/work/certifications`) route smoothly without 404 errors on browser refresh.

---

## 👤 Author

**Rahul Teja**
- **Email**: [nrahulteja@outlook.com](mailto:nrahulteja@outlook.com)
- **LinkedIn**: [https://www.linkedin.com/in/nallarahulteja/](https://www.linkedin.com/in/nallarahulteja/)
- **GitHub**: [https://github.com/rahul-1909](https://github.com/rahul-1909)
- **X / Twitter**: [https://x.com/Knightswatch__](https://x.com/Knightswatch__)
