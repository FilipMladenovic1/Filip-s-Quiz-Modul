// Fragen und Antworten werden im JSON-Objekt gespeichert
const quizData = [
    {
        question: "Was ist die Hauptstadt von Deutschland?",
        a: "Berlin",
        b: "Hamburg",
        c: "München",
        d: "Frankfurt",
        correct: "a"
    },
    {
        question: "Welche Programmiersprache wird im Web am häufigsten verwendet?",
        a: "Java",
        b: "Python",
        c: "JavaScript",
        d: "C++",
        correct: "c"
    },
    {
        question: "Welches Tier ist das größte auf der Erde?",
        a: "Elefant",
        b: "Blauwal",
        c: "Giraffe",
        d: "Nilpferd",
        correct: "b"
    },
    {
        question: "Wie viele Kontinente gibt es auf der Erde?",
        a: "5",
        b: "6",
        c: "7",
        d: "8",
        correct: "c"
    },
    {
        question: "Wer hat die Relativitätstheorie formuliert?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileo Galilei",
        d: "Nikola Tesla",
        correct: "b"
    }
];

// Initialisiere Variablen für die aktuelle Frage, den Punktestand und die gegebenen Antworten
let currentQuizIndex = 0;
let score = 0;
let answers = Array(quizData.length).fill(null); // Array zum Speichern der Antworten
let hasScored = Array(quizData.length).fill(false); // Array zum Speichern, ob eine Frage schon gewertet wurde

// DOM-Elemente werden gespeichert
const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressText = document.getElementById('progress');

// Quiz-Daten laden und anzeigen
function loadQuiz() {
    clearQuiz(); // Lösche den alten Inhalt

    // Lade aktuelle Quizdaten
    const currentQuizData = quizData[currentQuizIndex];

    // Zeige die Frage und Antwortmöglichkeiten
    const questionHTML = `<h2>${currentQuizData.question}</h2>`;
    const optionsHTML = `
        <label><input type="radio" name="answer" value="a"> ${currentQuizData.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuizData.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuizData.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuizData.d}</label>
    `;

    quizContainer.innerHTML = questionHTML + optionsHTML;

    // Fortschrittsanzeige aktualisieren
    updateProgress();

    // Wähle die gespeicherte Antwort aus, wenn vorhanden
    if (answers[currentQuizIndex] !== null) {
        document.querySelector(`input[name="answer"][value="${answers[currentQuizIndex]}"]`).checked = true;
    }

    // Überprüfe, ob der Zurück-Button aktiviert oder deaktiviert werden sollte
    prevBtn.disabled = currentQuizIndex === 0; // Deaktivieren, wenn auf der ersten Frage
    nextBtn.style.display = 'inline-block'; // Sicherstellen, dass der Weiter-Button sichtbar ist
}

// Fortschritt anzeigen
function updateProgress() {
    if (currentQuizIndex < quizData.length) {
        progressText.textContent = `Frage ${currentQuizIndex + 1} von ${quizData.length}`;
    } else {
        progressText.textContent = 'Das Quiz ist zu Ende. Vielen Dank für deine Teilnahme!';
    }
}

// Funktion, um den Punktestand zu berechnen und den Benutzer zu benachrichtigen
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    // Überprüfen, ob eine Antwort ausgewählt wurde
    if (!selectedAnswer) {
        alert("Bitte wählen Sie eine Antwort aus!");
        return false; // Frühzeitiges Beenden der Funktion
    }

    // Speichere die Antwort des Nutzers
    const userAnswer = selectedAnswer.value;
    answers[currentQuizIndex] = userAnswer;

    // Überprüfe, ob die Antwort korrekt ist
    const correctAnswer = quizData[currentQuizIndex].correct;
    const isCorrect = userAnswer === correctAnswer;

    // Gebe Feedback zur Antwort
    displayFeedback(isCorrect);

    // Prüfen, ob die Antwort korrekt ist und der Punkt noch nicht gezählt wurde
    if (!hasScored[currentQuizIndex] && isCorrect) {
        score++;
        hasScored[currentQuizIndex] = true; // Markiere diese Frage als gewertet
    } else if (hasScored[currentQuizIndex] && !isCorrect) {
        score--; // Punkt abziehen, falls der Benutzer die Antwort ändert und sie falsch wird
        hasScored[currentQuizIndex] = false;
    }

    return true; // Antwort wurde ausgewählt
}

// Funktion, um anzuzeigen, ob die Antwort des Nutzers richtig oder falsch ist
function displayFeedback(isCorrect) {
    // Erstelle eine HTML-Nachricht basierend auf der Richtigkeit der Antwort
    const feedbackMessage = isCorrect ? "Richtig!" : "Falsch!";
    const feedbackClass = isCorrect ? 'feedback correct' : 'feedback wrong';

    // Erstelle eine neue HTML-Div für das Feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = feedbackClass;
    feedbackDiv.textContent = feedbackMessage;

    // Füge das Feedback zur Quiz-Container hinzu
    quizContainer.appendChild(feedbackDiv);

    // Entferne das Feedback nach einigen Sekunden
    setTimeout(() => {
        feedbackDiv.remove();
    }, 2000); // Feedback wird nach 2 Sekunden entfernt
}

// Button-Event-Listener für den "Weiter"-Button
nextBtn.addEventListener('click', () => {
    // Überprüfen, ob der Nutzer eine Antwort ausgewählt hat
    if (checkAnswer()) {
        // Warte 2 Sekunden, bevor die nächste Frage geladen wird
        setTimeout(() => {
            currentQuizIndex++;

            // Zeige nächste Frage oder das Endergebnis
            if (currentQuizIndex < quizData.length) {
                loadQuiz();
            } else {
                showResults();
            }
        }, 2000); // Warte 2 Sekunden, um das Feedback sichtbar zu halten
    }
});

// Button-Event-Listener für den "Zurück"-Button
prevBtn.addEventListener('click', () => {
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
        loadQuiz();
    }
});

// Zeige das Endergebnis
function showResults() {
    quizContainer.innerHTML = `<h2>Du hast ${score} von ${quizData.length} Fragen richtig beantwortet.</h2>`;
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    // Fortschrittsanzeige am Ende deaktivieren oder ändern
    progressText.textContent = 'Das Quiz ist zu Ende. Vielen Dank für deine Teilnahme!';
}

// Vorherigen Quiz-Inhalt löschen
function clearQuiz() {
    quizContainer.innerHTML = '';
}

// Initialisiere das Quiz
loadQuiz();