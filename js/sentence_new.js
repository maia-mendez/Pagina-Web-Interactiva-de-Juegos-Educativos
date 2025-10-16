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
                "Suele ir a la escuela"
            ]
        },
        {
            complete: "Mba'éichapa reiko",
            incomplete: "Mba'éichapa ___",
            missing: "reiko",
            translation: "¿Cómo estás?",
            hints: [
                "Es un saludo común",
                "Pregunta por el estado de la persona",
                "Equivale a '¿Cómo te va?'"
            ]
        },
        {
            complete: "Che areko jagua",
            incomplete: "Che ___ jagua",
            missing: "areko",
            translation: "Yo tengo un perro",
            hints: [
                "Es un animal doméstico",
                "Ladra",
                "Suele ser una mascota"
            ]
        }
    ],
    2: [ // Nivel Medio
        {
            complete: "Che sy omba'apo mercado pe",
            incomplete: "Che sy ___ mercado pe",
            missing: "omba'apo",
            translation: "Mi madre trabaja en el mercado",
            hints: [
                "Actividad laboral",
                "Lugar de compras",
                "Se refiere a la madre"
            ]
        },
        {
            complete: "Ára pytu'u jave ajepovera",
            incomplete: "Ára pytu'u jave ___",
            missing: "ajepovera",
            translation: "Durante el descanso me divierto",
            hints: [
                "Tiempo libre",
                "Actividad recreativa",
                "No es trabajo ni estudio"
            ]
        },
        {
            complete: "Che ambo'e guarani mitãnguéra pe",
            incomplete: "Che ___ guarani mitãnguéra pe",
            missing: "ambo'e",
            translation: "Yo enseño guaraní a los niños",
            hints: [
                "Acción de un docente",
                "Lengua indígena",
                "Destinatarios: niños"
            ]
        }
    ],
    3: [ // Nivel Difícil
        {
            complete: "Ñande ypykuéra ohekombo'e chupe kuéra",
            incomplete: "Ñande ypykuéra ___ chupe kuéra",
            missing: "ohekombo'e",
            translation: "Nuestros ancestros les enseñaron",
            hints: [
                "Acción en el pasado",
                "Se refiere a antepasados",
                "Transmisión de conocimientos"
            ]
        },
        {
            complete: "Teko porã rehegua ñañemongeta",
            incomplete: "Teko porã rehegua ___",
            missing: "ñañemongeta",
            translation: "Conversamos sobre el buen vivir",
            hints: [
                "Diálogo o charla",
                "Tema de valores y bienestar",
                "Concepto: ‘buen vivir’"
            ]
        },
        {
            complete: "Ñamombarete ñane ñe'ẽ guarani",
            incomplete: "Ñamombarete ñane ___ guarani",
            missing: "ñe'ẽ",
            translation: "Fortalecemos nuestra lengua guaraní",
            hints: [
                "Preservar el idioma",
                "Identidad cultural",
                "Hacer más fuerte"
            ]
        }
    ]
};

let currentLevel = 1;
let currentSentence = null;
let usedIndicesByLevel = { 1: [], 2: [], 3: [] };
let lastIndexByLevel = { 1: null, 2: null, 3: null };

// Inicializar el juego
function initializeSentenceGame() {
    document.querySelector('.sentence-game').style.display = 'block';
    selectLevel(1); // Comenzar en nivel fácil
}

// Seleccionar nivel
function selectLevel(level) {
    currentLevel = level;
    document.querySelectorAll('.level-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Actualizar indicador de nivel
    const levelText = level === 1 ? 'Fácil' : level === 2 ? 'Medio' : 'Difícil';
    document.getElementById('currentLevel').textContent = levelText;
    
    loadNewSentence();
}

// Cargar nueva oración
function loadNewSentence() {
    const levelSentences = sentences[currentLevel];
    if (!levelSentences || levelSentences.length === 0) return;

    // Construir lista de índices disponibles (no usados aún)
    const totalIndices = levelSentences.map((_, idx) => idx);
    let available = totalIndices.filter(idx => !usedIndicesByLevel[currentLevel].includes(idx));

    // Si se agotaron, reiniciar usados y evitar repetir el último inmediato
    if (available.length === 0) {
        usedIndicesByLevel[currentLevel] = [];
        available = totalIndices.filter(idx => idx !== lastIndexByLevel[currentLevel]);
    }

    // Elegir aleatoriamente un índice disponible
    const chosenIndex = available[Math.floor(Math.random() * available.length)];
    currentSentence = levelSentences[chosenIndex];
    usedIndicesByLevel[currentLevel].push(chosenIndex);
    lastIndexByLevel[currentLevel] = chosenIndex;
    
    document.getElementById('incompleteSentence').textContent = currentSentence.incomplete;
    document.getElementById('translationText').textContent = currentSentence.translation;
    document.getElementById('userInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('correctAnswer').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('userInput').focus();
}

// Verificar respuesta
function checkAnswer() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    const correctAnswer = currentSentence.missing.toLowerCase();
    const feedback = document.getElementById('feedback');
    
    if (userInput === correctAnswer) {
        feedback.textContent = '¡Correcto! ¡Muy bien!';
        feedback.className = 'feedback correct';
        document.getElementById('nextButton').style.display = 'block';
        document.getElementById('userInput').disabled = true;
    } else {
        feedback.textContent = 'Incorrecto. ¡Intenta de nuevo!';
        feedback.className = 'feedback incorrect';
        document.getElementById('correctAnswer').textContent = `La palabra correcta era: ${currentSentence.missing}`;
        document.getElementById('correctAnswer').style.display = 'block';
    }
}

// Event listener para el input
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});
