const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'pdfs-gerados');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function criarPDF(titulo, subtitulo, conteudo, nomeArquivo) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(path.join(outputDir, nomeArquivo));
    doc.pipe(stream);

    // Capa
    doc.fontSize(28).font('Helvetica-Bold').text(titulo, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).font('Helvetica').text(subtitulo, { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(11).text('Protocolo Intestino Livre', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).text('Complemento do seu protocolo de saúde intestinal', { align: 'center' });
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Conteúdo
    conteudo.forEach((bloco) => {
      if (bloco.tipo === 'titulo') {
        doc.moveDown(0.8);
        doc.fontSize(16).font('Helvetica-Bold').text(bloco.texto);
        doc.moveDown(0.3);
        doc.moveTo(50, doc.y).lineTo(200, doc.y).strokeColor('#2E86AB').lineWidth(2).stroke();
        doc.moveDown(0.5);
      } else if (bloco.tipo === 'subtitulo') {
        doc.moveDown(0.5);
        doc.fontSize(13).font('Helvetica-Bold').text(bloco.texto);
        doc.moveDown(0.3);
      } else if (bloco.tipo === 'texto') {
        doc.fontSize(11).font('Helvetica').text(bloco.texto, { lineGap: 4 });
        doc.moveDown(0.3);
      } else if (bloco.tipo === 'lista') {
        bloco.itens.forEach((item) => {
          doc.fontSize(11).font('Helvetica').text(`  •  ${item}`, { lineGap: 3 });
        });
        doc.moveDown(0.4);
      } else if (bloco.tipo === 'dica') {
        doc.moveDown(0.3);
        const y = doc.y;
        doc.rect(50, y, 495, 60).fillAndStroke('#E8F4FD', '#2E86AB');
        doc.fillColor('#2E86AB').fontSize(10).font('Helvetica-Bold').text('DICA PRÁTICA', 60, y + 8);
        doc.fillColor('#333').fontSize(10).font('Helvetica').text(bloco.texto, 60, y + 24, { width: 475 });
        doc.y = y + 68;
        doc.fillColor('#000');
      } else if (bloco.tipo === 'quebra') {
        doc.addPage();
      }
    });

    // Rodapé
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#ccc').lineWidth(1).stroke();
    doc.moveDown(0.5);
    doc.fontSize(9).font('Helvetica').fillColor('#999').text('Protocolo Intestino Livre — Todo o conteúdo é educativo. Consulte sempre um profissional de saúde.', { align: 'center' });

    doc.end();
    stream.on('finish', () => {
      console.log(`✅ Gerado: ${nomeArquivo}`);
      resolve();
    });
  });
}

