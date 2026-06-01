# Design Spec: Landing Page Intestino Livre

**Data:** 2026-05-30
**Status:** Aprovado (v2 - Otimizado para Tráfego Frio)
**Tipo:** Landing Page de Direct Response (Quiz Funnel)

---

## Visão Geral

Landing page de direct response para o produto digital **Protocolo Intestino Livre**, direcionado a mulheres que sofrem com problemas intestinais (constipação, inchaço, gases, inflamação).

**Estratégia:** Diagnóstico → Validação → Solução Gratuita → Oferta Paga

**Público:** Mulheres com problemas intestinais, consciência nível 1-2 (conscientes do problema, talvez da solução)

**Mecanismo Principal:** "Gatilhos Ocultos" — O produto não é apenas um protocolo, é um método para descobrir os gatilhos ocultos que mantêm o intestino inflamado.

---

## Funil Completo (Narrativa Coesa)

```
Criativo ("3 hábitos que pioram seu intestino")
→ Quiz de Diagnóstico
→ Resultado Personalizado
→ Receita Gratuita
→ "Você descobriu alguns gatilhos, mas existem outros que talvez estejam escondidos"
→ Oferta do Protocolo Intestino Livre
```

---

## Arquitetura da Página

### 1. Quiz Interativo (Telas 1-14)

**Formato:** 10-14 perguntas
**Fluxo:** Identity-Based

#### Estrutura do Fluxo:
1. **Pergunta de Identidade** — "Quem é você?" (idades, perfil)
2. **Sintomas Físicos** (70% das perguntas)
   - Inchaço
   - Gases
   - Constipação
   - Dor abdominal
   - Barriga estufada
   - Regularidade intestinal
   - Sintomas após comer
3. **Pergunta de Vínculo** — Impacto emocional
4. **Pergunta de Situação** — Histórico e tentativas
5. **Pergunta de Rotina** — Estresse, sono, alimentação
6. **Pergunta de Desejo** — Objetivos e motivação
7. **Tela de Resultado** — Diagnóstico personalizado

#### Nível de Consciência do Lead:
- **Nível 1:** Consciente do problema (dor)
- **Nível 2:** Consciente da solução (busca por alternativas)

---

### 2. Página de Receita Grátis

**Objetivo:** Entregar valor e construir confiança

#### Elementos:
- **Headline:** "Aqui está sua receita natural para acalmar o intestino"
- **Vídeo/Conteúdo:** Receita natural anti-inflamatória
- **CTA:** "Quero mais dicas assim → Protocolo Completo"
- **Ponte Narrativa:** "Você descobriu alguns gatilhos, mas existem outros que talvez estejam escondidos"

---

### 3. Página de Oferta (Protocolo)

**Estrutura:**

#### 3.1 Header
- Logo/Branding: Protocolo Intestino Livre

#### 3.2 Headline Principal

**Opção 1 (Recomendada para Tráfego Frio):**
> "Seu intestino está tentando dar sinais. Descubra os erros que podem estar causando inchaço, gases e prisão de ventre todos os dias."

**Opção 2 (Alternativa):**
> "O problema pode não ser o seu intestino. Descubra os gatilhos ocultos que mantêm sua barriga inchada e desconfortável."

#### 3.3 Seção de Identificação (ANTES dos Depoimentos)

**Headline:** "Você se identifica com isso?"

**Checklist:**
- ☐ Barriga estufada mesmo sem comer muito
- ☐ Sensação de peso após as refeições
- ☐ Intestino que funciona um dia e trava no outro
- ☐ Gases frequentes
- ☐ Roupa apertando ao final do dia
- ☐ Sensação de não esvaziar completamente

**Mensagem de Fechamento:**
> "Se marcou 2 ou mais opções, o protocolo foi criado para você."

#### 3.4 Depoimentos (3-5)

**Formato:** Antes/depois subjetivo

- Depoimento 1: "Em 2 semanas menos estufamento e muito mais leveza!"
- Depoimento 2: "Finalmente meu intestino voltou a funcionar todo dia!"
- Depoimento 3: "Perdi 3kg de inchaço em 1 mês!"

#### 3.5 O Que Você Vai Receber

