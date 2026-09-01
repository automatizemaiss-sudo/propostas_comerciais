---
description: Gera uma proposta comercial a partir da transcrição de uma reunião
---

Gere uma nova proposta comercial a partir da transcrição em: $ARGUMENTS

Siga estes passos:

1. Leia o arquivo de transcrição indicado.
2. Leia `SCHEMA.md` — ele define, campo a campo, como extrair `problemas`, `solucoes`,
   `escopo`, `investimento`, `prazo`, `cases` e os dados de `cliente` a partir da
   transcrição. Siga a "regra de ouro": nada de `problemas`, `solucoes`, `escopo`,
   `investimento` ou `prazo` pode ser inventado — o que não foi dito na reunião vira
   `"[FALTA CONFIRMAR: ...]"`.
3. Leia `lib/types.ts` (interface `Proposta`) para confirmar o formato exato de cada campo.
4. Escolha o slug (kebab-case a partir do nome da empresa do lead).
5. Veja `content/cases/` e escolha o case mais parecido com o gargalo do lead para o
   array `cases`. Se nada encaixar, sinalize `[FALTA CONFIRMAR: qual case usar]`.
6. Escreva o resultado em `data/propostas/<slug>.json`.
7. Não rode `next build`/`next dev` nem crie commit ainda.
8. Mostre um resumo do que foi extraído (problemas, soluções, investimento, prazo) e
   liste, em destaque, todos os `[FALTA CONFIRMAR: ...]` que precisam de revisão humana
   antes do envio ao lead.
9. Pergunte se pode commitar. Só rode `git add` / `git commit` depois de confirmação
   explícita.

Depois que a proposta for aprovada e commitada, o deploy é automático (push → Vercel) e a
proposta fica disponível em `https://proposta.<dominio>/<slug>` — esse é o link que deve
ser enviado ao lead.
