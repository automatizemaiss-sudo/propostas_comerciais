import SectionHead from "./SectionHead";
import type { Proposta } from "@/lib/types";

export default function Solucao({ proposta }: { proposta: Proposta }) {
  return (
    <section id="solucao" className="bg-ink py-24 text-white">
      <div className="shell">
        <SectionHead
          dark
          eyebrow="02 — Solução"
          title={
            <>
              O que vamos <br />
              <span className="text-green">construir juntos.</span>
            </>
          }
          description="Uma solução para cada gargalo do diagnóstico, na mesma ordem — pensada para o resultado que ela entrega, não para a tecnologia por trás."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {proposta.solucoes.map((solucao, i) => (
            <article
              key={solucao.titulo}
              className="rounded-2xl border border-[#292d2a] bg-[#151816] p-7"
            >
              <span className="mb-4 block text-[11px] font-bold tracking-[.1em] text-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-lg tracking-[-.02em]">{solucao.titulo}</h3>
              <p className="m-0 text-[13px] leading-relaxed text-[#a5aaa6]">
                {solucao.descricao}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