1. **Mapa dos Gatilhos da Inflamação**
   - Descubra quais hábitos, alimentos e situações podem estar agravando seus sintomas.

2. **Método Intestino Livre 7 Dias**
   - Passo a passo simples para reorganizar sua rotina intestinal.

3. **Guia dos Alimentos Amigos do Intestino**
   - Lista prática do que priorizar e do que reduzir.

4. **Checklist Diário da Regularidade**
   - Rotina de acompanhamento em menos de 3 minutos por dia.

#### 3.6 Bônus

🎁 **Bônus 1:** Aula Extra: Receitas Anti-inflamatórias (Valor: R$47 - GRÁTIS)

🎁 **Bônus 2:** Lista dos 15 alimentos que mais causam inchaço sem você perceber

#### 3.7 Mockups
- Dois celulares mostrando os materiais do protocolo

#### 3.8 Preço
- **De:** R$97
- **Por:** R$37/mês
- **Ou:** 12x de R$3,70

#### 3.9 CTA Principal

**Opção 1 (Recomendada):**
> "Quero começar meu Protocolo Intestino Livre"

**Opção 2 (Alternativa):**
> "Quero reduzir meu inchaço agora"

#### 3.10 Garantia
- **7 Dias** — Se não gostar, devolvemos 100% do seu dinheiro

#### 3.11 FAQ

1. Preciso mudar toda minha alimentação?
2. Quanto tempo leva para colocar o protocolo em prática?
3. Posso seguir mesmo tomando medicamentos?
4. E se eu não gostar?

---

## Estilo Visual

**Tema:** Orgânico & Natural

### Paleta de Cores:
- **Primária:** #2d5016 (verde escuro)
- **Secundária:** #a8d5a2 (verde suave)
- **Fundo:** #f7f5f0 (bege claro)
- **Texto:** #1a202c (cinza escuro)
- **Texto Secundário:** #4a5568 (cinza médio)
- **Destaque:** #48bb78 (verde vibrante)
- **Alerta:** #856404 (amarelo escuro)

### Tipografia:
- **Títulos:** Fonte arredondada, bold
- **Corpo:** Fonte limpa, fácil leitura
- **Tamanho-base:** 14-16px

### Elementos Visuais:
- Bordas arredondadas (8-12px)
- Sombras suaves
- Ícones orgânicos/naturais
- Espaçamento generoso

---

## Especificações Técnicas

### Mobile-First:
- **Largura:** 375px (iPhone)
- **Altura:** Variável (scroll)
- **Breakpoints:** 375px → 768px → 1024px

### Componentes:
1. **Quiz Engine** — Lógica de pontuação e progressão
2. **Timer/Progress Bar** — Indicador de progresso
3. **Cards de Opções** — Botões clicáveis com feedback visual
4. **Seções de Conteúdo** — Blocos de informações
5. **Checklist Interativo** — Seções de identificação clicáveis
6. **Cards de Depoimento** — Social proof
7. **Mockups** — Celular com preview dos materiais
8. **Preço** — Destaque visual para CTA
9. **FAQ Accordion** — Perguntas expansíveis

### Performance:
- Imagens otimizadas (WebP)
- Lazy loading
- CSS crítico inline
- Scripts defer

---

## Conversão e Métricas

### Funil:
1. **Quiz Início** → Taxa de clique
2. **Quiz Completo** → Taxa de conclusão (meta: >60%)
3. **Página Receita** → Taxa de visualização
4. **Página Oferta** → Taxa de clique no CTA
5. **Checkout** → Taxa de conversão (meta: >2%)

### A/B Testing:
- Headlines diferentes (Opção 1 vs Opção 2)
- Número de depoimentos
- Posição do preço
- Cor do CTA
- Texto do CTA

---

## Próximos Passos

1. Criar estrutura HTML/CSS da landing page
2. Implementar lógica do quiz
3. Integrar pagamento (Stripe/Pix)
4. Configurar analytics
5. Testes A/B
6. Lançar tráfego

---

## Aprovação

- [x] Design aprovado pelo cliente (v2)
- [ ] Implementação iniciada
- [ ] Testes realizados
- [ ] Lançamento