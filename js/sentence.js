// Base de datos de oraciones por nivel
const sentences = {
    1: [ // Nivel Fácil
        {
            complete: "Che ha'e peteĩ mitã",
            incomplete: "Che ha'e peteĩ ___",
            missing: "mitã",
            translation: "Yo soy un niño",
            hints: [
                "Es una persona joven",
                "Puede ser niño o niña",
                "Va a la escuela"
            ]
        },
        {
            complete: "Mba'éichapa reiko",
            incomplete: "Mba'éichapa ___",
            missing: "reiko",
            translation: "¿Cómo estás?"
        },
        {
            complete: "Che areko jagua",
            incomplete: "Che ___ jagua",
            missing: "areko",
            translation: "Yo tengo un perro"
        },
        {
            complete: "Che areko mbarakaja",
            incomplete: "Che ___ mbarakaja",
            missing: "areko",
            translation: "Yo tengo un gato"
        },
        {
            complete: "Ko'ẽ porã",
            incomplete: "Ko'ẽ ___",
            missing: "porã",
            translation: "Buenos días"
        },
        {
            complete: "Pyhare porã",
            incomplete: "Pyhare ___",
            missing: "porã",
            translation: "Buenas noches"
        },
        {
            complete: "Ha'e porã",
            incomplete: "Ha'e ___",
            missing: "porã",
            translation: "Él/Ella es bueno(a)"
        },
        {
            complete: "Nde porã",
            incomplete: "Nde ___",
            missing: "porã",
            translation: "Tú eres bueno(a)"
        },
        {
            complete: "Jagua tuicha",
            incomplete: "Jagua ___",
            missing: "tuicha",
            translation: "El perro es grande"
        },
        {
            complete: "Jagua michĩ",
            incomplete: "Jagua ___",
            missing: "michĩ",
            translation: "El perro es pequeño"
        }
    ],
    2: [ // Nivel Medio
        {
            complete: "Che sy omba'apo mercado pe",
            incomplete: "Che sy ___ mercado pe",
            missing: "omba'apo",
            translation: "Mi madre trabaja en el mercado"
        },
        {
            complete: "Ára pytu'u jave ajepovera",
            incomplete: "Ára pytu'u jave ___",
            missing: "ajepovera",
            translation: "Durante el descanso me divierto"
        },
        {
            complete: "Che ambo'e guarani mitãnguéra pe",
            incomplete: "Che ___ guarani mitãnguéra pe",
            missing: "ambo'e",
            translation: "Yo enseño guaraní a los niños"
        },
        {
            complete: "Ha'e oho mbo'ehao pe",
            incomplete: "Ha'e ___ mbo'ehao pe",
            missing: "oho",
            translation: "Él/Ella va a la escuela"
        },
        {
            complete: "Che aikuaa guarani",
            incomplete: "Che ___ guarani",
            missing: "aikuaa",
            translation: "Yo sé guaraní"
        },
        {
            complete: "Nde remba'apo heta",
            incomplete: "Nde ___ heta",
            missing: "remba'apo",
            translation: "Tú trabajas mucho"
        },
        {
            complete: "Ore rojogua tembi'u mercado pe",
            incomplete: "Ore ___ tembi'u mercado pe",
            missing: "rojogua",
            translation: "Nosotros compramos comida en el mercado"
        },
        {
            complete: "Che aha óga pe",
            incomplete: "Che ___ óga pe",
            missing: "aha",
            translation: "Yo voy a la casa"
        },
        {
            complete: "Ha'e ome'ẽ cheve y",
            incomplete: "Ha'e ___ cheve y",
            missing: "ome'ẽ",
            translation: "Él/Ella me da agua"
        },
        {
            complete: "Che añandu vy'a",
            incomplete: "Che ___ vy'a",
            missing: "añandu",
            translation: "Yo siento alegría"
        }
    ],
    3: [ // Nivel Difícil
        {
            complete: "Ñande ypykuéra ohekombo'e chupe kuéra",
            incomplete: "Ñande ypykuéra ___ chupe kuéra",
            missing: "ohekombo'e",
            translation: "Nuestros ancestros les enseñaron"
        },
        {
            complete: "Teko porã rehegua ñañemongeta",
            incomplete: "Teko porã rehegua ___",
            missing: "ñañemongeta",
            translation: "Conversamos sobre el buen vivir"
        },
        {
            complete: "Ñamombarete ñane ñe'ẽ guarani",
            incomplete: "Ñamombarete ñane ___ guarani",
            missing: "ñe'ẽ",
            translation: "Fortalecemos nuestra lengua guaraní"
        },
        {
            complete: "Peteĩ ára iporã muyrã",
            incomplete: "Peteĩ ára ___ muyrã",
            missing: "iporã",
            translation: "Algún día fue bueno"
        },
        {
            complete: "Roikuaase hetave guarani",
            incomplete: "Roikuaase ___ guarani",
            missing: "hetave",
            translation: "Queremos saber más guaraní"
        },
        {
            complete: "Tekoporã ñañangareko ñane yvyre",
            incomplete: "Tekoporã ___ ñane yvyre",
            missing: "ñañangareko",
            translation: "Con bienestar cuidamos nuestra tierra"
        },
        {
            complete: "Mborayhu rehe jajapo iporãva",
            incomplete: "Mborayhu rehe ___ iporãva",
            missing: "jajapo",
            translation: "Por amor hacemos lo bueno"
        },
        {
            complete: "Ñanduti rupive ñañomongeta",
            incomplete: "Ñanduti rupive ___",
            missing: "ñañomongeta",
            translation: "Conversamos a través de la red"
        },
        {
            complete: "Ñemoarandu rupi jahechakuaa heta mba'e",
            incomplete: "Ñemoarandu rupi ___ heta mba'e",
            missing: "jahechakuaa",
            translation: "Mediante el estudio comprendemos muchas cosas"
        },
        {
            complete: "Tekojoja rekávo jajapo iporãva",
            incomplete: "Tekojoja rekávo ___ iporãva",
            missing: "jajapo",
            translation: "Buscando justicia hacemos lo correcto"
        }
    ]
};

