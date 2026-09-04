-- Agents Tablosunu Oluştur
create table if not exists public.agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  model text not null,
  risk_posture text default 'Low',
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Politikalarını Aktif Et
alter table public.agents enable row level security;

-- Kullanıcılar sadece kendi ajanlarını görebilir ve yönetebilir
create policy "Users can view their own agents" on public.agents for select using (auth.uid() = user_id);
create policy "Users can insert their own agents" on public.agents for insert with check (auth.uid() = user_id);
create policy "Users can update their own agents" on public.agents for update using (auth.uid() = user_id);
create policy "Users can delete their own agents" on public.agents for delete using (auth.uid() = user_id);