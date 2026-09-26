# AGENTS.md - Aadi Code Website

Authoritative project notes for coding agents and developers working on this repository.

Last updated: 2026-09-26

## 1. Project Overview

**Client:** Aadi Code Pvt Ltd  
**Location:** Baluwatar, Kathmandu, Nepal  
**Founder:** Nabin Thapa  
**Contact:** aadicodepvtltd@gmail.com | +977 9803407244

This repository contains the public company website and authenticated admin CMS for Aadi Code Pvt Ltd, a software engineering company based in Kathmandu. The public site presents the company's vision, team, previous works, active initiatives, capabilities, collaborations, and contact details. The admin area manages the dynamic CMS-backed parts of that content.

App name in `package.json`: `aadhi-code-website`  
Default dev server: `http://localhost:3000`

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.3, App Router |
| Language | TypeScript 5 |
| Styling | Vanilla CSS, mainly `src/app/globals.css` |
| Database | SQLite through Prisma ORM 5.14 |
| Auth | NextAuth.js v4 credentials provider with JWT sessions |
| Password hashing | bcryptjs |
| Font | Inter via `next/font` |
| Package manager | npm |

There is no Tailwind, CSS module system, styled-components, or Pages Router code.

## 3. Directory Structure

```text
Website01/
├── assets/
│   ├── Founder.png
│   ├── Info.txt
│   ├── Logo- Light.png
│   └── Logo-Dark.png
├── prisma/
│   ├── schema.prisma
│   ├── dev.db
│   └── seed.ts
├── public/
│   └── images/
│       ├── aadi-code-logo.png
│       ├── founder.png
│       ├── leader_portrait.jpg
│       ├── logo-dark.png
│       ├── logo-light.png
│       └── tech_vision.jpg
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── actions.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── info/page.tsx
│   │   ├── images/[filename]/route.ts
│   │   ├── admin/
│   │   │   ├── admin.css
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── login/login.css
│   │   │   ├── team/page.tsx
│   │   │   ├── team/TeamPageClient.tsx
│   │   │   ├── projects/page.tsx
│   │   │   ├── collaborations/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/auth/[...nextauth]/route.ts
│   ├── components/
│   │   ├── AuthProvider.tsx
│   │   ├── BrandLogo.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── SiteIcon.tsx
│   │   ├── TeamMemberForm.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── VisionLogoCard.tsx
│   └── lib/
│       ├── auth.ts
│       ├── db-init.ts
│       ├── leader.ts
│       └── prisma.ts
├── .env
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
├── tsconfig.json
└── tsconfig.seed.json
```

## 4. Current Public Website

### `/`

Homepage with:

- Theme-aware brand logo.
- Header controls for admin access and theme toggle.
- Hero title and subtitle.
- CTA links to `/info` and `/info#contact`.

### `/info`

`src/app/info/page.tsx` is an async server component with `dynamic = "force-dynamic"`. It attempts to fetch dynamic records directly from Prisma and falls back to curated placeholder content when records are missing or database access fails.

Current sections:

| Section | ID | Data source |
|---|---|---|
| Guiding vision and leadership | `#vision` | `CompanyInfo.linkedinLink` JSON via `parseLeaderInfo()` |
| About | `#about` | `CompanyInfo.missionStatement` with fallback |
| Members | `#members` | `TeamMember` table with fallback members |
| Previous works | `#works` | `Project` table with fallback portfolio items |
| Active projects | `#projects` | Hardcoded in `info/page.tsx` |
| Manpower and capabilities | `#manpower` | Hardcoded in `info/page.tsx` |
| Collaborations | `#collaborations` | `Collaboration` table with fallback partners |
| Contact | `#contact` | `CompanyInfo` contact fields plus `ContactForm` |

Important details:

- `Project.link` is saved by admin actions but is not currently rendered as a public clickable link.
- `Collaboration.logoUrl` is saved by admin actions but the public collaborations cards currently show a generic icon instead of uploaded logos.
- The contact form is a client-side placeholder only. It shows a success state but does not send email or persist inquiries.

