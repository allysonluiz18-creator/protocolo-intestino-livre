# PDF Premium — Protocolo Intestino Livre Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um protótipo premium do PDF "Mapa dos Gatilhos da Inflamação" com design moderno, feminino e interativo usando HTML/CSS + Puppeteer.

**Architecture:** Gerar um arquivo HTML completo com CSS moderno (gradientes, flexbox, grid, sombras) e ícones SVG inline, depois converter para PDF de alta qualidade com Puppeteer. Cada página = um div com page-break-after.

**Tech Stack:** Node.js, Puppeteer, HTML5, CSS3 (Google Fonts via CDN), SVG inline

---

## File Structure

```
pdf-premium/
├── gerar-pdf-premium.js    # Script principal: HTML → Puppeteer → PDF
├── template.html           # Template HTML com todo o conteúdo e CSS
└── (output) ../pdfs-gerados/01-Mapa-dos-Gatilhos-da-Inflamacao-Premium.pdf
```

- `gerar-pdf-premium.js` — Puppeteer config, gera PDF, 50-80 linhas
- `template.html` — HTML completo com 14 páginas, CSS inline, SVGs inline, ~800-1200 linhas

---

### Task 1: Instalar Puppeteer e criar estrutura

**Files:**
- Create: `pdf-premium/gerar-pdf-premium.js` (esqueleto)
- Modify: `package.json` (adicionar script)

- [ ] **Step 1: Instalar Puppeteer**

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm install puppeteer
```

- [ ] **Step 2: Criar diretório pdf-premium**

```powershell
New-Item -ItemType Directory -Path "pdf-premium" -Force
```

- [ ] **Step 3: Criar esqueleto do gerador**

```javascript
// pdf-premium/gerar-pdf-premium.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function gerarPDF() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, 'template.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const outputPath = path.join(__dirname, '..', 'pdfs-gerados', '01-Mapa-dos-Gatilhos-da-Inflamacao-Premium.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' }
  });
  
  await browser.close();
  console.log(`✅ PDF gerado: ${outputPath}`);
}

gerarPDF().catch(console.error);
```

- [ ] **Step 4: Testar se Puppeteer funciona**

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; node pdf-premium/gerar-pdf-premium.js
```

Expected: Erro "template.html not found" (OK, arquivo ainda não existe)

---

### Task 2: Criar template HTML — Estrutura base e CSS

**Files:**
- Create: `pdf-premium/template.html`

