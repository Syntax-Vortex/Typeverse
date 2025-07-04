import { formatWord, randomWord, moveWordsUp, moveWordsDown, currentTestWords } from "./generate-words.js";
import { addClass, removeClass } from "./utils/classes.js";
import { countdown, timeStats, wordStats, gameStats, countup} from "./stats.js";
import { generateCustomWordsSettings, generateTimedSettings, generateWordsSettings } from "./generate-mode-settings.js";

function start() {
    document.querySelector('.js-words-container').innerHTML = '';
    currentTestWords.length = 0;
    for(let i = 0;i<100;i++){
        const word = randomWord();
        document.querySelector('.js-words-container').innerHTML += formatWord(word);
        currentTestWords.push(word);
    }
    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'),'current');
}

export function wordsStart(currentSetting) {
    timeStats.timeRemaining = 0;
    document.querySelector('.js-words-container').innerHTML = '';
    currentTestWords.length = 0;
    for(let i = 0;i<currentSetting;i++){
        const word = randomWord();
        document.querySelector('.js-words-container').innerHTML += formatWord(word);
        currentTestWords.push(word);
    }
    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'),'current');
}

function retry(){
    const previousTestWords = JSON.parse(localStorage.getItem('currentTestWords'));
        if(previousTestWords){
        previousTestWords.forEach((word)=>{
            document.querySelector('.js-words-container').innerHTML += formatWord(word);
            currentTestWords.push(word);
        });
        console.log(currentTestWords);
        let stats = JSON.parse(localStorage.getItem('results'));
        if(stats.gameStats.currentMode === 'timed'){
            let durationChecked = 0;
            generateTimedSettings();
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'timed');
            });
            document.querySelectorAll('input[name="duration"]').forEach(radio => {
                radio.checked = (Number(radio.value) === stats.timeStats.maxTime);
                if(radio.checked) durationChecked = 1;
            });
        if(!durationChecked) document.querySelector('.custom-time').checked = 1;
        timeStats.maxTime = stats.timeStats.maxTime;
        document.querySelector('.timer').innerHTML = `${timeStats.maxTime}`;
        console.log(timeStats);
        }else if(stats.gameStats.currentMode === 'words'){
            let wordCountChecked = 0;
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'words');
            });
            generateWordsSettings();
            document.querySelectorAll('input[name="wordCount"]').forEach(radio => {
                radio.checked = (radio.value === stats.gameStats.currentSetting);
            });
            if(!wordCountChecked) document.querySelector('.custom-words').checked = 1;
            gameStats.currentMode = 'words';
            gameStats.currentSetting = stats.gameStats.currentSetting;
            timeStats.timeRemaining = 0;
        }else if(stats.gameStats.currentMode === 'custom'){
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'custom');
            });
            const arr = JSON.parse(localStorage.getItem('currentTestWords'));
            timeStats.timeRemaining = 0;
            document.querySelector('.js-custom-words-input').value = arr.join(' ');
            generateCustomWordsSettings();
            closePopup();
        }
        addClass(document.querySelector('.word'),'current');
        addClass(document.querySelector('.letter'),'current');
    }else{
        start();
    }
    
}

let wordLoops = 1;

function fillMoreWords(){
    let HTML = '';
    for(let i = 0;i<100;i++){
        const word = randomWord();
        HTML += formatWord(word)
        currentTestWords.push(word);
    }
    document.querySelector('.js-words-container').insertAdjacentHTML('beforeend', HTML);
    wordLoops++;
    console.log("filled more words");
}

function hideHud(){
    addClass(document.querySelector('.bar'), 'hidden');
    addClass(document.querySelector('.typeverse-container'), 'hidden');
    removeClass(document.querySelector('.timer'), 'hidden');
}

function customTimeLocked(value){
    if(!isNaN(value) && value > 0){
        timeStats.maxTime = value;
        document.querySelector('.timer').innerHTML = `${timeStats.maxTime}`;
    }   
    addClass(inputBox, 'hidden');
}

function customWordsLocked(value){
    if(!isNaN(value) && value > 0){
        gameStats.currentSetting = `${value}`
        wordsStart(value)
    } 
    addClass(inputBox, 'hidden');
}

export function openPopup(){
    removeClass(document.querySelector('.js-popup'), 'hidden');
}

function closePopup(){
    addClass(document.querySelector('.js-popup'), 'hidden');
    const customWords = document.querySelector('.js-custom-words-input').value.replace(/[\r\n]+/g, ' ').replace(/ {2,}/g, ' ').split(' ');
    document.querySelector('.js-words-container').innerHTML = '';
    currentTestWords.length = 0;
    for(let i = 0;i<customWords.length;i++){
        const word = customWords[i];
        document.querySelector('.js-words-container').innerHTML += formatWord(word);
        currentTestWords.push(word);
    }
    gameStats.currentMode = 'custom';

    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'),'current');
}

