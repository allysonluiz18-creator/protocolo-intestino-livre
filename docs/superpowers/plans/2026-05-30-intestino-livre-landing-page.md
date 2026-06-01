# Landing Page Intestino Livre - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma landing page de direct response com quiz interativo para o Protocolo Intestino Livre

**Architecture:** HTML/CSS/JS vanilla, mobile-first, sem frameworks. Quiz engine com lógica de pontuação. Design orgânico & natural.

**Tech Stack:** HTML5, CSS3 (custom properties), JavaScript vanilla, Font Awesome (ícones)

---

## Estrutura de Arquivos

```
projeto/
├── index.html              # Página principal (quiz + resultado)
├── oferta.html             # Página de oferta do protocolo
├── css/
│   ├── styles.css          # Estilos globais
│   └── quiz.css            # Estilos do quiz
├── js/
│   ├── quiz.js             # Lógica do quiz
│   └── offer.js            # Lógica da oferta (FAQ accordion)
├── assets/
│   └── images/             # Imagens e mockups
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-30-intestino-livre-landing-page-design.md
```

---

### Task 1: Estrutura HTML Base do Quiz

**Files:**
- Create: `index.html`
- Create: `css/styles.css`

- [ ] **Step 1: Criar index.html com estrutura do quiz**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protocolo Intestino Livre</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="quiz-container" id="quiz">
        <!-- Header -->
        <header class="quiz-header">
            <span class="brand">Protocolo Intestino Livre</span>
        </header>

        <!-- Progress Bar -->
        <div class="progress-section">
            <span class="progress-text" id="progressText">1 de 14</span>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 7.14%"></div>
            </div>
        </div>

        <!-- Quiz Content -->
        <main class="quiz-content" id="quizContent">
            <!-- Perguntas serão inseridas aqui via JS -->
        </main>

        <!-- Footer -->
        <footer class="quiz-footer">
            <p>🔒 100% confidencial • Leva menos de 2 minutos</p>
        </footer>
    </div>

    <script src="js/quiz.js"></script>
</body>
</html>
```

- [ ] **Step 2: Criar css/styles.css com estilos globais**

```css
/* CSS Custom Properties */
:root {
    --color-primary: #2d5016;
    --color-primary-light: #4a7c2e;
    --color-secondary: #a8d5a2;
    --color-bg: #f7f5f0;
    --color-bg-white: #ffffff;
    --color-text: #1a202c;
    --color-text-secondary: #4a5568;
    --color-text-muted: #718096;
    --color-accent: #48bb78;
    --color-border: #e2e8f0;
    --color-option-bg: #ffffff;
    --color-option-border: #cbd5e0;
    --color-option-hover: #48bb78;
    --color-alert: #856404;
    --color-alert-bg: #fff3cd;
    
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
}

/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.5;
    min-height: 100vh;
}

/* Quiz Container */
.quiz-container {
    max-width: 375px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-white);
}

/* Header */
.quiz-header {
    padding: 16px 24px;
    text-align: center;
    border-bottom: 1px solid var(--color-border);
}

.brand {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
}

/* Progress */
.progress-section {
    padding: 16px 24px;
    text-align: center;
}

.progress-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-muted);
    display: block;
    margin-bottom: 8px;
}

.progress-bar {
    width: 100%;
    height: 4px;
    background: var(--color-border);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--color-accent);
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* Quiz Content */
.quiz-content {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
}

/* Footer */
.quiz-footer {
    padding: 16px 24px;
    text-align: center;
    border-top: 1px solid var(--color-border);
}

.quiz-footer p {
    font-size: 12px;
    color: var(--color-text-muted);
}
```

- [ ] **Step 3: Verificar se a página carrega**

Abra `index.html` no navegador.
Expected: Página vazia com header "Protocolo Intestino Livre", barra de progresso e footer.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add base HTML structure and global styles"
```

---

### Task 2: Estrutura do Quiz Engine (JavaScript)

**Files:**
- Create: `js/quiz.js`

- [ ] **Step 1: Criar js/quiz.js com dados das perguntas**

