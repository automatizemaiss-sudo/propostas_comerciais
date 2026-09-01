const ZAPSIGN_BASE_URL = "https://api.zapsign.com.br/api/v1";

function apiToken(): string {
  const token = process.env.ZAPSIGN_API_TOKEN;
  if (!token) throw new Error("ZAPSIGN_API_TOKEN não configurado");
  return token;
}

async function zapsignFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${ZAPSIGN_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiToken()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const corpo = await res.text();
    throw new Error(`ZapSign ${res.status}: ${corpo}`);
  }
  return res.json() as Promise<T>;
}

export interface ZapSignSigner {
  token: string;
  sign_url: string;
  status: string;
  name: string;
  email: string;
  signed_at: string | null;
}

export interface ZapSignDocumento {
  token: string;
  status: "pending" | "signed" | string;
  name: string;
  signed_file: string | null;
  signers: ZapSignSigner[];
}

export interface SignatarioInput {
  name: string;
  email: string;
  redirect_link?: string;
}

export async function criarDocumento(params: {
  nome: string;
  markdown: string;
  signatarios: SignatarioInput[];
  externalId: string;
}): Promise<ZapSignDocumento> {
  return zapsignFetch<ZapSignDocumento>("/docs/", {
    method: "POST",
    body: JSON.stringify({
      name: params.nome,
      markdown_text: params.markdown,
      lang: "pt-br",
      external_id: params.externalId,
      brand_name: "Automatize Mais",
      brand_primary_color: "#00E05A",
      signers: params.signatarios,
    }),
  });
}

export async function detalharDocumento(token: string): Promise<ZapSignDocumento> {
  return zapsignFetch<ZapSignDocumento>(`/docs/${token}/`);
}
