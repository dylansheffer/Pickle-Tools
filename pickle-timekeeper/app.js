// app.js

// DOM element references
const showShortcutsBtn = document.getElementById('showShortcuts');
const shortcutsDialog = document.getElementById('shortcuts-dialog');
const closeShortcutsBtn = document.getElementById('closeShortcuts');

// Update shortcut texts
document.getElementById('startStopShortcut').textContent = `Ctrl + S`;
document.getElementById('resetShortcut').textContent = `Ctrl + R`;
document.getElementById('clearShortcut').textContent = `Ctrl + Shift + X`;
document.getElementById('toggleSpeedShortcut').textContent = `Ctrl + T`;
document.getElementById('submitNoteShortcut').textContent = `${modifierKey} + Enter`;
document.getElementById('copyShortcut').textContent = `Ctrl + Shift + C`;
document.getElementById('showShortcutsShortcut').textContent = `${modifierKey} + /`;

noteInput.placeholder = `Enter your note here (${modifierKey} + Enter to submit)`;

// Event listeners
startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
clearBtn.addEventListener('click', clearAll);
submitNoteBtn.addEventListener('click', submitNote);
downloadCSVBtn.addEventListener('click', downloadCSV);
copyToClipboardBtn.addEventListener('click', copyToClipboard);
speedSelector.addEventListener('change', () => {
    speed = parseFloat(speedSelector.value);
    if (isRunning) {
        clearInterval(timer);
        startTimer();
    }
});

showShortcutsBtn.addEventListener('click', () => shortcutsDialog.showModal());
closeShortcutsBtn.addEventListener('click', () => shortcutsDialog.close());

function handleKeyboardShortcut(e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        toggleTimer();
    } else if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetTimer();
    } else if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        clearAll();
    } else if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTimeSpeed();
    } else if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToClipboard();
    } else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        shortcutsDialog.showModal();
    }
}

document.addEventListener('keydown', handleKeyboardShortcut);

noteInput.addEventListener('keydown', (e) => {
    if ((isMac && e.metaKey && e.key === 'Enter') || (!isMac && e.ctrlKey && e.key === 'Enter')) {
        e.preventDefault();
        submitNote();
    }
});

// Initialize the app
loadTimerState();
displayNotes();