// Sistema de sonidos para la aplicación
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.isEnabled = true;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            // Crear contexto de audio
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API no soportada:', error);
            this.isEnabled = false;
        }
    }

    // Generar sonido de clic
    playClickSound() {
        if (!this.isEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Configurar el sonido
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime); // Frecuencia alta para sonido de clic
            oscillator.type = 'sine';

            // Configurar volumen (envelope)
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

            // Reproducir sonido
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.warn('Error reproduciendo sonido de clic:', error);
        }
    }

    // Generar sonido de hover
    playHoverSound() {
        if (!this.isEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Configurar el sonido más suave
            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
            oscillator.type = 'sine';

            // Configurar volumen más bajo
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
        } catch (error) {
            console.warn('Error reproduciendo sonido de hover:', error);
        }
    }

    // Generar sonido de éxito
    playSuccessSound() {
        if (!this.isEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Sonido ascendente
            oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
            oscillator.frequency.linearRampToValueAtTime(659, this.audioContext.currentTime + 0.2); // E5
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (error) {
            console.warn('Error reproduciendo sonido de éxito:', error);
        }
    }

    // Generar sonido de error
    playErrorSound() {
        if (!this.isEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Sonido descendente
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(200, this.audioContext.currentTime + 0.2);
            oscillator.type = 'sawtooth';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        } catch (error) {
            console.warn('Error reproduciendo sonido de error:', error);
        }
    }

    // Habilitar/deshabilitar sonidos
    toggleSounds() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }
}

// Crear instancia global del gestor de sonidos
const soundManager = new SoundManager();

// Función para agregar sonidos a todos los botones
function addClickSoundsToButtons() {
    // Agregar sonido de clic a todos los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // Sonido de clic
        button.addEventListener('click', () => {
            soundManager.playClickSound();
        });

        // Sonido de hover (opcional, más sutil)
        button.addEventListener('mouseenter', () => {
            // Solo reproducir hover sound ocasionalmente para no ser molesto
            if (Math.random() < 0.3) { // 30% de probabilidad
                soundManager.playHoverSound();
            }
        });
    });
}

// Función para agregar sonidos específicos a funciones del juego
function playGameSound(type) {
    switch(type) {
        case 'success':
            soundManager.playSuccessSound();
            break;
        case 'error':
            soundManager.playErrorSound();
            break;
        case 'click':
            soundManager.playClickSound();
            break;
        default:
            soundManager.playClickSound();
    }
}

// Función para integrar sonidos con funciones del juego existentes
function integrateGameSounds() {
    // Interceptar funciones existentes para agregar sonidos
    const originalContinueGame = window.continueGame;
    if (originalContinueGame) {
        window.continueGame = function() {
            soundManager.playClickSound();
            return originalContinueGame.apply(this, arguments);
        };
    }

    // Interceptar checkAnswer para el juego de oraciones
    const originalCheckAnswer = window.checkAnswer;
    if (originalCheckAnswer) {
        window.checkAnswer = function() {
            soundManager.playClickSound();
            return originalCheckAnswer.apply(this, arguments);
        };
    }

    // Interceptar spinWheel para la ruleta
    const originalSpinWheel = window.spinWheel;
    if (originalSpinWheel) {
        window.spinWheel = function() {
            soundManager.playClickSound();
            return originalSpinWheel.apply(this, arguments);
        };
    }
}

// Inicializar sonidos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    addClickSoundsToButtons();
    integrateGameSounds();
    
    // Configurar el estado inicial del botón de sonido
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.title = 'Sonidos activados';
    }
});
