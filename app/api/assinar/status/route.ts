import { NextRequest, NextResponse } from "next/server";
import { detalharDocumento } from "@/lib/zapsign";

export async function GET(req: NextRequest) {
  const docToken = req.nextUrl.searchParams.get("doc");
  if (!docToken) {
    return NextResponse.json({ erro: "Parâmetro 'doc' é obrigatório" }, { status: 400 });
  }

  const documento = await detalharDocumento(docToken);
  return NextResponse.json({
    status: documento.status,
    assinado: documento.status === "signed",
    signedFile: documento.signed_file,
  });
}
