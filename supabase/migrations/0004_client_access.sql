-- Link do site pronto, preenchido pela admin depois de montar o projeto;
-- o cliente vê esse link na área de acompanhamento antes de decidir.
alter table public.leads add column if not exists preview_url text;

-- Até aqui, qualquer usuário autenticado enxergava e editava TODOS os
-- leads — isso era seguro enquanto só a admin tinha conta (o /admin já
-- filtra por e-mail autorizado na aplicação). Agora que clientes também
-- ganham login pra acompanhar o próprio pedido, isso precisa ser
-- restrito no banco: cliente só vê o próprio pedido (pelo e-mail), e só
-- a admin lê tudo e atualiza status/notas.
--
-- Nota: o e-mail da admin está fixo aqui e precisa ser mantido em sincronia
-- com a env var ADMIN_EMAILS da aplicação.
drop policy if exists "authenticated can select leads" on public.leads;
create policy "select own leads or admin"
  on public.leads for select
  to authenticated
  using (
    auth.email() = 'speedweb26@gmail.com'
    or lower(email) = lower(coalesce(auth.email(), ''))
  );

drop policy if exists "authenticated can update leads" on public.leads;
create policy "admin can update leads"
  on public.leads for update
  to authenticated
  using (auth.email() = 'speedweb26@gmail.com')
  with check (auth.email() = 'speedweb26@gmail.com');
