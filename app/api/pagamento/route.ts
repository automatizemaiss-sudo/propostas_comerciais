import { NextRequest, NextResponse } from "next/server";
import { lerProposta } from "@/lib/propostas";
import { criarCobranca, obterOuCriarCliente } from "@/lib/asaas";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  const proposta = lerProposta(slug);
  if (!proposta) {
    return NextResponse.json({ erro: "Proposta não encontrada" }, { status: 404 });
  }

  if (proposta.investimento.valor === "PLACEHOLDER") {
    return NextResponse.json({ erro: "Investimento ainda não definido" }, { status: 400 });
  }

  const customerId = await obterOuCriarCliente({
    nome: proposta.cliente.razaoSocial,
    cpfCnpj: proposta.cliente.cnpj,
    email: proposta.cliente.responsavel.email || undefined,
  });

  const cobranca = await criarCobranca({
    customerId,
    valor: proposta.investimento.valor,
    descricao: `Proposta ${proposta.cliente.empresa} — ${proposta.investimento.condicoes}`,
    externalReference: slug,
  });

  return NextResponse.json({ invoiceUrl: cobranca.invoiceUrl });
}
