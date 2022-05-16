const message = document.querySelector(".message-container span");
const wordDisplay = document.querySelector(".word-container");
const keyboard = document.querySelector(".keyboard-container");
const wordList = [
    "random",
    "words",
    "essence",
    "generator",
    "sample",
    "acorn",
    "liabilty",
    "electric"
];

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
let guessesLeft = 6;
let letterAdded = false;
const lettersGuessed = [];
let passwordTiles;
let word;

const resetGame = () => {
    guessesLeft = 6;
    message.textContent = `${guessesLeft}`;
    letterAdded = false;
    lettersGuessed.splice(0, lettersGuessed.length);
    [...passwordTiles].forEach(tile => tile.remove());
    keys.forEach(key => {
        const element = document.getElementById(key);
        element.classList.remove('green-background', 'red-background')
        element.disabled = false;
    })
    playGame();
}

const checkLetter = (addedLetter) => {
    letterAdded = false;
    for (let i=0; i < passwordTiles.length; i++) {
        if(passwordTiles[i].id.toUpperCase() === addedLetter) {
            passwordTiles[i].textContent = addedLetter;
            lettersGuessed.push(passwordTiles[i].id);
            letterAdded = true;
            addColorToKey(addedLetter, "green-background");
            const splitWord = word.split('').sort();
            if (equals(lettersGuessed.sort(), splitWord)) {
                alert("Congratulations, you've won! :)");
                resetGame();
                return false;
            }
        }
    }
    if (letterAdded) return;

    if (guessesLeft <= 1) {
        alert("You've lost! :( Wanna try again?");
        resetGame();
        return false;
    }
    else {
        guessesLeft -= 1;
        addColorToKey(addedLetter, "red-background");
        message.textContent = `${guessesLeft}`;
    }
}

const addColorToKey = (keyLetter, color) => {
    const coloredKey = document.getElementById(keyLetter);
    coloredKey.classList.add(color);
    coloredKey.disabled = true;
}

const addKeyboardElement = (key) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => checkLetter(key));
    keyboard.append(buttonElement)
}

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function playGame() {
    const randInt = Math.floor(Math.random() * wordList.length);
    word = wordList[randInt];

    word.split('').forEach(wordLetter => {
        const letterElement = document.createElement('div')
        letterElement.setAttribute('id', wordLetter)
        wordDisplay.append(letterElement);
    });

    passwordTiles = wordDisplay.children;
}

keys.forEach(key => addKeyboardElement(key));

playGame();