document.querySelector('.custom-words-ok').addEventListener('click', () => {
    closePopup();
})

window.addEventListener('load', () => {
    document.querySelector('.content').focus();
});

window.addEventListener('focus', () => {
    document.querySelector('.js-words-container').classList.remove('blur');
    document.querySelector('.focus').style.display = 'none';
    document.querySelector('.cursor').style.display = 'block';
    document.querySelector('.content').focus();
});

window.addEventListener('blur', () => {
    document.querySelector('.js-words-container').classList.add('blur');
    document.querySelector('.focus').style.display = 'block';
    document.querySelector('.cursor').style.display = 'none';
});

let timeoutID;

document.querySelector('.content').addEventListener('keydown', (event) => {
    const key = event.key;
    const currentLetter = document.querySelector('.current.letter');
    let currentWord = document.querySelector('.current.word');
    const expectedKey = currentLetter?.innerHTML || ' ';
    
    if(wordStats.typedWords >= wordLoops * 80){
        fillMoreWords();
    }

    if(gameStats.currentMode ==='timed' && !timeStats.timeRunning){
        console.log('yea');
        timeStats.timeRemaining = timeStats.maxTime;
        timeStats.timeRunning = true;
        hideHud();
        const intervalID = setInterval(()=>{
            if(timeStats.timeRemaining <= 0){
                clearInterval(intervalID);
                end();
            }else{
                if(gameStats.currentMode === 'timed'){
                    countdown();
                    document.querySelector('.timer').innerHTML = `${timeStats.timeRemaining}`;
                }
            }
            
        }, 1000);
    }else if(gameStats.currentMode === 'words' || gameStats.currentMode === 'custom'){
        if(!timeStats.timeRunning){
            timeStats.timeRunning = true;
            hideHud();
            const intervalID = setInterval(()=>{
            countup();
            document.querySelector('.timer').innerHTML = `${timeStats.timeRemaining}`;
            console.log(timeStats);
        }, 1000);
        }
        if(key === expectedKey && currentLetter === currentWord.lastChild && !currentWord.nextSibling){
            end();
        }
    }

    if(key != ' ' && key != 'Backspace'){
        if(currentLetter){
            key === expectedKey? wordStats.correctLetters++ : wordStats.incorrectLetters++;
            addClass(currentLetter, key === expectedKey? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }

            
        }else if(key.length === 1){
            currentWord.innerHTML += `<span class = 'letter incorrect extra'>${key}</span>`;
            wordStats.extraLetters++;
        }
        
    }
    
    if(key === ' '){
        if(expectedKey != ' '){
            const lettersToInvalidate = document.querySelectorAll('.word.current .letter:not(.correct)');
            lettersToInvalidate.forEach((letter) => {
                addClass(letter, 'incorrect');
                wordStats.incorrectLetters++;
            });

            if(currentLetter) removeClass(currentLetter, 'current');
            if(currentWord) removeClass(currentWord, 'current');
            if(currentLetter.nextSibling) removeClass(currentLetter.nextSibling, 'current');
            if(currentWord.nextSibling) addClass(currentWord.nextSibling, 'current');
            if(currentWord.nextSibling.firstChild) addClass(currentWord.nextSibling.firstChild, 'current');
        }else {
            let wordIsCorrect = true;
            Array.from(currentWord.children).forEach((letter) => {
                if(!letter.classList.contains('correct')){
                    wordIsCorrect = false
                }
            });
            if(wordIsCorrect){
                wordStats.correctWords++;
                addClass(currentWord, 'correct');
                wordStats.correctLetters++;
                console.log('counted space');
            }
            

            if(currentLetter) removeClass(currentLetter, 'current');
            if(currentWord) removeClass(currentWord, 'current');
            if(currentWord.nextSibling) addClass(currentWord.nextSibling, 'current');
            if(currentWord.nextSibling.firstChild) addClass(currentWord.nextSibling.firstChild, 'current');
        }
        wordStats.typedWords++;
    }
    
    if(key === 'Backspace'){
        if(currentLetter && (currentLetter === currentWord.firstChild)){
            if(currentWord.previousSibling){
                if(currentWord.previousSibling.classList.contains('correct')){
                    wordStats.correctWords--;
                    removeClass(currentWord.previousSibling, 'correct');
                    wordStats.correctLetters--;
                    console.log('uncounted space');
                } 
                
                wordStats.typedWords--;

                removeClass(currentWord, 'current');
                addClass(currentWord.previousSibling, 'current');
                removeClass(currentLetter, 'current');
            } 
        }else if(currentLetter) {
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');

            if(currentLetter.previousSibling.classList.contains('correct')){
                removeClass(currentLetter.previousSibling, 'correct');
                wordStats.correctLetters--;
            }else{
                removeClass(currentLetter.previousSibling, 'incorrect');
                wordStats.incorrectLetters--;
            }
        }else {
            if(currentWord.lastChild.classList.contains('extra')){
                currentWord.lastChild.remove();
                wordStats.extraLetters--;
            }else{
            addClass(currentWord.lastChild, 'current');

            if(currentWord.lastChild.classList.contains('correct')){
                removeClass(currentWord.lastChild, 'correct');
                wordStats.correctLetters--;
            }else{
                removeClass(currentWord.lastChild, 'incorrect');
                wordStats.incorrectLetters--;
            }
            }
        }
    }

    currentWord = document.querySelector('.current.word');
    let nextletter = document.querySelector('.current.letter');

    if(currentWord.getBoundingClientRect().top > 295){
        moveWordsUp();
    }

    if(currentWord.getBoundingClientRect().top < 245){
        moveWordsDown();
    }
    
    currentWord = document.querySelector('.current.word');
    nextletter = document.querySelector('.current.letter');

    if(nextletter){
        movecursor(nextletter, 0);
    }else {
        movecursor(currentWord, 1);
    }

    if(timeoutID) clearTimeout(timeoutID);
    animateCursor(0);

    timeoutID = setTimeout(() => {
        animateCursor(1);
    }, 500);

      
});

