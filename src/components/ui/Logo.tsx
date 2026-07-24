type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className = "", markClassName = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 text-brand-gold ${markClassName}`}
        aria-hidden="true"
      >
        <path d="M12.5 2 4 13h6.5L11 22l8.5-11H13z" />
      </svg>
      <span className="font-serif text-xl italic font-light tracking-tight text-ivory">
        Speedweb
      </span>
    </span>
  );
}
