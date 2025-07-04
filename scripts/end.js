import { wpm, accuracy } from "./utils/results.js";
import { animals } from './data/animals.js';
import { timeStats } from "./stats.js";

let stats = JSON.parse(localStorage.getItem('results'));
let best = JSON.parse(localStorage.getItem('best'));
let newBest = false;

let wordsPerMin = 0;
let testMode = ``;
let testTime = 0;

if(stats.gameStats.currentMode === 'timed'){
    wordsPerMin = wpm(stats.wordStats.correctLetters, stats.timeStats.maxTime);
    if([30,60,120].includes(stats.timeStats.maxTime)) testMode = `time ${stats.timeStats.maxTime}`;
    else testMode = `custom time`
    testTime = stats.timeStats.maxTime;
}else if(stats.gameStats.currentMode === 'words'){
    wordsPerMin = wpm(stats.wordStats.correctLetters, stats.timeStats.timeRemaining);
    testMode = `words ${stats.gameStats.currentSetting}`;
    testTime = stats.timeStats.timeRemaining;
}else if(stats.gameStats.currentMode === 'custom'){
    wordsPerMin = wpm(stats.wordStats.correctLetters, stats.timeStats.timeRemaining);
    testMode = `custom words`;
    testTime = stats.timeStats.timeRemaining;
}

let animalResult = {
    animal: 'sloth',
    tagLine: 'Keyboard? More like stone tablet.'
}

console.log(best);
console.log(wordsPerMin);

if(!best ||  wordsPerMin > best.wpm){
    const obj = {
        wpm: wordsPerMin
    }
    localStorage.setItem('best', JSON.stringify(obj));
    newBest = true;
    document.querySelector('.best-container').style.visibility = 'visible';
}

if(wordsPerMin <= 20) animalResult = animals[0];
else if(wordsPerMin <= 40) animalResult = animals[1];
else if(wordsPerMin <= 60) animalResult = animals[2];
else if(wordsPerMin <= 80) animalResult = animals[3];
else if(wordsPerMin <= 100) animalResult = animals[4];
else animalResult = animals[5];

document.querySelector('.big-boi-container').innerHTML = `
            <div class="result-container">        
                <div class="row">
                        <div class="wpm">
                            <div class="text">WPM</div>
                            <div class="wpm-result result">${wordsPerMin}</div>
                        </div>
                    <div class="accuracy">
                        <div class="text">Accuracy</div>
                        <div class="accuracy-result result">${accuracy(stats.wordStats.correctLetters, stats.wordStats.incorrectLetters, stats.wordStats.extraLetters)}%</div>
                    </div>
                </div>

                <div class="row">
                        <div class="mode">
                        <div class="text">Test mode</div>
                        <div class="test-mode result2">${testMode}</div>
                    </div>
                    <div class="characters">
                        <div class="text">correct/incorrect/extra</div>
                        <div class="characters-result result2">${stats.wordStats.correctLetters}/${stats.wordStats.incorrectLetters}/${stats.wordStats.extraLetters}</div>
                    </div>
                    <div class="time">
                        <div class="text">Test time</div>
                        <div class="time-result result2">${testTime}s</div>
                    </div>
                </div>

            </div>

                <div class="animal-container">
                    <div class="animal-pic"><img class="image" src="assets/${animalResult.animal}.png"></div>
                    <div class="animal-result">${animalResult.animal}</div>
                    <div class="tag-line">${animalResult.tagLine}</div>
                </div>
    `

document.querySelector('.next-test').addEventListener('click', () => {
    nextTest();
});

document.querySelector('.repeat-test').addEventListener('click', () => {
    retryTest();
});

document.querySelector('.home').addEventListener('click', () => {
    home();
});

function nextTest(){
    window.location.href = 'index.html?type=next';
}

function retryTest(){
    window.location.href = 'index.html?type=retry';
}

function home(){
    window.location.href = 'index.html';
}