// PDF 1 — Mapa dos Gatilhos da Inflamação
const pdf1 = {
  titulo: 'MAPA DOS GATILHOS\nDA INFLAMAÇÃO',
  subtitulo: 'Identifique os fatores invisíveis que estão\npiorando seu intestino',
  conteudo: [
    { tipo: 'texto', texto: 'Você já parou para pensar que o seu intestino pode estar sofrendo influência de fatores que nem percebe? Estresse no trabalho, noites mal dormidas, hábitos sociais e até mesmo o ambiente em que vive podem estar alimentando a inflamação silenciosa que causa inchaço, gases e intestino preso.' },
    { tipo: 'texto', texto: 'Este mapa foi criado para te ajudar a identificar esses gatilhos e tomar decisões conscientes para desinflamar o corpo de dentro para fora.' },

    { tipo: 'titulo', texto: '1. ESTRESSE CRÔNICO' },
    { tipo: 'texto', texto: 'O estresse constante libera cortisol, um hormônio que desregula o funcionamento intestinal, reduz a digestão e favorece a retenção de líquidos na região abdominal.' },
    { tipo: 'lista', itens: ['Pressa constante no dia a dia', 'Sensação de que nunca é suficiente', 'Dificuldade em parar e respirar', 'Tensão no pescoço e mandíbula'] },
    { tipo: 'dica', texto: 'Reserve 5 minutos por dia para respiração profunda. Inspire por 4 segundos, segure por 4 e expire por 6. Isso ativa o sistema parasimpático e melhora a digestão.' },

    { tipo: 'titulo', texto: '2. ANSIEDADE E MENTALIDADE DE ESCASSEZ' },
    { tipo: 'texto', texto: 'A ansiedade alimenta o ciclo de compulsão e culpa. Quando comemos com ansiedade, o corpo entra em modo de sobrevivência e prioriza o armazenamento de gordura, especialmente na barriga.' },
    { tipo: 'lista', itens: ['Comer rápido sem prestar atenção', 'Comer por emoção (tristeza, tédio, frustração)', 'Sentir culpa depois de comer', 'Pular refeições e depois se acabar'] },
    { tipo: 'dica', texto: 'Antes de cada refeição, faça 3 respirações longas. Isso sinaliza ao corpo que é hora de digerir, não de fugir.' },

    { tipo: 'titulo', texto: '3. SONO DE BAIXA QUALIDADE' },
    { tipo: 'texto', texto: 'Dormir mal ou pouco é um dos maiores vilões do intestino. O corpo regenera o intestino durante o sono profundo. Sem esse tempo de recuperação, a inflamação se mantém ativa.' },
    { tipo: 'lista', itens: ['Dormir menos de 7 horas por noite', 'Telas antes de dormir', 'Quarto quente ou iluminado', 'Horários de sono irregulares'] },
    { tipo: 'dica', texto: 'Desligue telas 1 hora antes de dormir. Substitua por leitura, banho morno ou alongamento leve. O intestino agradece.' },

    { tipo: 'quebra' },
    { tipo: 'titulo', texto: '4. ROTINA ACELERADA' },
    { tipo: 'texto', texto: 'Quando a vida é uma correria, a digestão é uma das primeiras coisas a serem prejudicadas. Comer em pé, na frente do computador ou no carro impede que o corpo absorva bem os nutrientes.' },
    { tipo: 'lista', itens: ['Almoçar em 10 minutos', 'Comer em pé ou dirigindo', 'Não mastigar bem os alimentos', 'Beber líquidos gelados durante as refeições'] },
    { tipo: 'dica', texto: 'Reserve no mínimo 20 minutos para cada refeição. Sente-se, mastigue devagar e preste atenção ao que está comendo.' },

    { tipo: 'titulo', texto: '5. POUCA HIDRATAÇÃO' },
    { tipo: 'texto', texto: 'A água é essencial para o intestino funcionar. Sem hidratação adequada, as fezes ficam mais duras, o trânsito intestinal desacelera e a sensação de barriga pesada aumenta.' },
    { tipo: 'lista', itens: ['Beber apenas quando tem sede', 'Substituir água por café ou refrigerante', 'Esquecer de beber durante o trabalho', 'Inchar com líquidos por beber tudo de uma vez'] },
    { tipo: 'dica', texto: 'Beba um copo de água morna com limão ao acordar. Isso ativa o intestino e prepara o corpo para o dia.' },

    { tipo: 'titulo', texto: '6. AMBIENTE DE TRABALHO' },
    { tipo: 'texto', texto: 'O local onde você trabalha impacta diretamente sua saúde intestinal. Ambientes com ar condicionado excessivo, pouca luz natural e cadeiras desconfortáveis prejudicam a digestão e favorecem o estufamento.' },
    { tipo: 'lista', itens: ['Sentado por longos períodos', 'Ar condicionado muito frio', 'Pouca luz natural', 'Estresse com colegas ou chefes'] },
    { tipo: 'dica', texto: 'Levante-se a cada hora e faça 5 minutos de caminhada ou alongamento. Isso estimula o intestino e reduz o inchaço.' },

    { tipo: 'titulo', texto: '7. HÁBITOS SOCIAIS' },
    { tipo: 'texto', texto: 'Encontros com amigos, happy hours e refeições em restaurantes podem ser gostosos, mas muitas vezes envolvem comidas que inflamam o intestino e bebidas que desregam o trânsito.' },
    { tipo: 'lista', itens: ['Excesso de álcool', 'Comidas industrializadas em encontros', 'Comer por pressão social', 'Horários irregulares de refeição aos fins de semana'] },
    { tipo: 'dica', texto: 'Não precisa se isolar. Vá ao encontro, mas coma antes de ir. Assim você faz escolhas mais conscientes e sem fome.' },

    { tipo: 'titulo', texto: '8. COMPORTAMENTOS QUE SABOTAM O INTESTINO' },
    { tipo: 'texto', texto: 'Alguns hábitos parecem inofensivos, mas são verdadeiros sabotadores do intestino. Identificá-los é o primeiro passo para mudar.' },
    { tipo: 'lista', itens: ['Comer na frente da TV ou celular', 'Dieta da balança (restrição extrema)', 'Auto medicação com laxantes', 'Ignorar a vontade de ir ao banheiro', 'Consumo excessivo de ultraprocessados'] },
    { tipo: 'dica', texto: 'Comece observando seus hábitos por 3 dias. Anote o que come, quando come e como se sente depois. O autoconhecimento é o primeiro remédio.' },

    { tipo: 'titulo', texto: 'COMO USAR ESTE MAPA' },
    { tipo: 'texto', texto: 'Pegue uma folha em branco e escreva os 8 gatilhos acima. Ao lado de cada um, coloque uma nota de 0 a 10 indicando quanto ele está presente na sua vida. Os que tiverem nota alta são seus prioritários de mudança.' },
    { tipo: 'texto', texto: 'Não tente mudar tudo de uma vez. Escolha apenas 1 ou 2 gatilhos para trabalhar nesta semana. Pequenas mudanças consistentes geram resultados extraordinários.' },
  ]
};

