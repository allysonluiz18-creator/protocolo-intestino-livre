const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pdfs = [
  { template: 'template.html', output: '01-Mapa-dos-Gatilhos-da-Inflamacao-Premium.pdf' },
  { template: 'template-anti-recaida.html', output: '02-Plano-Anti-Recaida-Premium.pdf' },
  { template: 'template-barriga-chapada.html', output: '03-Como-Manter-a-Barriga-Chapada-Premium.pdf' },
  { template: 'template-tpm.html', output: '04-TPM-sem-Estufamento-Premium.pdf' },
  { template: 'template-menopausa.html', output: '05-Menopausa-sem-Estufamento-Premium.pdf' }
];

async function gerarPDF(templateFile, outputFile) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    
    const htmlPath = path.join(__dirname, templateFile);
    
    if (!fs.existsSync(htmlPath)) {
      console.error(`❌ ${templateFile} não encontrado em:`, htmlPath);
      return false;
    }
    
    const html = fs.readFileSync(htmlPath, 'utf8');
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
    const outputDir = path.join(__dirname, '..', 'pdfs-gerados');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, outputFile);
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' }
    });
    
    console.log(`✅ ${outputFile}`);
    return true;
  } finally {
    await browser.close();
  }
}

async function gerarTodos() {
  console.log('Gerando PDFs premium...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const pdf of pdfs) {
    const result = await gerarPDF(pdf.template, pdf.output);
    if (result) success++;
    else failed++;
  }
  
  console.log(`\n✅ ${success} PDFs gerados com sucesso`);
  if (failed > 0) console.log(`❌ ${failed} PDFs falharam`);
}

gerarTodos().catch((err) => {
  console.error('❌ Erro ao gerar PDFs:', err.message);
  process.exit(1);
});