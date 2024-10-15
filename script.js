'use strict'

const catchradioBTN = document.getElementById('radioBTN');
const catchforUtptRadio = document.getElementById('forUtptRadio');
const catchplayPauseBtn = document.getElementById('playPauseBtn');
const catchradioText = document.getElementById('radioText');

let apiURL = 'https://mp3quran.net/api/v3/radios?language=eng';
let isPlaying = false;
let myAudio;


function resRadioAPI() {
    fetch(apiURL)
        .then(res => res.json())
        .then(data => radioWork(data))
        .catch(err => console.error('Error fetching radio data:', err));
}

function radioWork(receiveRadioData) {
    let getRadioData = receiveRadioData;
    let getRadioFileURL = getRadioData.radios[11].url;

    // অডিও এলিমেন্ট তৈরি করা হচ্ছে
    catchforUtptRadio.innerHTML = `<audio id="myAudio" src="${getRadioFileURL}" autoplay></audio>`;

    // myAudio এলিমেন্টটি সঠিকভাবে ধরতে
    myAudio = document.getElementById("myAudio");

    myAudio.play();
    catchplayPauseBtn.textContent = "⏸ Pause";
    isPlaying = true;

    // টেক্সট পরিবর্তন এবং অ্যানিমেশন যুক্ত করা
    catchradioText.textContent = "You are listening non-stop radio";
    catchradioText.classList.add('marquee-text');
}

catchradioBTN.addEventListener('click', function (e) {
    e.preventDefault();

    if (!myAudio) {
        resRadioAPI()
        return; // Exit the function now
    }

    if (isPlaying) {
        myAudio.pause();
        catchplayPauseBtn.textContent = "▶ Play";

        // Revert text and remove marquee effect
        catchradioText.textContent = "Live radio";  // Show default text when paused
        catchradioText.classList.remove('marquee-text');
    } else {
        myAudio.play();
        catchplayPauseBtn.textContent = "⏸ Pause";

        catchradioText.textContent = "You are listening non-stop radio";
        catchradioText.classList.add('marquee-text');

    }
    isPlaying = !isPlaying;
})