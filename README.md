# Blize Global - Premium Corporate Website & Admin Dashboard

A complete, production-ready corporate website and lightweight internal lead dashboard for an outsourced accounting and finance support company.

## 🚀 Project Overview

**Blize Global** is a lead-generation corporate website for a company offering outsourced accounting and finance support services to CPA firms, tax firms, bookkeeping firms, and financial businesses.

### Key Features

- **Premium Public Website**: 9 complete pages with stunning design and animations
- **Internal Admin Dashboard**: Secure login, lead management, and analytics
- **Lead Capture Forms**: Contact, Proposal, and Careers forms with validation
- **Responsive Design**: Fully responsive across all devices
- **Production Ready**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 📁 Project Structure

```
app/
├── (public)/                    # Public-facing routes
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page
│   ├── services/page.tsx        # Services listing
│   ├── services/[slug]/page.tsx # Individual service pages
│   ├── careers/page.tsx         # Careers page
│   ├── contact/page.tsx         # Contact page
│   ├── faq/page.tsx             # FAQ page
│   ├── case-studies/page.tsx    # Case studies page
│   ├── privacy-policy/page.tsx  # Privacy policy
│   └── layout.tsx               # Public layout with Navbar/Footer
├── (admin)/                     # Admin routes (protected)
│   ├── layout.tsx               # Admin layout with auth check
│   ├── admin/login/page.tsx     # Admin login
│   ├── admin/dashboard/page.tsx # Admin dashboard
│   ├── admin/leads/page.tsx     # Leads table
│   └── admin/leads/[id]/page.tsx # Lead detail
├── layout.tsx                   # Root layout with Toaster
└── globals.css                  # Global styles

components/
├── public/                      # Public website components
│   ├── Navbar.tsx               # Sticky navigation
│   └── Footer.tsx               # Site footer
├── admin/                       # Admin components
│   └── AdminSidebar.tsx         # Admin sidebar navigation
├── shared/                      # Shared components
│   └── AnimatedSection.tsx      # Framer Motion wrappers
└── ui/                          # ShadCN UI components

lib/
├── supabase/                    # Supabase clients
│   ├── client.ts                # Browser client
│   ├── server.ts                # Server client
│   └── middleware.ts            # Auth middleware
├── validators/                  # Zod schemas
│   └── index.ts                 # Form validation schemas
├── constants/                   # Constants
│   └── index.ts                 # Site data, services, FAQ
└── utils.ts                     # Utility functions

types/
└── index.ts                     # TypeScript type definitions
```

## 🎨 Design System

### Color Palette

- **Background**: #F8FAFC, #FFFFFF
- **Text Dark**: #0F172A
- **Primary**: #2563EB (Blue)
- **Secondary**: #06B6D4 (Cyan)
- **Muted**: #64748B
- **Borders**: #E2E8F0
- **Dark Sections**: #0B1220

### Typography

- Clean sans-serif throughout
- Large, elegant headings
- Strong hierarchy with generous spacing

### Animations

- Fade-up reveal animations on scroll
- Staggered card animations
- Smooth hover effects on cards and buttons
- Premium, subtle micro-interactions

## 📄 Pages

### Public Website

1. **Home** - Hero, services, stats, testimonials, FAQ preview, CTA
2. **About** - Company story, mission/vision, values, timeline
3. **Services** - Service grid with 8 comprehensive service offerings
4. **Service Detail** - Individual service pages with features, process, benefits
5. **Careers** - Job listings, culture, benefits, application form
6. **Contact** - Contact form, proposal request form, contact info
7. **FAQ** - Full FAQ with search and categories
8. **Case Studies** - Client success stories with results
9. **Privacy Policy** - Legal privacy information

### Admin Dashboard

1. **Login** - Secure admin authentication
2. **Dashboard** - Stats overview and recent leads
3. **Leads** - Full leads table with filtering, sorting, CSV export
4. **Lead Detail** - Complete lead information with status management

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd my-app

# Install dependencies
npm install
```

### 2. Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API to get your credentials
4. Copy `.env.example` to `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database Setup

Create the `leads` table in Supabase SQL Editor:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  source text,
  message text,
  team_size text,
  country text,
  position text,
  type text not null default 'contact',
  status text not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table leads enable row level security;

-- Create policy for authenticated users
create policy "Allow authenticated access" on leads
  for all to authenticated using (true) with check (true);

-- Create policy for inserting (for public forms)
create policy "Allow public insert" on leads
  for insert to anon with check (true);
```

### 4. Create Admin User

In Supabase SQL Editor, create an admin user:

```sql
-- Sign up via Supabase Auth UI or API first, then:
-- The user will be in auth.users table
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # Optional, for server operations
```

## 📊 Features

### Public Website

- ✨ Premium, modern B2B design
- 📱 Fully responsive (mobile-first)
- 🎭 Smooth Framer Motion animations
- 📝 3 types of lead forms (Contact, Proposal, Career)
- ✅ Form validation with Zod
- 🔔 Toast notifications
- 🔍 SEO optimized

### Admin Dashboard

- 🔐 Secure Supabase Auth
- 📊 Dashboard with statistics
- 🔍 Search and filter leads
- 📥 CSV export
- ✅ Status management (New, Reviewed, Contacted, Closed)
- 🗑️ Delete leads
- 📱 Responsive admin interface

## 🎯 Lead Forms

### Contact Form
- Name, Email, Phone, Company
- Service selection
- Message

### Proposal Form
- All contact fields
- Team size
- Country
- Detailed requirements

### Career Form
- Personal information
- Position selection
- Cover letter
- Resume upload (optional)

## 🔒 Security

- Row Level Security (RLS) enabled on database
- Protected admin routes with middleware
- Secure authentication with Supabase Auth
- Form validation to prevent injection
- No sensitive data exposed to client

## 📝 Customization

### Company Information

Update `/lib/constants/index.ts`:

```typescript
export const COMPANY = {
  name: 'Your Company Name',
  tagline: 'Your Tagline',
  email: 'your@email.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, State',
  // ...
};
```

### Services

Modify the `SERVICES` array in constants to add/edit services.

### Colors

Update color values in `app/globals.css` in the `:root` section.

## 🤝 Support

For issues or questions:
1. Check the code comments
2. Review the constants file for configuration
3. Verify Supabase credentials
4. Check browser console for errors

## 📄 License

This project is created for demonstration and client delivery purposes.

---

Built with ❤️ using Next.js, Tailwind CSS, and Supabase.
