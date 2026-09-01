import ReactMarkdown from "react-markdown";
import SectionHead from "./SectionHead";
import { montarContrato } from "@/lib/contrato";
import { lerEmpresa } from "@/lib/propostas";
import type { Proposta } from "@/lib/types";

export default function Contrato({ proposta }: { proposta: Proposta }) {
  const empresa = lerEmpresa();
  const contrato = montarContrato(proposta, empresa);

  return (
    <section id="contrato" className="py-24">
      <div className="shell">
        <SectionHead
          eyebrow="06 — Contrato"
          title={
            <>
              As condições, <br />
              <span className="text-green">por escrito.</span>
            </>
          }
          description="Contrato completo desta prestação de serviços. Role para ler tudo antes de aceitar."
        />
        <div className="max-h-[560px] overflow-y-auto rounded-2xl border border-line bg-white p-8 md:p-12">
          <article className="prose prose-sm max-w-none prose-headings:tracking-[-.02em] prose-h1:text-2xl prose-h2:mt-8 prose-h2:text-base prose-p:text-[13px] prose-p:leading-relaxed prose-p:text-[#3a3c3a] prose-strong:text-ink">
            <ReactMarkdown>{contrato}</ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
}
