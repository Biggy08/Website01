# AGENTS.md — Aadhi Code Website

> **For coding agents and new developers.** This document is the authoritative reference for understanding this project's current state, architecture, decisions, and what remains to be built.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Completed Work](#4-completed-work)
5. [Remaining Roadmap](#5-remaining-roadmap)
6. [Database Structure](#6-database-structure)
7. [Authentication Setup](#7-authentication-setup)
8. [Key Architectural Decisions](#8-key-architectural-decisions)
9. [Theming System](#9-theming-system)
10. [Known Quirks & Gotchas](#10-known-quirks--gotchas)
11. [Development Workflow](#11-development-workflow)
12. [Environment Variables](#12-environment-variables)
13. [Real Company Info](#13-real-company-info)

---

## 1. Project Overview

**Client:** Aadi Code Pvt Ltd (also stylised as "Aadhi Code")
**Location:** Baluwatar, Kathmandu, Nepal
**Founder:** Nabin Thapa
**Contact:** aadicodepvtltd@gmail.com | +977 9803407244

This is the **public-facing company website** and **admin CMS** for Aadhi Code, a software engineering firm based in Kathmandu. The site showcases the company's vision, team, past work, ongoing projects, capabilities, and collaborations, and includes a full admin panel for content management.

**App name in package.json:** `aadhi-code-website`
**Dev server:** `http://localhost:3000`

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14.2.3** (App Router) |
| Language | **TypeScript 5** |
| Styling | **Vanilla CSS** (`globals.css`) — no Tailwind |
| Database | **SQLite** via **Prisma ORM 5.14** |
| Auth | **NextAuth.js v4** (credentials provider, JWT sessions) |
| Password hashing | **bcryptjs** |
| Font | **Inter** (Google Fonts, via `next/font`) |
| Runtime | Node.js |
| Package manager | npm |

---

## 3. Directory Structure

```
Website01/
├── assets/                    # Raw brand assets (not served by Next.js)
│   ├── Founder.png            # Founder photo asset
│   ├── logo.PNG               # Company logo
│   └── Info.txt               # Basic company contact info reference
├── prisma/
│   ├── schema.prisma          # Database schema (SQLite)
│   ├── dev.db                 # SQLite database file (do NOT commit)
│   └── seed.ts                # Seeds default admin user
├── public/
│   └── images/                # Publicly served images (auto-created at runtime)
│       ├── tech_vision.jpg    # Section hero image (copied from brain artifacts)
│       └── leader_portrait.jpg# Leader/founder portrait (copied from brain artifacts)
├── src/
│   ├── middleware.ts           # Protects all /admin/* routes (except /admin/login)
│   ├── app/
│   │   ├── globals.css         # SINGLE CSS file — all styles live here
│   │   ├── layout.tsx          # Root layout: wraps ThemeProvider + AuthProvider
│   │   ├── page.tsx            # Homepage (hero landing page)
│   │   ├── actions.ts          # All Next.js Server Actions (CRUD + auth guard)
│   │   ├── info/
│   │   │   └── page.tsx        # Public company info page (7 sections, server component)
│   │   ├── images/
│   │   │   └── [filename]/
│   │   │       └── route.ts    # Dynamic image serving route from public/images/
│   │   ├── admin/
│   │   │   ├── admin.css       # Admin-specific styles
│   │   │   ├── layout.tsx      # Admin shell: sidebar nav + main area
│   │   │   ├── login/
│   │   │   │   ├── page.tsx    # Login form (client component, uses next-auth signIn)
│   │   │   │   └── login.css   # Login page styles
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx    # Dashboard landing (currently minimal, has sign-out)
│   │   │   ├── team/
│   │   │   │   ├── page.tsx    # Server component: fetches members, passes to client
│   │   │   │   └── TeamPageClient.tsx  # Client: Add/Edit/Delete team members
│   │   │   └── settings/
│   │   │       └── page.tsx    # Company settings form (mission, contact, leader info)
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts # NextAuth handler + authOptions export
│   ├── components/
│   │   ├── AuthProvider.tsx    # Thin wrapper around next-auth SessionProvider
│   │   ├── ThemeProvider.tsx   # Dark/light theme context + localStorage persistence
│   │   ├── ThemeToggle.tsx     # Button that calls toggleTheme()
│   │   ├── Navbar.tsx          # Top nav bar for public /info page
│   │   ├── ContactForm.tsx     # Placeholder contact form (client, UI-only, no backend)
│   │   └── TeamMemberForm.tsx  # Add/Edit team member form (calls Server Actions)
│   └── lib/
│       ├── prisma.ts           # Prisma client singleton (hot-reload safe)
│       ├── db-init.ts          # Ensures admin user exists on first auth attempt
│       └── leader.ts           # LeaderInfo type, defaults, parse/serialize helpers
├── .env                        # Local environment variables (NOT committed)
├── .gitignore
├── next.config.mjs             # Empty Next.js config (defaults only)
├── tsconfig.json               # Strict TypeScript, @/* path alias -> ./src/*
├── tsconfig.seed.json          # Separate tsconfig for running the seed script
└── package.json
```

---

## 4. Completed Work

### Public Website (`/info`)

A rich single-page multi-section company profile at `/info`, rendered as a **Next.js server component** with `dynamic = "force-dynamic"`. It includes:

| # | Section ID | Content |
|---|---|---|
| 0 | `#vision` | Guiding ethos quote + tech vision image + leader message card |
| 1 | `#about` | Mission statement, engineering philosophy, location |
| 2 | `#members` | Team member cards (DB-driven, falls back to placeholder data) |
| 3 | `#works` | Previous client projects (currently hardcoded) |
| 4 | `#projects` | Active R&D initiatives with progress bars (currently hardcoded) |
| 5 | `#manpower` | Technical capabilities grid (currently hardcoded) |
| 6 | `#collaborations` | Partner organisations (currently hardcoded) |
| 7 | `#contact` | Contact info (DB-driven) + contact form |

### Homepage (`/`)

Hero landing page with:
- Company tagline ("Welcome to Aadhi Code")
- CTA buttons: "Explore Company Info" -> `/info`, "Contact Us" -> `/info#contact`
- Admin quick-access link (Admin -> `/admin/dashboard`)
- ThemeToggle

### Admin Panel (`/admin/*`)

Full authenticated CMS at `/admin`:

- **`/admin/login`** — Email/password login form
- **`/admin/dashboard`** — Welcome screen with sign-out button
- **`/admin/team`** — Full CRUD for team members (add, edit, delete), wired to Prisma via Server Actions
- **`/admin/settings`** — Edit company info (mission statement, email, phone, address) and full leader section (quote, supporting text, leader name, role, avatar URL, message)
- **`/admin/projects`** — Listed in sidebar nav but **page does not exist yet** (404)

### Authentication

- NextAuth v4 credentials provider
- JWT sessions
- Middleware protects all `/admin/*` except `/admin/login`
- Default admin auto-provisioned on first login attempt (see Section 7)

### Database Integration

- Prisma + SQLite
- Team members fully DB-driven (CRUD through admin)
- Company info (including serialised leader data) stored in `CompanyInfo` table
- Auto-creates admin user if missing (`db-init.ts`)

### Theming

- Dark/light mode toggle
- Persisted in `localStorage`
- CSS variables in `globals.css` under `:root` (light) and `.dark` (dark) classes
- Defaults to dark mode

### Image Serving

- `src/app/images/[filename]/route.ts` — Dynamic route that serves files from `public/images/`
- Path traversal protection via `path.basename()`
- `src/lib/leader.ts` -> `ensurePublicAssets()` — Copies `tech_vision.jpg` and `leader_portrait.jpg` from an artifact brain directory to `public/images/` at runtime if not present

---

## 5. Remaining Roadmap

### High Priority (Missing / Broken)

- **`/admin/projects` page** — Link exists in sidebar but no page file. Needs a CRUD interface for the `Project` model (which already exists in the Prisma schema). Pattern to follow: copy `admin/team/` structure.
- **`/admin/collaborations` page** — `Collaboration` model exists in schema but has no admin UI.
- **Contact form backend** — `ContactForm.tsx` currently does nothing on submit (just sets local state). Needs a real email send or database-stored inquiry (a `ContactInquiry` model would need to be added to the schema).
- **Image upload for team members** — `TeamMember.imageUrl` exists in the schema but is never set via the admin form. The `TeamMemberForm` only handles name/role/bio.

### Medium Priority (Incomplete / Placeholder)

- **Previous Works section** — Hardcoded in `info/page.tsx`. The `Project` model exists in the schema. The `/info` page should fetch from DB and fall back to hardcoded data like the team members section does.
- **Collaborations section** — Hardcoded in `info/page.tsx`. The `Collaboration` model exists in the schema. Same pattern applies.
- **Dashboard** — Very minimal. Should show summary stats (team member count, pending contacts, etc.).
- **Social links** — `CompanyInfo` has `facebookLink` and `twitterLink` columns that are unused anywhere in the UI or admin settings form.
- **Leader avatar upload** — Settings page allows entering a URL but there is no file upload. A file upload to `public/images/` would be needed.

### Nice to Have

- **Password change UI** — No way for admin to change their password from the panel
- **SEO metadata** — Only root `layout.tsx` has a metadata export. `/info` and admin pages are missing page-level `metadata` exports.
- **Responsive design audit** — The info page layout was built desktop-first; mobile breakpoints need thorough testing.
- **Real email sending** — Replace the placeholder contact form with Nodemailer / Resend / SendGrid.
- **Multi-admin support** — Currently, the `User` table supports multiple users but there is no UI to add/manage admin accounts.

---

## 6. Database Structure

**Provider:** SQLite (`prisma/dev.db`)
**ORM:** Prisma 5

### Models

```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String   // bcryptjs hash, salt rounds = 10
}

model TeamMember {
  id       Int     @id @default(autoincrement())
  name     String
  role     String
  bio      String?
  imageUrl String? // Not yet wired to any UI
  order    Int     @default(0) // Used to sort team members (orderBy: { order: "asc" })
}

model Project {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  link        String?
  // NOTE: No admin UI exists yet. /info page still uses hardcoded data.
}

model Collaboration {
  id          Int     @id @default(autoincrement())
  partnerName String
  description String?
  logoUrl     String?
  // NOTE: No admin UI exists yet. /info page still uses hardcoded data.
}

model CompanyInfo {
  id               Int     @id @default(1) // Always a single row — use upsert({ where: { id: 1 } })
  missionStatement String?
  email            String?
  phone            String?
  address          String?
  facebookLink     String? // Unused in UI currently
  twitterLink      String? // Unused in UI currently
  linkedinLink     String? // REPURPOSED — stores serialised JSON for leader section (see below)
}
```

### IMPORTANT: `CompanyInfo.linkedinLink` Repurposing

The `linkedinLink` column has been **repurposed** to store serialised JSON for the leader/vision section. This was done to avoid a schema migration. The JSON shape is:

```json
{
  "quote": "Possible, Practical and Plausible",
  "supportingText": "...",
  "leaderName": "Aashish Sharma",
  "leaderRole": "Founder & Lead Systems Architect",
  "leaderAvatarUrl": "/images/leader_portrait.jpg",
  "leaderMessage": "..."
}
```

Always use the helpers in `src/lib/leader.ts`:
- `parseLeaderInfo(companyInfo)` — safely parses the JSON, returns defaults on failure
- `serializeLeaderInfo(info)` — serialises before writing to DB
- `DEFAULT_LEADER_INFO` — the fallback values shown when DB has no data

If you ever add a proper `LeaderInfo` table, remove this repurposing and update `actions.ts` -> `updateCompanySettings` and `admin/settings/page.tsx`.

### Seeding & Migrations

```bash
# Run migrations after schema changes
npx prisma migrate dev --name your_migration_name

# Seed default admin user
npx prisma db seed

# Open Prisma Studio (web GUI)
npx prisma studio
```

The seed script is at `prisma/seed.ts` and runs via `ts-node` using `tsconfig.seed.json` (a separate tsconfig that enables CommonJS module output so ts-node can execute it).

---

## 7. Authentication Setup

**Library:** NextAuth.js v4 (`next-auth@4.24.7`)
**Strategy:** JWT sessions (no database sessions)
**Provider:** Credentials (email + password)

### How It Works

1. **Login flow:** User submits email/password at `/admin/login` -> `signIn("credentials", ...)` -> NextAuth calls `authorize()` in `src/app/api/auth/[...nextauth]/route.ts`
2. **`authorize()` logic:**
   - Calls `ensureDbInitialized()` (creates admin user if none exists)
   - Queries `User` table by email (case-insensitive via `.toLowerCase()`)
   - **Fallback:** If no user found AND email matches `admin@aadhicode.com`, auto-creates/upserts that user with password `password123`
   - Verifies password with `bcrypt.compare()`
   - **Emergency fallback:** If bcrypt compare fails for the default admin + default password, re-hashes and updates (handles hash desync scenarios)
3. **Session:** JWT token stored in cookie
4. **Sign out:** `signOut()` from `next-auth/react` — used in `/admin/dashboard`

### Middleware Protection

`src/middleware.ts` uses `withAuth` from `next-auth/middleware`:
- Matcher: `/admin/((?!login).*)` — protects all `/admin/*` paths **except** `/admin/login`
- Unauthenticated requests are redirected to `/admin/login`

### Server Actions Auth Guard

All Server Actions in `src/app/actions.ts` call `requireAuth()` first:

```ts
async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}
```

`authOptions` is exported from `src/app/api/auth/[...nextauth]/route.ts`.

### Default Admin Credentials

| Field | Value |
|---|---|
| Email | `admin@aadhicode.com` |
| Password | `password123` |

**Change the password in production.** There is currently no admin UI to change the password — it must be done directly via Prisma Studio or a one-off script.

---

## 8. Key Architectural Decisions

### App Router Only
Uses **Next.js 14 App Router** exclusively. No Pages Router code. All layouts use `layout.tsx`, all API routes use `route.ts`.

### Server Components + Server Actions Pattern
Data fetching happens in **async server components** (e.g., `info/page.tsx`, `admin/team/page.tsx`). Mutations go through **Next.js Server Actions** defined in `src/app/actions.ts`. Client components are used only where interactivity is needed.

For admin pages with both display and interaction:
- Server component fetches data -> passes to a client component (e.g., `TeamPage` -> `TeamPageClient`)
- Client component calls Server Actions for mutations

### Single CSS File
All global styles, design tokens, layout utilities, and component styles live in **`src/app/globals.css`**. There is no CSS modules or styled-components. Admin-specific styles are in `admin.css` and `login.css` as small supplements.

### SQLite for Development
The project uses **SQLite** (`prisma/dev.db`) for simplicity. **Do not commit `dev.db` to git.**

To migrate to PostgreSQL or MySQL in production: change the `datasource` in `prisma/schema.prisma` and add a `DATABASE_URL` to `.env`.

### Prisma Client Singleton
`src/lib/prisma.ts` uses the standard Next.js hot-reload safe singleton pattern. Always import Prisma from `@/lib/prisma`, never instantiate `new PrismaClient()` directly in components.

### Public Images at Runtime
The `public/images/` directory is auto-populated at runtime by `ensurePublicAssets()` in `src/lib/leader.ts`. This function copies images from a **hardcoded absolute path** (`C:\Users\Admin\.gemini\...`).

> **This path is machine-specific.** On any other machine, the images will not be copied and will silently fail (with a console warning). Fix this by either:
> 1. Manually committing `public/images/tech_vision.jpg` and `public/images/leader_portrait.jpg` to the repo, OR
> 2. Updating `ensurePublicAssets()` to reference a path inside the project (e.g., from the `assets/` directory).

### `@/` Path Alias
`@/*` resolves to `./src/*` as configured in `tsconfig.json`. Always use `@/` imports.

---

## 9. Theming System

The site supports **dark/light mode** with dark as the default.

### CSS Variables
Defined in `src/app/globals.css`:
- `:root` block -> light mode variables
- `.dark` class (on `<html>`) -> dark mode overrides

Key variables: `--primary-color`, `--secondary-color`, `--accent-color`, `--text-main`, `--text-muted`, `--border-color`, `--shadow-md`.

### Theme State
- **`ThemeProvider`** (`src/components/ThemeProvider.tsx`) — React context, reads/writes `localStorage`, toggles `.dark` class on `document.documentElement`
- **`ThemeToggle`** (`src/components/ThemeToggle.tsx`) — Button that calls `toggleTheme()`

Both providers are applied in `src/app/layout.tsx`. The root `<html>` tag has `suppressHydrationWarning` to prevent React hydration mismatch caused by the client-side theme class.

---

## 10. Known Quirks & Gotchas

1. **`/admin/projects` is a dead link.** The sidebar nav in `admin/layout.tsx` links to `/admin/projects` but there is no page there. It will 404.

2. **Contact form is UI-only.** `ContactForm.tsx` shows a success state on submit but sends no data anywhere. There is no `ContactInquiry` model in the schema either.

3. **`linkedinLink` stores JSON, not a URL.** The `CompanyInfo.linkedinLink` column stores serialised `LeaderInfo` JSON. Do not treat it as a LinkedIn URL field.

4. **`ensurePublicAssets()` path is hardcoded to the original dev machine.** Images may be missing on first run elsewhere. See Section 8.

5. **No client-side refresh after team member delete.** `deleteTeamMember()` is called inside `startTransition()` but the displayed list only updates on the next full navigation. Consider adding `router.refresh()` after the transition for immediate UI feedback.

6. **`facebookLink` and `twitterLink`** are in the schema but are never read or written anywhere.

7. **`TeamMember.imageUrl`**, **`Project.imageUrl`**, **`Project.link`**, and **`Collaboration.logoUrl`** exist in the schema but are never populated through the admin UI.

8. **The `assets/` directory** (`logo.PNG`, `Founder.png`) is **not** served by Next.js. Copy files to `public/` to serve them statically.

---

## 11. Development Workflow

### Starting the Dev Server

```bash
cd "f:\01project\Website 01\Website01"
npm run dev
# App available at http://localhost:3000
```

### After Schema Changes

```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Seeding the Database

```bash
npx prisma db seed
# Seeds admin: admin@aadhicode.com / password123
```

### Prisma Studio

```bash
npx prisma studio
# Opens at http://localhost:5555
```

### Build Check

```bash
npm run build
```

### Adding a New Admin Page

1. Create `src/app/admin/your-page/page.tsx`
2. Add a `<Link>` to `src/app/admin/layout.tsx` sidebar nav
3. Add Server Actions to `src/app/actions.ts` for data mutations
4. If client interactivity needed: split into server component + `YourPageClient.tsx`

### Adding a New Public Section

Edit `src/app/info/page.tsx`. Add a `<section id="your-id">` block. Add a matching nav link to `src/components/Navbar.tsx`.

---

## 12. Environment Variables

File: `.env` (not committed to git)

```env
# Required for NextAuth JWT signing and session encryption
NEXTAUTH_SECRET="aadhi-code-super-secret-key-change-in-production"

# Must match the URL where the app is running
NEXTAUTH_URL="http://localhost:3000"
```

**For production:** Set a strong random `NEXTAUTH_SECRET` and update `NEXTAUTH_URL` to the deployed domain.

For PostgreSQL migration, add:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

---

## 13. Real Company Info

From `assets/Info.txt`:

| Field | Value |
|---|---|
| Company name | Aadi Code Pvt Ltd |
| Address | Baluwatar, Kathmandu, Nepal |
| Phone | +977 9803407244 |
| Email | aadicodepvtltd@gmail.com |
| Founder | Nabin Thapa |

The public website currently uses placeholder contact details (`contact@aadhicode.com`, `+977-1-4400000`). Update these via Admin -> Company Settings, or by editing the fallback strings in `src/app/info/page.tsx`.

---

*Last updated: 2026-09-26 by Antigravity coding agent.*
