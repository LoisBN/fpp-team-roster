# Team Roster — Passing Data with Props

Build a team roster page that passes data through props to reusable member card components.

## What You'll Learn

- Props and interfaces in React
- Mapping over arrays to render lists
- Creating reusable components
- Conditional rendering

## Tech Stack

- **React Router v7** (framework mode) — handles pages and routing
- **Supabase** — database and auth (pre-configured client)
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

## Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/LoisBN/fpp-team-roster.git
cd fpp-team-roster

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Project Structure

```
app/
├── routes/
│   └── home.tsx          ← Roster page with team array
├── components/
│   └── MemberCard.tsx    ← Reusable member card (you'll create this)
├── lib/
│   └── supabase.ts       ← Supabase client setup
├── app.css               ← Global styles (Tailwind)
├── root.tsx              ← App shell and layout
└── routes.ts             ← Route definitions
```

## Your Exercise Tasks

See the exercise instructions on the course platform for the full task list. The short version:

1. Clone the repo and explore the team data structure
2. Create a MemberCard component with typed props
3. Map over the team array and render cards
4. Add online/offline status badge

## Hints

- Define interfaces for your component props to ensure type safety
- Use the .map() array method to loop through data
- You can pass functions as props for interactive elements

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
