# Culinary Guild AI

Your intelligent kitchen companion — powered by AI and built with Next.js.

## Features

- **AI Culinary Assistant** — Ask questions about recipes, techniques, ingredients, and get personalized cooking guidance
- **Recipe Explorer** — Browse a curated collection of recipes from world cuisines with search and filtering
- **Beautiful UI** — Modern, responsive design with smooth animations and a warm culinary aesthetic

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Lucide React](https://lucide.dev/) — Beautiful icons
- [Vercel](https://vercel.com/) — Deployment platform

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── api/chat/     # AI chat API endpoint
│   ├── assistant/    # AI assistant chat page
│   ├── recipes/      # Recipe explorer page
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout with navbar/footer
│   └── page.tsx      # Landing page
├── components/
│   ├── Navbar.tsx    # Navigation bar
│   └── Footer.tsx    # Footer
└── lib/
    └── recipes.ts    # Recipe data and types
```

## Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel auto-detects Next.js and configures the build
4. Your app is live!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Haroldtrapier/culinary-guild-ai)
