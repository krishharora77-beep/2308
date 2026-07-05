/*=================================================

MUSIC PLAYER V4
MODULE 1
ENGINE

=================================================*/

document.addEventListener("DOMContentLoaded",()=>{

if(window.__MusicLoaded)return;

window.__MusicLoaded=true;

const STORAGE="birthday_music";

const audio=new Audio("music/TuHaiKahaan.mp3");

audio.loop=true;

audio.preload="auto";

const state=JSON.parse(

localStorage.getItem(STORAGE)||"{}"

);

audio.volume=

state.volume??

0.12;

function save(){

localStorage.setItem(

STORAGE,

JSON.stringify({

time:audio.currentTime,

volume:audio.volume,

playing:!audio.paused

})

);

}

function format(sec){

if(isNaN(sec))return"0:00";

let m=Math.floor(sec/60);

let s=Math.floor(sec%60);

return`${m}:${String(s).padStart(2,"0")}`;

}

window.music={

audio,

save,

format,

state

};

   /*=================================================

MODULE 2
PLAYER UI

=================================================*/

const playerHTML=`

<div id="musicFab">

🎵

</div>

<div id="musicOverlay">

<div id="musicSheet">

<div class="musicHandle"></div>

<div class="musicArt">

🎵

</div>

<div class="musicTitle">

Background Melody

</div>

<div class="musicArtist">

Tu Hai Kahan • AUR

</div>

<div class="musicControls">

<button id="playPause">

▶

</button>

</div>

<input
id="progress"
type="range"
min="0"
max="100"
value="0"
>

<div class="timeRow">

<span id="currentTime">

0:00

</span>

<span id="totalTime">

0:00

</span>

</div>

<div class="volumeLabel">

Volume

</div>

<input
id="volume"
type="range"
min="0"
max="100"
value="12"
>

<button class="closeMusic">

Close

</button>

</div>

</div>

`;

document.body.insertAdjacentHTML(

"beforeend",

playerHTML

);

const fab=document.getElementById("musicFab");

const overlay=document.getElementById("musicOverlay");

const sheet=document.getElementById("musicSheet");

const closeBtn=document.querySelector(".closeMusic");

fab.onclick=()=>{

overlay.style.display="flex";

requestAnimationFrame(()=>{

sheet.classList.add("open");

});

};

closeBtn.onclick=()=>{

sheet.classList.remove("open");

setTimeout(()=>{

overlay.style.display="none";

},350);

};

window.music.ui={

fab,

overlay,

sheet

};

   /*=================================================

MODULE 3
AUDIO ENGINE

=================================================*/

const playBtn=document.getElementById("playPause");

const progress=document.getElementById("progress");

const volume=document.getElementById("volume");

const current=document.getElementById("currentTime");

const total=document.getElementById("totalTime");

const audio=window.music.audio;



playBtn.onclick=async()=>{

if(audio.paused){

try{

await audio.play();

playBtn.innerHTML="⏸";

fab.classList.add("playing");

window.music.save();

}

catch(err){

console.log(err);

}

}

else{

audio.pause();

playBtn.innerHTML="▶";

fab.classList.remove("playing");

window.music.save();

}

};



volume.value=Math.round(audio.volume*100);



volume.oninput=()=>{

audio.volume=volume.value/100;

window.music.save();

};



audio.addEventListener("loadedmetadata",()=>{

total.innerHTML=window.music.format(audio.duration);

});



audio.addEventListener("timeupdate",()=>{

current.innerHTML=

window.music.format(audio.currentTime);

if(audio.duration){

progress.value=

(audio.currentTime/audio.duration)*100;

}

window.music.save();

});



progress.oninput=()=>{

if(audio.duration){

audio.currentTime=

(progress.value/100)*audio.duration;

}

};

   /*=================================================

MODULE 4
RESUME ENGINE

=================================================*/

if(window.music.state.time!==undefined){

audio.addEventListener("loadedmetadata",()=>{

if(!isNaN(window.music.state.time)){

audio.currentTime=

window.music.state.time;

}

});

}



if(window.music.state.playing){

audio.addEventListener("loadedmetadata",async()=>{

try{

await audio.play();

playBtn.innerHTML="⏸";

fab.classList.add("playing");

}

catch(e){

console.log("Autoplay prevented");

}

});

}



setInterval(()=>{

window.music.save();

},1000);



window.addEventListener("beforeunload",()=>{

window.music.save();

});



document.addEventListener("visibilitychange",()=>{

if(document.hidden){

window.music.save();

}

});

});
