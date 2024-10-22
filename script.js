'use strict'

const catchradioBTN = document.getElementById('radioBTN');
const catchforUtptRadio = document.getElementById('forUtptRadio');
const catchplayPauseBtn = document.getElementById('playPauseBtn');
const catchradioText = document.getElementById('radioText');
const catchinptsr = document.getElementById('inptsr');
const catchbtnsr = document.getElementById('btnsr');
const catchsuraOutPut = document.getElementById('suraOutPut');
const catchtafsirOutput = document.getElementById('tafsirOutput');
const catcsuraName = document.getElementById('suraName');
const catchayahsNumber = document.getElementById('ayahsNumber');
const catchsuraNumberr = document.getElementById('suraNumberr');
const catchtottalAyahOftheSura = document.getElementById('tottalAyahOftheSura');
const catchrevelationType = document.getElementById('revelationType');
const catchjuz = document.getElementById('juz');
const catchmunzil = document.getElementById('munzil');
const catchruku = document.getElementById('ruku');
const catchsejda = document.getElementById('sejda');
const cathsuraOutPutMain = document.getElementById('suraOutPutMain');
const catchforPlayPauseBTN = document.getElementById('forPlayPauseBTN');
const catchpreLoader = document.getElementById('preLoader');


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

// sura with tafsir start

function inputValidation() {
    let getInputValue = catchinptsr.value;
    if ( getInputValue === '' ) {
        alert('Please Type Sura Number')
    } else if ( isNaN(getInputValue) ) {
        alert('Just Type Sura Number')
    } else if ( getInputValue <= 114 ) {
        resApi(getInputValue)
    } else {
        alert('Type Sura Number Between 1 to 114 only')
    }
}


function resApi(recieveGetInputValue) {
    let userValue = recieveGetInputValue;
    catchpreLoader.style.display = "block"
    let apiOneFetch = fetch(`https://api.alquran.cloud/v1/surah/${userValue}/ar.alafasy`);
    let apiTwoFetch = fetch(`https://api.alquran.cloud/v1/surah/${userValue}/bn.bengali`);

    Promise.all([apiOneFetch, apiTwoFetch])
        .then(responses => Promise.all(responses.map(rec => rec.json())))
        .then(datas => {
            workApiData(datas[0], datas[1])
            catchpreLoader.style.display = "none"
        })
}


let isPlayingSura = true; 

function workApiData(recDataOne, recDataTwo) {
    let storDataOne = recDataOne;
    let storDataTwo = recDataTwo;

    let suraLength = storDataOne.data.ayahs.length;
    let tafsirLength = storDataTwo.data.ayahs.length;
    let surAndTafirFlag = 0;

    function forPlaySuraRept() {
        function ForaddClass() {
            cathsuraOutPutMain.classList.add("outline-double", "p-4", "h-80", "main_cuss");
            catcsuraName.classList.add("mt-5")
        }
        ForaddClass();

        if (surAndTafirFlag < suraLength && surAndTafirFlag < tafsirLength) {

            let catchSURAayahs = storDataOne.data.ayahs[surAndTafirFlag];
            let catchTafsir = storDataTwo.data.ayahs[surAndTafirFlag];

            // Audio engine, play by default
            catchsuraOutPut.innerHTML = `<audio id="ctrlAudio" src="${catchSURAayahs.audio}" autoplay></audio>`;

            // Play/pause button
            forPlayPauseBTN.innerHTML = `<button id="frrppllyyppaassuu" class="text-2xl"><<<⏸>>></button>`;  // Since it's playing, show "Pause"

            // Sura name
            catcsuraName.innerHTML = `<h1 class="pb-2">সূরা  ~${storDataTwo.data.englishName}</h1>`;

            // Tafsir print
            catchtafsirOutput.innerHTML = `<h2 class="text-2xl text-red-400">${catchTafsir.text}</h2>`;

            // Ayahs number
            catchayahsNumber.innerHTML = `<h2 class="outline-double text-white text-sm p-2">আয়াত নং ${storDataTwo.data.ayahs[surAndTafirFlag].numberInSurah}</h2>`;

            // Sura number
            catchsuraNumberr.innerHTML = `<h2 class="outline-double text-white text-sm p-2">সূরা নাম্বার ${storDataTwo.data.number}</h2>`;

            // Total ayahs number
            catchtottalAyahOftheSura.innerHTML = `<h2 class="outline-double text-white text-sm p-2">সর্বমোট আয়াত ${storDataTwo.data.numberOfAyahs}</h2>`;

            // Revelation place
            catchrevelationType.innerHTML = `<h2 class="outline-double text-white text-sm p-2">অবতীর্ণের স্থান ${(storDataTwo.data.revelationType === "Meccan") ? "মক্কা" : (storDataTwo.data.revelationType === "Medinan") ? "মদিনা" : "অজানা"}</h2>`;

            // Juz
            catchjuz.innerHTML = `<h2 class="outline-double text-white text-sm p-2">পাড়া ${storDataTwo.data.ayahs[surAndTafirFlag].juz}</h2>`;

            // Munzil
            catchmunzil.innerHTML = `<h2 class="outline-double text-white text-sm p-2">মঞ্জিল ${storDataTwo.data.ayahs[surAndTafirFlag].manzil}</h2>`;

            // Ruku
            catchruku.innerHTML = `<h2 class="outline-double text-white text-sm p-2">রুকু ${storDataTwo.data.ayahs[surAndTafirFlag].ruku}</h2>`;

            // Sejda
            catchsejda.innerHTML = `<h2 class="outline-double text-white text-sm p-2">${storDataTwo.data.ayahs[surAndTafirFlag].sajda ? "কোনো সেজদা আয়াত আছে" : "সেজদা আয়াত নেই"}</h2>`;

            let catchctrlAudio = document.getElementById('ctrlAudio');

            
            catchctrlAudio.onended = () => {
                surAndTafirFlag++;
                forPlaySuraRept();
                isPlayingSura = false;
                catchfrrppllyyppaassuu.textContent = "<<<▶️>>>"; 
            };

            let catchfrrppllyyppaassuu = document.getElementById('frrppllyyppaassuu');
            catchfrrppllyyppaassuu.addEventListener('click', function () {
                if (isPlayingSura) {
                    catchctrlAudio.pause();
                    catchfrrppllyyppaassuu.textContent = "<<<▶️>>>";  
                } else {
                    catchctrlAudio.play();
                    catchfrrppllyyppaassuu.textContent = "<<<⏸️>>>"; 
                }
                isPlayingSura = !isPlayingSura; 
            });
        } else {
            alert("The Surah Has Been End Would You Play It Again?")
        }
    }

    forPlaySuraRept(); // Call the function to start playing
}

catchbtnsr.addEventListener('click', function () {
    inputValidation();
});