- [ ] **Step 1: Criar HTML com CSS base e variáveis de cor**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --sage: #A8C5A0;
      --sage-light: #C8E0C2;
      --sage-dark: #7DA676;
      --bege: #F5E6D3;
      --bege-light: #FAF3EC;
      --rose: #E8B4B8;
      --rose-light: #F5D5D8;
      --branco: #FEFEFE;
      --texto: #3D3D3D;
      --texto-light: #6B6B6B;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Nunito', sans-serif;
      color: var(--texto);
      background: var(--branco);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 0;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: auto;
    }

    h1, h2, h3 {
      font-family: 'Playfair Display', serif;
    }

    /* Capa */
    .capa {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, var(--sage) 0%, var(--bege) 50%, var(--rose-light) 100%);
      color: white;
      padding: 40px;
    }

    .capa h1 {
      font-size: 38px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .capa .subtitle {
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .capa .branding {
      font-size: 14px;
      letter-spacing: 3px;
      text-transform: uppercase;
      opacity: 0.8;
      margin-top: 60px;
    }

    /* Decorative elements */
    .deco-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
    }

    .deco-circle-1 {
      width: 300px;
      height: 300px;
      background: white;
      top: -100px;
      right: -80px;
    }

    .deco-circle-2 {
      width: 200px;
      height: 200px;
      background: var(--rose);
      bottom: -60px;
      left: -40px;
    }

    .deco-circle-3 {
      width: 150px;
      height: 150px;
      background: white;
      bottom: 100px;
      right: 40px;
    }

    /* Content pages */
    .content-page {
      padding: 50px;
      background: var(--branco);
    }

    .section-title {
      font-size: 24px;
      color: var(--sage-dark);
      margin-bottom: 8px;
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 60px;
      height: 3px;
      background: var(--rose);
      border-radius: 2px;
    }

    /* Cards */
    .card {
      background: var(--bege-light);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      border-left: 4px solid var(--sage);
    }

    .card-rose {
      background: var(--rose-light);
      border-left-color: var(--rose);
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: var(--sage-dark);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-icon {
      width: 32px;
      height: 32px;
      fill: var(--sage);
    }

    .card ul {
      list-style: none;
      padding: 0;
    }

    .card li {
      padding: 6px 0;
      padding-left: 20px;
      position: relative;
      font-size: 14px;
      line-height: 1.5;
    }

    .card li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--sage);
    }

    /* Tip box */
    .tip-box {
      background: linear-gradient(135deg, var(--sage-light) 0%, var(--sage) 100%);
      color: white;
      border-radius: 12px;
      padding: 20px;
      margin-top: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .tip-box .tip-icon {
      width: 24px;
      height: 24px;
      fill: white;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .tip-box p {
      font-size: 13px;
      line-height: 1.5;
    }

    .tip-label {
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    /* Test section */
    .test-question {
      background: var(--bege-light);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 16px;
    }

    .test-question:nth-child(even) {
      background: var(--rose-light);
    }

    .question-text {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--texto);
    }

    .options {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    .option-circle {
      width: 24px;
      height: 24px;
      border: 2px solid var(--sage);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: var(--sage-dark);
      flex-shrink: 0;
    }

    /* Checklist */
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: var(--bege-light);
      border-radius: 10px;
      margin-bottom: 12px;
    }

    .checkbox {
      width: 28px;
      height: 28px;
      border: 2px solid var(--rose);
      border-radius: 6px;
      flex-shrink: 0;
    }

    .checklist-text {
      font-size: 15px;
      flex: 1;
    }

    /* Scale */
    .scale-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
      padding: 16px;
      background: var(--bege-light);
      border-radius: 10px;
    }

    .scale-label {
      width: 120px;
      font-weight: 600;
      font-size: 14px;
      color: var(--sage-dark);
    }

    .scale-numbers {
      display: flex;
      gap: 12px;
      flex: 1;
      justify-content: center;
    }

    .scale-num {
      width: 36px;
      height: 36px;
      border: 2px solid var(--sage);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      color: var(--sage-dark);
    }

    .scale-ends {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 11px;
      color: var(--texto-light);
      margin-top: 4px;
    }

    /* Notes area */
    .notes-area {
      border: 2px dashed var(--sage);
      border-radius: 12px;
      padding: 24px;
      min-height: 120px;
      background: var(--bege-light);
    }

    .notes-line {
      border-bottom: 1px solid #ddd;
      height: 32px;
      margin-bottom: 8px;
    }

    /* Transformation plan */
    .transform-box {
      background: linear-gradient(135deg, var(--bege) 0%, var(--bege-light) 100%);
      border: 2px solid var(--sage);
      border-radius: 16px;
      padding: 32px;
      margin-top: 20px;
    }

    .transform-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }

    .transform-check {
      width: 24px;
      height: 24px;
      background: var(--sage);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .transform-check svg {
      width: 14px;
      height: 14px;
      fill: white;
    }

    .transform-label {
      font-weight: 700;
      color: var(--sage-dark);
      margin-bottom: 4px;
    }

    .transform-line {
      border-bottom: 1px solid var(--sage);
      height: 24px;
      margin-top: 8px;
    }

    /* Result bars */
    .result-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .result-label {
      width: 140px;
      font-size: 13px;
      font-weight: 600;
      color: var(--texto);
    }

    .bar-container {
      flex: 1;
      height: 24px;
      background: var(--bege);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--sage) 0%, var(--sage-dark) 100%);
      border-radius: 12px;
      transition: width 0.3s;
    }

    .bar-score {
      width: 40px;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: var(--sage-dark);
    }

    /* Badge */
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      margin: 16px 0;
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 40px;
      color: var(--texto-light);
      font-size: 12px;
    }

    /* Quote */
    .quote {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-style: italic;
      color: var(--sage-dark);
      text-align: center;
      padding: 30px;
      position: relative;
    }

    .quote::before {
      content: '"';
      font-size: 60px;
      color: var(--rose);
      position: absolute;
      top: -10px;
      left: 20px;
      opacity: 0.5;
    }

    /* Grid weekly */
    .weekly-grid {
      display: grid;
      grid-template-columns: 80px 1fr 1fr;
      gap: 8px;
    }

    .grid-header {
      background: var(--sage);
      color: white;
      padding: 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 12px;
      text-align: center;
    }

    .grid-cell {
      background: var(--bege-light);
      padding: 12px;
      border-radius: 6px;
      min-height: 60px;
      font-size: 12px;
    }

    .grid-day {
      background: var(--rose-light);
      padding: 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 12px;
      text-align: center;
      color: var(--sage-dark);
    }
  </style>
