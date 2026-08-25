# Utilidades

Combinados práticos para manter os repositórios dos projetos claros,
revisáveis e fáceis de continuar no semestre seguinte.

## README

Um bom `README.md` responde a três perguntas: **o que é o projeto**, **como
rodar** e **como contribuir ou continuar o trabalho**.

### Estrutura recomendada

````md
# Nome do projeto

Breve descrição do problema e da solução em 2 ou 3 frases.

## Contexto

Quem usa este projeto, qual dor ele resolve e por que ele existe.

## Funcionalidades

- Funcionalidade principal 1
- Funcionalidade principal 2
- Funcionalidade principal 3

## Tecnologias

- Frontend: React
- Backend: FastAPI
- Banco de dados: PostgreSQL

## Como rodar localmente

```bash
git clone https://github.com/organizacao/repositorio.git
cd repositorio
cp .env.example .env
npm install
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `DATABASE_URL` | URL de conexão com o banco | `postgres://...` |
| `API_KEY` | Chave do serviço externo | Não commitar valores reais |

## Como testar

```bash
npm test
```

## Deploy

Link da aplicação, ambiente usado e observações importantes.

## Autores

- Nome 1
- Nome 2
````

!!! example "Exemplo curto"
````md
    # Agenda Solidária

    Sistema web para organizar voluntários, eventos e inscrições de uma ONG.
    O projeto centraliza a agenda, reduz confirmação manual por WhatsApp e
    permite acompanhar presença por evento.

    ## Como rodar

```bash
    cp .env.example .env
    npm install
    npm run dev
```

    Depois, acesse `http://localhost:5173`.
````

### Checklist de qualidade

- [ ] O objetivo do projeto aparece no primeiro bloco de texto.
- [ ] Existe um passo a passo que alguém de fora consegue seguir.
- [ ] Secrets reais não aparecem no arquivo.
- [ ] O README explica o estado atual do projeto, não só o plano inicial.
- [ ] Links importantes funcionam.

## Commits

Commits bons contam uma mudança pequena e verificável. Evite commits
gigantes que misturam layout, regra de negócio, configuração e correções
aleatórias.

### Formato recomendado

````txt
tipo: descrição curta no imperativo
````

Tipos úteis: `feat` (nova funcionalidade), `fix` (correção de bug), `docs`
(documentação), `style` (formatação sem mudança de regra), `refactor`
(reorganização sem mudar comportamento), `test` (criação ou ajuste de
testes), `chore` (manutenção, configs e dependências).

!!! example "Bons exemplos"
````txt
    feat: add volunteer registration form
    fix: prevent duplicate event subscriptions
    docs: explain local setup in README
    test: cover login validation errors
    chore: update mkdocs navigation
````

!!! danger "Evite"
````txt
    arrumei coisas
    final
    update
    commit novo
    mudanças
````

## Branches

Nomeie branches pelo trabalho que elas carregam:

````txt
feat/login-page
fix/calendar-timezone
docs/readme-setup
chore/mkdocs-nav
````

Antes de abrir um pull request, atualize sua branch com a base combinada do
time e rode os checks locais disponíveis.

## Pull requests

Um pull request deve ser pequeno o suficiente para alguém revisar com
atenção. Explique o que mudou, como testar e quais decisões precisam de
cuidado.

!!! example "Modelo sugerido"
````md
    ## O que mudou

    - Adiciona formulário de cadastro de voluntários
    - Salva inscrições no banco
    - Mostra mensagem de erro para e-mail inválido

    ## Como testar

    1. Rode `npm run dev`
    2. Acesse `/voluntarios/novo`
    3. Tente cadastrar um e-mail inválido
    4. Cadastre um voluntário válido

    ## Observações

    - Ainda falta conectar a listagem geral de voluntários.
````

## Issues e tarefas

Tarefas boas têm escopo claro e critério de pronto.

!!! example "Prefira"
````md
    Criar tela de cadastro de voluntário

    Critérios de aceite:
    - [ ] Usuário consegue preencher nome, e-mail e telefone
    - [ ] Sistema valida e-mail inválido
    - [ ] Cadastro válido aparece na lista de voluntários
````

!!! danger "Em vez de"
````md
    Fazer parte dos voluntários
````