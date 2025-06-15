import { wpm, accuracy } from "./utils/results.js";
import { animals } from './data/animals.js';
import { nextTest, retryTest } from "./endScreenButtons.js";

let stats = JSON.parse(localStorage.getItem('results'));
let best = JSON.parse(localStorage.getItem('best'));
let newBest = false;

const wordsPerMin = wpm(stats.wordStats.correctLetters, stats.timeStats.maxTime);

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
                        <div class="test-mode result2">time ${stats.timeStats.maxTime}</div>
                    </div>
                    <div class="characters">
                        <div class="text">correct/incorrect/extra</div>
                        <div class="characters-result result2">${stats.wordStats.correctLetters}/${stats.wordStats.incorrectLetters}/${stats.wordStats.extraLetters}</div>
                    </div>
                    <div class="time">
                        <div class="text">Test time</div>
                        <div class="time-result result2">${stats.timeStats.maxTime}s</div>
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
})

document.querySelector('.repeat-test').addEventListener('click', () => {
    retryTest();
})