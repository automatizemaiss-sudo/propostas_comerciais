# Propostas comerciais — ATM+

Template de proposta comercial (diagnóstico → solução → quem somos → cases → escopo e
investimento → contrato → assinatura → pagamento). Cada lead vira uma página em
`/<slug>`, gerada a partir de um JSON — sem banco de dados.

## Fluxo

```
Reunião com o lead
   ↓ grava + transcreve → transcricoes/<slug>.txt
Claude Code lê a transcrição + SCHEMA.md
   ↓ /nova-proposta transcricoes/<slug>.txt
data/propostas/<slug>.json
   ↓ git push → deploy automático na Vercel
https://proposta.<dominio>/<slug>
   ↓ lead lê, aceita, assina via ZapSign
Contrato assinado + libera link de pagamento
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — a `/` lista as propostas existentes
em `data/propostas/`, e cada uma vive em `/<slug>` (ex.: `/exemplo`).

Copie `.env.example` para `.env.local` e preencha `ZAPSIGN_API_TOKEN` (assinatura) e
`ASAAS_API_KEY` (pagamento) para testar os dois fluxos.

## Estrutura

- `app/[slug]/page.tsx` — página pública da proposta
- `app/api/assinar` — cria o documento na ZapSign e devolve o link de assinatura do lead
- `app/api/assinar/status` — consulta o status de assinatura (usado depois do redirect)
- `app/api/webhook/zapsign` — recebe o callback da ZapSign
- `app/api/pagamento` — cria o cliente/cobrança no Asaas e devolve o link de pagamento
- `components/` — uma seção por arquivo (Capa, Problema, Solução, QuemSomos, Cases,
  Escopo, Contrato, AssinaturaPagamento)
- `content/empresa.json` — dados fixos da Automatize Mais (contratada em todo contrato)
- `content/cases/` — cases reutilizáveis entre propostas
- `content/contrato-base.md` — contrato de implementação, com placeholders `{{...}}`
- `content/contrato-manutencao.md` — contrato de manutenção opcional, anexado
  automaticamente quando `proposta.manutencao` está presente no JSON
- `data/propostas/<slug>.json` — um arquivo por lead, é o que vira a página
- `SCHEMA.md` — regras para transformar transcrição em JSON
- `.claude/commands/nova-proposta.md` — slash command do fluxo pós-reunião

## Pagamento (Asaas)

Assim que o lead assina, a página chama `/api/pagamento` automaticamente e mostra o link
assim que ele fica pronto — não é preciso colar link manualmente, a menos que
`investimento.linkPagamento` no JSON já tenha um valor diferente de `"PLACEHOLDER"` (nesse
caso ele tem prioridade e a chamada ao Asaas nem acontece). A cobrança é criada com
`billingType: "UNDEFINED"`, ou seja, o lead escolhe Pix, boleto ou cartão na tela da
própria fatura Asaas.

## Pendências conhecidas

- `content/cases/` só tem o case da Voltz — adicionar mais conforme forem fechando
  projetos.
- Domínio próprio (`proposta.<dominio>`) ainda não configurado na Vercel.
- Webhook da ZapSign (`/api/webhook/zapsign`) ainda não foi registrado na conta — só faz
  sentido depois que existir uma URL de produção.