// PDF 2 — Plano Anti-Recaída
const pdf2 = {
  titulo: 'PLANO ANTI-RECAÍDA',
  subtitulo: 'Mantenha seus resultados e proteja\nseu intestino a longo prazo',
  conteudo: [
    { tipo: 'texto', texto: 'Você já começou a desinflamar o intestino. Sentiu a barriga mais leve, o trânsito melhorou, o estufamento reduziu. Mas agora vem a pergunta: como manter isso? Este plano é o seu escudo contra as recaídas.' },
    { tipo: 'texto', texto: 'A maioria das pessoas consegue bons resultados no início, mas volta ao ciclo antigo por falta de um plano de manutenção. Você não vai ser uma delas.' },

    { tipo: 'titulo', texto: 'OS 3 PILARES DA MANUTENÇÃO' },
    { tipo: 'subtitulo', texto: 'Pilar 1: Consistência, não perfeição' },
    { tipo: 'texto', texto: 'Não existe dia perfeito. O que existe é consistência. Você não precisa comer 100% saudável o tempo todo. Precisa voltar ao caminho rápido quando se desvia.' },
    { tipo: 'lista', itens: ['80/20: 80% do tempo alimentação consciente, 20% de flexibilidade', 'Não desista por causa de um dia ruim', 'Uma refeição fora do plano não apaga seus progressos', 'O importante é a tendência, não o evento isolado'] },

    { tipo: 'subtitulo', texto: 'Pilar 2: Rotinas de proteção intestinal' },
    { tipo: 'texto', texto: 'Crie rituais diários que protejam seu intestino. São pequenas ações que, repetidas, se tornam seu escudo natural.' },
    { tipo: 'lista', itens: ['Água morna com limão ao acordar', 'Fibras naturais em todas as refeições', 'Momento de paz antes de comer', 'Caminhada leve após almoço/jantar', 'Horário regular para ir ao banheiro'] },

    { tipo: 'subtitulo', texto: 'Pilar 3: Alerta precoce' },
    { tipo: 'texto', texto: 'Aprenda a identificar os sinais de que uma recaída está se formando. Quanto antes perceber, mais fácil será voltar ao caminho.' },
    { tipo: 'lista', itens: ['Barriga voltando a estufar', 'Dificuldade para ir ao banheiro', 'Compulsão por doces e ultraprocessados', 'Sensação de pesadez depois de comer', 'Volta dos gases e desconforto'] },

    { tipo: 'quebra' },
    { tipo: 'titulo', texto: 'ROTEIRO DE EMERGÊNCIA ANTI-RECAÍDA' },
    { tipo: 'texto', texto: 'Quando perceber que está saindo do caminho, execute este roteiro imediatamente:' },
    { tipo: 'lista', itens: [
      'Passo 1: Pare e respire. 5 respirações profundas.',
      'Passo 2: Beba um copo de água morna.',
      'Passo 3: Volte à sua última refeição consciente e repita-a.',
      'Passo 4: Caminhe por 15 minutos.',
      'Passo 5: Durma 7-8 horas esta noite.',
      'Passo 6: Não se julgue. Recomece agora, não amanhã.'
    ] },

    { tipo: 'titulo', texto: 'HÁBITOS ANTI-RECAÍDA DIÁRIOS' },
    { tipo: 'texto', texto: 'Estes são os 7 hábitos que devem se tornar parte da sua identidade, não apenas da sua dieta:' },
    { tipo: 'lista', itens: [
      'Beber 2L de água por dia',
      'Comer pelo menos 3 tipos de fibras naturais',
      'Mastigar cada bocado 20 vezes',
      'Comer sem telas pelo menos 1 vez por dia',
      'Caminhar 20 minutos',
      'Dormir até às 22h30 pelo menos 5 vezes por semana',
      'Praticar 5 minutos de gratidão ou respiração'
    ] },

    { tipo: 'titulo', texto: 'COMO LIDAR COM GATILHOS DE RECAÍDA' },
    { tipo: 'subtitulo', texto: 'Estresse no trabalho' },
    { tipo: 'texto', texto: 'Quando o estresse apertar, não recorra à comida de conforto. Tenha um "kit anti-estresse" pronto: chá de camomila, frutas secas, um óleo essencial de lavanda para cheirar.' },
    { tipo: 'subtitulo', texto: 'Fim de semana' },
    { tipo: 'texto', texto: 'Planeje suas refeições da sexta-feira. Tenha opções saudáveis em casa. Não vá ao mercado com fome. Se for sair, coma algo leve antes.' },
    { tipo: 'subtitulo', texto: 'Eventos sociais' },
    { tipo: 'texto', texto: 'Não diga que está "de dieta". Diga que está cuidando da saúde. Leve uma opção saudável para compartilhar. Coma antes de ir se precisar.' },

    { tipo: 'titulo', texto: 'CHECKLIST SEMANAL DE PROTEÇÃO' },
    { tipo: 'texto', texto: 'Marque com um ✓ cada hábito que você manteve na semana:' },
    { tipo: 'lista', itens: [
      '□ Bebi 2L de água por dia',
      '□ Comi fibras naturais em todas as refeições',
      '□ Dormi 7+ horas pelo menos 5 noites',
      '□ Caminhei pelo menos 3 vezes',
      '□ Comi sem telas pelo menos 3 vezes',
      '□ Pratiquei respiração ou gratidão',
      '□ Não me julguei por pequenos desvios'
    ] },
    { tipo: 'dica', texto: 'Imprima este checklist e coloque na geladeira. O ato de marcar um ✓ libera dopamina e reforça o hábito. É simples, mas funciona.' },
  ]
};