```javascript
// Quiz Data - 14 perguntas identity-based
const quizData = [
    // 1. Identidade
    {
        id: 1,
        type: 'identity',
        question: 'Para entender melhor seus sintomas, me conte:',
        emoji: '👩',
        options: [
            'Tenho entre 20-35 anos',
            'Tenho entre 36-50 anos',
            'Tenho mais de 50 anos'
        ]
    },
    // 2. Sintoma Principal
    {
        id: 2,
        type: 'symptom',
        question: 'Qual é o sintoma que mais te incomoda?',
        emoji: '😣',
        options: [
            'Barriga estufada',
            'Gases excessivos',
            'Intestino preso',
            'Dor abdominal'
        ]
    },
    // 3. Frequência
    {
        id: 3,
        type: 'symptom',
        question: 'Com que frequência você sente inchaço?',
        emoji: '📊',
        options: [
            'Todo dia',
            '3-5 vezes por semana',
            '1-2 vezes por semana',
            'Algumas vezes no mês'
        ]
    },
    // 4. Horário
    {
        id: 4,
        type: 'symptom',
        question: 'Quando o inchaço costuma piorar?',
        emoji: '⏰',
        options: [
            'Depois de almoçar',
            'Depois de jantar',
            'Ao longo do dia todo',
            'Não tenho horário certo'
        ]
    },
    // 5. Alimentação
    {
        id: 5,
        type: 'routine',
        question: 'Você percebe que algum alimento piora seus sintomas?',
        emoji: '🍽️',
        options: [
            'Sim, mas não sei qual',
            'Acho que lactose',
            'Acho que glúten',
            'Não sei identificar'
        ]
    },
    // 6. Água
    {
        id: 6,
        type: 'routine',
        question: 'Quanto de água você bebe por dia?',
        emoji: '💧',
        options: [
            'Menos de 1 litro',
            'Entre 1-2 litros',
            'Mais de 2 litros',
            'Não sei nem quantificar'
        ]
    },
    // 7. Emocional 1
    {
        id: 7,
        type: 'emotional',
        question: 'Como você se sente em relação ao seu corpo?',
        emoji: '😔',
        options: [
            'Incomodada com a barriga',
            'Vergonha de usar roupa apertada',
            'Evito sair por causa disso',
            'Sinto que fracassei em controlar'
        ]
    },
    // 8. Emocional 2
    {
        id: 8,
        type: 'emotional',
        question: 'Isso afeta sua autoestima?',
        emoji: '💔',
        options: [
            'Muito, todos os dias',
            'Às vezes, em situações específicas',
            'Não tanto, mas incomoda',
            'Já me acostumei'
        ]
    },
    // 9. Histórico
    {
        id: 9,
        type: 'history',
        question: 'Você já tentou algum tratamento?',
        emoji: '💊',
        options: [
            'Sim, várias dietas',
            'Sim, laxantes e remédios',
            'Sim, fui em médicos',
            'Nunca tentei nada específico'
        ]
    },
    // 10. Tempo
    {
        id: 10,
        type: 'history',
        question: 'Há quanto tempo você sofre com isso?',
        emoji: '📅',
        options: [
            'Menos de 6 meses',
            'De 6 meses a 1 ano',
            'De 1 a 3 anos',
            'Mais de 3 anos'
        ]
    },
    // 11. Estresse
    {
        id: 11,
        type: 'routine',
        question: 'Como está seu nível de estresse?',
        emoji: '😰',
        options: [
            'Muito estressada',
            'Moderadamente estressada',
            'Pouco estressada',
            'Tranquila'
        ]
    },
    // 12. Sono
    {
        id: 12,
        type: 'routine',
        question: 'Você dorme bem?',
        emoji: '😴',
        options: [
            'Não, tenho insônia',
            'Durmo, mas acordo cansada',
            'Durmo bem',
            'Varia muito'
        ]
    },
    // 13. Desejo
    {
        id: 13,
        type: 'desire',
        question: 'Como seria sua vida sem esses problemas?',
        emoji: '✨',
        options: [
            'Usaria qualquer roupa com confiança',
            'Sairia sem medo de inchar',
            'Comeria sem culpa',
            'Tudo isso junto!'
        ]
    },
    // 14. Compromisso
    {
        id: 14,
        type: 'desire',
        question: 'Você está pronta para uma mudança real?',
        emoji: '💪',
        options: [
            'Sim, muito!',
            'Sim, mas tenho dúvidas',
            'Preciso pensar melhor',
            'Já tentei de tudo'
        ]
    }
];

// Current question index
let currentQuestion = 0;
let answers = [];

// Initialize quiz
function initQuiz() {
    renderQuestion(currentQuestion);
}

// Render question
function renderQuestion(index) {
    const question = quizData[index];
    const quizContent = document.getElementById('quizContent');
    
    quizContent.innerHTML = `
        <div class="question-emoji">${question.emoji}</div>
        <h2 class="question-text">${question.question}</h2>
        <div class="options-container">
            ${question.options.map((option, i) => `
                <button class="option-btn" data-index="${i}" onclick="selectOption(${i})">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    updateProgress();
}

// Select option
function selectOption(index) {
    answers[currentQuestion] = index;
    
    // Add selected class
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    
    // Wait then go to next
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            renderQuestion(currentQuestion);
        } else {
            showResult();
        }
    }, 300);
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${currentQuestion + 1} de ${quizData.length}`;
}

// Show result
function showResult() {
    const quizContent = document.getElementById('quizContent');
    
    // Calculate result (simplified)
    const symptomScore = answers.filter((a, i) => 
        quizData[i].type === 'symptom' && a <= 1
    ).length;
    
    let resultLevel = 'Baixo';
    let resultColor = '#48bb78';
    
    if (symptomScore >= 3) {
        resultLevel = 'Alto';
        resultColor = '#dc3545';
    } else if (symptomScore >= 2) {
        resultLevel = 'Moderado';
        resultColor = '#ffc107';
    }
    
    quizContent.innerHTML = `
        <div class="result-container">
            <div class="result-emoji">🎯</div>
            <h2 class="result-title">Seu Diagnóstico Personalizado</h2>
            <div class="result-badge" style="background: ${resultColor}20; color: ${resultColor}">
                Nível de Alerta: ${resultLevel}
            </div>
            <p class="result-text">
                Identificamos ${symptomScore + 1} gatilhos que podem estar causando seus sintomas.
                Mas existem outros gatilhos ocultos que talvez estejam escondidos.
            </p>
            <button class="cta-btn" onclick="goToOffer()">
                QUERO DESCOBRIR OS GATILHOS OCULTOS
            </button>
        </div>
    `;
    
    // Hide progress
    document.querySelector('.progress-section').style.display = 'none';
}

// Go to offer page
function goToOffer() {
    window.location.href = 'oferta.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', initQuiz);
```

- [ ] **Step 2: Adicionar estilos do quiz em css/styles.css**

```css
/* Quiz Questions */
.question-emoji {
    font-size: 48px;
    text-align: center;
    margin-bottom: 16px;
}

.question-text {
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text);
    text-align: center;
    margin-bottom: 32px;
    line-height: 1.3;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.option-btn {
    width: 100%;
    padding: 16px 20px;
    background: var(--color-option-bg);
    border: 2px solid var(--color-option-border);
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
}

.option-btn:hover {
    border-color: var(--color-option-hover);
    transform: translateY(-2px);
}

.option-btn.selected {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
}

/* Result */
.result-container {
    text-align: center;
    padding: 20px 0;
}

.result-emoji {
    font-size: 64px;
    margin-bottom: 16px;
}

.result-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 16px;
}

