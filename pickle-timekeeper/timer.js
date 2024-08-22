// timer.js

// Global variables
let timer;
let isRunning = false;
let seconds = 0;
let speed = 1;

// DOM element references
const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const speedSelector = document.getElementById('speed-selector');

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modifierKey = isMac ? 'Cmd' : 'Ctrl';
const ctrlKey = 'ctrlKey'; // Use Ctrl for all platforms

// Timer functions
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
}

function updateTimer() {
    if (isRunning) {
        seconds += speed;
        renderTime();
        saveTimerState();
    }
}

function renderTime() {
    const formattedTime = formatTime(Math.floor(seconds));
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Pickle Timekeeper`;
}

function saveTimerState() {
    // console.log('Saving state:', { seconds, isRunning });
    localStorage.setItem('timerSeconds', seconds);
    localStorage.setItem('timerLastUpdated', Date.now());
    localStorage.setItem('timerIsRunning', isRunning);
}

function loadTimerState() {
    const savedSeconds = localStorage.getItem('timerSeconds');
    const lastUpdated = localStorage.getItem('timerLastUpdated');
    const savedIsRunning = localStorage.getItem('timerIsRunning');

    // console.log('Loading state:', { savedSeconds, lastUpdated, savedIsRunning });

    if (savedSeconds && lastUpdated && savedIsRunning) {
        seconds = parseFloat(savedSeconds);
        isRunning = savedIsRunning === 'true';

        if (isRunning) {
            const elapsedSeconds = (Date.now() - parseInt(lastUpdated)) / 1000;
            seconds += elapsedSeconds * speed;
            startTimer();
        }

        renderTime();
        startStopBtn.textContent = isRunning ? 'Stop' : 'Start';
    }
}

function startTimer() {
    timer = setInterval(updateTimer, 1000 / speed);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        document.title = 'Pickle Timekeeper';
    } else {
        startTimer();
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
    saveTimerState();
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0; // Reset seconds to 0
    isRunning = false;
    renderTime();
    startStopBtn.textContent = 'Start';
    saveTimerState();
}

function toggleTimeSpeed() {
    const currentIndex = Array.from(speedSelector.options).findIndex(option => option.selected);
    const nextIndex = (currentIndex + 1) % speedSelector.options.length;
    speedSelector.selectedIndex = nextIndex;
    speed = parseFloat(speedSelector.value);
    if (isRunning) {
        clearInterval(timer);
        startTimer();
    }
}

// Initialize the timer state on page load
loadTimerState();