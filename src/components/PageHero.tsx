interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  notice?: string;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  notice,
}: PageHeroProps) {
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-600 px-6 py-8 text-white shadow-soft">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.25em] text-white/70">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
          {subtitle}
        </p>
      ) : null}
      {notice ? (
        <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm leading-6 text-white/90">
          {notice}
        </div>
      ) : null}
    </section>
  );
}
