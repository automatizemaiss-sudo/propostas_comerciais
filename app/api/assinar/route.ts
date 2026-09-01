import { NextRequest, NextResponse } from "next/server";
import { montarContrato } from "@/lib/contrato";
import { lerEmpresa, lerProposta } from "@/lib/propostas";
import { criarDocumento } from "@/lib/zapsign";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  const proposta = lerProposta(slug);
  if (!proposta) {
    return NextResponse.json({ erro: "Proposta não encontrada" }, { status: 404 });
  }

  const empresa = lerEmpresa();
  const contrato = montarContrato(proposta, empresa);
  const baseUrl = process.env.APP_BASE_URL ?? req.nextUrl.origin;
  const redirectLink = `${baseUrl}/${slug}?assinado=1`;

  const documento = await criarDocumento({
    nome: `Contrato — ${proposta.cliente.empresa}`,
    markdown: contrato,
    externalId: slug,
    signatarios: [
      {
        name: `${empresa.signatario.nome} — ${empresa.nomeFantasia}`,
        email: empresa.signatario.email,
      },
      {
        name: proposta.cliente.responsavel.nome,
        email: proposta.cliente.responsavel.email,
        redirect_link: redirectLink,
      },
    ],
  });

  const signatarioCliente = documento.signers.find(
    (s) => s.email === proposta.cliente.responsavel.email,
  );

  return NextResponse.json({
    docToken: documento.token,
    signUrl: signatarioCliente?.sign_url ?? null,
  });
}
