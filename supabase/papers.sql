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

-- ---------------------------------------------------------------------
-- 2026-11-17 — Papers sem service role.
-- O servidor do Papers agora age com o token do próprio usuário; o banco
-- é quem garante as regras que antes ficavam só no código.
-- ---------------------------------------------------------------------

-- Objetos que qualquer conta pode pegar de graça. Manter em sincronia com
-- status "free" em src/data/artifacts.ts.
create table if not exists public.papers_free_objects (
  object_id text primary key
);
alter table public.papers_free_objects enable row level security;

drop policy if exists "papers: free objects are public" on public.papers_free_objects;
create policy "papers: free objects are public"
  on public.papers_free_objects for select
  to anon, authenticated
  using (true);

revoke all on table public.papers_free_objects from anon, authenticated;
grant select on table public.papers_free_objects to anon, authenticated;

insert into public.papers_free_objects (object_id) values ('009')
on conflict do nothing;

-- O usuário só lê as próprias posses e só se dá objetos grátis.
revoke all on table public.papers_entitlements from anon, authenticated;
grant select, insert on table public.papers_entitlements to authenticated;

drop policy if exists "papers: read own entitlements" on public.papers_entitlements;
create policy "papers: read own entitlements"
  on public.papers_entitlements for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "papers: claim free objects" on public.papers_entitlements;
create policy "papers: claim free objects"
  on public.papers_entitlements for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and source = 'free'
    and order_id is null
    and object_id in (select f.object_id from public.papers_free_objects f)
  );

revoke all on table public.papers_orders from anon, authenticated;
grant select on table public.papers_orders to authenticated;
