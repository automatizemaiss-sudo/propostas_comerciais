"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import type { Proposta } from "@/lib/types";

type Status = "idle" | "carregando" | "aguardando" | "assinado" | "erro";
type StatusPagamento = "idle" | "carregando" | "pronto" | "erro";

function chaveArmazenamento(slug: string) {
  return `atm-proposta:${slug}:docToken`;
}

function chaveLinkPagamento(slug: string) {
  return `atm-proposta:${slug}:linkPagamento`;
}

function formatarValor(valor: number | "PLACEHOLDER", moeda: string) {
  if (valor === "PLACEHOLDER") return "[FALTA CONFIRMAR]";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda || "BRL" }).format(
    valor,
  );
}

export default function AssinaturaPagamento({ proposta }: { proposta: Proposta }) {
  const [status, setStatus] = useState<Status>("idle");
  const [statusPagamento, setStatusPagamento] = useState<StatusPagamento>("idle");
  const [linkPagamento, setLinkPagamento] = useState<string | null>(null);

  useEffect(() => {
    const link = window.localStorage.getItem(chaveLinkPagamento(proposta.slug));
    if (!link) return;
    Promise.resolve().then(() => setLinkPagamento(link));
  }, [proposta.slug]);

  useEffect(() => {
    const docToken = window.localStorage.getItem(chaveArmazenamento(proposta.slug));
    if (!docToken) return;

    let cancelado = false;
    fetch(`/api/assinar/status?doc=${docToken}`)
      .then((res) => res.json())
      .then((dados) => {
        if (!cancelado) setStatus(dados.assinado ? "assinado" : "aguardando");
      })
      .catch(() => {
        if (!cancelado) setStatus("erro");
      });

    return () => {
      cancelado = true;
    };
  }, [proposta.slug]);

  const assinado = status === "assinado";
  const linkManual =
    proposta.investimento.linkPagamento !== "PLACEHOLDER"
      ? proposta.investimento.linkPagamento
      : null;
  const linkFinal = linkManual ?? linkPagamento;
  const pagamentoEmAndamento = useRef(false);
  const [tentativaPagamento, setTentativaPagamento] = useState(0);

  useEffect(() => {
    if (!assinado || linkFinal || pagamentoEmAndamento.current) return;
    pagamentoEmAndamento.current = true;

    let cancelado = false;
    fetch("/api/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: proposta.slug }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("falha"))))
      .then((dados) => {
        if (cancelado) return;
        window.localStorage.setItem(chaveLinkPagamento(proposta.slug), dados.invoiceUrl);
        setLinkPagamento(dados.invoiceUrl);
        setStatusPagamento("pronto");
      })
      .catch(() => {
        if (!cancelado) setStatusPagamento("erro");
      })
      .finally(() => {
        pagamentoEmAndamento.current = false;
      });

    return () => {
      cancelado = true;
    };
  }, [assinado, linkFinal, proposta.slug, tentativaPagamento]);

  async function aceitarEAssinar() {
    setStatus("carregando");
    try {
      const res = await fetch("/api/assinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: proposta.slug }),
      });
      if (!res.ok) throw new Error("Falha ao criar documento");
      const { docToken, signUrl } = await res.json();
      window.localStorage.setItem(chaveArmazenamento(proposta.slug), docToken);
      if (signUrl) {
        window.location.href = signUrl;
      } else {
        setStatus("erro");
      }
    } catch {
      setStatus("erro");
    }
  }

  function tentarGerarPagamentoNovamente() {
    setStatusPagamento("idle");
    setTentativaPagamento((n) => n + 1);
  }

  return (
    <>
      <section id="assinatura" className="bg-ink py-24 text-white">
        <div className="shell">
          <SectionHead
            dark
            eyebrow="07 — Aceite"
            title={
              <>
                Pronto para <br />
                <span className="text-green">seguir em frente?</span>
              </>
            }
            description="Ao clicar em aceitar, você será direcionado para assinar o contrato eletronicamente, com validade jurídica conforme a MP 2.200-2/2001."
          />
          <div className="rounded-2xl border border-[#292d2a] bg-[#151816] p-8 md:p-10">
            {assinado ? (
              <p className="m-0 flex items-center gap-3 text-lg">
                <span className="text-green">✓</span> Contrato assinado. Role até o pagamento
                abaixo.
              </p>
            ) : (
              <>
                <p className="m-0 mb-6 max-w-[520px] text-[13px] leading-relaxed text-[#a5aaa6]">
                  Ao aceitar, {proposta.cliente.responsavel.nome} assina em nome de{" "}
                  {proposta.cliente.empresa}, e Automatize Mais assina como contratada — nas
                  condições descritas no contrato acima.
                </p>
                <button
                  onClick={aceitarEAssinar}
                  disabled={status === "carregando"}
                  className="inline-flex items-center gap-3 rounded-lg bg-green px-6 py-4 text-[13px] font-semibold text-ink disabled:opacity-60"
                >
                  {status === "carregando" ? "Preparando documento…" : "Aceitar e assinar"}
                  <span>↗</span>
                </button>
                {status === "erro" ? (
                  <p className="mt-4 text-[12px] text-red-400">
                    Não foi possível iniciar a assinatura agora. Tente novamente em instantes.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <section id="pagamento" className="py-24">
        <div className="shell">
          <SectionHead
            eyebrow="08 — Pagamento"
            title={
              <>
                Investimento e <br />
                <span className="text-green">próximos passos.</span>
              </>
            }
          />
          <div className="rounded-2xl border border-line bg-white p-8 md:p-10">
            <p className="m-0 text-[13px] font-semibold tracking-[.1em] text-deep uppercase">
              Valor
            </p>
            <p className="mt-2 text-[clamp(28px,4vw,38px)] tracking-[-.03em]">
              {formatarValor(proposta.investimento.valor, proposta.investimento.moeda)}
            </p>
            <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed text-muted">
              {proposta.investimento.condicoes}
            </p>
            <div className="mt-8">
              {!assinado ? (
                <button
                  disabled
                  className="inline-flex items-center gap-3 rounded-lg bg-[#ecefec] px-6 py-4 text-[13px] font-semibold text-muted"
                >
                  Disponível após a assinatura do contrato
                </button>
              ) : linkFinal ? (
                <a
                  href={linkFinal}
                  className="inline-flex items-center gap-3 rounded-lg bg-ink px-6 py-4 text-[13px] font-semibold text-white"
                >
                  Ir para o pagamento <span className="text-green">↗</span>
                </a>
              ) : statusPagamento === "erro" ? (
                <>
                  <button
                    onClick={tentarGerarPagamentoNovamente}
                    className="inline-flex items-center gap-3 rounded-lg bg-ink px-6 py-4 text-[13px] font-semibold text-white"
                  >
                    Tentar gerar o link novamente <span className="text-green">↗</span>
                  </button>
                  <p className="mt-4 text-[12px] text-red-500">
                    Não foi possível gerar o link de pagamento agora.
                  </p>
                </>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-3 rounded-lg bg-[#ecefec] px-6 py-4 text-[13px] font-semibold text-muted"
                >
                  Gerando link de pagamento…
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
