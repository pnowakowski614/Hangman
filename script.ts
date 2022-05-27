const message = document.querySelector(".message-container span") as HTMLSpanElement;
const wordDisplay = document.querySelector(".word-container") as HTMLDivElement;
const keyboard = document.querySelector(".keyboard-container") as HTMLButtonElement;

const wordList: string[] = [
    "random",
    "words",
    "essence",
    "generator",
    "sample",
    "acorn",
    "liabilty",
    "electric"
];

const keys: string[] = [
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
];

let guessesLeft: number = 6;
let letterAdded: boolean = false;
const lettersGuessed: string[] = [];
let passwordTiles: HTMLCollection;
let word: string;

const resetGame = (): void => {
    guessesLeft = 6;
    message.textContent = `${guessesLeft}`;
    letterAdded = false;
    lettersGuessed.splice(0, lettersGuessed.length);
    [...passwordTiles].forEach(tile => tile.remove());
    keys.forEach(key => {
        const element = document.getElementById(key) as HTMLButtonElement;
        element.classList.remove('green-background', 'red-background')
        element.disabled = false;
    })
    playGame();
}

const checkLetter = (addedLetter: string): false | undefined => {
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

const addColorToKey = (keyLetter: string, color: string): void => {
    const coloredKey = document.getElementById(keyLetter) as HTMLButtonElement;
    coloredKey.classList.add(color);
    coloredKey.disabled = true;
}

const addKeyboardElement = (key: string): void => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => checkLetter(key));
    keyboard.append(buttonElement)
}

const equals = (a: string[], b: string[]): boolean => JSON.stringify(a) === JSON.stringify(b);

function playGame(): void {
    const randInt: number = Math.floor(Math.random() * wordList.length);
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

