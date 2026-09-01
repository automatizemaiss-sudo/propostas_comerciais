export interface Proposta {
  slug: string;
  criadoEm: string;
  validaAte: string;
  cliente: {
    empresa: string;
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    responsavel: {
      nome: string;
      email: string;
      cargo: string;
    };
  };
  problemas: Array<{
    titulo: string;
    descricao: string;
  }>;
  solucoes: Array<{
    titulo: string;
    descricao: string;
  }>;
  escopo: {
    desenvolvimento: string[];
    gerenciamento: string[];
  };
  investimento: {
    valor: number | "PLACEHOLDER";
    moeda: string;
    condicoes: string;
    linkPagamento: string;
  };
  prazo: {
    entregaDias: number;
    observacao: string;
  };
  cases: string[];
  contrato: {
    foro: string;
    suporteDias: number;
  };
  manutencao?: {
    valorMensal: number;
    diaVencimento: number;
    formaPagamento: string;
    prazoVigencia: string;
    avisoPrevioDias: number;
    diasSuspensao: number;
  };
  assinatura?: {
    status: "pendente" | "assinado";
    documentoId?: string;
    assinadoEm?: string;
    pdfUrl?: string;
  };
}

export interface Case {
  slug: string;
  cliente: string;
  logo?: string;
  resumo: string;
  resultado: string;
  destaques: string[];
  citacao?: {
    texto: string;
    autor: string;
    cargo: string;
  };
}

export interface Empresa {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  signatario: {
    nome: string;
    cargo: string;
    email: string;
  };
  contato: {
    email: string;
    telefone: string;
    site: string;
  };
}
