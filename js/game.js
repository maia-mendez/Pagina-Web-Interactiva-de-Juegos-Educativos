// Variables del juego
let score = 0;
let timeLeft = 10;
let timer;
let usedQuestions = new Set();
let hasAnswered = false;
let currentGame = 'trivia';

// Función para cambiar entre juegos
function switchGame(gameType) {
    currentGame = gameType;
    
    // Ocultar todos los contenedores de juego
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.sentence-game').style.display = 'none';
    document.querySelector('#triviaContent').style.display = 'none';
    document.querySelector('.time-display').style.display = 'none';
    document.querySelector('.score').style.display = 'none';
    const titleEl = document.getElementById('gameTitle');

    // Mostrar el juego seleccionado
    switch(gameType) {
        case 'trivia':
            document.querySelector('.question-container').style.display = 'none';
            document.querySelector('#triviaContent').style.display = 'block';
            document.querySelector('.score').style.display = 'block';
            // El tiempo se mostrará solo después de girar la ruleta
            if (titleEl) titleEl.textContent = 'Trivia Guaraní';
            break;
        case 'sentence':
            document.querySelector('.sentence-game').style.display = 'block';
            if (typeof loadNewSentence === 'function') {
                loadNewSentence();
            }
            if (titleEl) titleEl.textContent = 'Ordenación de Oraciones';
            break;
        case 'numbers':
            document.querySelector('.numbers-game').style.display = 'block';
            if (typeof numbersInit === 'function') {
                numbersInit();
            }
            if (titleEl) titleEl.textContent = 'Emparejar Números y Palabras';
            break;
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Empezar con el juego de trivia
    switchGame('trivia');
});

// Función para mostrar una pregunta aleatoria
function showRandomQuestion() {
    const availableQuestions = questions[currentCategory].filter((_, index) => !usedQuestions.has(index));
    
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions.push(...questions[currentCategory]);
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    const originalIndex = questions[currentCategory].indexOf(question);
    usedQuestions.add(originalIndex);

    showQuestion(question);
}

// Función para mostrar una pregunta
function showQuestion(question) {
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('options');
    
    hasAnswered = false;
    // Ocultar la ruleta para evitar solapamientos que bloqueen clics
    const triviaContent = document.getElementById('triviaContent');
    if (triviaContent) triviaContent.style.display = 'none';
    questionContainer.style.display = 'block';
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    shuffleArray([...question.options]).forEach(option => {
        const button = document.createElement('button');
        button.className = 'button answer-button';
        button.type = 'button';
        button.textContent = option;
        button.addEventListener('click', function handleClick() {
            checkTriviaAnswer(option, question);
        });
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Funciones del temporizador
function startTimer() {
    updateTimerDisplay();
    const timerProgress = document.getElementById('timerProgress');
    timerProgress.style.width = `${(timeLeft/10) * 100}%`;
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        timerProgress.style.width = `${(timeLeft/10) * 100}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult('¡Se acabó el tiempo! ¡Juego terminado!', false);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function updateTimerDisplay() {
    document.getElementById('timeDisplay').textContent = timeLeft;
}

// Función para verificar respuesta
function checkTriviaAnswer(selectedOption, question) {
    if (hasAnswered) return;
    
    hasAnswered = true;
    const buttons = document.querySelectorAll('.answer-button');
    
    buttons.forEach(button => {
        if (button.textContent === selectedOption) {
            if (selectedOption === question.correct) {
                button.classList.add('correct');
                score += 10;
                timeLeft += 1;
                document.getElementById('score').textContent = score;
                showResult('¡Correcto! +10 puntos y +1 segundo', true);
            } else {
                button.classList.add('incorrect');
                button.classList.add('shake');
                timeLeft -= 5;
                if (timeLeft < 0) timeLeft = 0;
                const correctAnswer = question.correct;
                showResult(`Incorrecto. La respuesta correcta era: ${correctAnswer}\n-5 segundos`, false);
            }
        }
    });
}

// Funciones de resultado y continuación
function showResult(message, isCorrect) {
    const resultMessage = document.getElementById('resultMessage');
    const resultText = document.getElementById('resultText');
    const continueBtn = resultMessage.querySelector('.continue-button');
    
    resultText.textContent = message;
    resultMessage.style.display = 'block';
    
    // Asegurar que el botón continuar esté habilitado
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
    continueBtn.style.cursor = 'pointer';
    
    // Pausar el timer
    pauseTimer();
    
    // Ocultar el contenedor de preguntas
    document.getElementById('questionContainer').style.display = 'none';
}

function continueGame() {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.style.display = 'none';
    
    // Ocultar el contenedor de preguntas si aún está visible
    document.getElementById('questionContainer').style.display = 'none';
    // Volver a mostrar la ruleta para poder girar de nuevo
    const triviaContent = document.getElementById('triviaContent');
    if (triviaContent) triviaContent.style.display = 'block';
    
    if (timeLeft > 0) {
        enableSpinButton();
    } else {
        // Reiniciar juego
        score = 0;
        timeLeft = 10;
        document.getElementById('score').textContent = score;
        usedQuestions.clear();
        enableSpinButton();
    }
} 