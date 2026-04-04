-- Finova Partners Database Setup
-- Run this in Supabase SQL Editor

-- Create leads table
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table leads enable row level security;

-- Create policy for authenticated users (admin access)
create policy "Allow authenticated full access" on leads
  for all to authenticated using (true) with check (true);

-- Create policy for inserting (for public forms)
create policy "Allow public insert" on leads
  for insert to anon with check (true);

-- Create index for faster queries
create index idx_leads_status on leads(status);
create index idx_leads_type on leads(type);
create index idx_leads_created_at on leads(created_at desc);

-- Optional: Create career_applications table for job applications
create table career_applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  position text not null,
  message text,
  resume_url text,
  status text not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for career applications
alter table career_applications enable row level security;

create policy "Allow authenticated full access" on career_applications
  for all to authenticated using (true) with check (true);

create policy "Allow public insert" on career_applications
  for insert to anon with check (true);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Add trigger to leads table
create trigger update_leads_updated_at
    before update on leads
    for each row
    execute function update_updated_at_column();
