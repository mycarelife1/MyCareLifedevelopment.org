# MyCare Life Development Organization

A youth-led humanitarian and development organization website built with React, Vite, Tailwind CSS, and Supabase.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Supabase** for backend (volunteer registrations, donations, contact forms, newsletter)
- **Lucide React** for icons
- **React Router** for navigation

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build

```bash
npm run build
```

## Deploy

Connect this repository to your hosting provider (Vercel, Netlify, etc.)
Set build command: `npm run build`
Set output directory: `dist`
Add environment variables in your hosting dashboard.