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
    /** Sufixo mostrado depois do número, ex. "úteis" ou "corridos". Omitir = só "dias". */
    unidade?: string;
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
    /** Quando a manutenção começa e quando cai o primeiro pagamento — mostrado no card de manutenção. */
    inicio?: string;
  };
  assinatura?: {
    status: "pendente" | "assinado";
    documentoId?: string;
    assinadoEm?: string;
    pdfUrl?: string;
  };
  /** Custos recorrentes de terceiros (servidor, tokens de IA etc.) pagos à parte pelo cliente. */
  custosInfraestrutura?: Array<{
    nome: string;
    valor: number | "PLACEHOLDER";
    periodicidade: string;
  }>;
}

export interface Case {
  slug: string;
  cliente: string;
  logo?: string;
  /** Foto de uma pessoa associada ao case (fundador, cliente), exibida ao lado do logo. */
  foto?: string;
  /** true quando o logo já é um wordmark com o nome escrito — evita repetir o nome ao lado. */
  ocultarNomeTexto?: boolean;
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