// PDF 3 — Como Manter a Barriga Chapada
const pdf3 = {
  titulo: 'COMO MANTER A BARRIGA\nCHAPADA',
  subtitulo: 'Após a desinflamação, mantenha\no resultado com consistência',
  conteudo: [
    { tipo: 'texto', texto: 'A desinflamação deu o start. Sua barriga já não estufa como antes, o trânsito melhorou, você se sente mais leve. Mas como manter essa barriga chapada no dia a dia? É aqui que a maioria tropeça — e onde você vai se diferenciar.' },

    { tipo: 'titulo', texto: 'ENTENDA A DIFERENÇA' },
    { tipo: 'subtitulo', texto: 'Gordura abdominal vs. Estufamento' },
    { tipo: 'texto', texto: 'Muitas pessoas confundem barriga estufada com barriga gordinha. Entenda a diferença:' },
    { tipo: 'lista', itens: [
      'Estufamento: barriga que enche ao longo do dia, melhora de manhã, piora após refeições. Causa: gases, má digestão, inflamação.',
      'Gordura: barriga que permanece do mesmo tamanho o dia todo. Causa: acúmulo de gordura subcutânea.',
      'A boa notícia: se você desinflamou, metade da batalha já está ganha.'
    ] },

    { tipo: 'subtitulo', texto: 'Barriga alta vs. Barriga dura' },
    { tipo: 'lista', itens: [
      'Barriga alta: inchaço na parte de cima, geralmente ligado a gases e má digestão.',
      'Barriga dura: tensão muscular e retenção de líquidos, comum em fases pré-menstruais.',
      'Ambas melhoram com os hábitos certos de alimentação e hidratação.'
    ] },

    { tipo: 'titulo', texto: 'OS 7 HÁBITOS PARA MANTER A BARRIGA CHAPADA' },
    { tipo: 'subtitulo', texto: 'Hábito 1: Água morna pela manhã' },
    { tipo: 'texto', texto: 'Um copo de água morna com meia limão espremido ao acordar "acorda" o intestino, estimula a digestão e reduz o estufamento matinal.' },
    { tipo: 'subtitulo', texto: 'Hábito 2: Fibras inteligentes' },
    { tipo: 'texto', texto: 'Não basta comer fibras — é preciso saber quais. Fibra solúvel (aveia, chia, maçã) forma um gel que acalma o intestino. Fibra insolúvel (vegetais verdes, cascas) dá volume às fezes.' },
    { tipo: 'subtitulo', texto: 'Hábito 3: Comer devagar' },
    { tipo: 'texto', texto: 'Quando comemos rápido, engolimos ar (aerofagia). Esse ar forma gases e estufa a barriga. Mastigue 20 vezes cada bocado. Coloque o garfo entre uma mordida e outra.' },
    { tipo: 'subtitulo', texto: 'Hábito 4: Não beber durante as refeições' },
    { tipo: 'texto', texto: 'Líquidos em excesso durante as refeições diluem os sucos gástricos e prejudicam a digestão. Beba 30 minutos antes ou 1 hora depois.' },
    { tipo: 'subtitulo', texto: 'Hábito 5: Movimento leve após comer' },
    { tipo: 'texto', texto: 'Uma caminhada de 10-15 minutos após as refeições principais ajuda o intestino a processar os alimentos e evita a sensação de barriga pesada.' },
    { tipo: 'subtitulo', texto: 'Hábito 6: Noites de qualidade' },
    { tipo: 'texto', texto: 'Durma 7-8 horas. O intestino se regenera durante o sono profundo. Dormir mal aumenta o cortisol e favorece o acúmulo de gordura na barriga.' },
    { tipo: 'subtitulo', texto: 'Hábito 7: Gerenciar o estresse' },
    { tipo: 'texto', texto: 'O estresse libera cortisol, que direciona gordura para a barriga. Pratique respiração, meditação ou qualquer atividade que te acalme diariamente.' },

    { tipo: 'quebra' },
    { tipo: 'titulo', texto: 'MODELO DE PLANO ALIMENTAR PARA BARRIGA CHAPADA' },
    { tipo: 'subtitulo', texto: 'Café da manhã (7h-8h)' },
    { tipo: 'lista', itens: ['Água morna com limão', 'Aveia com frutas vermelhas e sementes de chia', 'Chá verde ou camomila'] },
    { tipo: 'subtitulo', texto: 'Lanche da manhã (10h)' },
    { tipo: 'lista', itens: ['Iogurte natural com castanhas', 'Uma fruta da estação'] },
    { tipo: 'subtitulo', texto: 'Almoço (12h-13h)' },
    { tipo: 'lista', itens: ['Legumes grelhados ou cozidos', 'Proteína magra (frango, peixe, ovo)', 'Arroz integral ou batata doce', 'Salada verde com azeite'] },
    { tipo: 'subtitulo', texto: 'Lanche da tarde (15h-16h)' },
    { tipo: 'lista', itens: ['Palitos de cenoura com homus', 'Chá de hortelã'] },
    { tipo: 'subtitulo', texto: 'Jantar (19h-20h)' },
    { tipo: 'lista', itens: ['Sopa de legumes', 'Proteína leve (peixe, ovo)', 'Evitar carboidratos pesados à noite'] },

    { tipo: 'titulo', texto: 'ERROS QUE DESTROEM A BARRIGA CHAPADA' },
    { tipo: 'lista', itens: [
      'Pular refeições (deixa o corpo em modo de sobrevivência)',
      'Excesso de sal (causa retenção de líquidos)',
      'Bebidas gaseificadas (enchem o intestino de ar)',
      'Gomas de mastigar (engolem ar constantemente)',
      'Comer à noite tarde demais (o corpo não digere bem)',
      'Ficar sentada o dia todo (intestino para)'
    ] },
    { tipo: 'dica', texto: 'Escolha apenas 2 ou 3 hábitos para começar. Quando se tornarem automáticos, adicione mais. A consistência vence a intensidade sempre.' },
  ]
};