</head>
<body>
```

- [ ] **Step 2: Verificar se o HTML abre no navegador (teste visual)**

Abrir `template.html` no navegador — deve mostrar página em branco com fundo branco.

---

### Task 3: Criar template HTML — Capa Premium (Página 1)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página de capa**

Inserir após `</style>` e antes de `</head>` (fechar style), e adicionar conteúdo do body:

```html
<!-- PÁGINA 1: CAPA -->
<div class="page capa">
  <div class="deco-circle deco-circle-1"></div>
  <div class="deco-circle deco-circle-2"></div>
  <div class="deco-circle deco-circle-3"></div>
  
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style="margin-bottom: 30px;">
    <circle cx="40" cy="40" r="38" stroke="white" stroke-width="2" opacity="0.3"/>
    <path d="M40 15 C25 25, 20 40, 25 55 C30 65, 35 70, 40 72 C45 70, 50 65, 55 55 C60 40, 55 25, 40 15Z" fill="white" opacity="0.9"/>
    <path d="M40 25 C35 32, 33 42, 36 52 M40 25 C45 32, 47 42, 44 52" stroke="rgba(168,197,160,0.6)" stroke-width="1.5" fill="none"/>
  </svg>
  
  <h1>MAPA DOS GATILHOS<br>DA INFLAMAÇÃO</h1>
  <p class="subtitle">Identifique os fatores invisíveis que estão<br>piorando seu intestino</p>
  
  <p class="branding">PROTOCOLO INTESTINO LIVRE</p>
</div>
```

---

### Task 4: Criar template HTML — Introdução (Página 2)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página de introdução**

```html
<!-- PÁGINA 2: INTRODUÇÃO -->
<div class="page content-page">
  <div class="deco-circle" style="width:200px;height:200px;background:var(--sage);opacity:0.08;top:-50px;right:-50px;"></div>
  
  <h2 class="section-title">Você sabia?</h2>
  <br>
  <p style="font-size:16px;line-height:1.8;margin-bottom:24px;">
    O seu intestino não funciona sozinho. Ele é profundamente influenciado pelo que você sente, 
    pelo que come, pela forma como dorme e até pelo ambiente em que vive.
  </p>
  <p style="font-size:16px;line-height:1.8;margin-bottom:32px;">
    Muitas vezes, o inchaço, os gases e o intestino preso não são causados apenas pela comida — 
    mas por <strong>gatilhos invisíveis</strong> que passam despercebidos no dia a dia.
  </p>
  
  <div class="quote">
    Ao identificar os gatilhos, você recupera o poder de escolher como se sentir.
  </div>
  
  <div class="tip-box" style="margin-top:40px;">
    <svg class="tip-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <div>
      <p class="tip-label">Como usar este material</p>
      <p>Leia cada gatilho com atenção. No final, responda o teste de perfil e descubra quais gatilhos mais afetam você. Use as páginas de anotações para registrar suas descobertas.</p>
    </div>
  </div>
