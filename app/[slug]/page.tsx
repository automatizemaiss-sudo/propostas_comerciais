import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import Capa from "@/components/Capa";
import Problema from "@/components/Problema";
import Solucao from "@/components/Solucao";
import QuemSomos from "@/components/QuemSomos";
import Cases from "@/components/Cases";
import Escopo from "@/components/Escopo";
import Contrato from "@/components/Contrato";
import AssinaturaPagamento from "@/components/AssinaturaPagamento";
import Logo from "@/components/Logo";
import { lerProposta, listarSlugs } from "@/lib/propostas";

export function generateStaticParams() {
  return listarSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;

export default async function PropostaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposta = lerProposta(slug);
  if (!proposta) notFound();

  return (
    <main>
      <Topbar />
      <Capa proposta={proposta} />
      <Problema proposta={proposta} />
      <Solucao proposta={proposta} />
      <QuemSomos />
      <Cases proposta={proposta} />
      <Escopo proposta={proposta} />
      <Contrato proposta={proposta} />
      <AssinaturaPagamento proposta={proposta} />
      <footer className="bg-[#062719] py-14 text-white">
        <div className="shell flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <p className="m-0 text-[11px] text-[#91a49a]">
            Automação e IA para operações que querem crescer.
          </p>
        </div>
      </footer>
    </main>
  );
}
