create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),

  -- Contato / empresa
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,

  -- Projeto
  project_type text not null,
  project_description text,
  target_audience text,

  -- Design e recursos
  design_preferences text,
  color_scheme text,
  features text[] not null default '{}',

  -- Comercial
  deadline text,
  budget_range text,
  estimated_price numeric,
  additional_info text,

  -- Admin
  admin_notes text
);

alter table public.leads enable row level security;

-- Qualquer visitante (anon) pode criar um lead pelo formulário público
create policy "anon can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Só usuários autenticados (admin) podem ler e atualizar
create policy "authenticated can select leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
