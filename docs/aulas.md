# Aulas

## Aula 1: GitHub, Git e Agentes de IA

!!! info "Sobre esta capacitação"
    Sessão ministrada por **Henrique Eduardo da Silva Souza**, Head de AI e Dados, Microsoft MVP em AI, com a comunidade **Insper Code Jr**. O objetivo foi revisar boas práticas de Git/GitHub e, na sequência, construir agentes de IA do zero com o **Google ADK (Agent Development Kit)**, incluindo múltiplos agentes, ferramentas externas e MCP (Model Context Protocol).

    Este material resume os conceitos e os passos práticos demonstrados ao vivo. Como o encontro foi hands-on (com erros e correções ao vivo), os comandos aqui foram organizados na ordem correta para servir como guia de consulta.

---

### 1. Por que isso importa

A engenharia de software está mudando rapidamente com IA generativa. Dominar bem Git/GitHub deixou de ser um diferencial e passou a ser **"preço de admissão"** — a base sobre a qual se constrói qualquer fluxo de trabalho moderno, incluindo fluxos com agentes de IA.

Ideia central da capacitação:

- Relembrar rapidamente Git/GitHub (a maioria da turma já domina o básico).
- Focar o tempo em algo novo: **criar agentes de IA em Python com Google ADK**, evoluir para **múltiplos agentes** e conectar tudo a serviços externos via **MCP**.
- Rodar o resultado final no **GitHub Codespaces**, sem precisar de nada instalado na máquina local.

---

### 2. Git: fundamentos

#### 2.1 O que é o Git

- Git é um **DVCS** (*Distributed Version Control System* — sistema de controle de versão **descentralizado**).
- Ele armazena **snapshots** do código ao longo do tempo.
- "Descentralizado" significa que cada pessoa do time tem uma cópia completa do repositório (com todo o histórico) na própria máquina, além de existir uma cópia remota (ex.: no GitHub).

#### 2.2 Antes do Git: os problemas antigos

- Times trabalhavam direto em um repositório compartilhado único, sem controle de versão real.
- Se duas pessoas mexessem no mesmo arquivo ao mesmo tempo, surgia **conflito**, e alguém podia perder o trabalho feito.
- Antes de ferramentas como GitHub/Bitbucket se popularizarem (há cerca de 10 anos), era comum:
  - Guardar cópias manuais de arquivos (`versao_final`, `versao_final_v2`, `versao_final_v2_corrigida`...).
  - "Builds manuais": levar fisicamente uma mídia (CD, depois pendrive) até o servidor para publicar uma nova versão — o palestrante chamou isso de **"deploy molecular"**.

> **Lição prática:** comece a versionar um projeto com Git desde o primeiro commit. Projetos que só recebem Git depois de já estarem bagunçados tendem a continuar bagunçados.

#### 2.3 Estratégias de branch

| Estratégia | Como funciona | Quando usar |
|---|---|---|
| **Trunk-based** | Tudo é integrado direto na branch principal; a separação entre dev/homologação/produção é feita depois. | Times pequenos ou muito maduros, que testam e validam rápido. |
| **Git Flow** | Cada branch é específica para um ambiente ou tipo de mudança (feature, release, hotfix). O fluxo é mais "desenhado" e organizado. | Produtos em produção, times maiores, quando é preciso corrigir bugs urgentes sem arrastar mudanças ainda não validadas. |

**Por que Git Flow ajuda em produção:** se a `main` já acumulou várias mudanças ainda não testadas e aparece um bug crítico, seria arriscado subir tudo de uma vez só para corrigir o bug. Com Git Flow, você parte da última versão estável em produção, cria uma branch de **hotfix**, corrige, mescla de volta e leva **apenas essa correção** para produção — sem misturar com features ainda em desenvolvimento.

#### 2.4 Pull Requests (PRs)

- Um PR é o mecanismo de pedir revisão de código antes de mesclar uma branch.
- Hoje, cada vez mais essa revisão inicial é feita por **agentes de IA**, que revisam o PR antes (ou junto) de uma pessoa.

---

### 3. GitHub e alternativas

