import SectionHead from "./SectionHead";
import type { Proposta } from "@/lib/types";

function formatarValor(valor: number | "PLACEHOLDER", moeda: string) {
  if (valor === "PLACEHOLDER") return "[FALTA CONFIRMAR]";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda || "BRL" }).format(
    valor,
  );
}

export default function Escopo({ proposta }: { proposta: Proposta }) {
  const { escopo, investimento, prazo, manutencao, custosInfraestrutura } = proposta;
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
              {prazo.entregaDias === "PLACEHOLDER"
                ? "[FALTA CONFIRMAR]"
                : `${prazo.entregaDias} dias${prazo.unidade ? ` ${prazo.unidade}` : ""}`}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{prazo.observacao}</p>
          </article>
        </div>

        {manutencao ? (
          <div className="mt-3 rounded-2xl border border-line bg-white p-7 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <b className="text-[11px] font-bold tracking-[.1em] text-deep uppercase">
                Manutenção mensal
              </b>
              <span className="text-lg tracking-[-.02em]">
                {formatarValor(manutencao.valorMensal, investimento.moeda)}/mês
              </span>
            </div>
            {manutencao.inicio ? (
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{manutencao.inicio}</p>
            ) : null}
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {manutencao.incluso && manutencao.incluso.length > 0 ? (
                <div>
                  <span className="text-[11px] font-bold tracking-[.1em] text-green uppercase">
                    Incluso
                  </span>
                  <ul className="m-0 mt-3 grid gap-2 p-0">
                    {manutencao.incluso.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[13px] leading-relaxed text-[#3a3c3a]"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {manutencao.naoIncluso && manutencao.naoIncluso.length > 0 ? (
                <div>
                  <span className="text-[11px] font-bold tracking-[.1em] text-muted uppercase">
                    Não incluso
                  </span>
                  <ul className="m-0 mt-3 grid gap-2 p-0">
                    {manutencao.naoIncluso.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[13px] leading-relaxed text-muted"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {custosInfraestrutura && custosInfraestrutura.length > 0 ? (
          <div className="mt-3 rounded-2xl border border-line bg-off p-7 md:p-8">
            <b className="text-[11px] font-bold tracking-[.1em] text-deep uppercase">
              Custos de infraestrutura estimados
            </b>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Pagos à parte, direto aos provedores — não fazem parte do investimento nem da
              manutenção.
            </p>
            <ul className="m-0 mt-4 grid gap-2 p-0 sm:grid-cols-2">
              {custosInfraestrutura.map((c) => (
                <li
                  key={c.nome}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[13px]"
                >
                  <span className="text-[#3a3c3a]">{c.nome}</span>
                  <span className="font-semibold text-ink">
                    {formatarValor(c.valor, investimento.moeda)}/{c.periodicidade}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