</div>
```

---

### Task 5: Criar template HTML — Os 8 Gatilhos (Páginas 3-4)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página 3 com os 4 primeiros gatilhos**

```html
<!-- PÁGINA 3: GATILHOS 1-4 -->
<div class="page content-page">
  <h2 class="section-title">Os 8 Gatilhos da Inflamação</h2>
  <br>
  
  <div class="card">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      1. Estresse Crônico
    </h3>
    <ul>
      <li>O estresse constante libera cortisol, que desregula o intestino</li>
      <li>Causa retenção de líquidos na região abdominal</li>
      <li>Reduz a capacidade digestiva do corpo</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Reserve 5 minutos por dia para respiração profunda. Inspire por 4 segundos, segure por 4 e expire por 6.</p>
      </div>
    </div>
  </div>

  <div class="card card-rose">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      2. Ansiedade
    </h3>
    <ul>
      <li>Alimenta o ciclo de compulsão e culpa</li>
      <li>O corpo entra em modo de sobrevivência</li>
      <li>Prioriza o armazenamento de gordura na barriga</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Antes de cada refeição, faça 3 respirações longas. Isso sinaliza ao corpo que é hora de digerir.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
      3. Sono de Baixa Qualidade
    </h3>
    <ul>
      <li>O corpo regenera o intestino durante o sono profundo</li>
      <li>Dormir mal mantém a inflamação ativa</li>
      <li>Aumenta o cortisol e a vontade de doces</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Desligue telas 1 hora antes de dormir. Substitua por leitura, banho morno ou alongamento leve.</p>
      </div>
    </div>
  </div>

  <div class="card card-rose">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
      4. Rotina Acelerada
    </h3>
    <ul>
      <li>Comer rápido impede a absorção de nutrientes</li>
      <li>A digestão é uma das primeiras prejudicadas</li>
      <li>Causa aerofagia e estufamento</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Reserve no mínimo 20 minutos para cada refeição. Sente-se, mastigue devagar e preste atenção.</p>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Adicionar página 4 com os 4 últimos gatilhos**

```html
<!-- PÁGINA 4: GATILHOS 5-8 -->
<div class="page content-page">
  <div class="card">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/></svg>
      5. Pouca Hidratação
    </h3>
    <ul>
      <li>A água é essencial para o intestino funcionar</li>
      <li>Sem hidratação, as fezes ficam mais duras</li>
      <li>O trânsito intestinal desacelera</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Beba um copo de água morna com limão ao acordar. Isso ativa o intestino e prepara o corpo.</p>
      </div>
    </div>
  </div>

  <div class="card card-rose">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
      6. Ambiente de Trabalho
    </h3>
    <ul>
      <li>Ar condicionado excessivo prejudica a digestão</li>
      <li>Sentar por longos períodos desacelera o intestino</li>
      <li>Pouca luz natural afeta o ritmo circadiano</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Levante-se a cada hora e faça 5 minutos de caminhada ou alongamento.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
      7. Hábitos Sociais
    </h3>
    <ul>
      <li>Encontros envolvem comidas que inflamam</li>
      <li>Excesso de álcool desregula o trânsito</li>
      <li>Comer por pressão social é comum</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Vá ao encontro, mas coma antes de ir. Assim você faz escolhas mais conscientes.</p>
      </div>
    </div>
  </div>

  <div class="card card-rose">
    <h3 class="card-title">
      <svg class="card-icon" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
      8. Comportamentos Sabotadores
    </h3>
    <ul>
      <li>Comer na frente da TV ou celular</li>
      <li>Dieta da balança (restrição extrema)</li>
      <li>Auto medicação com laxantes</li>
      <li>Ignorar a vontade de ir ao banheiro</li>
    </ul>
    <div class="tip-box">
      <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
      <div>
        <p class="tip-label">Dica Prática</p>
        <p>Observe seus hábitos por 3 dias. Anote o que come, quando come e como se sente depois.</p>
      </div>
    </div>
  </div>
</div>
```

---

### Task 6: Criar template HTML — Teste de Perfil (Páginas 5-6)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página 5 com perguntas 1-6**