- Cerca de 40% do mercado usa GitHub; o restante usa outras ferramentas, com destaque para o **Azure DevOps** (Microsoft) e o **Bitbucket** (Atlassian, geralmente integrado a Jira/Confluence).
- O Azure DevOps tem funcionalidades equivalentes ao GitHub (repositório, pipelines, Codespaces) e adiciona:
  - **Boards** mais completos (roadmap, custo por atividade, ideal para gestão de portfólio/produto).
  - **Wikis** internas.
  - **Dashboards** de pipelines, deployments e PRs abertos.

#### 3.1 CI/CD

- **CI (Continuous Integration / Integração Contínua):** toda vez que um código é enviado para uma branch, um **pipeline de CI** é disparado automaticamente. Ele roda testes, simulações (*smoke tests*) e verificações de vulnerabilidade — para pegar problemas antes que cheguem à produção.
- **CD (Continuous Delivery/Deployment / Entrega/Implantação Contínua):** depois que o CI valida o código, o CD gera o **pacote de entrega** (ex.: imagem Docker, container, executável, APK) e o implanta em produção, idealmente **sem deixar a aplicação indisponível**.
- Quanto mais etapas o pipeline tem, mais tempo (e custo) ele consome — vale otimizar o número de etapas.
- Esse fluxo de CI/CD, junto com boas mensagens de PR, também alimenta **release notes** automáticas: cada entrega documentada no PR pode virar uma nota de versão visível para o usuário final.

#### 3.2 GitHub Codespaces

- Ambiente de desenvolvimento completo (tipo um VS Code) rodando na nuvem, acessível direto do navegador — **sem precisar instalar nada na máquina local**.
- Útil para:
  - Rodar e testar código sem depender de uma máquina específica (até um tablet funciona).
  - Compartilhar um ambiente de trabalho para demonstração — por exemplo, subir um Codespace, expor a porta da aplicação e mandar o link para outra pessoa (ex.: um professor) avaliar sem precisar instalar nada.
- Como abrir: no repositório do GitHub, use o comando/menu **Codespaces** (ou `.` no repositório para abrir direto no VS Code Web) e selecione a branch desejada.

---

### 4. Boas práticas de segurança e higiene de repositório

- **Sempre configure o `.gitignore` corretamente antes do primeiro commit** — ele evita subir arquivos que não deveriam ir para o repositório (ambientes virtuais, chaves de API, arquivos `.env`).
- **Nunca versione arquivos `.env` com chaves de API ou segredos.** Uma das formas mais comuns de vazamento de dados é justamente subir, sem querer, chaves e credenciais dentro do repositório.
- Fique atento a conflitos de versão entre pacotes que dependem uns dos outros (ex.: um framework de agentes exigir uma versão mínima de outra biblioteca). Isso é comum quando se atualiza dependências sem revisar o *changelog*.

---

### 5. Construindo agentes de IA com Google ADK

#### 5.1 O que é o Google ADK

- **ADK = Agent Development Kit**, framework de código aberto do Google para criar agentes de IA.
- Pontos fortes citados:
  - Multimodal e compatível com diferentes modelos (Gemini, Claude, entre outros).
  - Um dos primeiros frameworks a lançar suporte ao protocolo **A2A (Agent-to-Agent)** — agentes conversando com outros agentes.
  - Usado em grandes projetos reais pela equipe do palestrante.

#### 5.2 Preparando o ambiente

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

#### 5.3 Criando o primeiro agente

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

#### 5.4 Conceito de sessão (session)

- Uma **sessão** é como uma "sala de conversa" entre o usuário e o agente.
- Serve para:
  - Avaliar se uma interação foi conclusiva ou não.
  - Quando há **múltiplos agentes**, rastrear em qual agente da cadeia uma resposta se perdeu ou falhou.
- Combinando `user_id` + `session_id`, é possível dar **memória** ao agente: ele passa a lembrar interações passadas (ex.: histórico de treinos de um usuário) e evoluir a resposta ao longo do tempo.

#### 5.5 Dando ferramentas (tools) ao agente

Exemplo: permitir que o agente busque informações no Google:

```python
from google.adk.tools import google_search

# dentro da definição do agente:
tools = [google_search]
```