## 5. Current Admin CMS

All `/admin/*` routes except `/admin/login` are protected by `src/middleware.ts`.

| Route | Status |
|---|---|
| `/admin/login` | Credentials login through NextAuth |
| `/admin/dashboard` | Minimal welcome page and sign out button |
| `/admin/team` | Team list with add, edit, delete, and image upload |
| `/admin/projects` | Add/delete previous works with optional image upload |
| `/admin/collaborations` | Add/delete collaborations with optional logo upload |
| `/admin/settings` | Company contact, mission, quote, leader profile, and founder photo upload |

Server actions live in `src/app/actions.ts` and all mutating actions call `requireAuth()`.

Image upload behavior:

- `saveImage()` accepts PNG, JPEG, and WebP images.
- Max size is 5 MB.
- Files are written to `public/images/uploads/`.
- Returned URLs are stored as `/images/uploads/<uuid>.<ext>`.

Admin limitations:

- Projects and collaborations have `updateProject()` and `updateCollaboration()` actions, but the current admin pages do not expose edit forms.
- Uploaded project images appear in the public previous works section.
- Uploaded collaboration logos appear in the admin list but not the public collaborations section.
- There is no admin UI for password changes or user management.

## 6. Database Schema

Provider: SQLite  
Database file: `prisma/dev.db`  
ORM: Prisma 5

Current models:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
}

model TeamMember {
  id       Int     @id @default(autoincrement())
  name     String
  role     String
  bio      String?
  imageUrl String?
  order    Int     @default(0)
}

model Project {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  link        String?
}

model Collaboration {
  id          Int     @id @default(autoincrement())
  partnerName String
  description String?
  logoUrl     String?
}

model CompanyInfo {
  id               Int     @id @default(1)
  missionStatement String?
  email            String?
  phone            String?
  address          String?
  facebookLink     String?
  twitterLink      String?
  linkedinLink     String?
}
```

### Important: `CompanyInfo.linkedinLink`

`linkedinLink` is intentionally repurposed to store serialized JSON for the leader/vision section. Do not treat it as a real LinkedIn URL in the current app.

Always use helpers in `src/lib/leader.ts`:

- `parseLeaderInfo(companyInfo)`
- `serializeLeaderInfo(info)`
- `DEFAULT_LEADER_INFO`

Current JSON shape:

```json
{
  "quote": "Possible, Practical and Plausible",
  "supportingText": "...",
  "leaderName": "Nabin Thapa",
  "leaderRole": "Founder & Lead Systems Architect",
  "leaderAvatarUrl": "/images/founder.png",
  "leaderMessage": "..."
}
```

If a proper `LeaderInfo` table is added later, update:

- `src/lib/leader.ts`
- `src/app/actions.ts`
- `src/app/admin/settings/page.tsx`
- `src/app/info/page.tsx`

## 7. Authentication

Auth options live in `src/lib/auth.ts`.

Flow:

1. `/admin/login` calls `signIn("credentials")`.
2. NextAuth route at `src/app/api/auth/[...nextauth]/route.ts` imports `authOptions`.
3. `authorize()` calls `ensureDbInitialized()`.
4. Default admin user is created if missing.
5. Email is normalized to lowercase.
6. `admin` is accepted as shorthand for `admin@aadhicode.com`.
7. Password is verified with `bcrypt.compare()`.
8. Session strategy is JWT.

Default admin:

| Field | Value |
|---|---|
| Email | `admin@aadhicode.com` |
| Password | `password123` |

Change this before production. There is no built-in password change UI yet.

## 8. Assets and Images

Raw source assets live in `assets/`. Publicly served assets live in `public/images/`.

`src/lib/leader.ts` contains `ensurePublicAssets()`, which currently copies:

- `assets/tech_vision.jpg` to `public/images/tech_vision.jpg` if present and missing.
- `assets/Founder.png` to `public/images/founder.png` if present and missing.

Note: the repository currently contains `assets/Founder.png`, `assets/Logo- Light.png`, and `assets/Logo-Dark.png`. It does not currently list `assets/tech_vision.jpg`, while `public/images/tech_vision.jpg` already exists.

`BrandLogo` renders theme-aware logo images:

- `/images/logo-light.png`
- `/images/logo-dark.png`

`src/app/images/[filename]/route.ts` serves files from `public/images/` by basename. It prevents path traversal, but it only serves direct files in `public/images/`, not nested uploaded files under `public/images/uploads/`. Uploaded files are written to that folder on demand and are served by Next.js static public-file handling through `/images/uploads/...`.

## 9. Theming

The site supports dark and light themes.

- `ThemeProvider` manages theme state and writes to `localStorage`.
- `ThemeToggle` calls the context toggle.
- `src/app/layout.tsx` wraps the app with `ThemeProvider` and `AuthProvider`.
- The root `<html>` uses `suppressHydrationWarning`.
- CSS variables are defined in `src/app/globals.css` under `:root` and `.dark`.
- Dark mode is the default.

## 10. Development Workflow

Start the dev server:

```bash
cd "F:\01project\Website 01\Website01"
npm run dev
```

Run a build check:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

After schema changes:

```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

