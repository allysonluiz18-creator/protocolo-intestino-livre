// Quiz Data - 14 perguntas identity-based
const quizData = [
    { id: 1, type: 'identity', question: 'Para entender melhor seus sintomas, me conte:', emoji: '👩', options: ['Tenho entre 20-35 anos', 'Tenho entre 36-50 anos', 'Tenho mais de 50 anos'] },
    { id: 2, type: 'symptom', question: 'Qual é o sintoma que mais te incomoda?', emoji: '😣', options: ['Barriga estufada', 'Gases excessivos', 'Intestino preso', 'Dor abdominal'] },
    { id: 3, type: 'symptom', question: 'Com que frequência você sente inchaço?', emoji: '📊', options: ['Todo dia', '3-5 vezes por semana', '1-2 vezes por semana', 'Algumas vezes no mês'] },
    { id: 4, type: 'symptom', question: 'Quando o inchaço costuma piorar?', emoji: '⏰', options: ['Depois de almoçar', 'Depois de jantar', 'Ao longo do dia todo', 'Não tenho horário certo'] },
    { id: 5, type: 'routine', question: 'Você percebe que algum alimento piora seus sintomas?', emoji: '🍽️', options: ['Sim, mas não sei qual', 'Acho que lactose', 'Acho que glúten', 'Não sei identificar'] },
    { id: 6, type: 'routine', question: 'Quanto de água você bebe por dia?', emoji: '💧', options: ['Menos de 1 litro', 'Entre 1-2 litros', 'Mais de 2 litros', 'Não sei nem quantificar'] },
    { id: 7, type: 'emotional', question: 'Como você se sente em relação ao seu corpo?', emoji: '😔', options: ['Incomodada com a barriga', 'Vergonha de usar roupa apertada', 'Evito sair por causa disso', 'Sinto que fracassei em controlar'] },
    { id: 8, type: 'emotional', question: 'Isso afeta sua autoestima?', emoji: '💔', options: ['Muito, todos os dias', 'Às vezes, em situações específicas', 'Não tanto, mas incomoda', 'Já me acostumei'] },
    { id: 9, type: 'history', question: 'Você já tentou algum tratamento?', emoji: '💊', options: ['Sim, várias dietas', 'Sim, laxantes e remédios', 'Sim, fui em médicos', 'Nunca tentei nada específico'] },
    { id: 10, type: 'history', question: 'Há quanto tempo você sofre com isso?', emoji: '📅', options: ['Menos de 6 meses', 'De 6 meses a 1 ano', 'De 1 a 3 anos', 'Mais de 3 anos'] },
    { id: 11, type: 'routine', question: 'Como está seu nível de estresse?', emoji: '😰', options: ['Muito estressada', 'Moderadamente estressada', 'Pouco estressada', 'Tranquila'] },
    { id: 12, type: 'routine', question: 'Você dorme bem?', emoji: '😴', options: ['Não, tenho insônia', 'Durmo, mas acordo cansada', 'Durmo bem', 'Varia muito'] },
    { id: 13, type: 'desire', question: 'Como seria sua vida sem esses problemas?', emoji: '✨', options: ['Usaria qualquer roupa com confiança', 'Sairia sem medo de inchar', 'Comeria sem culpa', 'Tudo isso junto!'] },
    { id: 14, type: 'desire', question: 'Você está pronta para uma mudança real?', emoji: '💪', options: ['Sim, muito!', 'Sim, mas tenho dúvidas', 'Preciso pensar melhor', 'Já tentei de tudo'] }
];

let currentQuestion = 0;
let answers = [];

function initQuiz() { renderQuestion(currentQuestion); }

function renderQuestion(index) {
    const question = quizData[index];
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <div class="question-emoji">${question.emoji}</div>
        <h2 class="question-text">${question.question}</h2>
        <div class="options-container">
            ${question.options.map((option, i) => `
                <button class="option-btn" data-index="${i}" onclick="selectOption(${i})">${option}</button>
            `).join('')}
        </div>
    `;
    updateProgress();
}

function selectOption(index) {
    answers[currentQuestion] = index;
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            renderQuestion(currentQuestion);
        } else {
            showResult();
        }
    }, 300);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${currentQuestion + 1} de ${quizData.length}`;
}

function showResult() {
    const quizContent = document.getElementById('quizContent');
    const symptomScore = answers.filter((a, i) => quizData[i].type === 'symptom' && a <= 1).length;
    let resultLevel = 'Baixo', resultColor = '#48bb78';
    if (symptomScore >= 3) { resultLevel = 'Alto'; resultColor = '#dc3545'; }
    else if (symptomScore >= 2) { resultLevel = 'Moderado'; resultColor = '#ffc107'; }
    
    quizContent.innerHTML = `
        <div class="result-container">
            <div class="result-emoji">🎯</div>
            <h2 class="result-title">Seu Diagnóstico Personalizado</h2>
            <div class="result-badge" style="background: ${resultColor}20; color: ${resultColor}">Nível de Alerta: ${resultLevel}</div>
            <p class="result-text">Identificamos ${symptomScore + 1} gatilhos que podem estar causando seus sintomas. Mas existem outros gatilhos ocultos que talvez estejam escondidos.</p>
            <button class="cta-btn" onclick="goToOffer()">QUERO DESCOBRIR OS GATILHOS OCULTOS</button>
        </div>
    `;
    document.querySelector('.progress-section').style.display = 'none';
}

function goToOffer() { window.location.href = 'oferta.html'; }

document.addEventListener('DOMContentLoaded', initQuiz);