Regra importante do ADK observada na prática: **um agente que delega para sub-agentes não deve, ao mesmo tempo, ter ferramentas próprias que dupliquem o papel dos sub-agentes** — o framework reclama de conflito de configuração. A ferramenta deve ficar no sub-agente especializado; o agente "raiz" (root) apenas delega.

#### 5.6 Multi-agentes (sub-agentes)

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

#### 5.7 Erros comuns ao trabalhar com múltiplos agentes/ferramentas

- Conflito de versão entre pacotes dependentes (ex. o ADK exigir uma versão mínima do pacote MCP; se a versão instalada for menor, dá erro de importação).
- Esquema de saída (*output schema*) não configurado corretamente ao compartilhar ferramentas entre agentes.
- Root agent ausente — sempre garantir que exista `root_agent` corretamente referenciado.

**Fluxo sugerido para debugar:** copiar a mensagem de erro e pedir a uma ferramenta de codificação com IA (Claude Code, Codex, etc.) para diagnosticar a causa raiz antes de tentar corrigir manualmente.

---

### 6. MCP — Model Context Protocol

#### 6.1 O que é e por que existe

- **MCP (Model Context Protocol)** é um protocolo padrão para conectar agentes a **serviços/APIs externos** sem precisar reescrever a integração do zero para cada framework de agente.
- Analogia usada na aula: é como um **USB-C** — um único "conector" padrão que qualquer agente, de qualquer framework, consegue usar da mesma forma para acessar uma ferramenta externa.
- Na prática, uma API já existente (ex. em Flask/FastAPI) pode expor uma mesma rota tanto como endpoint HTTP normal quanto como ferramenta MCP, normalmente usando um *decorator* — sem alterar o comportamento original do endpoint.

#### 6.2 Quando usar MCP em vez de apenas uma tool nativa (ex. Google Search)

Use MCP quando você precisa conectar o agente a um **serviço externo específico** que não é coberto por ferramentas genéricas, por exemplo:
- Consultar dados pessoais em um serviço (ex. Strava, dados de corrida).
- Consultar vagas de emprego em uma plataforma própria de recrutamento.
- Qualquer API interna da empresa/projeto que você queira "conectar" ao agente.

#### 6.3 Configurando um MCP no ADK (exemplo prático)

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

#### 6.4 Exemplo de caso de uso construído na aula

Um segundo agente ("Hunter") foi criado para:
1. Conectar-se via MCP a um serviço externo de vagas de emprego.
2. Responder perguntas como "quais vagas de IA temos hoje?".
3. Trazer vagas atualizadas em tempo real (inclusive vagas criadas durante a própria demonstração).
4. Simular a criação de uma vaga nova e a geração de pré-requisitos para uma entrevista.

---

### 7. Ferramentas de codificação assistida por IA — quando usar cada uma

Critério prático compartilhado pelo palestrante para escolher entre assistentes de código:

| Ferramenta | Melhor cenário de uso |
|---|---|
| **Claude Code** | Projetos legados e mais complexos — tende a lidar melhor com bases de código grandes e antigas. |
| **Codex** | Projetos novos e menores — costuma performar melhor que o Claude Code nesses casos. |
| **OpenCode** | Projetos muito grandes, quando o custo de tokens começa a ficar alto. Permite usar modelos alternativos (ex. GLM, "Química 3"/Kimi) que podem ser mais econômicos. |

> Esses critérios refletem a opinião e experiência prática do palestrante, não uma regra absoluta — vale testar e formar sua própria percepção conforme o projeto.

---

### 8. Publicando o trabalho e rodando em Codespaces

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

### 9. Resumo de conceitos-chave (glossário rápido)

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

### 10. Próximos passos sugeridos

- Praticar a criação de agentes simples com o Google ADK usando a chave gratuita do Google AI Studio.
- Experimentar transformar uma tarefa repetitiva do seu dia a dia (ex. organizar tarefas, gerar relatórios) em um fluxo com agente + MCP.
- Reforçar a disciplina de **.gitignore** e proteção de credenciais em todo projeto novo, desde o primeiro commit.

---
 
### 11. Links mencionados na aula
 
