-- Garante que a RLS e as políticas da tabela leads estão corretamente aplicadas,
-- recriando-as de forma idempotente (corrige o caso da política não ter "pegado").

alter table public.leads enable row level security;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert
  to anon
  with check (true);

drop policy if exists "authenticated can select leads" on public.leads;
create policy "authenticated can select leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

-- Garante os privilégios de tabela subjacentes (RLS restringe linhas, mas o papel
-- também precisa do GRANT correspondente na tabela).
grant insert on public.leads to anon;
grant select, update on public.leads to authenticated;
grant usage on schema public to anon, authenticated;