function end(){
    const obj = {
        wordStats: wordStats,
        timeStats: timeStats,
        gameStats: gameStats
    }
    localStorage.setItem('currentTestWords', JSON.stringify(currentTestWords));
    localStorage.setItem('results',JSON.stringify(obj));
    window.location.href = 'end.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type === 'next') {
        let stats = JSON.parse(localStorage.getItem('results'));
        if(stats.gameStats.currentMode === 'timed'){
            let durationChecked = 0;
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'timed');
            });
            document.querySelectorAll('input[name="duration"]').forEach(radio => {
                radio.checked = (Number(radio.value) === stats.timeStats.maxTime);
                if(radio.checked) durationChecked = 1;
            });
            if(!durationChecked) document.querySelector('.custom-time').checked = true;
            timeStats.maxTime = stats.timeStats.maxTime;
            document.querySelector('.timer').innerHTML = timeStats.maxTime;
            start();
        }else if(stats.gameStats.currentMode === 'words'){
            gameStats.currentMode = 'words';
            let wordCountChecked = 0;
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'words');
            });
            generateWordsSettings();
            document.querySelectorAll('input[name="wordCount"]').forEach(radio => {
                radio.checked = (radio.value === stats.gameStats.currentSetting);
                if(radio.checked) wordCountChecked = 1;
            });
            if(!wordCountChecked){
                document.querySelector('.custom-words').checked = true;
                console.log('checked');
            }
            wordsStart(stats.gameStats.currentSetting);
        }else if(stats.gameStats.currentMode === 'custom'){
            document.querySelectorAll('input[name="mode"]').forEach(radio => {
                radio.checked = (radio.value === 'custom');
            });
            const arr = JSON.parse(localStorage.getItem('currentTestWords'));
            timeStats.timeRemaining = 0;
            document.querySelector('.js-custom-words-input').value = arr.join(' ');
            generateCustomWordsSettings();
            closePopup();
            openPopup();
        }
    }else if(type === 'retry'){
        retry();
    }else{
        start();
    }
});

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    if(radio.value === 'timed'){
        gameStats.currentMode = 'timed';
        timeStats.maxTime = 30;
        generateTimedSettings();
        start();
        console.log(gameStats)
    }else if(radio.value === 'words'){
        timeStats.timeRemaining = 0;
        gameStats.currentMode = 'words';
        generateWordsSettings();
        wordsStart(gameStats.currentSetting);
    }else if(radio.value === 'zen'){

    }else if(radio.value === 'custom'){
        generateCustomWordsSettings();
        openPopup();
    }
  });
});

const checkedModeRadio = document.querySelector('input[name="mode"]:checked');
if(checkedModeRadio){
    if(checkedModeRadio.value === 'timed'){
        generateTimedSettings();
        document.querySelector('.timer').innerHTML = Number(document.querySelector('input[name="duration"]:checked').value);
    }
}

const inputBox = document.querySelector('.js-custom-time-input');

inputBox.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        gameStats.currentMode === 'timed'? customTimeLocked(Math.round(Number(inputBox.value))) : customWordsLocked(Math.round(Number(inputBox.value)));
    }
})

inputBox.addEventListener('blur', () => {
    gameStats.currentMode === 'timed'? customTimeLocked(Math.round(Number(inputBox.value))) : customWordsLocked(Math.round(Number(inputBox.value)));
});