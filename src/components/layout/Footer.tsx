import Link from "next/link";
import { SITE_CONFIG, whatsappLink } from "@/lib/site-config";
import { NAV_LINKS } from "./nav-links";
import { Logo } from "@/components/ui/Logo";

const SERVICE_LINKS = [
  "Sites Institucionais",
  "E-commerce",
  "Sites Responsivos",
  "SEO Otimizado",
  "Design Exclusivo",
];

export function Footer() {
  return (
    <footer className="border-t border-ink-border" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Transformamos ideias em experiências digitais excepcionais, criando sites
              que impulsionam seu negócio.
            </p>
            <div className="mt-6 flex gap-5 text-xs uppercase tracking-[0.15em] text-ink-muted">
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-brand-gold">
                Email
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold"
              >
                Instagram
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
              Links Rápidos
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
              Nossos Serviços
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <Link href="/#services" className="hover:text-brand-gold">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
              Entre em Contato
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-ink-muted">
              <li>
                <span className="block text-xs uppercase tracking-wide text-ink-muted/60">
                  E-mail
                </span>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-brand-gold">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-ink-muted/60">
                  Telefone
                </span>
                <a href={`tel:${SITE_CONFIG.whatsappNumber}`} className="hover:text-brand-gold">
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-ink-muted/60">
                  Endereço
                </span>
                <p>{SITE_CONFIG.location}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 text-xs text-ink-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Speedweb. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-gold">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-brand-gold">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
