import fs from "node:fs";
import path from "node:path";
import type { Empresa, Proposta } from "./types";

function formatarValor(valor: number | "PLACEHOLDER", moeda: string) {
  if (valor === "PLACEHOLDER") return "[FALTA CONFIRMAR]";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda || "BRL" }).format(
    valor,
  );
}

function formatarDataExtenso(iso: string) {
  const data = new Date(`${iso}T00:00:00`);
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function formatarCnpj(cnpj: string) {
  const digitos = cnpj.replace(/\D/g, "");
  if (digitos.length !== 14) return cnpj;
  return digitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function preencher(template: string, substituicoes: Record<string, string>): string {
  return Object.entries(substituicoes).reduce(
    (texto, [chave, valor]) => texto.replaceAll(`{{${chave}}}`, valor),
    template,
  );
}

function lerTemplate(nome: string): string {
  return fs.readFileSync(path.join(process.cwd(), "content", nome), "utf-8");
}

function substituicoesPartes(proposta: Proposta, empresa: Empresa): Record<string, string> {
  return {
    CONTRATADA_RAZAO_SOCIAL: empresa.razaoSocial,
    CONTRATADA_CNPJ: formatarCnpj(empresa.cnpj),
    CONTRATADA_ENDERECO: empresa.endereco,
    CONTRATADA_SIGNATARIO: `${empresa.signatario.nome}, ${empresa.signatario.cargo}`,
    CONTRATANTE_RAZAO_SOCIAL: proposta.cliente.razaoSocial,
    CONTRATANTE_CNPJ: formatarCnpj(proposta.cliente.cnpj),
    CONTRATANTE_ENDERECO: proposta.cliente.endereco,
    CONTRATANTE_RESPONSAVEL: `${proposta.cliente.responsavel.nome}, ${proposta.cliente.responsavel.cargo}`,
    FORO: proposta.contrato.foro,
    DATA_ATUAL: formatarDataExtenso(proposta.criadoEm),
  };
}

/**
 * Preenche content/contrato-base.md (e, se a proposta incluir manutenção,
 * content/contrato-manutencao.md em seguida) com os dados da proposta e da
 * empresa. O resultado é renderizado na página (react-markdown) e enviado
 * como markdown_text para a ZapSign — por isso os .md fonte não devem
 * conter HTML bruto (comentários inclusos), só sobra como texto visível em
 * ambos.
 */
export function montarContrato(proposta: Proposta, empresa: Empresa): string {
  const partes = substituicoesPartes(proposta, empresa);

  const implementacao = preencher(lerTemplate("contrato-base.md"), {
    ...partes,
    VALOR_INVESTIMENTO: formatarValor(proposta.investimento.valor, proposta.investimento.moeda),
    CONDICOES_PAGAMENTO: proposta.investimento.condicoes,
    SUPORTE_DIAS: String(proposta.contrato.suporteDias),
  });

  if (!proposta.manutencao) return implementacao;

  const manutencao = preencher(lerTemplate("contrato-manutencao.md"), {
    ...partes,
    VALOR_MENSAL: formatarValor(proposta.manutencao.valorMensal, proposta.investimento.moeda),
    DIA_VENCIMENTO: String(proposta.manutencao.diaVencimento),
    FORMA_PAGAMENTO: proposta.manutencao.formaPagamento,
    PRAZO_VIGENCIA: proposta.manutencao.prazoVigencia,
    DIAS_SUSPENSAO: String(proposta.manutencao.diasSuspensao),
    AVISO_PREVIO_DIAS: String(proposta.manutencao.avisoPrevioDias),
  });

  return `${implementacao}\n\n---\n\n${manutencao}`;
}