.result-badge {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 16px;
}

.result-text {
    font-size: 16px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 24px;
}

.cta-btn {
    width: 100%;
    padding: 16px 24px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.cta-btn:hover {
    background: var(--color-primary-light);
}
```

- [ ] **Step 3: Testar o quiz no navegador**

Abra `index.html` e responda todas as perguntas.
Expected: Quiz avança, mostra resultado, botão CTA funciona.

- [ ] **Step 4: Commit**

```bash
git add js/quiz.js css/styles.css
git commit -m "feat: add quiz engine with 14 questions and result"
```

---

### Task 3: Página de Oferta - HTML

**Files:**
- Create: `oferta.html`

- [ ] **Step 1: Criar oferta.html com estrutura completa**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protocolo Intestino Livre - Oferta</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/offer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="offer-container">
        <!-- Header -->
        <header class="offer-header">
            <span class="brand">PROTOCOLO INTESTINO LIVRE</span>
        </header>

        <!-- Headline -->
        <section class="headline-section">
            <h1>Seu intestino está tentando dar sinais. Descubra os erros que podem estar causando inchaço, gases e prisão de ventre todos os dias.</h1>
        </section>

        <!-- Identificação -->
        <section class="identification-section">
            <h2>Você se identifica com isso?</h2>
            <div class="checklist">
                <label class="check-item"><input type="checkbox"> Barriga estufada mesmo sem comer muito</label>
                <label class="check-item"><input type="checkbox"> Sensação de peso após as refeições</label>
                <label class="check-item"><input type="checkbox"> Intestino que funciona um dia e trava no outro</label>
                <label class="check-item"><input type="checkbox"> Gases frequentes</label>
                <label class="check-item"><input type="checkbox"> Roupa apertando ao final do dia</label>
                <label class="check-item"><input type="checkbox"> Sensação de não esvaziar completamente</label>
            </div>
            <p class="check-message">Se marcou 2 ou mais opções, o protocolo foi criado para você.</p>
        </section>

        <!-- Depoimentos -->
        <section class="testimonials-section">
            <h2>✨ O que dizem nossas alunas</h2>
            <div class="testimonial-card">
                <div class="testimonial-avatar">👩</div>
                <p class="testimonial-text">"Em 2 semanas menos estufamento e muito mais leveza!"</p>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-avatar">👩</div>
                <p class="testimonial-text">"Finalmente meu intestino voltou a funcionar todo dia!"</p>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-avatar">👩</div>
                <p class="testimonial-text">"Perdi 3kg de inchaço em 1 mês!"</p>
            </div>
        </section>

        <!-- O que vai receber -->
        <section class="deliverables-section">
            <h2>📋 O que você vai receber</h2>
            <div class="deliverable-item">
                <div class="deliverable-icon">🗺️</div>
                <div class="deliverable-content">
                    <h3>Mapa dos Gatilhos da Inflamação</h3>
                    <p>Descubra quais hábitos, alimentos e situações podem estar agravando seus sintomas.</p>
                </div>
            </div>
            <div class="deliverable-item">
                <div class="deliverable-icon">📅</div>
                <div class="deliverable-content">
                    <h3>Método Intestino Livre 7 Dias</h3>
                    <p>Passo a passo simples para reorganizar sua rotina intestinal.</p>
                </div>
            </div>
            <div class="deliverable-item">
                <div class="deliverable-icon">🥦</div>
                <div class="deliverable-content">
                    <h3>Guia dos Alimentos Amigos do Intestino</h3>
                    <p>Lista prática do que priorizar e do que reduzir.</p>
                </div>
            </div>
            <div class="deliverable-item">
                <div class="deliverable-icon">✅</div>
                <div class="deliverable-content">
                    <h3>Checklist Diário da Regularidade</h3>
                    <p>Rotina de acompanhamento em menos de 3 minutos por dia.</p>
                </div>
            </div>
        </section>

        <!-- Bônus -->
        <section class="bonus-section">
            <h2>🎁 Bônus Especial</h2>
            <div class="bonus-item">
                <div class="bonus-icon">🎬</div>
                <div class="bonus-content">
                    <h3>Aula Extra: Receitas Anti-inflamatórias</h3>
                    <p>Valor: R$47 - <strong>GRÁTIS</strong></p>
                </div>
            </div>
            <div class="bonus-item highlight">
                <div class="bonus-icon">🚨</div>
                <div class="bonus-content">
                    <h3>Lista dos 15 alimentos que mais causam inchaço</h3>
                    <p>Sem você perceber - <strong>GRÁTIS</strong></p>
                </div>
            </div>
        </section>

        <!-- Mockups -->
        <section class="mockups-section">
            <h2>📱 Veja como ficam os materiais</h2>
            <div class="mockups-container">
                <div class="mockup-phone">
                    <div class="phone-content">
                        <div class="phone-title"></div>
                        <div class="phone-line"></div>
                        <div class="phone-line short"></div>
                    </div>
                </div>
                <div class="mockup-phone offset">
                    <div class="phone-content">
                        <div class="phone-title green"></div>
                        <div class="phone-line"></div>
                        <div class="phone-line short"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Preço -->
        <section class="price-section">
            <h2>💰 Investimento que cabe no seu bolso</h2>
            <div class="price-box">
                <span class="price-old">De R$97</span>
                <span class="price-current">R$37</span>
                <span class="price-period">/mês</span>
                <span class="price-installment">ou 12x de R$3,70</span>
            </div>
            <button class="cta-main">QUERO COMEÇAR MEU PROTOCOLO INTESTINO LIVRE</button>
            <p class="payment-info">🔒 Pagamento seguro via Pix ou cartão</p>
        </section>

        <!-- Garantia -->
        <section class="guarantee-section">
            <div class="guarantee-icon">🛡️</div>
            <h3>Garantia de 7 Dias</h3>
            <p>Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.</p>
        </section>

        <!-- FAQ -->
        <section class="faq-section">
            <h2>❓ Perguntas Frequentes</h2>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Preciso mudar toda minha alimentação?
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>Não! O protocolo ensina pequenas mudanças que fazem grande diferença. Você não precisa eliminar tudo, apenas identificar e reduzir os gatilhos.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Quanto tempo leva para colocar o protocolo em prática?
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>O Método 7 Dias foi pensado para ser simples. Em 1 semana você já terá uma nova rotina instalada.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Posso seguir mesmo tomando medicamentos?
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>Sim! O protocolo é complementar. Mas sempre consulte seu médico para ajustes.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    E se eu não gostar?
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100%.</p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="offer-footer">
            <p>© 2026 Protocolo Intestino Livre. Todos os direitos reservados.</p>
        </footer>
    </div>

    <script src="js/offer.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add oferta.html
git commit -m "feat: add offer page HTML structure"
```

---

### Task 4: Estilos da Página de Oferta

**Files:**
- Create: `css/offer.css`

- [ ] **Step 1: Criar css/offer.css**

```css
/* Offer Page Styles */
.offer-container {
    max-width: 375px;
    margin: 0 auto;
    background: var(--color-bg-white);
}

.offer-header {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    padding: 16px 20px;
    text-align: center;
}

.offer-header .brand {
    color: white;
    font-size: 14px;
    letter-spacing: 1px;
}

/* Headline */
.headline-section {
    padding: 24px 20px;
    background: var(--color-bg);
    text-align: center;
}

.headline-section h1 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1.4;
}

/* Identification */
.identification-section {
    padding: 20px;
    background: white;
}

.identification-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
    text-align: center;
}

.checklist {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.check-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--color-bg);
    border-radius: var(--radius-sm);
    font-size: 14px;
    color: var(--color-text);
    cursor: pointer;
}

.check-item input {
    width: 20px;
    height: 20px;
    accent-color: var(--color-primary);
}

.check-message {
    margin-top: 16px;
    padding: 12px;
    background: var(--color-accent);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-align: center;
}

/* Testimonials */
.testimonials-section {
    padding: 20px;
    background: white;
}

.testimonials-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
    text-align: center;
}

.testimonial-card {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: var(--color-bg);
    border-radius: var(--radius-sm);
    margin-bottom: 8px;
}

.testimonial-avatar {
    width: 40px;
    height: 40px;
    background: var(--color-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.testimonial-text {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
}

/* Deliverables */
.deliverables-section {
    padding: 20px;
    background: white;
}

.deliverables-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
    text-align: center;
}

.deliverable-item {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

.deliverable-icon {
    width: 48px;
    height: 48px;
    background: var(--color-bg);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
}

.deliverable-content h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
}

.deliverable-content p {
    font-size: 12px;
    color: var(--color-text-muted);
}

/* Bonus */
.bonus-section {
    padding: 20px;
    background: var(--color-alert-bg);
}

.bonus-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-alert);
    margin-bottom: 16px;
    text-align: center;
}

.bonus-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: white;
    border-radius: var(--radius-sm);
    border: 2px dashed var(--color-alert);
    margin-bottom: 8px;
}

.bonus-item.highlight {
    background: #fff3cd;
}

.bonus-icon {
    font-size: 24px;
}

.bonus-content h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
}

.bonus-content p {
    font-size: 12px;
    color: var(--color-text-muted);
}

/* Mockups */
.mockups-section {
    padding: 20px;
    background: var(--color-bg);
    text-align: center;
}

.mockups-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
}

.mockups-container {
    display: flex;
    justify-content: center;
    position: relative;
}

.mockup-phone {
    width: 140px;
    height: 250px;
    background: white;
    border-radius: 16px;
    border: 2px solid var(--color-border);
    padding: 12px;
    box-shadow: var(--shadow-md);
    position: relative;
    z-index: 2;
}

.mockup-phone.offset {
    margin-left: -40px;
    z-index: 1;
}

.phone-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.phone-title {
    height: 8px;
    width: 60%;
    background: var(--color-primary);
    border-radius: 4px;
    margin: 8px auto 0;
}

.phone-title.green {
    background: var(--color-accent);
}

.phone-line {
    height: 6px;
    background: var(--color-border);
    border-radius: 3px;
}

.phone-line.short {
    width: 70%;
}

/* Price */
.price-section {
    padding: 24px 20px;
    background: white;
    text-align: center;
}

.price-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
}

.price-box {
    background: var(--color-bg);
    border-radius: var(--radius-md);
    padding: 20px;
    margin-bottom: 16px;
}

.price-old {
    display: block;
    font-size: 14px;
    color: var(--color-text-muted);
    text-decoration: line-through;
    margin-bottom: 4px;
}

.price-current {
    display: block;
    font-size: 48px;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
}

.price-period {
    font-size: 16px;
    color: var(--color-text-muted);
}

.price-installment {
    display: block;
    font-size: 14px;
    color: var(--color-accent);
    margin-top: 8px;
}

.cta-main {
    width: 100%;
    padding: 16px 24px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.cta-main:hover {
    background: var(--color-primary-light);
}

.payment-info {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-top: 12px;
}

/* Guarantee */
.guarantee-section {
    padding: 24px 20px;
    background: var(--color-bg);
    text-align: center;
}

.guarantee-icon {
    font-size: 48px;
    margin-bottom: 12px;
}

.guarantee-section h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 8px;
}

.guarantee-section p {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
}

/* FAQ */
.faq-section {
    padding: 20px;
    background: white;
}

.faq-section h2 {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
    text-align: center;
}

.faq-item {
    border-bottom: 1px solid var(--color-border);
}

.faq-question {
    width: 100%;
    padding: 16px 0;
    background: none;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    text-align: left;
}

.faq-question i {
    transition: transform 0.3s ease;
}

.faq-question.active i {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.faq-answer p {
    padding: 0 0 16px;
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.5;
}

/* Footer */
.offer-footer {
    padding: 16px 20px;
    background: var(--color-bg);
    text-align: center;
}

.offer-footer p {
    font-size: 11px;
    color: var(--color-text-muted);
}
```

- [ ] **Step 2: Testar a página de oferta**

Abra `oferta.html` no navegador.
Expected: Página completa com todas as seções, FAQ funciona.

- [ ] **Step 3: Commit**

```bash
git add css/offer.css
git commit -m "feat: add offer page styles"
```

---

### Task 5: JavaScript da Oferta (FAQ Accordion)

**Files:**
- Create: `js/offer.js`

- [ ] **Step 1: Criar js/offer.js**

```javascript
// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = '0';
    }
}

// Checklist counter
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-item input');
    const message = document.querySelector('.check-message');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checked = document.querySelectorAll('.check-item input:checked').length;
            
            if (checked >= 2) {
                message.style.display = 'block';
            } else {
                message.style.display = 'none';
            }
        });
    });
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-main');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Redirect to checkout (placeholder)
            alert('Redirecionando para o checkout...');
        });
    }
});
```

- [ ] **Step 2: Testar FAQ e Checklist**

Abra `oferta.html`, clique nas perguntas do FAQ e marque checkboxes.
Expected: FAQ expande/recolhe, mensagem aparece com 2+ checkboxes.

- [ ] **Step 3: Commit**

```bash
git add js/offer.js
git commit -m "feat: add FAQ accordion and checklist logic"
```

---

### Task 6: Responsividade Mobile

**Files:**
- Modify: `css/styles.css`
- Modify: `css/offer.css`

- [ ] **Step 1: Adicionar media queries em styles.css**

```css
/* Tablet */
@media (min-width: 768px) {
    .quiz-container {
        max-width: 480px;
        box-shadow: var(--shadow-md);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .quiz-container {
        max-width: 420px;
        margin-top: 40px;
        border-radius: var(--radius-lg);
        min-height: calc(100vh - 80px);
    }
}
```

- [ ] **Step 2: Adicionar media queries em offer.css**

```css
/* Tablet */
@media (min-width: 768px) {
    .offer-container {
        max-width: 480px;
        box-shadow: var(--shadow-md);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .offer-container {
        max-width: 420px;
        margin: 40px auto;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }
}
```

- [ ] **Step 3: Testar em diferentes tamanhos**

Redimensione o navegador e teste em mobile (DevTools).
Expected: Layout se adapta corretamente.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css css/offer.css
git commit -m "feat: add responsive breakpoints for tablet and desktop"
```

---

## Resumo das Tasks

| Task | Descrição | Arquivos |
|------|-----------|----------|
| 1 | Estrutura HTML base do Quiz | `index.html`, `css/styles.css` |
| 2 | Quiz Engine (JavaScript) | `js/quiz.js` |
| 3 | Página de Oferta HTML | `oferta.html` |
| 4 | Estilos da Oferta | `css/offer.css` |
| 5 | JavaScript da Oferta | `js/offer.js` |
| 6 | Responsividade Mobile | `css/styles.css`, `css/offer.css` |

---

## Próximos Passos (Fora deste plano)

1. Integrar pagamento (Stripe/Pix)
2. Configurar analytics
3. Testes A/B
4. Lançar tráfego