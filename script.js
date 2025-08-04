const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
let currentAnswer = '';

// 알파벳별 대표 단어와 이미지 (이미지는 무료 이미지 주소 사용)
const alphabetData = {
    A: { word: 'Apple', img: 'https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_1280.jpg' },
    B: { word: 'Bear', img: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/animal-1867121_1280.jpg' },
    C: { word: 'Cat', img: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg' },
    D: { word: 'Dog', img: 'https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-1207816_1280.jpg' },
    E: { word: 'Elephant', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/elephant-1958426_1280.jpg' },
    F: { word: 'Fish', img: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/fish-1232733_1280.jpg' },
    G: { word: 'Giraffe', img: 'https://cdn.pixabay.com/photo/2013/07/18/10/56/giraffe-163835_1280.jpg' },
    H: { word: 'Horse', img: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/horse-1995595_1280.jpg' },
    I: { word: 'Ice cream', img: 'https://cdn.pixabay.com/photo/2017/06/10/07/18/ice-cream-2382017_1280.jpg' },
    J: { word: 'Juice', img: 'https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_1280.jpg' },
    K: { word: 'Kangaroo', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/kangaroo-1958430_1280.jpg' },
    L: { word: 'Lion', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/lion-1958432_1280.jpg' },
    M: { word: 'Monkey', img: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/animal-1867122_1280.jpg' },
    N: { word: 'Nest', img: 'https://cdn.pixabay.com/photo/2016/03/27/19/40/bird-nest-1283765_1280.jpg' },
    O: { word: 'Owl', img: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/owl-1867123_1280.jpg' },
    P: { word: 'Penguin', img: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/penguin-1867124_1280.jpg' },
    Q: { word: 'Queen', img: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/crown-2022168_1280.png' },
    R: { word: 'Rabbit', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/rabbit-1958433_1280.jpg' },
    S: { word: 'Sun', img: 'https://cdn.pixabay.com/photo/2012/04/13/00/22/sun-31223_1280.png' },
    T: { word: 'Tiger', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/tiger-1958434_1280.jpg' },
    U: { word: 'Umbrella', img: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/umbrella-312563_1280.png' },
    V: { word: 'Violin', img: 'https://cdn.pixabay.com/photo/2014/12/21/23/50/violin-579483_1280.png' },
    W: { word: 'Whale', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/whale-1958435_1280.jpg' },
    X: { word: 'Xylophone', img: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/xylophone-1290092_1280.png' },
    Y: { word: 'Yak', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/yak-1958436_1280.jpg' },
    Z: { word: 'Zebra', img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/zebra-1958437_1280.jpg' }
};

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
    // 단어/이미지 숨기기
    document.getElementById('wordArea').style.display = 'none';
}

document.getElementById('answerBtn').onclick = function() {
    const data = alphabetData[currentAnswer];
    if (data) {
        document.getElementById('wordImg').src = data.img;
        document.getElementById('wordImg').alt = data.word;
        document.getElementById('wordText').textContent = data.word;
        document.getElementById('wordArea').style.display = 'flex';
        speak(currentAnswer + '. ' + data.word);
    } else {
        document.getElementById('wordArea').style.display = 'none';
        speak(currentAnswer);
    }
    document.getElementById('nextBtn').disabled = false;
};

document.getElementById('nextBtn').onclick = showQuestion;

// 첫 문제 표시
showQuestion();
