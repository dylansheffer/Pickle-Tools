// notes.js

// DOM element references
const noteInput = document.getElementById('noteInput');
const submitNoteBtn = document.getElementById('submitNote');
const notesDisplay = document.getElementById('notes-display');
const downloadCSVBtn = document.getElementById('downloadCSV');
const copyToClipboardBtn = document.getElementById('copyToClipboard');
const clearBtn = document.getElementById('clear');

// Note functions
function submitNote() {
    const note = noteInput.value.trim();
    if (note) {
        const timestamp = formatTime(Math.floor(seconds));
        const noteObj = { timestamp, note };
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        noteInput.value = '';
    }
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notesDisplay.innerHTML = notes.map(n => `<p><strong>${n.timestamp}</strong>: ${n.note}</p>`).join('');
}

function downloadCSV() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Note\n";
    csvContent += notes.map(n => `${n.timestamp},"${n.note.replace(/"/g, '""')}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pickle_timekeeper_notes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyToClipboard() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const textContent = notes.map(n => `${n.timestamp}: ${n.note.replace(/\n/g, '\n    ')}`).join("\n\n");
    navigator.clipboard.writeText(textContent).then(() => {
        alert('Notes copied to clipboard!');
    });
}

function clearAll() {
    if (confirm('Are you sure you want to clear all notes and reset the timer?')) {
        localStorage.removeItem('notes');
        noteInput.value = ''; // Clear the text area
        displayNotes();
        resetTimer();
    }
}