```html
<!-- PÁGINA 5: TESTE DE PERIL (PERGUNTAS 1-6) -->
<div class="page content-page">
  <h2 class="section-title">Teste: Qual é o seu Gatilho?</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Responda cada pergunta marcando a opção que melhor descreve sua rotina. 
    Ao final, some os pontos de cada categoria.
  </p>
  <p style="font-size:12px;color:var(--rose);font-weight:600;margin-bottom:20px;">
    Nunca = 0 ponto | Às vezes = 1 ponto | Frequentemente = 2 pontos | Sempre = 3 pontos
  </p>

  <div class="test-question">
    <p class="question-text">1. Sinto que estou sempre correndo ou com pressa</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">2. Tenho dificuldade em desligar a mente à noite</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">3. Dormo menos de 7 horas por noite</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">4. Acordo me sentindo cansada, mesmo dormindo</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">5. Almoço em menos de 15 minutos</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">6. Como em pé ou enquanto trabalho</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Adicionar página 6 com perguntas 7-12**

```html
<!-- PÁGINA 6: TESTE DE PERIL (PERGUNTAS 7-12) -->
<div class="page content-page">
  <div class="test-question">
    <p class="question-text">7. Bebo menos de 1,5L de água por dia</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">8. Substituo água por café ou refrigerante</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">9. Saio com amigos e acabo comendo por impulso</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">10. Sinto culpa depois de comer</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">11. Trabalho em ambiente fechado com ar condicionado</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div class="test-question">
    <p class="question-text">12. Como na frente da TV ou celular</p>
    <div class="options">
      <div class="option"><div class="option-circle">0</div> Nunca</div>
      <div class="option"><div class="option-circle">1</div> Às vezes</div>
      <div class="option"><div class="option-circle">2</div> Frequentemente</div>
      <div class="option"><div class="option-circle">3</div> Sempre</div>
    </div>
  </div>

  <div style="margin-top:24px;padding:20px;background:var(--bege-light);border-radius:12px;">
    <p style="font-weight:700;color:var(--sage-dark);margin-bottom:8px;">Como calcular seu resultado:</p>
    <p style="font-size:13px;line-height:1.6;">
      Some os pontos de cada pergunta. As perguntas 1-2 = Estresse. 3-4 = Sono. 5-6 = Rotina. 
      7-8 = Hidratação. 9 = Social. 10 = Emocional. 11 = Ambiente. 12 = Sabotador.
      <br><br>
      <strong>Categoria com maior pontuação = seu perfil predominante.</strong>
    </p>
  </div>
</div>
```

---

### Task 7: Criar template HTML — Resultado do Perfil (Página 7)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página de resultado com barras visuais**

```html
<!-- PÁGINA 7: RESULTADO DO PERIL -->
<div class="page content-page">
  <h2 class="section-title">Seu Resultado</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Preencha as barras de acordo com sua pontuação em cada categoria (máximo 6 pontos).
  </p>

  <div class="result-bar">
    <span class="result-label">Estresse</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Sono</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Rotina</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Hidratação</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Social</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Emocional</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Ambiente</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>
  <div class="result-bar">
    <span class="result-label">Sabotador</span>
    <div class="bar-container"><div class="bar-fill" style="width:0%"></div></div>
    <span class="bar-score">___</span>
  </div>

  <div style="margin-top:32px;">
    <p style="font-weight:700;color:var(--sage-dark);font-size:16px;margin-bottom:16px;">Meu Perfil Predominante:</p>
    <div class="badge">_________________________</div>
    <p style="font-size:13px;color:var(--texto-light);margin-top:12px;">
      Escreva acima o nome do gatilho com maior pontuação e leia a descrição abaixo:
    </p>
  </div>

  <div style="margin-top:24px;font-size:12px;line-height:1.8;color:var(--texto-light);">
    <p><strong>Perfil Estresse:</strong> "Seu corpo está em modo sobrevivência"</p>
    <p><strong>Perfil Sono:</strong> "Seu intestino não consegue se regenerar"</p>
    <p><strong>Perfil Rotina:</strong> "Sua digestão está sendo sabotada pela pressa"</p>
    <p><strong>Perfil Hidratação:</strong> "Seu intestino está pedindo água"</p>
    <p><strong>Perfil Social:</strong> "Seus encontros estão custando caro ao seu intestino"</p>
    <p><strong>Perfil Emocional:</strong> "Suas emoções estão no controle do seu intestino"</p>
    <p><strong>Perfil Ambiente:</strong> "Seu local de trabalho é um gatilho invisível"</p>
    <p><strong>Perfil Sabotador:</strong> "Hábitos inconscientes estão te sabotando"</p>
  </div>
