-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  x numeric not null,
  y numeric not null,
  author text not null,
  text text not null,
  page text not null,
  timestamp bigint not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table comments enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Anyone can view comments" on comments;
drop policy if exists "Anyone can create comments" on comments;
drop policy if exists "Anyone can delete comments" on comments;

-- Allow anyone to read comments
create policy "Anyone can view comments"
  on comments for select
  using (true);

-- Allow anyone to insert comments
create policy "Anyone can create comments"
  on comments for insert
  with check (true);

-- Allow anyone to delete comments
create policy "Anyone can delete comments"
  on comments for delete
  using (true);