let currentLevel = 1;
let currentSentence = null;
let usedIndicesByLevel = { 1: [], 2: [], 3: [] };
let lastIndexByLevel = { 1: null, 2: null, 3: null };
let failedAttempts = 0;

// Inicializar el juego
function initializeSentenceGame() {
    document.querySelector('.sentence-game').style.display = 'block';
    selectLevel(1); // Comenzar en nivel fácil
}

// Seleccionar nivel
function selectLevel(level) {
    currentLevel = level;
    // Remover la clase active de todos los botones
    document.querySelectorAll('.level-button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Agregar la clase active al botón seleccionado
    document.querySelectorAll('.level-button')[level - 1].classList.add('active');
    
    // Actualizar indicador de nivel
    const levelText = level === 1 ? 'Fácil' : level === 2 ? 'Medio' : 'Difícil';
    document.getElementById('currentLevel').textContent = levelText;
    
    loadNewSentence();
}

// Cargar nueva oración
function loadNewSentence() {
    if (!sentences[currentLevel] || sentences[currentLevel].length === 0) {
        console.error('No hay oraciones disponibles para este nivel');
        return;
    }

    const levelSentences = sentences[currentLevel];
    const totalIndices = levelSentences.map((_, idx) => idx);
    let available = totalIndices.filter(idx => !usedIndicesByLevel[currentLevel].includes(idx));
    if (available.length === 0) {
        usedIndicesByLevel[currentLevel] = [];
        available = totalIndices.filter(idx => idx !== lastIndexByLevel[currentLevel]);
    }
    const chosenIndex = available[Math.floor(Math.random() * available.length)];
    currentSentence = levelSentences[chosenIndex];
    usedIndicesByLevel[currentLevel].push(chosenIndex);
    lastIndexByLevel[currentLevel] = chosenIndex;
    
    const incompleteSentence = document.getElementById('incompleteSentence');
    const translationText = document.getElementById('translationText');
    const userInput = document.getElementById('userInput');
    const feedback = document.getElementById('feedback');
    const correctAnswer = document.getElementById('correctAnswer');
    const nextButton = document.getElementById('nextButton');
    
    if (incompleteSentence) incompleteSentence.textContent = currentSentence.incomplete;
    if (translationText) translationText.textContent = currentSentence.translation;
    if (userInput) {
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
    }
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'feedback';
    }
    if (correctAnswer) correctAnswer.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    const revealButton = document.getElementById('revealButton');
    if (revealButton) {
        revealButton.disabled = true;
    }
    failedAttempts = 0;

    console.log('Oración cargada:', currentSentence.incomplete); // Para depuración
}