</div>
```

---

### Task 8: Criar template HTML — Checklist e Escala Visual (Páginas 8-9)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página 8 — Checklist**

```html
<!-- PÁGINA 8: CHECKLIST -->
<div class="page content-page">
  <h2 class="section-title">Checklist dos Gatilhos</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Marque todos os gatilhos que estão presentes na sua vida. Seja honesta consigo mesma.
  </p>

  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Estresse crônico — sinto que estou sempre correndo</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Ansiedade — dificuldade em desligar a mente</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Sono ruim — durmo pouco ou acordo cansada</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Rotina acelerada — como rápido e sem prestar atenção</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Pouca hidratação — bebo pouca água</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Ambiente de trabalho — fechado, com ar condicionado</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Hábitos sociais — encontros com comidas que inflamam</span>
  </div>
  <div class="checklist-item">
    <div class="checkbox"></div>
    <span class="checklist-text">Comportamentos sabotadores — como na frente da TV, auto medicação</span>
  </div>

  <div class="tip-box" style="margin-top:32px;">
    <svg class="tip-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
    <div>
      <p class="tip-label">Não se julgue</p>
      <p>Marcar gatilhos não é se condenar — é se libertar. O autoconhecimento é o primeiro passo para a mudança.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Adicionar página 9 — Escala Visual**

```html
<!-- PÁGINA 9: ESCALA VISUAL -->
<div class="page content-page">
  <h2 class="section-title">Como está seu intestino hoje?</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:28px;">
    Marque o número que melhor representa como você se sente agora.
  </p>

  <div class="scale-row">
    <span class="scale-label">Inchaço</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Muito leve</span>
    <span>Muito estufada</span>
  </div>

  <div class="scale-row">
    <span class="scale-label">Gases</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Nenhum</span>
    <span>Muito incomodo</span>
  </div>

  <div class="scale-row">
    <span class="scale-label">Trânsito</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Regular</span>
    <span>Muito preso</span>
  </div>

  <div class="scale-row">
    <span class="scale-label">Energia</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Muita energia</span>
    <span>Sem energia</span>
  </div>

  <div class="scale-row">
    <span class="scale-label">Sono</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Durmo bem</span>
    <span>Não durmo</span>
  </div>

  <div class="scale-row">
    <span class="scale-label">Humor</span>
    <div class="scale-numbers">
      <div class="scale-num">1</div>
      <div class="scale-num">2</div>
      <div class="scale-num">3</div>
      <div class="scale-num">4</div>
      <div class="scale-num">5</div>
    </div>
  </div>
  <div class="scale-ends" style="margin-top:-16px;margin-bottom:20px;padding:0 130px;">
    <span>Otimo</span>
    <span>Muito irritada</span>
  </div>
</div>
```

---

### Task 9: Criar template HTML — Áreas de Anotações (Páginas 10-12)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página 10 — Minhas Descobertas**

