import SectionHead from "./SectionHead";
import { lerCase } from "@/lib/propostas";
import type { Proposta } from "@/lib/types";

export default function Cases({ proposta }: { proposta: Proposta }) {
  const cases = proposta.cases.map(lerCase).filter((c) => c !== null);
  if (cases.length === 0) return null;

  return (
    <section id="cases" className="bg-ink py-24 text-white">
      <div className="shell">
        <SectionHead
          dark
          eyebrow="04 — Cases"
          title={
            <>
              Quem já <br />
              <span className="text-green">automatizou mais.</span>
            </>
          }
          description="Projetos com o mesmo tipo de gargalo que identificamos na sua operação."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c!.slug}
              className="rounded-2xl border border-[#292d2a] bg-[#151816] p-8"
            >
              <div className="flex items-center gap-3">
                {c!.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c!.foto}
                    alt={c!.cliente}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
                ) : null}
                {c!.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c!.logo}
                    alt={c!.cliente}
                    className="h-6 w-auto max-w-[110px] object-contain"
                  />
                ) : null}
                <span className="text-[11px] font-bold tracking-[.1em] text-green uppercase">
                  {c!.cliente}
                </span>
              </div>
              <p className="mt-4 mb-6 text-[15px] leading-relaxed text-[#c7cbc8]">{c!.resumo}</p>
              <p className="m-0 text-lg tracking-[-.02em] text-white">{c!.resultado}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c!.destaques.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-[#292d2a] px-3 py-1.5 text-[10px] font-semibold text-[#a5aaa6]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              {c!.citacao ? (
                <blockquote className="mt-6 border-l-2 border-green pl-4">
                  <p className="m-0 text-[13px] leading-relaxed text-[#c7cbc8] italic">
                    “{c!.citacao.texto}”
                  </p>
                  <footer className="mt-3 text-[11px] font-semibold text-white not-italic">
                    {c!.citacao.autor}
                    <span className="font-normal text-[#8b908c]"> — {c!.citacao.cargo}</span>
                  </footer>
                </blockquote>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
