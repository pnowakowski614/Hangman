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
        "text"
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
    
    const checkLetter = (addedLetter) => {
        for (let i=0; i < passwordTiles.length; i++) {
            if(passwordTiles[i].id.toUpperCase() == addedLetter) {
                passwordTiles[i].textContent = addedLetter;
                letterAdded = true;
            }
            else {
                letterAdded = false;
            }
        }
        if (!letterAdded) {
            guessesLeft -= 1;
            message.textContent = `GUESSES LEFT: ${guessesLeft}`
            if (guessesLeft == 0) alert("You've lost! :( Wanna try again?");
        }
    }


}

playGame();