# TechPulse

TechPulse is an AI-powered developer intelligence platform for exploring GitHub activity, repository insights, AI analysis, technology news, and personalized learning.

## Features

- GitHub OAuth login and secure session handling
- GitHub profile and repository synchronization
- Repository insights and activity analytics
- AI project analysis with Gemini
- Personalized learning recommendations
- Developer news and trend aggregation
- Premium dark SaaS dashboard experience
- Demo mode for local use without external credentials

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Lucide React
- Recharts
- Framer Motion
- Google Gemini

## Project structure

- app/ — routes and pages
- components/ — UI and layout components
- lib/ — services, utilities, demo data, and environment config
- prisma/ — Prisma schema and seed setup
- public/ — static assets

## Environment setup

Copy `.env.example` to `.env.local` and fill in the required values.

```bash
cp .env.example .env.local
```

Required keys:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/techpulse?schema=public"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GITHUB_REDIRECT_URI="http://localhost:3000/api/github/callback"
GEMINI_API_KEY=""
NEWS_API_KEY=""
REDDIT_CLIENT_ID=""
REDDIT_CLIENT_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DEMO_MODE="true"
```

## Database setup

1. Start PostgreSQL locally or use Supabase/Neon.
2. Set `DATABASE_URL` in `.env.local`.
3. Run:

```bash
npx prisma generate
npx prisma migrate dev
```

## GitHub OAuth setup

1. Create a GitHub OAuth app in your GitHub account.
2. Set the homepage URL and callback URL to your local app URL.
3. Add the generated client id and secret to `.env.local`.

## Gemini setup

1. Create a Google AI Studio project and generate a Gemini API key.
2. Add it to `GEMINI_API_KEY` in `.env.local`.

## Installation

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Demo mode

When `DEMO_MODE=true`, the app uses realistic sample data and does not require external API keys.

## Deployment

Deploy to Vercel and configure the environment variables in the project settings. Use production PostgreSQL credentials and the deployed callback URL as `GITHUB_REDIRECT_URI`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
