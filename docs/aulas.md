# Aula 1: GitHub, Git e Agentes de IA

!!! info "Sobre esta capacitação"
    Sessão ministrada por **Henrique Eduardo da Silva Souza**, Head de AI e Dados, Microsoft MVP em AI, com a comunidade **Insper Code Jr**. O objetivo foi revisar boas práticas de Git/GitHub e, na sequência, construir agentes de IA do zero com o **Google ADK (Agent Development Kit)**, incluindo múltiplos agentes, ferramentas externas e MCP (Model Context Protocol).

    Este material resume os conceitos e os passos práticos demonstrados ao vivo. Como o encontro foi hands-on (com erros e correções ao vivo), os comandos aqui foram organizados na ordem correta para servir como guia de consulta.

---

## 1. Por que isso importa

A engenharia de software está mudando rapidamente com IA generativa. Dominar bem Git/GitHub deixou de ser um diferencial e passou a ser **"preço de admissão"** — a base sobre a qual se constrói qualquer fluxo de trabalho moderno, incluindo fluxos com agentes de IA.

Ideia central da capacitação:

- Relembrar rapidamente Git/GitHub (a maioria da turma já domina o básico).
- Focar o tempo em algo novo: **criar agentes de IA em Python com Google ADK**, evoluir para **múltiplos agentes** e conectar tudo a serviços externos via **MCP**.
- Rodar o resultado final no **GitHub Codespaces**, sem precisar de nada instalado na máquina local.

---

## 2. Git: fundamentos

### 2.1 O que é o Git

- Git é um **DVCS** (*Distributed Version Control System* — sistema de controle de versão **descentralizado**).
- Ele armazena **snapshots** do código ao longo do tempo.
- "Descentralizado" significa que cada pessoa do time tem uma cópia completa do repositório (com todo o histórico) na própria máquina, além de existir uma cópia remota (ex.: no GitHub).

### 2.2 Antes do Git: os problemas antigos

- Times trabalhavam direto em um repositório compartilhado único, sem controle de versão real.
- Se duas pessoas mexessem no mesmo arquivo ao mesmo tempo, surgia **conflito**, e alguém podia perder o trabalho feito.
- Antes de ferramentas como GitHub/Bitbucket se popularizarem (há cerca de 10 anos), era comum:
  - Guardar cópias manuais de arquivos (`versao_final`, `versao_final_v2`, `versao_final_v2_corrigida`...).
  - "Builds manuais": levar fisicamente uma mídia (CD, depois pendrive) até o servidor para publicar uma nova versão — o palestrante chamou isso de **"deploy molecular"**.

> **Lição prática:** comece a versionar um projeto com Git desde o primeiro commit. Projetos que só recebem Git depois de já estarem bagunçados tendem a continuar bagunçados.

### 2.3 Estratégias de branch

| Estratégia | Como funciona | Quando usar |
|---|---|---|
| **Trunk-based** | Tudo é integrado direto na branch principal; a separação entre dev/homologação/produção é feita depois. | Times pequenos ou muito maduros, que testam e validam rápido. |
| **Git Flow** | Cada branch é específica para um ambiente ou tipo de mudança (feature, release, hotfix). O fluxo é mais "desenhado" e organizado. | Produtos em produção, times maiores, quando é preciso corrigir bugs urgentes sem arrastar mudanças ainda não validadas. |

**Por que Git Flow ajuda em produção:** se a `main` já acumulou várias mudanças ainda não testadas e aparece um bug crítico, seria arriscado subir tudo de uma vez só para corrigir o bug. Com Git Flow, você parte da última versão estável em produção, cria uma branch de **hotfix**, corrige, mescla de volta e leva **apenas essa correção** para produção — sem misturar com features ainda em desenvolvimento.

### 2.4 Pull Requests (PRs)

- Um PR é o mecanismo de pedir revisão de código antes de mesclar uma branch.
- Hoje, cada vez mais essa revisão inicial é feita por **agentes de IA**, que revisam o PR antes (ou junto) de uma pessoa.

---

## 3. GitHub e alternativas

- Cerca de 40% do mercado usa GitHub; o restante usa outras ferramentas, com destaque para o **Azure DevOps** (Microsoft) e o **Bitbucket** (Atlassian, geralmente integrado a Jira/Confluence).
- O Azure DevOps tem funcionalidades equivalentes ao GitHub (repositório, pipelines, Codespaces) e adiciona:
  - **Boards** mais completos (roadmap, custo por atividade, ideal para gestão de portfólio/produto).
  - **Wikis** internas.
  - **Dashboards** de pipelines, deployments e PRs abertos.

### 3.1 CI/CD