```html
<!-- PÁGINA 10: MINHAS DESCOBERTAS -->
<div class="page content-page">
  <h2 class="section-title">Minhas Descobertas</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Use este espaço para registrar o que você aprendeu sobre si mesma.
  </p>

  <div style="margin-bottom:24px;">
    <p style="font-weight:700;color:var(--sage-dark);margin-bottom:12px;">O que mais me surpreendeu foi:</p>
    <div class="notes-area">
      <div class="notes-line"></div>
      <div class="notes-line"></div>
      <div class="notes-line"></div>
      <div class="notes-line"></div>
    </div>
  </div>

  <div style="margin-bottom:24px;">
    <p style="font-weight:700;color:var(--sage-dark);margin-bottom:12px;">Meu principal gatilho é:</p>
    <div class="notes-area">
      <div class="notes-line"></div>
      <div class="notes-line"></div>
      <div class="notes-line"></div>
    </div>
  </div>

  <div>
    <p style="font-weight:700;color:var(--sage-dark);margin-bottom:12px;">Eu não sabia que...</p>
    <div class="notes-area">
      <div class="notes-line"></div>
      <div class="notes-line"></div>
      <div class="notes-line"></div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Adicionar página 11 — Meus Principais Gatilhos**

```html
<!-- PÁGINA 11: MEUS PRINCIPAIS GATILHOS -->
<div class="page content-page">
  <h2 class="section-title">Meus Principais Gatilhos</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Identifique seus 3 maiores gatilhos e explique por que eles te afetam.
  </p>

  <div class="card" style="margin-bottom:24px;">
    <h3 class="card-title" style="color:var(--rose);">
      <span style="background:var(--rose);color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;">1</span>
      Meu gatilho #1
    </h3>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Nome do gatilho:</p>
    <div class="notes-line" style="margin-bottom:12px;"></div>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Por que ele me afeta:</p>
    <div class="notes-line"></div>
  </div>

  <div class="card card-rose" style="margin-bottom:24px;">
    <h3 class="card-title" style="color:var(--sage-dark);">
      <span style="background:var(--sage);color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;">2</span>
      Meu gatilho #2
    </h3>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Nome do gatilho:</p>
    <div class="notes-line" style="margin-bottom:12px;"></div>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Por que ele me afeta:</p>
    <div class="notes-line"></div>
  </div>

  <div class="card">
    <h3 class="card-title" style="color:var(--rose);">
      <span style="background:var(--rose);color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;">3</span>
      Meu gatilho #3
    </h3>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Nome do gatilho:</p>
    <div class="notes-line" style="margin-bottom:12px;"></div>
    <p style="font-size:13px;color:var(--texto-light);margin-bottom:8px;">Por que ele me afeta:</p>
    <div class="notes-line"></div>
  </div>
</div>
```

- [ ] **Step 3: Adicionar página 12 — Plano para os Próximos 7 Dias**

```html
<!-- PÁGINA 12: PLANO 7 DIAS -->
<div class="page content-page">
  <h2 class="section-title">Plano para os Próximos 7 Dias</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:24px;">
    Escolha 1-2 gatilhos para trabalhar esta semana. Preencha o plano para cada dia.
  </p>

  <div class="weekly-grid">
    <div class="grid-header">Dia</div>
    <div class="grid-header">O que vou mudar</div>
    <div class="grid-header">Como vou fazer</div>
    
    <div class="grid-day">Seg</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Ter</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Qua</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Qui</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Sex</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Sab</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    
    <div class="grid-day">Dom</div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
  </div>

  <div class="tip-box" style="margin-top:24px;">
    <svg class="tip-icon" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
    <div>
      <p class="tip-label">Dica</p>
      <p>Não tente mudar tudo de uma vez. Escolha apenas 1 hábito por semana. Pequenas mudanças consistentes geram resultados extraordinários.</p>
    </div>
  </div>
</div>
```

---

### Task 10: Criar template HTML — Plano de Transformação e Rodapé (Páginas 13-14)

**Files:**
- Modify: `pdf-premium/template.html`

- [ ] **Step 1: Adicionar página 13 — Meu Plano de Transformação**

```html
<!-- PÁGINA 13: PLANO DE TRANSFORMAÇÃO -->
<div class="page content-page">
  <h2 class="section-title">Meu Plano de Transformação</h2>
  <br>
  <p style="font-size:14px;color:var(--texto-light);margin-bottom:28px;">
    Preencha com compromisso. Este é o seu pacto consigo mesma.
  </p>

  <div class="transform-box">
    <div class="transform-item">
      <div class="transform-check">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <div style="flex:1;">
        <p class="transform-label">Meu principal problema identificado:</p>
        <div class="transform-line"></div>
        <div class="transform-line"></div>
      </div>
    </div>

    <div class="transform-item">
      <div class="transform-check">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <div style="flex:1;">
        <p class="transform-label">O hábito que vou melhorar primeiro:</p>
        <div class="transform-line"></div>
        <div class="transform-line"></div>
      </div>
    </div>

    <div class="transform-item">
      <div class="transform-check">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <div style="flex:1;">
        <p class="transform-label">Minha meta para esta semana:</p>
        <div class="transform-line"></div>
        <div class="transform-line"></div>
      </div>
    </div>

    <div class="transform-item">
      <div class="transform-check">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <div style="flex:1;">
        <p class="transform-label">Meu compromisso pessoal:</p>
        <div class="transform-line"></div>
        <div class="transform-line"></div>
      </div>
    </div>
  </div>

  <div class="quote" style="margin-top:32px;">
    A mudança começa quando você decide que o desconforto de ficar onde está é maior que o medo de mudar.
  </div>
