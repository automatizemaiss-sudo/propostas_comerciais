import SectionHead from "./SectionHead";
import type { Proposta } from "@/lib/types";

export default function Problema({ proposta }: { proposta: Proposta }) {
  return (
    <section id="diagnostico" className="py-24">
      <div className="shell">
        <SectionHead
          eyebrow="01 — Diagnóstico"
          title={
            <>
              O que vimos na <br />
              <span className="text-green">operação de hoje.</span>
            </>
          }
          description="Estes são os gargalos que identificamos na conversa, na ordem em que mais pesam no dia a dia da operação."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {proposta.problemas.map((problema, i) => (
            <article
              key={problema.titulo}
              className="rounded-2xl border border-line bg-white p-7"
            >
              <span className="mb-4 block text-[11px] font-bold tracking-[.1em] text-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-lg tracking-[-.02em]">{problema.titulo}</h3>
              <p className="m-0 text-[13px] leading-relaxed text-muted">{problema.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
