export default function SectionHead({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 grid items-end gap-8 md:grid-cols-[1fr_.65fr]">
      <div>
        <span
          className={`text-[11px] font-bold tracking-[.16em] uppercase ${dark ? "text-green" : "text-deep"}`}
        >
          {eyebrow}
        </span>
        <h2 className="mt-3 text-[clamp(32px,4.6vw,54px)] leading-[1.05] tracking-[-.05em]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className={`m-0 text-[13px] leading-relaxed ${dark ? "text-[#9ba09c]" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
