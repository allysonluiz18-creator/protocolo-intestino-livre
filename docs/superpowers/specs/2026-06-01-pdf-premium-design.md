# Design Spec: PDF Premium — Protocolo Intestino Livre

## Resumo

Transformar os 5 PDFs atuais (gerados com PDFKit) em materiais premium, modernos, femininos e interativos. O protótipo será o **Mapa dos Gatilhos da Inflamação**, com 14 páginas usando HTML/CSS + Puppeteer.

## Escopo

- **Protótipo:** Mapa dos Gatilhos da Inflamação (14 páginas)
- **Tecnologia:** HTML/CSS → Puppeteer → PDF
- **Extras:** Se aprovado, aplicar estilo nos outros 4 PDFs

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Sage (verde) | `#A8C5A0` | Títulos, ícones, destaques principais |
| Bege | `#F5E6D3` | Fundos de caixas, seções alternadas |
| Rosé | `#E8B4B8` | Acentos, bordas, badges |
| Branco | `#FEFEFE` | Fundo principal |
| Texto escuro | `#3D3D3D` | Corpo do texto |

## Tipografia

- **Títulos:** Playfair Display (Google Fonts)
- **Corpo:** Nunito (Google Fonts)

## Estrutura de Páginas (14 páginas)

### Página 1 — Capa Premium
- Gradiente sage→bege
- Formas geométricas decorativas (círculos, ondas)
- Ícone de folha wellness
- Título: "MAPA DOS GATILHOS DA INFLAMAÇÃO"
- Subtítulo: "Identifique os fatores invisíveis que estão piorando seu intestino"
- Branding: Protocolo Intestino Livre

### Página 2 — Introdução
- Texto curto e motivacional
- Quote inspiracional com aspas decorativas
- Ícone SVG de corpo/bem-estar

### Páginas 3-4 — Os 8 Gatilhos
Cada gatilho em caixa estilizada com:
- Ícone SVG temático
- Título do gatilho
- Lista com bullets modernos (círculos coloridos)
- Mini dica prática em caixa destacada

Gatilhos:
1. Estresse Crônico (ícone: cérebro/raios)
2. Ansiedade (ícone: ondas/pulso)
3. Sono de Baixa Qualidade (ícone: lua/estrelas)
4. Rotina Acelerada (ícone: relógio/corrida)
5. Pouca Hidratação (ícone: gota d'água)
6. Ambiente de Trabalho (ícone: mesa/computador)
7. Hábitos Sociais (ícone: pessoas/grupo)
8. Comportamentos Sabotadores (ícone: alerta/triangulo)

### Página 5-6 — Teste de Perfil (12 perguntas)
- Escala: Nunca (0) / Às vezes (1) / Frequentemente (2) / Sempre (3)
- Layout: Pergunta + 4 opções com círculos para marcação
- Design: Caixas alternadas bege/rosé
- Instruções claras no topo

Perguntas (12):
1. "Sinto que estou sempre correndo ou com pressa" → Estresse
2. "Tenho dificuldade em desligar a mente à noite" → Estresse
3. "Dormo menos de 7 horas por noite" → Sono
4. "Acordo me sentindo cansada, mesmo dormindo" → Sono
5. "Almoço em menos de 15 minutos" → Rotina
6. "Como em pé ou enquanto trabalho" → Rotina
7. "Bebo menos de 1,5L de água por dia" → Hidratação
8. "Substituo água por café ou refrigerante" → Hidratação
9. "Saio com amigos e acabo comendo por impulse" → Social
10. "Sinto culpa depois de comer" → Emocional
11. "Trabalho em ambiente fechado com ar condicionado" → Ambiente
12. "Como na frente da TV ou celular" → Sabotador

### Página 7 — Resultado do Perfil
- Instruções de soma
- Barras de pontuação por gatilho (visual)
- Perfil predominante destacado com badge
- Breve recomendação para cada perfil

Perfis possíveis:
- **Perfil Estresse:** "Seu corpo está em modo sobrevivência"
- **Perfil Sono:** "Seu intestino não consegue se regenerar"
- **Perfil Rotina:** "Sua digestão está sendo sabotada pela pressa"
- **Perfil Hidratação:** "Seu intestino está pedindo água"
- **Perfil Social:** "Seus encontros estão custando caro ao seu intestino"
- **Perfil Emocional:** "Suas emoções estão no controle do seu intestino"
- **Perfil Ambiente:** "Seu local de trabalho é um gatilho invisível"
- **Perfil Sabotador:** "Hábitos inconscientes estão te sabotando"

### Página 8 — Checklist dos Gatilhos
- Caixas ☐ modernas com borda rosé
- 8 gatilhos listados para marcação
- Instrução: "Marque todos os gatilhos que estão presentes na sua vida"
- Design limpo e minimalista

### Página 9 — Escala Visual
- "Como está seu intestino hoje?"
- Escala 1-5 com círculos numerados
- Emojis/barras visuais: Muito leve → Muito estufada
- Escalas para: Inchaço, Gases, Trânsito, Energia, Sono

### Página 10 — Minhas Descobertas
- Área para anotações com linhas guia
- Prompts: "O que mais me surpreendeu foi..."
- "Meu principal gatilho é..."
- "Eu não sabia que..."

### Página 11 — Meus Principais Gatilhos
- 3 caixas numeradas para preencher
- "Meu gatilho #1 é: ___ porque ___"
- "Meu gatilho #2 é: ___ porque ___"
- "Meu gatilho #3 é: ___ porque ___"

### Página 12 — Plano para os Próximos 7 Dias
- Grid semanal (Dom-Sáb)
- Coluna: "O que vou mudar"
- Coluna: "Como vou fazer"
- Ícones para cada dia

### Página 13 — Meu Plano de Transformação
- ✔ Principal problema identificado: ___
- ✔ Principal hábito a melhorar: ___
- ✔ Meta da semana: ___
- ✔ Meu compromisso pessoal: ___
- Design: Caixa premium com borda sage e fundo bege

### Página 14 — Rodapé
- "Protocolo Intestino Livre"
- Aviso: "Todo o conteúdo é educativo. Consulte sempre um profissional de saúde."
- Elementos decorativos de fechamento

## Elementos Visuais

### Ícones SVG (inline)
- Corpo/fitness
- Água/gota
- Comida/alimentação
- Sono/lua
- Estresse/raios
- Caminhada/pessoa
- Relógio/tempo
- Alerta/triangulo
- Lâmpada/dica
- Folha/wellness

### Decoração Geométrica
- Círculos translúcidos
- Ondas suaves
- Linhas diagonais finas
- Pontos decorativos

### Caixas e Cards
- Bordas arredondadas (8px)
- Sombra suave (0 2px 8px rgba(0,0,0,0.08))
- Fundo bege ou rosé claro
- Padding generoso

## Dependências

- `puppeteer` — conversão HTML→PDF
- Google Fonts (Playfair Display, Nunito) — via CDN no HTML
- Ícones SVG — inline no HTML

## Notas Técnicas

- Cada página = um `<div class="page">` com `page-break-after: always`
- Puppeteer config: `format: 'A4', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 }`
- SVGs inline para máxima compatibilidade
- CSS print-friendly com `@media print`
