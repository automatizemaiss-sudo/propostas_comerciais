import SectionHead from "./SectionHead";
import type { Proposta } from "@/lib/types";

function formatarValor(valor: number | "PLACEHOLDER", moeda: string) {
  if (valor === "PLACEHOLDER") return "[FALTA CONFIRMAR]";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda || "BRL" }).format(
    valor,
  );
}

export default function Escopo({ proposta }: { proposta: Proposta }) {
  const { escopo, investimento, prazo } = proposta;
  return (
    <section id="escopo" className="py-24">
      <div className="shell">
        <SectionHead
          eyebrow="05 — Escopo e investimento"
          title={
            <>
              O que está sendo <br />
              <span className="text-green">contratado.</span>
            </>
          }
        />
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-white p-7">
            <b className="mb-4 block text-[11px] font-bold tracking-[.1em] text-deep uppercase">
              Desenvolvimento
            </b>
            <ul className="m-0 grid gap-3 p-0">
              {escopo.desenvolvimento.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-[#3a3c3a]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-line bg-white p-7">
            <b className="mb-4 block text-[11px] font-bold tracking-[.1em] text-deep uppercase">
              Gerenciamento
            </b>
            <ul className="m-0 grid gap-3 p-0">
              {escopo.gerenciamento.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-[#3a3c3a]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.3fr_1fr]">
          <article className="relative overflow-hidden rounded-2xl bg-green p-8 text-ink">
            <span className="text-[11px] font-bold tracking-[.1em] uppercase">Investimento</span>
            <p className="mt-3 text-[clamp(32px,4vw,44px)] leading-none tracking-[-.03em]">
              {formatarValor(investimento.valor, investimento.moeda)}
            </p>
            <p className="mt-3 max-w-[420px] text-[13px] leading-relaxed">
              {investimento.condicoes}
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-8">
            <span className="text-[11px] font-bold tracking-[.1em] text-deep uppercase">
              Prazo de entrega
            </span>
            <p className="mt-3 text-[clamp(32px,4vw,44px)] leading-none tracking-[-.03em]">
              {prazo.entregaDias} dias
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{prazo.observacao}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