// Verificar respuesta
function checkAnswer() {
    const userInput = document.getElementById('userInput');
    const feedback = document.getElementById('feedback');
    const correctAnswer = document.getElementById('correctAnswer');
    const nextButton = document.getElementById('nextButton');

    if (!userInput || !feedback || !correctAnswer || !nextButton || !currentSentence) {
        console.error('Elementos faltantes en el DOM');
        return;
    }

    const userAnswer = userInput.value.trim().toLowerCase();
    const correctWord = currentSentence.missing.toLowerCase();
    
    if (userAnswer === correctWord) {
        feedback.textContent = '¡Correcto! ¡Muy bien!';
        feedback.className = 'feedback correct';
        nextButton.style.display = 'block';
        userInput.disabled = true;
    } else {
        feedback.textContent = 'Incorrecto. ¡Intenta de nuevo!';
        feedback.className = 'feedback incorrect';
        correctAnswer.textContent = `La palabra correcta era: ${currentSentence.missing}`;
        correctAnswer.style.display = 'none';
        failedAttempts += 1;
        const revealButton = document.getElementById('revealButton');
        if (revealButton && failedAttempts >= 3) {
            revealButton.disabled = false;
        }
    }
}

function revealAnswer() {
    const correctAnswer = document.getElementById('correctAnswer');
    const userInput = document.getElementById('userInput');
    const nextButton = document.getElementById('nextButton');
    if (correctAnswer) {
        correctAnswer.textContent = `La palabra correcta era: ${currentSentence.missing}`;
        correctAnswer.style.display = 'block';
    }
    if (userInput) userInput.disabled = true;
    if (nextButton) nextButton.style.display = 'block';
    const revealButton = document.getElementById('revealButton');
    if (revealButton) revealButton.disabled = true;
}

function setupAlphabetPanel() {
    const grid = document.querySelector('.alphabet-grid');
    const input = document.getElementById('userInput');
    if (!grid || !input) return;

    const addChar = (char) => {
        if (input.disabled) return;
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const before = input.value.substring(0, start);
        const after = input.value.substring(end);
        const insertText = char.toLowerCase();
        input.value = before + insertText + after;
        const newPos = before.length + insertText.length;
        input.focus();
        input.setSelectionRange(newPos, newPos);
    };

    grid.querySelectorAll('span').forEach(span => {
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => addChar(span.textContent.trim()));
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el event listener para el input
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }

    // Verificar si estamos en el juego de oraciones
    const sentenceGame = document.querySelector('.sentence-game');
    if (sentenceGame && sentenceGame.style.display === 'block') {
        initializeSentenceGame();
        setupAlphabetPanel();
    }
});

// Función para cambiar entre juegos
function switchGame(gameType) {
    const questionContainer = document.querySelector('.question-container');
    const sentenceGame = document.querySelector('.sentence-game');
    const triviaContent = document.querySelector('#triviaContent');
    const timeDisplay = document.querySelector('.time-display');
    const score = document.querySelector('.score');
    const numbersGame = document.querySelector('.numbers-game');

    // Ocultar TODOS los juegos primero
    if (questionContainer) questionContainer.style.display = 'none';
    if (sentenceGame) sentenceGame.style.display = 'none';
    if (triviaContent) triviaContent.style.display = 'none';
    if (timeDisplay) timeDisplay.style.display = 'none';
    if (score) score.style.display = 'none';
    if (numbersGame) numbersGame.style.display = 'none';

    // Mostrar solo el juego seleccionado
    switch(gameType) {
        case 'trivia':
            if (triviaContent) triviaContent.style.display = 'block';
            if (score) score.style.display = 'block';
            break;
        case 'sentence':
            if (sentenceGame) {
                sentenceGame.style.display = 'block';
                initializeSentenceGame();
                setupAlphabetPanel();
            }
            break;
        case 'numbers':
            if (numbersGame) {
                numbersGame.style.display = 'block';
                numbersInit();
            }
            break;
    }
}
