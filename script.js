const drawing = document.querySelector(".drawing-container");
const wordDisplay = document.querySelector(".word-container");
const keyboard = document.querySelector(".keyboard-container");
const wordList = [
    "random",
    "words",
    "essence",
    "generator",
    "sample",
    "text"
]

const randInt = Math.floor(Math.random() * wordList.length);
const word = wordList[randInt];
const wordSplit = [...word];

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
]

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    //buttonElement.addEventListener('click', *FUNKCJA JAKAS*)
    keyboard.append(buttonElement)
})