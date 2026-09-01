import Logo from "./Logo";

const SECTIONS = [
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#solucao", label: "Solução" },
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#cases", label: "Cases" },
  { href: "#escopo", label: "Escopo" },
  { href: "#contrato", label: "Contrato", fechamento: true },
];

export default function Topbar({ incluirFechamento = true }: { incluirFechamento?: boolean }) {
  const secoes = SECTIONS.filter((s) => incluirFechamento || !s.fechamento);

  return (
    <header className="no-print shell sticky top-3 z-20 mt-3 flex h-[68px] items-center justify-between rounded-2xl border border-black/[.08] bg-off/90 px-5 shadow-[0_12px_40px_rgba(0,0,0,.05)] backdrop-blur-lg">
      <a href="#topo" aria-label="ATM+ — início">
        <Logo />
      </a>
      <nav className="hidden gap-6 text-[11px] font-semibold text-muted md:flex">
        {secoes.map((s) => (
          <a key={s.href} href={s.href} className="hover:text-ink">
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