- **CI (Continuous Integration / Integração Contínua):** toda vez que um código é enviado para uma branch, um **pipeline de CI** é disparado automaticamente. Ele roda testes, simulações (*smoke tests*) e verificações de vulnerabilidade — para pegar problemas antes que cheguem à produção.
- **CD (Continuous Delivery/Deployment / Entrega/Implantação Contínua):** depois que o CI valida o código, o CD gera o **pacote de entrega** (ex.: imagem Docker, container, executável, APK) e o implanta em produção, idealmente **sem deixar a aplicação indisponível**.
- Quanto mais etapas o pipeline tem, mais tempo (e custo) ele consome — vale otimizar o número de etapas.
- Esse fluxo de CI/CD, junto com boas mensagens de PR, também alimenta **release notes** automáticas: cada entrega documentada no PR pode virar uma nota de versão visível para o usuário final.

### 3.2 GitHub Codespaces

- Ambiente de desenvolvimento completo (tipo um VS Code) rodando na nuvem, acessível direto do navegador — **sem precisar instalar nada na máquina local**.
- Útil para:
  - Rodar e testar código sem depender de uma máquina específica (até um tablet funciona).
  - Compartilhar um ambiente de trabalho para demonstração — por exemplo, subir um Codespace, expor a porta da aplicação e mandar o link para outra pessoa (ex.: um professor) avaliar sem precisar instalar nada.
- Como abrir: no repositório do GitHub, use o comando/menu **Codespaces** (ou `.` no repositório para abrir direto no VS Code Web) e selecione a branch desejada.

---

## 4. Boas práticas de segurança e higiene de repositório

- **Sempre configure o `.gitignore` corretamente antes do primeiro commit** — ele evita subir arquivos que não deveriam ir para o repositório (ambientes virtuais, chaves de API, arquivos `.env`).
- **Nunca versione arquivos `.env` com chaves de API ou segredos.** Uma das formas mais comuns de vazamento de dados é justamente subir, sem querer, chaves e credenciais dentro do repositório.
- Fique atento a conflitos de versão entre pacotes que dependem uns dos outros (ex.: um framework de agentes exigir uma versão mínima de outra biblioteca). Isso é comum quando se atualiza dependências sem revisar o *changelog*.

---

## 5. Construindo agentes de IA com Google ADK

### 5.1 O que é o Google ADK

- **ADK = Agent Development Kit**, framework de código aberto do Google para criar agentes de IA.
- Pontos fortes citados:
  - Multimodal e compatível com diferentes modelos (Gemini, Claude, entre outros).
  - Um dos primeiros frameworks a lançar suporte ao protocolo **A2A (Agent-to-Agent)** — agentes conversando com outros agentes.
  - Usado em grandes projetos reais pela equipe do palestrante.

### 5.2 Preparando o ambiente

```bash
# 1. Criar um ambiente virtual Python
python -m venv env

# 2. Ativar o ambiente
# Windows:
env\Scripts\activate
# Mac/Linux:
source env/bin/activate

# 3. Atualizar o pip (o ambiente sempre vem desatualizado)
python -m pip install --upgrade pip

# 4. Instalar o Google ADK
pip install google-adk
```

> Use sempre um ambiente virtual: isso evita problemas de compatibilidade entre bibliotecas de projetos diferentes na mesma máquina.

### 5.3 Criando o primeiro agente

```bash
adk create agent
# Nome do agente: ex. "personal_trainer"
# Modelo: ex. Gemini 2.5 Flash (modelo gratuito/mais barato para estudar)
```

- Para uso gratuito de LLM em estudos, o **Google AI Studio** permite criar um projeto e gerar uma **API key**, que já vem com créditos de teste.
- Depois de criado, o agente pode ser testado localmente com interface web:

```bash
adk web
```

Isso sobe uma interface no navegador para conversar com o agente, subir imagens/áudio, testar streaming de resposta e revisar **sessões**.

### 5.4 Conceito de sessão (session)

- Uma **sessão** é como uma "sala de conversa" entre o usuário e o agente.
- Serve para:
  - Avaliar se uma interação foi conclusiva ou não.
  - Quando há **múltiplos agentes**, rastrear em qual agente da cadeia uma resposta se perdeu ou falhou.
- Combinando `user_id` + `session_id`, é possível dar **memória** ao agente: ele passa a lembrar interações passadas (ex.: histórico de treinos de um usuário) e evoluir a resposta ao longo do tempo.

### 5.5 Dando ferramentas (tools) ao agente

Exemplo: permitir que o agente busque informações no Google:

```python
from google.adk.tools import google_search

# dentro da definição do agente:
tools = [google_search]
```

