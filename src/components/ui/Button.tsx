import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "link";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-gold text-ink hover:bg-brand-gold-light px-8 py-4",
  outline: "border border-brand-gold/50 text-ivory hover:border-brand-gold px-8 py-4",
  link: "text-ivory border-b border-ivory/40 pb-1 hover:border-brand-gold hover:text-brand-gold",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Pick<LinkProps, "href"> & { external?: boolean };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props as LinkButtonProps;
    if (external) {
      return (
        <a href={href.toString()} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as NativeButtonProps)}>
      {children}
    </button>
  );
}
