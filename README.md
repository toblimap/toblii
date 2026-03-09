# TOBLI - Business Directory

A premium location-based business discovery platform built with React, Vite, and Cloudflare Pages.

## Tech Stack
-   **Frontend**: React + Vite + Tailwind CSS + Framer Motion
-   **Routing**: React Router v6
-   **State Management**: Zustand & TanStack Query
-   **Backend**: Cloudflare Pages Functions (Hono)
-   **Database**: Cloudflare D1 (SQLite)
-   **Search**: FTS5 Full Text Search
-   **Payments**: Pesapal v3
-   **Automations**: Cloudflare Cron Triggers

## Deployment Steps

### 1. Create the D1 Database
Run this command to create a new D1 database instance:
```bash
npx wrangler d1 create tobli-db
```
Copy the `database_id` from the output and paste it into your `wrangler.toml` file under `[[d1_databases]]`.

### 2. Apply Database Migrations
Run the initial schema migrations to set up the tables and FTS5 search index:
```bash
# Apply to local for development
npm run db:migrate:local

# Apply to production (remote)
npm run db:migrate
```

### 3. Build & Deploy to Cloudflare Pages
Build the production bundle and deploy it to Cloudflare:
```bash
npm run pages:deploy
```

## Security & Secrets
Do not commit sensitive values. Use `wrangler` to securely store your secrets for production:
```bash
npx wrangler pages secret put JWT_SECRET
npx wrangler pages secret put PESAPAL_CONSUMER_KEY
npx wrangler pages secret put PESAPAL_CONSUMER_SECRET
```

## Midnight Business Reset (Cron)
The platform is configured to automatically close all businesses at midnight EAT (UTC+3) to ensure accuracy. This is controlled via the `[triggers]` block in `wrangler.toml`.

To deploy the cron worker specifically:
```bash
npx wrangler deploy src/cron.js --name tobli-cron
```

## Admin Access
To access the admin dashboard at `/admin`, you must manually set your user's `is_admin` column to `1` in the database:
```bash
# Local
npx wrangler d1 execute tobli-db --command "UPDATE businesses SET is_admin = 1 WHERE email = 'YOUR_EMAIL'" --local

# Production
npx wrangler d1 execute tobli-db --command "UPDATE businesses SET is_admin = 1 WHERE email = 'YOUR_EMAIL'" --remote
```
