// script.js - Play beep on any key press

// Create an Audio object with the local file
const beep = new Audio('beep.mp3');
beep.preload = 'auto';

// Function to play the beep
function playBeep() {
    // Reset playback to start
    beep.currentTime = 0;

    // Play the sound and handle potential errors
    const playPromise = beep.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn('Playback failed. User interaction might be required.', error);
        });
    }
}

// Listen for any key press on the document
document.addEventListener('keydown', (event) => {
    // Prevent default actions for spacebar to avoid scrolling
    if (event.code === 'Space') {
        event.preventDefault();
    }
    playBeep();
});

// Also handle mouse clicks anywhere on the page
document.addEventListener('click', () => {
    playBeep();
});

// Service Worker registration (only works when served via HTTP/HTTPS, not file://)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered.', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}
