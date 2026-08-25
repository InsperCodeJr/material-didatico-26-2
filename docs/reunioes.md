# Entregáveis por reunião

As três reuniões de acompanhamento têm objetivos diferentes, alinhados ao
que cada turma já viu de capacitação até aquele momento. A ideia não é
cobrar código pronto o tempo todo, e sim avaliar se o time está entendendo
o problema, gerenciando bem o projeto e evoluindo de forma consistente.

## 11/09 — Reunião intermediária 1: definição e estruturação

Foco principal: **"vocês entenderam o que precisam construir?"**, e não
cobrança pesada de código. Nesta etapa ainda não se exige UML nem
arquitetura formal, pois a capacitação correspondente ainda não aconteceu.

**README v1**

- [ ] Descrição do projeto
- [ ] Problema
- [ ] Objetivo
- [ ] Público/usuários
- [ ] Tecnologias previstas
- [ ] Instruções iniciais para configuração do ambiente
- [ ] Integrantes e responsabilidades

**Documento de requisitos**

- [ ] Requisitos funcionais
- [ ] Requisitos não funcionais
- [ ] User stories
- [ ] Critérios de aceite
- [ ] Casos de uso, quando aplicáveis

**Backlog priorizado**

- [ ] Funcionalidades/tarefas
- [ ] Prioridade
- [ ] Responsável
- [ ] Status

**Planejamento do projeto**

- [ ] Divisão inicial das tarefas
- [ ] Principais marcos
- [ ] Escopo do MVP

**Registro do alinhamento com o cliente**

- [ ] Principais necessidades levantadas
- [ ] Decisões tomadas
- [ ] Dúvidas pendentes

**Repositório organizado**

- [ ] Branches
- [ ] Commits minimamente descritivos
- [ ] PRs sendo utilizados
- [ ] `.gitignore`
- [ ] Estrutura inicial adequada

## 05/10 — Reunião intermediária 2: execução e retomada

Reunião logo após o período de provas, ainda sem Web/APIs e sem
Arquitetura/Docker/Deploy. A cobrança é principalmente sobre **progresso e
gestão do projeto**, não sobre conteúdos ainda não vistos.

- [ ] MVP/protótipo parcial funcional, conforme o estágio esperado do case
- [ ] README v2, refletindo mudanças no projeto
- [ ] Backlog atualizado
- [ ] Comparação planejado × realizado
- [ ] Funcionalidades concluídas e seus respectivos critérios de aceite
- [ ] Registro de feedback do cliente e alterações realizadas a partir dele
- [ ] Evidências de boas práticas no Git (branches, pull requests, code
      reviews, commits)
- [ ] Registro de impedimentos e decisões técnicas
- [ ] Planejamento atualizado para a segunda metade do projeto

!!! tip "Por que o planejado × realizado importa"
    Esse item ajuda a diferenciar um grupo que simplesmente "tem pouco
    pronto" de um grupo que teve problemas, percebeu isso, reorganizou o
    escopo e gerenciou bem o projeto.

## 30/10 — Reunião final: produto + documentação + legado

Nesta reunião todas as seis capacitações já aconteceram. Além dos
entregáveis específicos de cada case, existe um **pacote obrigatório de
encerramento**, comum a todos os projetos.

### Banca própria do cliente

Além das entregas finais, cada grupo terá uma reunião com o cliente ou
empresa para apresentar o projeto à banca própria do cliente. Essa reunião
acontecerá uma semana antes ou depois da reunião final, conforme
disponibilidade da equipe e do cliente.

Nesses encontros, a vestimenta adequada é obrigatória: **casual
profissional**.

### 1. README final completo

Deve funcionar como porta de entrada para alguém que nunca viu o projeto:

- [ ] Contexto e problema
- [ ] Solução desenvolvida
- [ ] Funcionalidades
- [ ] Tecnologias utilizadas
- [ ] Arquitetura geral
- [ ] Pré-requisitos
- [ ] Instalação
- [ ] Configuração
- [ ] Variáveis de ambiente sem expor secrets
- [ ] Como executar localmente
- [ ] Como utilizar
- [ ] Estrutura do repositório
- [ ] Deploy/acesso à aplicação, quando aplicável
- [ ] Limitações conhecidas
- [ ] Próximos passos
- [ ] Autores

### 2. Documentação técnica

Permite avaliar principalmente as capacitações 3, 4 e 6. Não deve ser um
documento gigantesco — a ideia é permitir que outra equipe assuma o
projeto no semestre seguinte.

- [ ] Visão da arquitetura
- [ ] Diagrama arquitetural/UML, quando aplicável
- [ ] Principais componentes
- [ ] APIs utilizadas/desenvolvidas
- [ ] Modelo de dados, quando aplicável
- [ ] Decisões técnicas relevantes
- [ ] Autenticação e segurança, quando aplicável
- [ ] Estratégia de deploy
- [ ] Testes
- [ ] CI/CD, quando aplicável

### 3. Backlog final

O backlog não precisa estar 100% concluído — é útil registrar:

- [ ] Concluído
- [ ] Não concluído
- [ ] Removido do escopo
- [ ] Melhorias futuras
- [ ] Bugs conhecidos
- [ ] Dívida técnica

### 4. Vídeo de demonstração

Vídeo curto, de **1 a 3 minutos**, obrigatório, mostrando:

- [ ] Problema
- [ ] Solução
- [ ] Principais funcionalidades
- [ ] Produto funcionando

!!! info "Por que gravar esse vídeo"
    É particularmente valioso para o Code: vira material para eventos,
    divulgação, apresentação para futuros clientes, processo seletivo e
    registro histórico.

### 5. Apresentação final

Curta, de **5 a 7 minutos por equipe**, seguindo o fluxo:

Problema → Solução → Demonstração → Decisões técnicas → Resultados →
Aprendizados/próximos passos.

!!! tip "Evite a apresentação cronológica"
    Seguindo esse roteiro, as equipes evitam aquela apresentação final de
    15 slides contando cronologicamente tudo que aconteceu desde agosto.

### 6. Handoff do projeto

Arquivo simples, sugerido como `HANDOFF.md`, contendo:

- [ ] Estado atual do projeto
- [ ] O que funciona
- [ ] O que não funciona
- [ ] Bugs conhecidos
- [ ] Pendências
- [ ] Acessos/serviços utilizados
- [ ] Orientações para continuidade
- [ ] Próximos passos recomendados
