export interface Proposta {
  slug: string;
  criadoEm: string;
  validaAte: string;
  /** false = página enxuta, sem Contrato/Aceite/Pagamento (lead ainda não fechou). Padrão: true. */
  incluirFechamento?: boolean;
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
    entregaDias: number | "PLACEHOLDER";
    observacao: string;
  };
  cases: string[];
  contrato: {
    foro: string;
    suporteDias: number;
  };
  manutencao?: {
    valorMensal: number | "PLACEHOLDER";
    diaVencimento: number | "PLACEHOLDER";
    formaPagamento: string;
    prazoVigencia: string;
    avisoPrevioDias: number | "PLACEHOLDER";
    diasSuspensao: number | "PLACEHOLDER";
    /** O que está incluso no valor mensal — mostrado na página, não só no contrato. */
    incluso?: string[];
    /** O que NÃO está incluso no valor mensal — mostrado na página, não só no contrato. */
    naoIncluso?: string[];
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
