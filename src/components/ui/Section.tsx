import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  containerClassName = "",
  align = "left",
}: SectionProps) {
  const isCenter = align === "center";

  return (
    <section id={id} className={`py-16 sm:py-24 lg:py-32 ${className}`}>
      <div className={`mx-auto max-w-6xl px-6 sm:px-10 ${containerClassName}`}>
        {(eyebrow || title || subtitle) && (
          <Reveal className={`mb-10 sm:mb-16 ${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.1] text-ivory sm:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-base leading-relaxed text-ink-muted">{subtitle}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