</div>
```

- [ ] **Step 2: Adicionar página 14 — Rodapé**

```html
<!-- PÁGINA 14: RODAPÉ -->
<div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg, var(--sage) 0%, var(--bege) 50%, var(--rose-light) 100%);">
  <div class="deco-circle" style="width:250px;height:250px;background:white;opacity:0.1;top:40px;left:-60px;"></div>
  <div class="deco-circle" style="width:180px;height:180px;background:white;opacity:0.1;bottom:60px;right:-40px;"></div>
  
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" style="margin-bottom:24px;">
    <circle cx="40" cy="40" r="38" stroke="white" stroke-width="2" opacity="0.3"/>
    <path d="M40 15 C25 25, 20 40, 25 55 C30 65, 35 70, 40 72 C45 70, 50 65, 55 55 C60 40, 55 25, 40 15Z" fill="white" opacity="0.9"/>
  </svg>
  
  <h2 style="font-family:'Playfair Display',serif;font-size:28px;color:white;margin-bottom:16px;text-shadow:0 2px 4px rgba(0,0,0,0.1);">
    PROTOCOLO INTESTINO LIVRE
  </h2>
  
  <p style="color:white;font-size:14px;text-align:center;max-width:400px;opacity:0.9;line-height:1.6;margin-bottom:40px;">
    Todo o conteúdo deste material é educativo e informativo.<br>
    Consulte sempre um profissional de saúde para orientações personalizadas.
  </p>
  
  <p style="color:white;font-size:12px;opacity:0.7;letter-spacing:2px;">
    © 2026 — TODOS OS DIREITOS RESERVADOS
  </p>
</div>

</body>
</html>
```

---

### Task 11: Testar geração do PDF

**Files:**
- Modify: `pdf-premium/gerar-pdf-premium.js` (ajustes finais)

- [ ] **Step 1: Executar geração do PDF**

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; node pdf-premium/gerar-pdf-premium.js
```

Expected: `✅ PDF gerado: ...\pdfs-gerados\01-Mapa-dos-Gatilhos-da-Inflamacao-Premium.pdf`

- [ ] **Step 2: Abrir PDF e verificar visual**

Abrir o PDF gerado e verificar:
- Capa com gradiente e elementos decorativos
- Ícones SVG visíveis
- Checkboxes e escalas formatados
- Áreas de anotações com linhas
- Rodapé com branding

- [ ] **Step 3: Ajustar problemas visuais se necessário**

Se houver problemas de formatação, ajustar o CSS no template.html.

- [ ] **Step 4: Commit**

```bash
git add pdf-premium/ docs/superpowers/
git commit -m "feat: protótipo premium PDF - Mapa dos Gatilhos da Inflamação"
```

---

## Self-Review

Após escrever o plano, verifiquei contra o spec:

1. **Spec coverage:** ✅ Todos os 10 itens do spec estão cobertos nas tasks
   - Capa premium (Task 3)
   - Páginas visuais (Tasks 4-5)
   - Checklists interativos (Task 8)
   - Testes com pontuação (Tasks 6-7)
   - Perfil personalizado (Task 7)
   - Gráficos visuais (Tasks 7, 9)
   - Área de anotações (Task 9)
   - Design de exercícios (Tasks 6, 8)
   - Resumo final (Task 10)
   - Elementos visuais (Tasks 3-5)

2. **Placeholder scan:** ✅ Nenhum TBD, TODO ou código incompleto

3. **Type consistency:** ✅ Nomes de classes CSS consistentes em todas as tasks
