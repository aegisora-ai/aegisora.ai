-- Approvals Tablosunu Oluştur
create table if not exists public.approvals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  agent_name text not null,
  intent text not null,
  description text not null,
  risk_level text not null check (risk_level in ('Low', 'Medium', 'High', 'Critical')),
  policy_triggered text not null,
  requester text not null,
  payload text not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'DENIED')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Politikalarını Aktif Et
alter table public.approvals enable row level security;

-- Kullanıcılar sadece kendi onay isteklerini yönetebilir
create policy "Users can view their own approvals" on public.approvals for select using (auth.uid() = user_id);
create policy "Users can insert their own approvals" on public.approvals for insert with check (auth.uid() = user_id);
create policy "Users can update their own approvals" on public.approvals for update using (auth.uid() = user_id);