Seed default admin:

```bash
npx prisma db seed
```

Open Prisma Studio:

```bash
npx prisma studio
```

## 11. Environment Variables

Local `.env` should include:

```env
NEXTAUTH_SECRET="aadhi-code-super-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

For production:

- Use a strong random `NEXTAUTH_SECRET`.
- Set `NEXTAUTH_URL` to the deployed domain.
- Move uploaded file handling to persistent storage if deploying to ephemeral/serverless infrastructure.

## 12. Current Roadmap

High priority:

- Implement a real contact form backend. Options include storing a `ContactInquiry` model, sending email through a provider, or both.
- Add edit UI for `/admin/projects` using the existing `updateProject()` action.
- Add edit UI for `/admin/collaborations` using the existing `updateCollaboration()` action.
- Render `Project.link` on public previous work cards.
- Render `Collaboration.logoUrl` on public collaboration cards.

Medium priority:

- Add dashboard stats for team members, projects, collaborations, and contact inquiries after inquiries exist.
- Add password change or admin user management.
- Decide whether active projects should become DB-backed instead of hardcoded.
- Decide whether manpower/capabilities should become DB-backed instead of hardcoded.
- Expose social links properly or remove unused `facebookLink` and `twitterLink` columns.
- Add page-level metadata for `/info` and admin pages.
- Audit mobile responsiveness and image layout.

Nice to have:

- Replace `CompanyInfo.linkedinLink` JSON repurposing with a proper leader/settings table.
- Add ordering controls for team members, projects, and collaborations.
- Add image deletion/cleanup for replaced uploads.
- Add production-ready object storage for uploaded files.

## 13. Known Gotchas

- `prisma/dev.db` is local state and should not be committed.
- The app imports Prisma through `@/lib/prisma`; do not instantiate `new PrismaClient()` directly in pages/components.
- Server actions import auth from `@/lib/auth`, not from the NextAuth route file.
- `CompanyInfo.linkedinLink` is leader JSON, not a URL.
- Contact form success text says the inquiry was received, but no backend exists yet.
- Some source files currently contain mojibake characters from earlier encoding issues in visible text/icons. Be careful when editing nearby strings.
- `npm run lint` uses `next lint`, which may require current Next.js lint support and config expectations.

## 14. Real Company Info

From `assets/Info.txt` and project notes:

| Field | Value |
|---|---|
| Company name | Aadi Code Pvt Ltd |
| Address | Baluwatar, Kathmandu, Nepal |
| Phone | +977 9803407244 |
| Email | aadicodepvtltd@gmail.com |
| Founder | Nabin Thapa |