| Recurso | Link |
|---|---|
| **Imersão IA Generativa com Azure AI Foundry** — 16h de imersão prática, 08–09 de novembro, São Paulo (convite feito pelo palestrante ao final da aula) | <https://www.imersaogenai.online/> |
| **LinkedIn do palestrante** (Henrique Eduardo Souza) — para dúvidas, contato ou acompanhar conteúdo sobre IA | <https://www.linkedin.com/in/hsouzaeduardo/> |
| **Gravação da aula** — Gravação via Teams | <https://drive.google.com/file/d/1wtfi3RYHGtEnnnbfhU_rNJGepbWC2TzV/view?usp=sharing> |

---

*Material gerado a partir da transcrição da capacitação realizada em 01/09/2026. Alguns trechos de conversa informal foram omitidos para manter o foco no conteúdo técnico.*

## Aula 2: Projetos Ágeis & Requisitos

Nesta aula vamos entender como estruturar o início de um projeto de software usando práticas ágeis, com foco total em responder a uma pergunta central antes de qualquer linha de código ser escrita:

> **"Vocês entenderam o que precisam construir?"**

Essa é exatamente a pergunta que a **Entrega Intermediária 1**, do dia **11/09**, vai avaliar. Tudo o que veremos aqui está diretamente conectado aos itens que vocês precisam entregar.

---

### 1. Por que "entender o problema" vem antes de codificar?

Um erro comum em projetos (ágeis ou não) é começar a programar antes de saber exatamente:

- Para quem o sistema é construído;
- Qual problema ele resolve;
- Quais restrições técnicas e de negócio existem;
- Como saberemos que uma funcionalidade está "pronta".

Em métodos ágeis, isso não significa fazer um documento gigante e engessado como no modelo cascata. Significa fazer o **mínimo de documentação necessária, mas com qualidade suficiente**, para que o time (e o cliente) tenham uma visão compartilhada do que será construído — e que essa visão possa evoluir a cada sprint.

!!! note "Ágil não é "sem documentação""
    Ágil não significa ausência de planejamento ou documentação. Significa documentação **enxuta, viva e revisada continuamente**, priorizando conversas e valor entregue sobre burocracia.

---

### 2. Visão geral da Entrega Intermediária 1 (11/09)

**Foco principal:** vocês entenderam o que precisam construir?

A entrega é composta por 5 blocos:

1. README v1
2. Documento de requisitos
3. Backlog priorizado
4. Registro do alinhamento com o cliente
5. Repositório organizado

Vamos destrinchar cada um.

---

### 3. README v1

O `README.md` é o **cartão de visita** do repositório. É a primeira coisa que qualquer pessoa (professor, cliente, novo integrante do time) vai ler.

#### Checklist obrigatório

- [ ] Descrição do projeto
- [ ] Tecnologias previstas
- [ ] Integrantes

#### O que colocar em cada item

**Descrição do projeto**

- Qual problema o projeto resolve?
- Para quem é (público-alvo / cliente)?
- Qual é o objetivo geral em 2-3 parágrafos, sem jargão técnico excessivo.

**Tecnologias previstas**

- Linguagens de programação;
- Frameworks e bibliotecas principais;
- Banco de dados;
- Ferramentas de infraestrutura (se já souberem).

!!! tip "Tudo bem mudar depois"
    É normal que essa lista evolua. O importante nesta etapa é registrar a decisão **atual** do time, com base no que já foi discutido.

**Integrantes**

- Nome completo de cada integrante;
- Papel/função no projeto (se já estiver definido, ex: Scrum Master, Dev Front-end, Dev Back-end);
- Forma de contato (opcional, dependendo da política da disciplina).

#### Modelo sugerido de README v1

```markdown
# Nome do Projeto

### Descrição
Breve descrição do problema que o projeto resolve e para quem ele é destinado.

### Tecnologias previstas
- Linguagem: ...
- Framework: ...
- Banco de dados: ...
- Outras ferramentas: ...

### Integrantes
| Nome            | Função            |
|-----------------|-------------------|
| Fulano de Tal    | Scrum Master      |
| Ciclana da Silva | Dev Back-end      |
```

---

### 4. Documento de requisitos

Este é o coração da entrega: é aqui que o time demonstra que entendeu **o que** precisa ser construído.

