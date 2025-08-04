// 알록달록한 색상 배열 (유치원생이 좋아할 만한 색)
const COLORS = [
  '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#F7786B', '#034F84', '#B565A7', '#955251', '#DD4124',
  '#45B8AC', '#EFC050', '#5B5EA6', '#9B2335', '#DFCFBE', '#55B4B0', '#E15D44', '#7FCDCD', '#BC243C', '#C3447A',
  '#98B4D4', '#C7B37F', '#BFD641', '#E94B3C', '#6B4226', '#FFA500'
];

// 알파벳과 대표 단어 및 이미지 (이미지는 무료 이미지 링크 사용)
const ALPHABETS = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Egg', emoji: '🥚' },
  { letter: 'F', word: 'Fish', emoji: '🐟' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒' },
  { letter: 'H', word: 'Hat', emoji: '🎩' },
  { letter: 'I', word: 'Ice cream', emoji: '🍦' },
  { letter: 'J', word: 'Juice', emoji: '🧃' },
  { letter: 'K', word: 'King', emoji: '🤴' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐵' },
  { letter: 'N', word: 'Nurse', emoji: '👩‍⚕️' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Pig', emoji: '🐷' },
  { letter: 'Q', word: 'Queen', emoji: '👸' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Whale', emoji: '🐳' },
  { letter: 'X', word: 'Xylophone', emoji: '🎶' },
  { letter: 'Y', word: 'Yellow', emoji: '💛' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];


let currentIndex = -1;
let step = 0; // 0: 알파벳만, 1: 알파벳 읽기, 2: 단어+그림+단어 읽기

function getRandomIndex() {
  let idx;
  do {
    idx = Math.floor(Math.random() * ALPHABETS.length);
  } while (idx === currentIndex);
  return idx;
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.5; // 읽는 속도 느리게
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function showAlphabet() {
  const idx = getRandomIndex();
  currentIndex = idx;
  const { letter } = ALPHABETS[idx];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const display = document.getElementById('alphabet-display');
  display.textContent = letter;
  display.style.color = color;
  document.getElementById('word-picture').style.display = 'none';
}

function showWordAndPicture() {
  const { word, emoji } = ALPHABETS[currentIndex];
  const wordDiv = document.getElementById('word-picture');
  wordDiv.innerHTML = `<span style="font-size:3rem;">${emoji}</span> <span style="margin-left:0.7em;">${word}</span>`;
  wordDiv.style.display = 'flex';
  wordDiv.style.alignItems = 'center';
  speak(word);
}

document.addEventListener('DOMContentLoaded', () => {
  showAlphabet();
  step = 0;
  document.getElementById('next-btn').addEventListener('click', () => {
    if (step === 0) {
      // 알파벳 읽기
      const { letter } = ALPHABETS[currentIndex];
      speak(letter);
      step = 1;
    } else if (step === 1) {
      // 단어+그림+단어 읽기
      showWordAndPicture();
      step = 2;
    } else {
      // 다음 알파벳
      showAlphabet();
      step = 0;
    }
  });
});
