# Filip's Quiz-Modul

## Übersicht

Diese Quiz-App ist eine einfache Webanwendung, die dem Nutzer eine Reihe von Multiple-Choice-Fragen stellt. Die App ermöglicht es, die Fragen durchzublättern und die ausgewählten Antworten zu überprüfen. Am Ende des Quiz wird eine Auswertung angezeigt, die die Anzahl der richtig beantworteten Fragen angibt.

## Funktionsweise

1. **Fragen und Antworten**: Die Fragen und Antworten sind in einem JavaScript-Array (`quizData`) im Format von JSON-Objekten gespeichert. Jede Frage bietet vier mögliche Antworten, von denen eine korrekt ist.
   
2. **Navigation**: Nutzer können mit den Buttons "Weiter" und "Zurück" zwischen den Fragen navigieren. Es wird auch gespeichert, welche Antworten der Nutzer bei jeder Frage ausgewählt hat, sodass diese bei der Rückkehr zur Frage angezeigt werden.

3. **Bewertung**: Nachdem der Nutzer eine Antwort ausgewählt hat, wird überprüft, ob diese korrekt ist. Ein kleines Feedback ("Richtig!" oder "Falsch!") wird dem Nutzer für kurze Zeit angezeigt.

4. **Punktestand**: Die Punkte werden gezählt, sobald eine richtige Antwort gegeben wurde. Ändert der Nutzer seine Antwort zu einer falschen, wird der Punkt wieder abgezogen.

5. **Endergebnis**: Am Ende des Quiz wird das Endergebnis angezeigt, das die Anzahl der korrekt beantworteten Fragen enthält.

## Projektstruktur

- **index.html**: Diese Datei enthält die HTML-Struktur der Quiz-App.
- **styles.css**: Hier werden die Styles für die Quiz-App definiert. Es werden allgemeine Stile für die Seite, den Quiz-Container, die Buttons und das Feedback verwendet.
- **script.js**: Der wichtigste Teil der Anwendung. Hier wird die gesamte Logik des Quiz implementiert. Es enthält Funktionen, um das Quiz zu laden, Antworten zu überprüfen, Feedback zu geben und den Fortschritt anzuzeigen.
- **README.md**: Diese Datei beschreibt die Funktionsweise der App und wie sie aufgebaut ist.

## Installation und Anwendung

1. Klone das Repository auf deinen lokalen Computer.

2. Öffne die index.html-Datei in einem Browser.