// PDF 4 — TPM sem Estufamento
const pdf4 = {
  titulo: 'TPM SEM ESTUFAMENTO',
  subtitulo: 'Estratégias naturais para reduzir\no inchaço no período pré-menstrual',
  conteudo: [
    { tipo: 'texto', texto: 'Se a cada mês sua barriga inchava, ficava dura, o intestino travava e a compulsão batia forte — saiba que isso NÃO é normal e NÃO é "coisa da TPM". Existem estratégias naturais que podem transformar essa fase da sua vida.' },
    { tipo: 'texto', texto: 'A TPM não precisa ser sinônimo de sofrimento. Com as adaptações certas, você pode passar por esse período com muito mais conforto e leveza.' },

    { tipo: 'titulo', texto: 'POR QUE A TPM PIORA O INTESTINO?' },
    { tipo: 'texto', texto: 'Na fase lútea (14 dias antes da menstruação), o corpo passa por mudanças hormonais que impactam diretamente o intestino:' },
    { tipo: 'lista', itens: [
      'Aumento da progesterona: relaxa os músculos do intestino, desacelerando o trânsito.',
      'Retenção de líquidos: o corpo guarda mais água, causando inchaço e barriga dura.',
      'Sensibilidade à insulina: aumenta a vontade de doces e carboidratos.',
      'Inflamação: o corpo fica mais propenso a inflamações nessa fase.',
      'Alteração do microbioma: as bactérias intestinais mudam com o ciclo hormonal.'
    ] },

    { tipo: 'titulo', texto: 'OS 5 PILARES CONTRA O ESTUFAMENTO NA TPM' },
    { tipo: 'subtitulo', texto: 'Pilar 1: Hidratação estratégica' },
    { tipo: 'texto', texto: 'Parece contraditório, mas beber mais água ajuda a REDUZIR a retenção. Quando o corpo recebe água suficiente, ele para de "guardar" a que já tem.' },
    { tipo: 'lista', itens: ['Beba pelo menos 2L de água por dia na TPM', 'Água morna ajuda mais que gelada', 'Chás de hortelã e camomila são aliados', 'Evite refrigerantes e bebidas com gás'] },

    { tipo: 'subtitulo', texto: 'Pilar 2: Alimentação anti-inflamatória' },
    { tipo: 'texto', texto: 'Nos 7-10 dias antes da menstruação, mude levemente sua alimentação para reduzir a inflamação:' },
    { tipo: 'lista', itens: [
      'Aumente ômega 3 (salmão, sardinha, sementes de linhaça)',
      'Reduza sal e alimentos industrializados',
      'Coma mais vegetais verdes (brócolis, couve, espinafre)',
      'Inclua gengibre e cúrcuma (anti-inflamatórios naturais)',
      'Reduza açúcar e doces (pioram a inflamação)',
      'Coma batata doce (rico em potássio, combate retenção)'
    ] },

    { tipo: 'subtitulo', texto: 'Pilar 3: Movimento suave' },
    { tipo: 'texto', texto: 'Não é hora de treinos intensos. O corpo pede movimento suave que estimule a circulação sem sobrecarregar:' },
    { tipo: 'lista', itens: [
      'Caminhada de 30 minutos',
      'Yoga (posturas que abrem o quadril)',
      'Alongamento leve',
      'Natação',
      'Dança livre'
    ] },

    { tipo: 'quebra' },
    { tipo: 'subtitulo', texto: 'Pilar 4: Rotina intestinal na TPM' },
    { tipo: 'texto', texto: 'O intestino fica mais lento na TPM. Crie uma rotina que o ajude:' },
    { tipo: 'lista', itens: [
      'Tente ir ao banheiro no mesmo horário todos os dias',
      'Massageie o abdomem em movimentos circulares (sentido horário)',
      'Beba água morna com limão ao acordar',
      'Chá de ameixa preta ou figo é um excelente laxante natural',
      'Não force. Confie no processo.'
    ] },

    { tipo: 'subtitulo', texto: 'Pilar 5: Gestão emocional' },
    { tipo: 'texto', texto: 'A TPM amplifica emoções. Isso impacta diretamente os hábitos alimentares e a percepção do corpo:' },
    { tipo: 'lista', itens: [
      'Permita-se sentir sem julgamento',
      'Não tome decisões drásticas sobre seu corpo nessa fase',
      'Tenha um diário de humor para acompanhar o ciclo',
      'Reserve tempo para você (banho, leitura, descanso)',
      'Converse com alguém de confiança sobre como se sente'
    ] },

    { tipo: 'titulo', texto: 'PROTOCOLO DA FASE LÚTEA (14 dias antes da menstruação)' },
    { tipo: 'lista', itens: [
      'Dia 1-7: Aumente ômega 3, hidrate-se mais, durma bem.',
      'Dia 8-10: Reduza sal, doces e ultraprocessados.',
      'Dia 11-13: Movimento suave, chá de camomila, massageie o abdômen.',
      'Dia 14: Permita-se descansar. Não se julgue. Seu corpo está trabalhando.'
    ] },

    { tipo: 'titulo', texto: 'ALIMENTOS AMIGOS NA TPM' },
    { tipo: 'lista', itens: [
      'Banana: rica em potássio, combate retenção',
      'Abacate: gorduras boas que acalmam inflamação',
      'Salmão: ômega 3 anti-inflamatório',
      'Gengibre: reduz gases e inflamação',
      'Chá de hortelã: alivia gases e distensão',
      'Batata doce: energia estável e potássio',
      'Sementes de chia: fibras que regulam o intestino'
    ] },

    { tipo: 'dica', texto: 'Comece a aplicar essas estratégias 10 dias antes da menstruação. Em 2-3 ciclos, você já vai notar uma diferença enorme no estufamento e no conforto.' },
  ]
};

