# SPEEDWEB

Site institucional da SPEEDWEB — agência de criação de sites. Reescrito em Next.js
(App Router) + TypeScript + Tailwind CSS, com área de cliente/admin autenticada via
Supabase para gestão dos leads gerados pelo site.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript + Tailwind CSS v4
- [Framer Motion](https://motion.dev/) para animações de entrada
- [Supabase](https://supabase.com/) (Postgres + Auth) para leads e login
- Deploy na [Vercel](https://vercel.com/)

## Estrutura

```
src/
├── app/            # rotas (App Router): landing, /portfolio, /login, /admin
├── components/      # componentes de UI, layout, landing, portfólio, formulários
├── lib/              # config do site, precificação da calculadora, Supabase, leads
└── middleware.ts     # protege as rotas /admin

public/
├── imagens/          # assets da marca (logo, hero, mascote)
└── templates/         # templates de demonstração (sites estáticos autocontidos,
                        # servidos como estão e abertos via iframe em /portfolio)
```

## Rodando localmente

```bash
npm install
cp .env.local.example .env.local   # preencha com as credenciais do Supabase
npm run dev
```

O app sobe em `http://localhost:3000` (ou próxima porta livre).

## Variáveis de ambiente

Ver `.env.local.example`. `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
vêm de um projeto Supabase (Settings → API). `SUPABASE_SERVICE_ROLE_KEY` é usada apenas
em ações administrativas no servidor — nunca deve ser exposta ao client.

## Deploy

Conecte o repositório na Vercel — a detecção de Next.js é automática. Configure as
mesmas variáveis de ambiente em Production e Preview antes do primeiro deploy.
