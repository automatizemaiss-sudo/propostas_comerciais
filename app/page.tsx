import Link from "next/link";
import { listarSlugs, lerProposta } from "@/lib/propostas";

export default function Home() {
  const propostas = listarSlugs()
    .map(lerProposta)
    .filter((p) => p !== null);

  return (
    <main className="shell py-16">
      <h1 className="text-2xl tracking-[-.03em]">Propostas</h1>
      <p className="mt-2 text-sm text-muted">Painel interno — não é a página enviada ao lead.</p>
      <ul className="mt-8 grid gap-2 p-0">
        {propostas.map((p) => (
          <li key={p!.slug}>
            <Link href={`/${p!.slug}`} className="text-green underline">
              {p!.cliente.empresa} — /{p!.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
