-- Traces Tablosunu Oluştur
create table if not exists public.traces (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  agent_name text not null,
  model text not null,
  user_actor text not null,
  intent text not null,
  policy_triggered text,
  decision text not null check (decision in ('ALLOW', 'BLOCK', 'ESCALATE')),
  latency text not null,
  payload text not null,
  hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Politikalarını Aktif Et
alter table public.traces enable row level security;

-- Kullanıcılar sadece kendi loglarını (izlerini) görebilir ve oluşturabilir
create policy "Users can view their own traces" on public.traces for select using (auth.uid() = user_id);
create policy "Users can insert their own traces" on public.traces for insert with check (auth.uid() = user_id);