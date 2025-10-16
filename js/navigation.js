// Funciones de navegación entre páginas

function goToInfoPage() {
    // Reproducir sonido de clic antes de navegar
    if (typeof soundManager !== 'undefined') {
        soundManager.playClickSound();
    }
    // Redirigir a la página de información
    setTimeout(() => {
        window.location.href = 'info.html';
    }, 150);
}

function goToMainPage() {
    // Reproducir sonido de clic antes de navegar
    if (typeof soundManager !== 'undefined') {
        soundManager.playClickSound();
    }
    // Redirigir a la página principal
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 150);
}

function toggleSounds() {
    if (typeof soundManager !== 'undefined') {
        const isEnabled = soundManager.toggleSounds();
        const soundToggle = document.getElementById('soundToggle');
        
        if (soundToggle) {
            soundToggle.textContent = isEnabled ? '🔊' : '🔇';
            soundToggle.title = isEnabled ? 'Sonidos activados' : 'Sonidos desactivados';
        }
        
        // Reproducir sonido de confirmación si los sonidos están habilitados
        if (isEnabled) {
            soundManager.playClickSound();
        }
    }
}
