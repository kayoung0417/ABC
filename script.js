const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
let currentAnswer = '';

function pickRandom() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
}

function showQuestion() {
    currentAnswer = pickRandom();
    document.getElementById('question').textContent = currentAnswer;
    document.getElementById('nextBtn').disabled = true;
}

document.getElementById('answerBtn').onclick = function() {
    speak(currentAnswer);
    document.getElementById('nextBtn').disabled = false;
};

document.getElementById('nextBtn').onclick = showQuestion;

// 첫 문제 표시
showQuestion();