Regra importante do ADK observada na prática: **um agente que delega para sub-agentes não deve, ao mesmo tempo, ter ferramentas próprias que dupliquem o papel dos sub-agentes** — o framework reclama de conflito de configuração. A ferramenta deve ficar no sub-agente especializado; o agente "raiz" (root) apenas delega.

### 5.6 Multi-agentes (sub-agentes)

Conceitos-chave:

- **Root agent**: o ADK sempre procura uma variável chamada `root_agent` para iniciar a aplicação. Se não existir, é preciso defini-la explicitamente no `agent.py`.
- Um agente raiz pode ter uma lista de **sub-agentes** especializados (ex.: um agente de "corrida", outro de "musculação", outro de "core").
- Fluxo típico demonstrado:
  1. Usuário conversa com o **agente principal** (ex. personal trainer).
  2. O agente principal delega para o **sub-agente especializado** (ex. agente de corrida) quando o assunto exige.
  3. O sub-agente com a ferramenta (`google_search`) responde com informações externas (ex. vídeos de exercícios).

```python
# Esboço conceitual do agente raiz com sub-agentes
root_agent = Agent(
    name="personal_trainer",
    model="gemini-2.5-flash",
    description="Agente que ajuda o usuário a montar treinos",
    instruction="...",
    sub_agents=[running_agent],  # agente especializado em corrida
)
```

> Dica prática do treinamento: escreva instruções (*system prompt*) longas e detalhadas — é comum e aceitável usar um LLM (ex. ChatGPT) para ajudar a redigir esse prompt inicial antes de refinar manualmente.

### 5.7 Erros comuns ao trabalhar com múltiplos agentes/ferramentas

- Conflito de versão entre pacotes dependentes (ex. o ADK exigir uma versão mínima do pacote MCP; se a versão instalada for menor, dá erro de importação).
- Esquema de saída (*output schema*) não configurado corretamente ao compartilhar ferramentas entre agentes.
- Root agent ausente — sempre garantir que exista `root_agent` corretamente referenciado.

**Fluxo sugerido para debugar:** copiar a mensagem de erro e pedir a uma ferramenta de codificação com IA (Claude Code, Codex, etc.) para diagnosticar a causa raiz antes de tentar corrigir manualmente.

---

## 6. MCP — Model Context Protocol

### 6.1 O que é e por que existe

- **MCP (Model Context Protocol)** é um protocolo padrão para conectar agentes a **serviços/APIs externos** sem precisar reescrever a integração do zero para cada framework de agente.
- Analogia usada na aula: é como um **USB-C** — um único "conector" padrão que qualquer agente, de qualquer framework, consegue usar da mesma forma para acessar uma ferramenta externa.
- Na prática, uma API já existente (ex. em Flask/FastAPI) pode expor uma mesma rota tanto como endpoint HTTP normal quanto como ferramenta MCP, normalmente usando um *decorator* — sem alterar o comportamento original do endpoint.

### 6.2 Quando usar MCP em vez de apenas uma tool nativa (ex. Google Search)

Use MCP quando você precisa conectar o agente a um **serviço externo específico** que não é coberto por ferramentas genéricas, por exemplo:
- Consultar dados pessoais em um serviço (ex. Strava, dados de corrida).
- Consultar vagas de emprego em uma plataforma própria de recrutamento.
- Qualquer API interna da empresa/projeto que você queira "conectar" ao agente.

### 6.3 Configurando um MCP no ADK (exemplo prático)

```python
from google.adk.tools.mcp_tool import MCPToolset, StreamableHTTPConnectionParams

mcp_tools = MCPToolset(
    connection_params=StreamableHTTPConnectionParams(
        url="https://<endereco-do-servico>/mcp"
    )
)
```

- Existem diferentes tipos de conexão MCP (ex. `stdio`, `HTTP streamable`), cada uma com seu próprio modelo de autenticação.
- Instale a dependência do protocolo quando necessário:

```bash
pip install mcp
```

- Assim como no caso dos sub-agentes, fique atento à **compatibilidade de versões** entre o pacote `mcp` e o `google-adk` — versões desalinhadas foram a causa de um erro real demonstrado na aula.

### 6.4 Exemplo de caso de uso construído na aula

Um segundo agente ("Hunter") foi criado para:
1. Conectar-se via MCP a um serviço externo de vagas de emprego.
2. Responder perguntas como "quais vagas de IA temos hoje?".
3. Trazer vagas atualizadas em tempo real (inclusive vagas criadas durante a própria demonstração).
4. Simular a criação de uma vaga nova e a geração de pré-requisitos para uma entrevista.

---

## 7. Ferramentas de codificação assistida por IA — quando usar cada uma

