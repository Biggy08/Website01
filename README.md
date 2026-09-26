# Aadi Code Website

Public website and admin CMS for **Aadi Code Pvt Ltd**, a software engineering company in Baluwatar, Kathmandu, Nepal.

The app is built with Next.js App Router, Prisma, SQLite, and NextAuth. It includes a public company profile page plus an authenticated admin area for managing company content.

## Current Features

- Public homepage at `/` with brand logo, theme toggle, admin link, and calls to action.
- Public company profile at `/info` with sections for vision, about, team, previous works, active projects, manpower, collaborations, and contact.
- Authenticated admin panel under `/admin`.
- Admin pages for dashboard, team members, previous works, collaborations, and company settings.
- Team member create, edit, delete, and profile photo upload.
- Previous works create and delete with optional project image upload.
- Collaboration create and delete with optional logo upload.
- Company settings for mission, contact details, leadership quote, leader profile, and founder photo upload.
- Dark/light theme support with localStorage persistence.
- SQLite database through Prisma ORM.

## Tech Stack

- Next.js 14.2.3
- React 18
- TypeScript 5
- Prisma 5.14 with SQLite
- NextAuth.js v4 credentials auth
- bcryptjs for password hashing
- Vanilla CSS in `src/app/globals.css`, with admin supplements in `admin.css` and `login.css`

## Getting Started

```bash
npm install
npx prisma generate
npx prisma db seed
npm run dev
```

Open `http://localhost:3000`.

Default admin login:

- Email: `admin@aadhicode.com`
- Password: `password123`

The login form also accepts `admin` as shorthand for the default admin email.

## Environment Variables

Create `.env`:

```env
NEXTAUTH_SECRET="replace-with-a-strong-secret"
NEXTAUTH_URL="http://localhost:3000"
```

The local SQLite database is `prisma/dev.db`.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npx prisma migrate dev --name your_migration_name
npx prisma db seed
npx prisma studio
```

## Project Structure

```text
assets/                 Raw source assets
prisma/                 Prisma schema, seed, local SQLite database
public/images/          Served images and uploaded files
src/app/                Next.js App Router pages, layouts, actions, routes
src/components/         Shared UI components
src/lib/                Prisma, auth, leader info, database init helpers
```

## Known Gaps

- Contact form is still UI-only and does not send email or save inquiries.
- Previous works and collaborations admin pages support add/delete, but not editing from the UI yet.
- `Project.link` is stored but not currently rendered as a clickable public link.
- `Collaboration.logoUrl` is stored but the public collaborations section does not currently render uploaded logos.
- Active projects and manpower sections are still hardcoded in `src/app/info/page.tsx`.
- Dashboard is minimal and does not show statistics yet.
- Social link columns exist in the database but are not exposed in the UI.
- Uploaded files are stored under `public/images/uploads/`; use persistent storage before production deployment.

## Company Info

- Company: Aadi Code Pvt Ltd
- Address: Baluwatar, Kathmandu, Nepal
- Phone: +977 9803407244
- Email: aadicodepvtltd@gmail.com
- Founder: Nabin Thapa
