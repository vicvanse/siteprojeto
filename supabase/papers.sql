-- Vekon: Papers — ownership tables in the shared Vekon Life Supabase project.
-- Run once in Supabase → SQL Editor. Safe to run again.

create table if not exists public.papers_entitlements (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  object_id  text        not null,               -- e.g. '009'
  source     text        not null default 'free', -- free | purchase | grant
  order_id   uuid,
  created_at timestamptz not null default now(),
  primary key (user_id, object_id)
);

alter table public.papers_entitlements enable row level security;

drop policy if exists "papers: read own entitlements" on public.papers_entitlements;
create policy "papers: read own entitlements"
  on public.papers_entitlements for select
  using (auth.uid() = user_id);
-- No insert/update policy: only the Papers server (service role) writes.

create table if not exists public.papers_orders (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        references auth.users (id) on delete set null,
  object_id           text        not null,
  provider            text        not null default 'stripe',
  provider_session_id text        unique,
  status              text        not null default 'pending', -- pending | paid | refunded
  amount              integer,                                 -- minor units (cents)
  currency            text,
  created_at          timestamptz not null default now()
);

alter table public.papers_orders enable row level security;

drop policy if exists "papers: read own orders" on public.papers_orders;
create policy "papers: read own orders"
  on public.papers_orders for select
  using (auth.uid() = user_id);