Critério prático compartilhado pelo palestrante para escolher entre assistentes de código:

| Ferramenta | Melhor cenário de uso |
|---|---|
| **Claude Code** | Projetos legados e mais complexos — tende a lidar melhor com bases de código grandes e antigas. |
| **Codex** | Projetos novos e menores — costuma performar melhor que o Claude Code nesses casos. |
| **OpenCode** | Projetos muito grandes, quando o custo de tokens começa a ficar alto. Permite usar modelos alternativos (ex. GLM, "Química 3"/Kimi) que podem ser mais econômicos. |

> Esses critérios refletem a opinião e experiência prática do palestrante, não uma regra absoluta — vale testar e formar sua própria percepção conforme o projeto.

---

## 8. Publicando o trabalho e rodando em Codespaces

Fluxo final demonstrado, do agente local até rodando na nuvem:

```bash
# 1. Adicionar os arquivos (verifique o .gitignore antes!)
git add .

# 2. Commit
git commit -m "primeiro commit dos agentes"

# 3. Subir para a branch principal
git push origin main
```

Depois, no GitHub:
1. Abra o repositório e inicie um **Codespace** a partir da branch desejada.
2. Dentro do Codespace, reinstale as dependências (ex. `pip install -r requirements.txt` ou os pacotes usados: `google-adk`, `mcp`, etc.).
3. Rode `adk web` (ou o comando equivalente da sua aplicação) e exponha a porta gerada.
4. Compartilhe o link do Codespace para que outra pessoa (colega, professor) rode e avalie seu trabalho **sem precisar instalar nada**.

> Atenção: variáveis de ambiente com chaves de API (`.env`) não devem subir para o repositório. Isso significa que, ao rodar em um Codespace novo, será preciso recriar essas variáveis localmente nesse ambiente (não versionadas).

---

## 9. Resumo de conceitos-chave (glossário rápido)

- **DVCS** — Sistema de controle de versão descentralizado (o Git é um exemplo).
- **Branch** — Ramificação do código para trabalhar em algo isoladamente antes de integrar.
- **Trunk-based vs Git Flow** — Duas estratégias de organização de branches.
- **PR (Pull Request)** — Pedido de revisão/mesclagem de código.
- **CI (Continuous Integration)** — Pipeline automático que testa e valida código a cada push.
- **CD (Continuous Delivery/Deployment)** — Empacotamento e implantação automática após o CI.
- **Codespaces** — Ambiente de desenvolvimento na nuvem, acessível pelo navegador.
- **ADK (Agent Development Kit)** — Framework do Google para construir agentes de IA.
- **Root agent** — Agente principal que orquestra e delega para sub-agentes.
- **Sub-agente** — Agente especializado em uma tarefa específica, chamado pelo agente raiz.
- **Sessão (session)** — Contexto de conversa entre usuário e agente, usado para rastrear e dar memória.
- **MCP (Model Context Protocol)** — Protocolo padrão para conectar agentes a serviços/APIs externas.
- **A2A (Agent-to-Agent)** — Protocolo para comunicação direta entre agentes.

---

## 10. Próximos passos sugeridos

- Praticar a criação de agentes simples com o Google ADK usando a chave gratuita do Google AI Studio.
- Experimentar transformar uma tarefa repetitiva do seu dia a dia (ex. organizar tarefas, gerar relatórios) em um fluxo com agente + MCP.
- Reforçar a disciplina de **.gitignore** e proteção de credenciais em todo projeto novo, desde o primeiro commit.

---
 
## 11. Links mencionados na aula
 
| Recurso | Link |
|---|---|
| **Imersão IA Generativa com Azure AI Foundry** — 16h de imersão prática, 08–09 de novembro, São Paulo (convite feito pelo palestrante ao final da aula) | <https://www.imersaogenai.online/> |
| **LinkedIn do palestrante** (Henrique Eduardo Souza) — para dúvidas, contato ou acompanhar conteúdo sobre IA | <https://www.linkedin.com/in/hsouzaeduardo/> |
| **Gravação da aula** — Gravação via Teams | <https://drive.google.com/file/d/1wtfi3RYHGtEnnnbfhU_rNJGepbWC2TzV/view?usp=sharing> |

---

*Material gerado a partir da transcrição da capacitação realizada em 01/09/2026. Alguns trechos de conversa informal foram omitidos para manter o foco no conteúdo técnico.*

# Aula 2: Projetos Ágeis & Requisitos

# Aula 3: Web, APIs & Redes

# Aula 4: Arquitetura, Docker & Deploy

# Aula 5: IA Aplicada ao Desenvolvimento

# Aula 6: Qualidade, Segurança & Manutenibilidade