#### Checklist obrigatório

- [ ] Requisitos funcionais
- [ ] Requisitos não funcionais
- [ ] User stories
- [ ] Critérios de aceite
- [ ] Casos de uso, quando aplicáveis

#### 4.1 Requisitos funcionais (RF)

Descrevem **o que o sistema deve fazer** — comportamentos, funcionalidades e ações concretas.

Exemplo:

- RF01 — O sistema deve permitir que o usuário se cadastre com e-mail e senha.
- RF02 — O sistema deve permitir a criação de tarefas com título, descrição e prazo.

#### 4.2 Requisitos não funcionais (RNF)

Descrevem **como o sistema deve se comportar**, em termos de qualidade, restrições técnicas e não relacionados a uma funcionalidade específica.

Categorias comuns:

- **Desempenho** — ex: tempo de resposta menor que 2 segundos;
- **Segurança** — ex: senhas devem ser armazenadas com hash;
- **Usabilidade** — ex: interface responsiva para mobile;
- **Disponibilidade** — ex: sistema deve ficar disponível 99% do tempo;
- **Compatibilidade** — ex: deve funcionar nos principais navegadores.

Exemplo:

- RNF01 — O sistema deve responder a requisições em até 2 segundos em 95% dos casos.
- RNF02 — As senhas dos usuários devem ser armazenadas de forma criptografada.

#### 4.3 User Stories

São descrições curtas de funcionalidades escritas do ponto de vista do usuário, seguindo geralmente o formato:

```
Como [tipo de usuário]
Quero [ação/funcionalidade]
Para que [benefício/motivo]
```

Exemplo:

> Como usuário cadastrado,
> quero criar uma tarefa com prazo,
> para que eu possa organizar minhas entregas.

#### 4.4 Critérios de aceite

Definem **quando uma user story pode ser considerada "pronta"**. São condições objetivas e testáveis, geralmente vinculadas a cada user story.

Um formato bastante usado é o **Given-When-Then**:

```
Dado que o usuário está autenticado
Quando ele preenche o título e o prazo da tarefa e clica em "Salvar"
Então a tarefa deve aparecer na lista de tarefas do usuário
```

!!! warning "Critério de aceite não é teste automatizado"
    Não confundam critérios de aceite com testes automatizados. Eles são a **especificação** do comportamento esperado; os testes são a **verificação técnica** disso.

#### 4.5 Casos de uso (quando aplicáveis)

Para funcionalidades mais complexas, com múltiplos passos, atores e possíveis exceções, vale a pena descrever um caso de uso completo:

- **Nome do caso de uso**
- **Ator(es) envolvidos**
- **Pré-condições**
- **Fluxo principal** (passo a passo)
- **Fluxos alternativos / exceções**
- **Pós-condições**

Nem todo projeto precisa de casos de uso detalhados para tudo — usem quando o fluxo tiver complexidade real (múltiplas decisões, integrações, atores diferentes).

---

### 5. Backlog priorizado

O backlog é a lista viva de tudo o que precisa ser feito no projeto, organizada por prioridade.

#### Checklist obrigatório

- [ ] Print do Backlog inicial com **size**, **responsável** e **organização em sprints**

#### O que sua ferramenta de backlog precisa mostrar

1. **Itens do backlog** (user stories, tarefas técnicas, bugs conhecidos, etc.);
2. **Size (estimativa de esforço)** — pode ser story points, T-shirt size (P/M/G) ou horas, dependendo do que o time combinou;
3. **Responsável** — quem vai (ou pode vir a) executar aquele item;
4. **Organização em sprints** — os itens já devem estar distribuídos em pelo menos as primeiras sprints do projeto.

Ferramentas comuns para isso: Trello, Jira, GitHub Projects, ClickUp, Notion.

!!! tip "Priorização"
    Uma técnica simples e eficaz para priorizar é o **MoSCoW**:

    - **M**ust have — essencial
    - **S**hould have — importante, mas não bloqueante
    - **C**ould have — desejável
    - **W**on't have (por agora) — fora do escopo atual

---

### 6. Registro do alinhamento com o cliente

