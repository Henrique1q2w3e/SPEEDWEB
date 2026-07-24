import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo className="mb-10" />
      <span className="font-serif text-7xl font-light italic text-brand-gold">404</span>
      <h1 className="mt-4 font-serif text-3xl font-light text-ivory">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Button href="/" variant="link" className="mt-8">
        Voltar para o início
      </Button>
    </div>
  );
}
