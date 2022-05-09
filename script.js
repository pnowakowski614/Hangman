function playGame() {
    const message = document.querySelector(".message-container");
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
    ]
    
    const randInt = Math.floor(Math.random() * wordList.length);
    const word = wordList[randInt];
    const wordSplit = [...word];
    const passwordTiles = wordDisplay.getElementsByTagName('*');
    
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
    let letterAdded;
    let lettersGuessed = [];

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    
    keys.forEach(key => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.addEventListener('click', () => checkLetter(key))
        keyboard.append(buttonElement)
    })
    
    wordSplit.forEach(wordLetter => {
        const letterElement = document.createElement('div')
        letterElement.setAttribute('id', wordLetter)
        wordDisplay.append(letterElement);
    })

    const addColorToKey = (keyLetter, color) => {
        const coloredKey = document.getElementById(keyLetter);
        coloredKey.classList.add(color);
        coloredKey.disabled = true;
    }
    
    const checkLetter = (addedLetter) => {
        letterAdded = false;
        for (let i=0; i < passwordTiles.length; i++) {
            if(passwordTiles[i].id.toUpperCase() == addedLetter) {
                passwordTiles[i].textContent = addedLetter;
                lettersGuessed.push(passwordTiles[i].id);
                letterAdded = true;
                addColorToKey(addedLetter, "green-background");
                if (equals(lettersGuessed.sort(), wordSplit.sort())) {
                    alert("Congratulations, you've won! :)");
                    location.reload();
                    return false;
                }
            }
        }
        if (!letterAdded) {
            if (guessesLeft <= 1) {
                alert("You've lost! :( Wanna try again?");
                location.reload();
                return false;
            }
            else {
                guessesLeft -= 1;
                addColorToKey(addedLetter, "red-background");
                message.textContent = `GUESSES LEFT: ${guessesLeft}`;
            }
        }
    }


}

playGame();