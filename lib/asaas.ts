const BASE_URL_PROD = "https://api.asaas.com/v3";
const BASE_URL_SANDBOX = "https://api-sandbox.asaas.com/v3";

function apiKey(): string {
  const key = process.env.ASAAS_API_KEY;
  if (!key) throw new Error("ASAAS_API_KEY não configurado");
  return key;
}

function baseUrl(key: string): string {
  return key.startsWith("$aact_prod_") ? BASE_URL_PROD : BASE_URL_SANDBOX;
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const key = apiKey();
  const res = await fetch(`${baseUrl(key)}${path}`, {
    ...init,
    headers: {
      access_token: key,
      "Content-Type": "application/json",
      "User-Agent": "AutomatizeMais-Propostas/1.0",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const corpo = await res.text();
    throw new Error(`Asaas ${res.status}: ${corpo}`);
  }
  return res.json() as Promise<T>;
}

interface AsaasCustomer {
  id: string;
}

export async function obterOuCriarCliente(params: {
  nome: string;
  cpfCnpj: string;
  email?: string;
}): Promise<string> {
  const cpfCnpjLimpo = params.cpfCnpj.replace(/\D/g, "");

  const existentes = await asaasFetch<{ data: AsaasCustomer[] }>(
    `/customers?cpfCnpj=${cpfCnpjLimpo}`,
  );
  if (existentes.data.length > 0) return existentes.data[0].id;

  const criado = await asaasFetch<AsaasCustomer>("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: params.nome,
      cpfCnpj: cpfCnpjLimpo,
      email: params.email,
    }),
  });
  return criado.id;
}

export interface AsaasCobranca {
  id: string;
  invoiceUrl: string;
  status: string;
}

export async function criarCobranca(params: {
  customerId: string;
  valor: number;
  descricao: string;
  externalReference: string;
}): Promise<AsaasCobranca> {
  const vencimento = new Date();
  vencimento.setDate(vencimento.getDate() + 3);

  return asaasFetch<AsaasCobranca>("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: "UNDEFINED",
      value: params.valor,
      dueDate: vencimento.toISOString().slice(0, 10),
      description: params.descricao,
      externalReference: params.externalReference,
    }),
  });
}
