import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secretEsperado = process.env.ZAPSIGN_WEBHOOK_SECRET;
  const secretRecebido = req.headers.get("x-webhook-secret");

  if (secretEsperado && secretRecebido !== secretEsperado) {
    return NextResponse.json({ erro: "Assinatura inválida" }, { status: 401 });
  }

  const evento = await req.json();
  console.log("[zapsign webhook]", evento.event_type, evento.token, evento.status);

  return NextResponse.json({ recebido: true });
}
