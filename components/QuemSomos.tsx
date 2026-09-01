import SectionHead from "./SectionHead";

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-24">
      <div className="shell">
        <SectionHead
          eyebrow="03 — Quem somos"
          title={
            <>
              Automação e IA para <br />
              <span className="text-green">operações que crescem.</span>
            </>
          }
          description="A Automatize Mais (ATM+) identifica gargalos operacionais, conecta os processos e constrói soluções que evoluem com o negócio."
        />

        <article className="grid gap-6 rounded-2xl border border-line bg-white p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.automatizemais.com/matheus-donha-founder.png"
            alt="Matheus Donha, fundador da Automatize Mais"
            className="h-28 w-28 rounded-2xl object-cover md:h-32 md:w-32"
          />
          <div>
            <h3 className="text-lg tracking-[-.02em]">Matheus Donha</h3>
            <span className="text-[11px] font-bold tracking-[.1em] text-deep uppercase">
              Fundador — Especialista em processos e automações para vendas
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
