(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const B=document.getElementById("radioBTN"),T=document.getElementById("forUtptRadio"),m=document.getElementById("playPauseBtn"),u=document.getElementById("radioText"),b=document.getElementById("inptsr"),E=document.getElementById("btnsr"),I=document.getElementById("suraOutPut"),P=document.getElementById("tafsirOutput"),p=document.getElementById("suraName"),N=document.getElementById("ayahsNumber"),M=document.getElementById("suraNumberr"),O=document.getElementById("tottalAyahOftheSura"),v=document.getElementById("revelationType"),A=document.getElementById("juz"),H=document.getElementById("munzil"),$=document.getElementById("ruku"),w=document.getElementById("sejda"),S=document.getElementById("suraOutPutMain");document.getElementById("forPlayPauseBTN");const f=document.getElementById("preLoader");let C="https://mp3quran.net/api/v3/radios?language=eng",d=!1,l;function R(){fetch(C).then(e=>e.json()).then(e=>j(e)).catch(e=>console.error("Error fetching radio data:",e))}function j(e){let r=e.radios[11].url;T.innerHTML=`<audio id="myAudio" src="${r}" autoplay></audio>`,l=document.getElementById("myAudio"),l.play(),m.textContent="⏸ Pause",d=!0,u.textContent="You are listening non-stop radio",u.classList.add("marquee-text")}B.addEventListener("click",function(e){if(e.preventDefault(),!l){R();return}d?(l.pause(),m.textContent="▶ Play",u.textContent="Live radio",u.classList.remove("marquee-text")):(l.play(),m.textContent="⏸ Pause",u.textContent="You are listening non-stop radio",u.classList.add("marquee-text")),d=!d});function q(){let e=b.value;e===""?alert("Please Type Sura Number"):isNaN(e)?alert("Just Type Sura Number"):e<=114?z(e):alert("Type Sura Number Between 1 to 114 only")}function z(e){let s=e;f.style.display="block";let r=fetch(`https://api.alquran.cloud/v1/surah/${s}/ar.alafasy`),a=fetch(`https://api.alquran.cloud/v1/surah/${s}/bn.bengali`);Promise.all([r,a]).then(t=>Promise.all(t.map(n=>n.json()))).then(t=>{D(t[0],t[1]),f.style.display="none"})}let c=!0;function D(e,s){let r=e,a=s,t=r.data.ayahs.length,n=a.data.ayahs.length,o=0;function y(){function g(){S.classList.add("outline-double","p-4","h-80","main_cuss"),p.classList.add("mt-5")}if(g(),o<t&&o<n){let x=r.data.ayahs[o],L=a.data.ayahs[o];I.innerHTML=`<audio id="ctrlAudio" src="${x.audio}" autoplay></audio>`,forPlayPauseBTN.innerHTML='<button id="frrppllyyppaassuu" class="text-2xl"><<<⏸>>></button>',p.innerHTML=`<h1 class="pb-2">সূরা  ~${a.data.englishName}</h1>`,P.innerHTML=`<h2 class="text-2xl text-red-400">${L.text}</h2>`,N.innerHTML=`<h2 class="outline-double text-white text-sm p-2">আয়াত নং ${a.data.ayahs[o].numberInSurah}</h2>`,M.innerHTML=`<h2 class="outline-double text-white text-sm p-2">সূরা নাম্বার ${a.data.number}</h2>`,O.innerHTML=`<h2 class="outline-double text-white text-sm p-2">সর্বমোট আয়াত ${a.data.numberOfAyahs}</h2>`,v.innerHTML=`<h2 class="outline-double text-white text-sm p-2">অবতীর্ণের স্থান ${a.data.revelationType==="Meccan"?"মক্কা":a.data.revelationType==="Medinan"?"মদিনা":"অজানা"}</h2>`,A.innerHTML=`<h2 class="outline-double text-white text-sm p-2">পাড়া ${a.data.ayahs[o].juz}</h2>`,H.innerHTML=`<h2 class="outline-double text-white text-sm p-2">মঞ্জিল ${a.data.ayahs[o].manzil}</h2>`,$.innerHTML=`<h2 class="outline-double text-white text-sm p-2">রুকু ${a.data.ayahs[o].ruku}</h2>`,w.innerHTML=`<h2 class="outline-double text-white text-sm p-2">${a.data.ayahs[o].sajda?"কোনো সেজদা আয়াত আছে":"সেজদা আয়াত নেই"}</h2>`;let h=document.getElementById("ctrlAudio");h.onended=()=>{o++,y(),c=!1,i.textContent="<<<▶️>>>"};let i=document.getElementById("frrppllyyppaassuu");i.addEventListener("click",function(){c?(h.pause(),i.textContent="<<<▶️>>>"):(h.play(),i.textContent="<<<⏸️>>>"),c=!c})}else alert("The Surah Has Been End Would You Play It Again?")}y()}E.addEventListener("click",function(){q()});
