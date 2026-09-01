# SCHEMA — transcrição → proposta

Regras para transformar `transcricoes/<slug>.txt` em `data/propostas/<slug>.json`, seguindo
`lib/types.ts` (interface `Proposta`).

## Regra de ouro

Nenhum campo de `problemas`, `solucoes`, `escopo`, `investimento` ou `prazo` pode ser
inventado. Tudo sai da transcrição. Se faltar informação, o campo entra como
`"[FALTA CONFIRMAR: o que falta]"` para revisão humana antes do envio — nunca chute um
valor plausível.

## `slug`

kebab-case, a partir do nome da empresa do lead. Vira a URL: `proposta.<dominio>/<slug>`.

## `incluirFechamento` (opcional)

`false` gera uma versão enxuta da página — sem Contrato, Aceite nem Pagamento — pra leads
que ainda não fecharam (ex.: "manda a proposta, mas ele ainda vai decidir"). Omita o campo
(ou deixe `true`) para a página completa, de fechamento. Quando `false`, ainda preencha
`contrato` e `investimento` com o que foi combinado — os campos só não aparecem
renderizados, mas ficam prontos pra quando a página for atualizada pra `true`.

## `cliente`

Nome da empresa, razão social, CNPJ, endereço e responsável (nome, e-mail, cargo) —
só preencha o que foi dito explicitamente. Campos não mencionados ficam
`[FALTA CONFIRMAR]`.

## `problemas` (3 a 4 itens)

- Extrair apenas dores que o *lead verbalizou* na reunião, não dores genéricas de mercado.
- Cada bloco: título de 3–5 palavras nomeando o gargalo + 2 a 3 frases descrevendo o
  processo manual atual, quem executa, com que frequência e qual o custo (tempo, dinheiro,
  risco).
- Usar as palavras do próprio cliente sempre que possível (nomes de ferramentas, cargos,
  nomes de pessoas).
- Nunca usar números que o cliente não disse.

## `solucoes`

- Uma solução por problema, na mesma ordem — os componentes renderizam lado a lado
  pareados pelo índice do array.
- Título nomeia o sistema, não a tecnologia.
- Descrever o *resultado* ("o cliente recebe a pasta em segundos"), não o stack.

## `escopo`

- `desenvolvimento`: o que será construído. Cada item é uma frase curta com verbo no
  início ("Construir...", "Integrar...", "Criar...").
- `gerenciamento`: suporte, testes, treinamento, documentação. Mesmo formato.

## `investimento` e `prazo`

- Só preencher `valor`, `condicoes`, `entregaDias` se foi discutido na reunião. Caso
  contrário, use a string `"PLACEHOLDER"` em `valor` e/ou `entregaDias` — é o valor que os
  componentes reconhecem para mostrar "[FALTA CONFIRMAR]" (e, no caso de `valor`, também
  desabilita o link de pagamento).
- `linkPagamento` sempre começa como `"PLACEHOLDER"` — é preenchido manualmente depois que
  o contrato é assinado.

## `cases`

Array de slugs referenciando `content/cases/<slug>.json`. Escolha o case mais parecido
com o gargalo do lead. Se nenhum existente encaixar, sinalize
`[FALTA CONFIRMAR: qual case usar]` em vez de inventar um.

## `contrato`

`foro` — padrão `"Ponta Grossa/PR"` (comarca da CONTRATADA). Só muda se o cliente
negociar explicitamente outro foro na reunião.

`suporteDias` — padrão `30`, a menos que a reunião tenha combinado algo diferente.

## `manutencao` (opcional)

Só existe quando o lead contratou manutenção mensal além da implementação. Se não foi
discutido na reunião, **omita o campo inteiro** (não coloque `[FALTA CONFIRMAR]` — a
ausência do campo já significa "sem manutenção" e o contrato de manutenção não é anexado
à assinatura).

Quando presente, preenche `content/contrato-manutencao.md`, que é anexado automaticamente
depois do contrato de implementação: `valorMensal`, `diaVencimento` (dia do mês, ex. `10`),
`formaPagamento` (ex. `"Pix"`), `prazoVigencia` (ex. `"12 meses"`), `avisoPrevioDias` e
`diasSuspensao`.

`incluso`/`naoIncluso` (opcionais): listas curtas mostradas na própria página (não só no
contrato) do que está e não está coberto pela mensalidade. Use as cláusulas 3ª e 4ª de
`content/contrato-manutencao.md` como base, mas resuma pro contexto específico do cliente.

## `custosInfraestrutura` (opcional)

Custos recorrentes de terceiros (servidor, tokens de IA, número de WhatsApp, etc.) que o
cliente paga direto ao provedor — fora do investimento e da manutenção. Só preencha se
foi estimado/discutido na reunião. Cada item: `nome`, `valor` (ou `"PLACEHOLDER"`) e
`periodicidade` (ex. `"mês"`).

## Tom de voz

Português do Brasil, direto, sem jargão de agência, sem superlativo vazio
("revolucionário", "de ponta"). Falar com o dono do negócio, não com o time técnico.

## Depois de gerar o JSON

1. Validar contra `lib/types.ts` (campos obrigatórios presentes).
2. Salvar em `data/propostas/<slug>.json`.
3. Listar every `[FALTA CONFIRMAR: ...]` encontrado para revisão humana.
4. Só commitar depois da confirmação humana.