// PDF 5 — Menopausa sem Estufamento
const pdf5 = {
  titulo: 'MENOPAUSA SEM ESTUFAMENTO',
  subtitulo: 'Cuide do intestino durante a\ntransição hormonal com inteligência',
  conteudo: [
    { tipo: 'texto', texto: 'A menopausa é uma fase de transformação. O corpo muda, o metabolismo desacelera, os hormônios se reorganizam — e o intestino é uma das áreas mais impactadas. Mas com as adaptações certas, é possível manter o intestino funcionando e a barriga leve.' },
    { tipo: 'texto', texto: 'Este guia foi criado para mulheres que estão passando ou já passaram pela menopausa e querem entender como cuidar do intestino nessa fase da vida.' },

    { tipo: 'titulo', texto: 'COMO A MENOPAUSA AFETA O INTESTINO' },
    { tipo: 'texto', texto: 'A queda do estrogênio e da progesterona impacta diretamente o sistema digestivo:' },
    { tipo: 'lista', itens: [
      'Desaceleração do metabolismo: o corpo queima menos calorias em repouso.',
      'Redução da motilidade intestinal: o intestino fica mais lento.',
      'Alteração da microbiota: menos bactérias boas, mais inflamação.',
      'Retenção de líquidos: o corpo guarda mais água.',
      'Mudança na distribuição de gordura: mais gordura se acumula na barriga.',
      'Diminuição da massa muscular: menos músculos = menos gasto calórico.'
    ] },

    { tipo: 'titulo', texto: 'OS 5 PILARES PARA INTESTINO NA MENOPAUSA' },
    { tipo: 'subtitulo', texto: 'Pilar 1: Fibra como aliada número 1' },
    { tipo: 'texto', texto: 'Na menopausa, a fibra é ainda mais importante. Ela alimenta as bactérias boas do intestino, regula o trânsito e ajuda no controle do peso.' },
    { tipo: 'lista', itens: [
      'Fibras solúveis: aveia, chia, psyllium, maçã, legumes cozidos.',
      'Fibras insolúveis: vegetais verdes, cascas de frutas, grãos integrais.',
      'Comece devagar e aumente aos poucos.',
      'Sempre acompañhe fibras com muita água.'
    ] },

    { tipo: 'subtitulo', texto: 'Pilar 2: Proteína em cada refeição' },
    { tipo: 'texto', texto: 'A perda de massa muscular é um dos maiores desafios da menopausa. Proteína em cada refeição ajuda a manter os músculos e acelera o metabolismo.' },
    { tipo: 'lista', itens: [
      'Ovo, frango, peixe, carne magra, tofu, leguminosas.',
      'Meta: 20-30g de proteína por refeição.',
      'Proteína mantém a saciedade e evita compulsões.',
      'Ajuda na manutenção da massa muscular.'
    ] },

    { tipo: 'subtitulo', texto: 'Pilar 3: Movimento como medicamento' },
    { tipo: 'texto', texto: 'O exercício é o medicamento mais poderoso contra o estufamento na menopausa. Ele acelera o intestino, queima gordura e melhora o humor.' },
    { tipo: 'lista', itens: [
      'Caminhada: 30-45 minutos por dia.',
      'Treino de força: 2-3 vezes por semana (essencial para músculos).',
      'Yoga: excelente para estresse e digestão.',
      'Natação: baixo impacto, grande benefício.'
    ] },

    { tipo: 'quebra' },
    { tipo: 'subtitulo', texto: 'Pilar 4: Sono de qualidade' },
    { tipo: 'texto', texto: 'A menopausa frequentemente prejudica o sono (ondas de calor, insônia). Mas dormir bem é essencial para o intestino:' },
    { tipo: 'lista', itens: [
      'Regule a temperatura do quarto (mais frio).',
      'Evite telas 1 hora antes de dormir.',
      'Chá de camomila ou valeriana antes de dormir.',
      'Mantenha horário regular de sono.',
      'Se necessário, use roupa leve para ondas de calor.'
    ] },

    { tipo: 'subtitulo', texto: 'Pilar 5: Gestão do estresse e emoções' },
    { tipo: 'texto', texto: 'A menopausa pode trazer ansiedade, irritabilidade e mudanças de humor. O estresse crônico piora o intestino e favorece o estufamento:' },
    { tipo: 'lista', itens: [
      'Respiração profunda: 5 minutos ao acordar e antes de dormir.',
      'Meditação guiada: apps como Insight Timer são ótimos.',
      'Natureza: tempo ao ar livre reduz cortisol.',
      'Socialização: conexão humana é medicina.',
      'Terapia: se precisar, procure ajuda profissional.'
    ] },

    { tipo: 'titulo', texto: 'ALIMENTOS ESSENCIAIS NA MENOPAUSA' },
    { tipo: 'lista', itens: [
      'Soja e derivados: contêm fitoestrogênios que ajudam no equilíbrio hormonal.',
      'Sementes de linhaça: ômega 3 e fibras.',
      'Folhas verdes: cálcio, magnésio e fibras.',
      'Frutas vermelhas: antioxidantes que combatem inflamação.',
      'Gengibre e cúrcuma: anti-inflamatórios naturais.',
      'Água de coco: hidratação e potássio.',
      'Iogurte com probióticos: equilíbrio da microbiota.'
    ] },

    { tipo: 'titulo', texto: 'PLANO DIÁRIO PARA MENOPAUSA SEM ESTUFAMENTO' },
    { tipo: 'lista', itens: [
      '6h-7h: Água morna com limão + 5 minutos de respiração.',
      '7h-8h: Café da manhã com proteína + fibra + gordura boa.',
      '10h: Lanche com fruta + castanhas.',
      '12h-13h: Almoço completo: legumes + proteína + carboidrato complexo.',
      '15h: Caminhada de 20 minutos.',
      '16h: Lanche leve com vegetais.',
      '19h: Jantar leve: sopa + proteína.',
      '21h: Alongamento ou yoga suave.',
      '22h: Sem telas. Chá de camomila. Dormir.'
    ] },

    { tipo: 'titulo', texto: 'LEMBRE-SE' },
    { tipo: 'texto', texto: 'A menopausa não é uma doença — é uma transição. Seu corpo não está quebrado, ele está se reorganizando. Com as adaptações certas, você pode viver essa fase com energia, leveza e um intestino funcionando bem.' },
    { tipo: 'dica', texto: 'Comece com 2 ou 3 mudanças pequenas. Não tente reformar tudo de uma vez. Cada pequeno passo conta. Você não está atrasada — você está exatamente onde precisa estar.' },
  ]
};

async function gerarTodos() {
  console.log('Gerando PDFs do Protocolo Intestino Livre...\n');
  
  await criarPDF(pdf1.titulo, pdf1.subtitulo, pdf1.conteudo, '01-Mapa-dos-Gatilhos-da-Inflamacao.pdf');
  await criarPDF(pdf2.titulo, pdf2.subtitulo, pdf2.conteudo, '02-Plano-Anti-Recaida.pdf');
  await criarPDF(pdf3.titulo, pdf3.subtitulo, pdf3.conteudo, '03-Como-Manter-a-Barriga-Chapada.pdf');
  await criarPDF(pdf4.titulo, pdf4.subtitulo, pdf4.conteudo, '04-TPM-sem-Estufamento.pdf');
  await criarPDF(pdf5.titulo, pdf5.subtitulo, pdf5.conteudo, '05-Menopausa-sem-Estufamento.pdf');
  
  console.log('\n✅ Todos os 5 PDFs foram gerados com sucesso!');
  console.log(`📁 Pasta: ${outputDir}`);
}

gerarTodos();
