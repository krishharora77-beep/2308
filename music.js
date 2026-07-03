/* ==========================================
   MUSIC PLAYER V2
   PART 1 - CORE ENGINE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("musicFab")) return;

    const STORAGE_KEY = "birthday_music_state";

    const audio = new Audio("music/TuHaiKahaan.mp3");

    audio.loop = true;

    audio.preload = "auto";

    let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    if(saved.volume !== undefined){

        audio.volume = saved.volume;

    }

    else{

        audio.volume = 0.12;

    }

    if(saved.time){

        audio.currentTime = saved.time;

    }

    let playerHTML = `

<div id="musicFab">

🎧

</div>

<div id="musicOverlay">

<div id="musicSheet">

<div class="musicHandle"></div>

<div class="musicArt">

🎧

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
value="${Math.round(audio.volume*100)}"
>

<button class="closeMusic">

Close

</button>

</div>

</div>

`;

    document.body.insertAdjacentHTML("beforeend",playerHTML);

    const fab=document.getElementById("musicFab");

    const overlay=document.getElementById("musicOverlay");

    const sheet=document.getElementById("musicSheet");

    const playPause=document.getElementById("playPause");

    const progress=document.getElementById("progress");

    const volume=document.getElementById("volume");

    const current=document.getElementById("currentTime");

    const total=document.getElementById("totalTime");

    const closeBtn=document.querySelector(".closeMusic");

    function format(seconds){

        if(isNaN(seconds)) return "0:00";

        let m=Math.floor(seconds/60);

        let s=Math.floor(seconds%60);

        if(s<10){

            s="0"+s;

        }

        return m+":"+s;

    }

    function saveState(){

        localStorage.setItem(STORAGE_KEY,JSON.stringify({

            time:audio.currentTime,

            volume:audio.volume,

            playing:!audio.paused

        }));

    }

``
    /* ==========================================
   PART 2 - PLAYER CONTROLS
========================================== */

    fab.onclick = () => {

        overlay.style.display = "flex";

        requestAnimationFrame(() => {

            sheet.classList.add("open");

        });

    };

    closeBtn.onclick = () => {

        sheet.classList.remove("open");

        setTimeout(() => {

            overlay.style.display = "none";

        },350);

    };

    playPause.onclick = async () => {

        if(audio.paused){

            try{

                await audio.play();

                playPause.innerHTML="⏸";

                fab.classList.add("playing");

                saveState();

            }

            catch(err){

                console.log(err);

            }

        }

        else{

            audio.pause();

            playPause.innerHTML="▶";

            fab.classList.remove("playing");

            saveState();

        }

    };

    volume.oninput=()=>{

        audio.volume=volume.value/100;

        saveState();

    };

    audio.onloadedmetadata=()=>{

        total.innerHTML=format(audio.duration);

    };

    audio.ontimeupdate=()=>{

        current.innerHTML=format(audio.currentTime);

        if(audio.duration){

            progress.value=(audio.currentTime/audio.duration)*100;

        }

        saveState();

    };

    progress.oninput=()=>{

        if(audio.duration){

            audio.currentTime=(progress.value/100)*audio.duration;

        }

    };
/* ==========================================
   PART 3 - RESUME + FADE
========================================== */

    // Restore playback position
    audio.addEventListener("loadedmetadata", () => {

        if(saved.time){

            audio.currentTime = saved.time;

        }

        total.innerHTML = format(audio.duration);

        // If the song was playing on the previous page,
        // continue automatically.

        if(saved.playing){

            audio.play().then(()=>{

                playPause.innerHTML="⏸";

                fab.classList.add("playing");

                fadeIn();

            }).catch(()=>{

                // Browser blocked autoplay.
                // It will start after the next user interaction.

            });

        }

    });

    // Smooth fade-in
    function fadeIn(){

        let target = audio.volume;

        audio.volume = 0;

        let step = target / 20;

        let interval = setInterval(()=>{

            audio.volume += step;

            if(audio.volume >= target){

                audio.volume = target;

                clearInterval(interval);

            }

        },200);

    }

    // Save every second

    setInterval(()=>{

        saveState();

    },1000);

    // Save before
                          /* ==========================================
   PART 4 - TEMPORARY END
   (FOR TESTING ONLY)
========================================== */

// Keep UI in sync when playback ends
audio.addEventListener("ended", () => {

    playPause.innerHTML = "▶";

    fab.classList.remove("playing");

    saveState();

});

// If browser blocks autoplay, the player will
// simply wait for the user to press Play.
// (The final version will hook into your privacy
// notification to start automatically.)

// Save state whenever the page is hidden.
document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        saveState();

    }

});

// Final save before closing.
window.addEventListener("beforeunload", () => {

    saveState();

});

// ===== END OF MUSIC PLAYER =====

});
