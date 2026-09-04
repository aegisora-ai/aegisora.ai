-- Policies Tablosunu Oluştur
create table if not exists public.policies (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  intent text not null,
  enforcement text not null check (enforcement in ('ALLOW', 'BLOCK', 'ESCALATE')),
  status boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Politikalarını Aktif Et
alter table public.policies enable row level security;

-- Kullanıcılar sadece kendi kurallarını görebilir ve yönetebilir
create policy "Users can view their own policies" on public.policies for select using (auth.uid() = user_id);
create policy "Users can insert their own policies" on public.policies for insert with check (auth.uid() = user_id);
create policy "Users can update their own policies" on public.policies for update using (auth.uid() = user_id);
create policy "Users can delete their own policies" on public.policies for delete using (auth.uid() = user_id);