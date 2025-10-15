// Variables de la ruleta
let currentCategory = '';
let isSpinning = false;
let currentRotation = 0;

// Función para girar la ruleta
function spinWheel() {
    if (isSpinning) return;
    
    const wheel = document.getElementById('wheel');
    const spinButton = document.querySelector('.spin-button');
    spinButton.disabled = true;
    spinButton.style.opacity = '0.5';
    spinButton.style.cursor = 'not-allowed';
    
    const minimumSpins = 2;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = (minimumSpins * 360) + extraDegrees;
    
    isSpinning = true;
    currentRotation += totalDegrees;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        const normalizedDegrees = currentRotation % 360;
        currentCategory = normalizedDegrees < 180 ? 'español-guarani' : 'english-guarani';
        isSpinning = false;
        // Mostrar el tiempo cuando se detiene la ruleta
        document.querySelector('.time-display').style.display = 'block';
        showRandomQuestion();
    }, 3000);
}

// Función para habilitar el botón de girar
function enableSpinButton() {
    const spinButton = document.querySelector('.spin-button');
    spinButton.disabled = false;
    spinButton.style.opacity = '1';
    spinButton.style.cursor = 'pointer';
}

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} 