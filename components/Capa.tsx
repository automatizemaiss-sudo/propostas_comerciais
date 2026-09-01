import type { Proposta } from "@/lib/types";

function formatarData(iso: string) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function Capa({ proposta }: { proposta: Proposta }) {
  return (
    <div id="topo" className="shell grid min-h-[560px] items-center gap-16 py-20 md:grid-cols-[1.2fr_.8fr]">
      <div>
        <div className="eyebrow flex items-center gap-2.5 text-[11px] font-bold tracking-[.16em] text-deep uppercase before:h-0.5 before:w-7 before:bg-green before:content-['']">
          Proposta comercial
        </div>
        <h1 className="mt-5 max-w-[820px] text-[clamp(38px,6vw,72px)] leading-[.98] tracking-[-.05em]">
          Uma solução para <span className="text-green">{proposta.cliente.empresa}</span>.
        </h1>
        <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-[#595c59]">
          Preparamos esta proposta com base na conversa que tivemos com{" "}
          {proposta.cliente.responsavel.nome}. Ela reúne o diagnóstico do que vimos, a solução
          proposta, o escopo e o investimento para colocar isso no ar.
        </p>
        <div className="mt-10 flex flex-wrap gap-6 text-[10px] font-bold tracking-[.12em] text-muted uppercase">
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full bg-green" /> Criada em{" "}
            {formatarData(proposta.criadoEm)}
          </span>
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full bg-green" /> Válida até{" "}
            {formatarData(proposta.validaAte)}
          </span>
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full bg-green" /> {proposta.cliente.empresa}
          </span>
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-[32px] bg-ink shadow-[0_35px_90px_rgba(0,77,43,.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,224,90,.25),transparent_33%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-[42%] aspect-square place-items-center rounded-[28%] bg-green text-[clamp(70px,10vw,120px)] font-medium text-ink shadow-[0_0_65px_rgba(0,224,90,.35)]">
            +
          </div>
        </div>
      </div>
    </div>
  );
}
