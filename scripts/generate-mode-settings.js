import { gameStats, timeStats } from "./stats.js";
import {wordsStart, openPopup} from './main.js'
import { removeClass } from "./utils/classes.js";

export function generateTimedSettings(){
    document.querySelector('.js-group-2').innerHTML = `
                <input class="radio-button default-time" type="radio" name="duration" id="30" value="30" checked>
                <label class="radio-text" for="30">30s</label>

                <input class="radio-button default-time" type="radio" name="duration" id="60" value="60">
                <label class="radio-text" for="60">60s</label>

                <input class="radio-button default-time" type="radio" name="duration" id="120" value="120">
                <label class="radio-text" for="120">120s</label>

                <input class="radio-button custom-time" type="radio" name="duration" id="customDuration" value="customDuration">
                <label class="radio-text custom-label" for="customDuration"><svg class="custom-pic" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-ruler-icon lucide-pencil-ruler"><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></label>
                
                `

                document.querySelector('.timer').innerHTML = `30`;

        document.querySelectorAll('.default-time').forEach(radio => {
            radio.addEventListener('change', () => {
                timeStats.maxTime = Number(radio.value);
                document.querySelector('.timer').innerHTML = `${timeStats.maxTime}`;
            });
        });

        document.querySelectorAll('.custom-time').forEach(radio => {
            radio.addEventListener('change', () => {
                const inputBox = document.querySelector('.js-custom-time-input');
                removeClass(inputBox, 'hidden');
                inputBox.focus();
            });
        });
}

export function generateWordsSettings(){
    document.querySelector('.js-group-2').innerHTML = `
                <input class="radio-button default-words" type="radio" name="wordCount" id="25" value="25" checked>
                <label class="radio-text" for="25">25</label>

                <input class="radio-button default-words" type="radio" name="wordCount" id="50" value="50">
                <label class="radio-text" for="50">50</label>

                <input class="radio-button default-words" type="radio" name="wordCount" id="100" value="100">
                <label class="radio-text" for="100">100</label>

                <input class="radio-button custom-words" type="radio" name="wordCount" id="customWordCount" value="customWordCount">
                <label class="radio-text custom-label" for="customWordCount"><svg class="custom-pic" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-ruler-icon lucide-pencil-ruler"><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></label>
                `;

    document.querySelector('.timer').innerHTML = `0`;

    document.querySelectorAll('.default-words').forEach(radio => {
            radio.addEventListener('change', () => {
                gameStats.currentSetting = `${radio.value}`;
                document.querySelector('.timer').innerHTML = `0`;
                wordsStart(gameStats.currentSetting);
                console.log(gameStats);
            });
    });

    document.querySelectorAll('.custom-words').forEach(radio => {
            radio.addEventListener('change', () => {
                /*gameStats.currentSetting = `${radio.value}`;
                document.querySelector('.timer').innerHTML = `0`;
                wordsStart(gameStats.currentSetting);
                console.log(gameStats);*/
                const inputBox = document.querySelector('.js-custom-time-input');
                removeClass(inputBox, 'hidden');
                inputBox.focus();
            });
    });
}

export function generateCustomWordsSettings(){
    document.querySelector('.js-group-2').innerHTML = `
        <button class="change radio-text">Change</button>
    `;

    document.querySelector('.timer').innerHTML = `0`;
    
    document.querySelector('.change').addEventListener('click', () => {
        openPopup();
    });
}