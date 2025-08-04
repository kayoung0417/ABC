const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
let currentAnswer = '';
let step = 0; // 0: 알파벳 문제, 1: 단어/이미지 보기

// 알파벳별 대표 단어와 이미지 (이미지는 무료 이미지 주소 사용)
const alphabetData = {
    A: { word: 'Apple', emoji: '🍎' },
    B: { word: 'Bear', emoji: '🐻' },
    C: { word: 'Cat', emoji: '🐱' },
    D: { word: 'Dog', emoji: '🐶' },
    E: { word: 'Elephant', emoji: '🐘' },
    F: { word: 'Fish', emoji: '🐟' },
    G: { word: 'Giraffe', emoji: '🦒' },
    H: { word: 'Horse', emoji: '🐴' },
    I: { word: 'Ice cream', emoji: '🍦' },
    J: { word: 'Juice', emoji: '🧃' },
    K: { word: 'Kangaroo', emoji: '🦘' },
    L: { word: 'Lion', emoji: '🦁' },
    M: { word: 'Monkey', emoji: '🐵' },
    N: { word: 'Nest', emoji: '🪺' },
    O: { word: 'Owl', emoji: '🦉' },
    P: { word: 'Penguin', emoji: '🐧' },
    Q: { word: 'Queen', emoji: '👸' },
    R: { word: 'Rabbit', emoji: '🐰' },
    S: { word: 'Sun', emoji: '☀️' },
    T: { word: 'Tiger', emoji: '🐯' },
    U: { word: 'Umbrella', emoji: '☂️' },
    V: { word: 'Violin', emoji: '🎻' },
    W: { word: 'Whale', emoji: '🐋' },
    X: { word: 'Xylophone', emoji: '🎼' },
    Y: { word: 'Yak', emoji: '🐂' },
    Z: { word: 'Zebra', emoji: '🦓' }
};

function pickRandom() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.5; // 느린 속도
    utter.pitch = 1.1; // 약간 밝은 느낌
    // 뉴욕식(미국 동부) 여성 목소리 우선 선택
    const voices = window.speechSynthesis.getVoices();
    // 뉴욕식은 직접 지정 불가, 미국 여성(유아 친화적) 우선
    let nyVoice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('samantha'))
        || voices.find(v => v.lang === 'en-US' && v.gender === 'female')
        || voices.find(v => v.lang === 'en-US');
    if (nyVoice) utter.voice = nyVoice;
    // 일부 브라우저는 getVoices()가 비동기로 동작하므로, voiceschanged 이벤트 활용
    if (!nyVoice && typeof speechSynthesis !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices2 = window.speechSynthesis.getVoices();
            let nyVoice2 = voices2.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
                || voices2.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('samantha'))
                || voices2.find(v => v.lang === 'en-US' && v.gender === 'female')
                || voices2.find(v => v.lang === 'en-US');
            if (nyVoice2) {
                utter.voice = nyVoice2;
                window.speechSynthesis.speak(utter);
            }
        };
    } else {
        window.speechSynthesis.speak(utter);
    }
}

function showQuestion() {
    currentAnswer = pickRandom();
    document.getElementById('question').textContent = currentAnswer;
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('answerBtn').disabled = false;
    document.getElementById('wordArea').style.display = 'none';
    step = 0;
}


document.getElementById('answerBtn').onclick = function() {
    if (step === 0) {
        speak(currentAnswer);
        document.getElementById('answerBtn').disabled = true;
        step = 1;
    }
};


document.getElementById('nextBtn').onclick = function() {
    if (step === 1) {
        // 단어/이모지 보여주고 단어 읽어주기
        const data = alphabetData[currentAnswer];
        if (data) {
            // 이미지 대신 이모지 표시
            const wordImg = document.getElementById('wordImg');
            wordImg.src = '';
            wordImg.alt = data.word;
            wordImg.style.display = 'none';
            // 이모지용 span 추가/활성화
            let emojiSpan = document.getElementById('emojiSpan');
            if (!emojiSpan) {
                emojiSpan = document.createElement('span');
                emojiSpan.id = 'emojiSpan';
                emojiSpan.style.fontSize = '4.5rem';
                emojiSpan.style.display = 'block';
                emojiSpan.style.marginBottom = '8px';
                document.getElementById('wordArea').insertBefore(emojiSpan, wordImg);
            }
            emojiSpan.textContent = data.emoji;
            emojiSpan.style.display = 'block';
            document.getElementById('wordText').textContent = data.word;
            document.getElementById('wordArea').style.display = 'flex';
            speak(data.word);
        } else {
            document.getElementById('wordArea').style.display = 'none';
        }
        document.getElementById('answerBtn').disabled = true;
        step = 2;
    } else if (step === 2) {
        // 다음 문제로 이동
        // 이모지 span 숨기기
        let emojiSpan = document.getElementById('emojiSpan');
        if (emojiSpan) emojiSpan.style.display = 'none';
        showQuestion();
    }
};

// 첫 문제 표시
showQuestion();
