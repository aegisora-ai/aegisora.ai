create table if not exists revoked_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_token text unique not null,
  revoked_at timestamptz default now()
);

create index if not exists revoked_sessions_token_idx
on revoked_sessions(session_token);

alter table revoked_sessions enable row level security;

drop policy if exists "revoked_sessions_no_client_read" on revoked_sessions;

create policy "revoked_sessions_no_client_read"
on revoked_sessions
for select
to authenticated
using (false);


create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists audit_logs_user_idx
on audit_logs(user_id);

alter table audit_logs enable row level security;

drop policy if exists "audit_logs_no_client_read" on audit_logs;

create policy "audit_logs_no_client_read"
on audit_logs
for select
to authenticated
using (false);