Projetos ágeis dependem de contato constante com quem vai usar ou validar o produto. Essa entrega pede evidência desse contato.

#### Checklist obrigatório

- [ ] Print/foto da reunião com o cliente
- [ ] Dúvidas pendentes

#### Dicas práticas

- Guardem prints de chamadas de vídeo, capturas de conversas por e-mail/WhatsApp ou fotos de reuniões presenciais;
- Façam uma **ata resumida** da reunião: data, participantes, principais decisões;
- Listem explicitamente as **dúvidas que ainda não foram respondidas** pelo cliente — isso mostra maturidade e planejamento, não falta de organização.

Exemplo de registro:

```markdown
### Alinhamento com o cliente — 05/09/2026

**Participantes:** Cliente (Fulano), Time (Ciclana, Beltrano)

**Principais decisões:**
- Prioridade para o módulo de cadastro de usuários.
- Cliente confirmou uso de autenticação via e-mail (sem login social por enquanto).

**Dúvidas pendentes:**
- O sistema precisa suportar múltiplos idiomas?
- Existe algum prazo legal para retenção de dados dos usuários?
```

---

### 7. Repositório organizado

Por fim, a entrega avalia a organização técnica do repositório do projeto — sinal de que o time já está aplicando boas práticas de desenvolvimento colaborativo.

#### Checklist obrigatório

- [ ] Branches, Commits e PRs
- [ ] `.gitignore`
- [ ] Estrutura inicial

#### Boas práticas esperadas

**Branches**

- Uma branch principal estável (ex: `main`);
- Branches de desenvolvimento por feature (ex: `feature/cadastro-usuario`).

**Commits**

- Mensagens claras e objetivas, descrevendo o que foi feito;
- Prefira commits pequenos e frequentes a um único commit gigante.

**Pull Requests (PRs)**

- Mesmo em times pequenos, usem PRs para revisar código antes de mesclar na branch principal;
- Descrevam no PR o que foi alterado e por quê.

**`.gitignore`**

- Configurado para a stack do projeto, evitando subir arquivos como `node_modules/`, `.env`, arquivos de build, etc.

**Estrutura inicial**

- Organização mínima de pastas já refletindo a arquitetura pretendida (ex: `src/`, `docs/`, `tests/`).

---

### 8. Resumo — Checklist completo da Entrega 1 (11/09)

Use esta lista como conferência final antes de entregar:

- [ ] **README v1**
    - [ ] Descrição do projeto
    - [ ] Tecnologias previstas
    - [ ] Integrantes
- [ ] **Documento de requisitos**
    - [ ] Requisitos funcionais
    - [ ] Requisitos não funcionais
    - [ ] User stories
    - [ ] Critérios de aceite
    - [ ] Casos de uso, quando aplicáveis
- [ ] **Backlog priorizado**
    - [ ] Print do backlog com size, responsável e sprints
- [ ] **Registro do alinhamento com o cliente**
    - [ ] Print/foto da reunião
    - [ ] Dúvidas pendentes
- [ ] **Repositório organizado**
    - [ ] Branches, commits e PRs
    - [ ] `.gitignore`
    - [ ] Estrutura inicial

!!! success "Objetivo desta entrega"
    Não é entregar código funcionando. É provar, com evidências concretas, que o time **sabe exatamente o que vai construir**, para quem, e como o trabalho está organizado para começar.

---

### 9. Para praticar

Antes da entrega, reúnam o time e respondam em conjunto:

1. Se uma pessoa de fora lesse só o README, ela entenderia o projeto em 1 minuto?
2. Cada user story tem pelo menos um critério de aceite testável?
3. O backlog já reflete a priorização real (o que é essencial vs. o que é "nice to have")?
4. As dúvidas registradas com o cliente já foram encaminhadas para resposta?
5. Qualquer integrante do time consegue clonar o repositório e entender a estrutura sem precisar perguntar nada?

Se a resposta for "sim" para todas, vocês estão prontos para a Entrega Intermediária 1.

## Aula 3: Web, APIs & Redes

## Aula 4: Arquitetura, Docker & Deploy

## Aula 5: IA Aplicada ao Desenvolvimento

## Aula 6: Qualidade, Segurança & Manutenibilidade
