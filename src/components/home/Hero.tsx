import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-20">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 gap-y-1">
          <Image src="/imagens/raio.png" alt="" width={20} height={20} className="h-4 w-auto opacity-80" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-brand-gold sm:text-xs sm:tracking-[0.28em]">
            Speedweb — Estúdio de Sites
          </span>
        </div>

        <h1 className="mt-8 font-serif text-5xl font-light leading-[1.05] text-ivory sm:text-7xl sm:leading-[0.98] lg:text-8xl">
          Sites que <span className="italic text-brand-gold">aceleram</span>
          <br />
          seu negócio.
        </h1>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
          Projetamos e desenvolvemos sites rápidos, sob medida e com acabamento de
          estúdio — para marcas que não abrem mão de parecer tão boas quanto são.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-6 xs:w-auto xs:flex-row xs:justify-center xs:gap-8">
          <Button href="#quote" variant="primary" className="w-full max-w-xs xs:w-auto">
            Solicitar Orçamento
          </Button>
          <Button href="/portfolio" variant="link">
            Ver Portfólio
          </Button>
        </div>
      </div>
    </section>
  );
}
