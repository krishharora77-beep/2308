const musicHint=document.getElementById("musicHint");
const musicBtn = document.getElementById("musicBtn");
const musicPopup = document.getElementById("musicPopup");
const closePlayer = document.getElementById("closePlayer");

const playBtn = document.getElementById("playBtn");

const audio = document.getElementById("audio");
audio.volume = 0.35;
audio.load()

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");



/* =========================
   OPEN / CLOSE
========================= */

musicBtn.addEventListener("click", () => {

    musicPopup.classList.add("show");

});

closePlayer.addEventListener("click", () => {

    musicPopup.classList.remove("show");

});



/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener("click", () => {

   musicHint.classList.remove("show");
   
    if (audio.paused) {

        audio.play();

        playBtn.innerHTML = "⏸";

        sessionStorage.setItem("musicPlaying", "true");

    } else {

        audio.pause();

        playBtn.innerHTML = "▶";

        sessionStorage.setItem("musicPlaying", "false");

    }

});



/* =========================
   SONG LOADED
========================= */

audio.addEventListener("loadedmetadata", () => {

    progress.max = Math.floor(audio.duration);

    totalTime.textContent = formatTime(audio.duration);

    const savedTime = sessionStorage.getItem("musicTime");

    if (savedTime) {

        audio.currentTime = parseFloat(savedTime);

    }

    if (sessionStorage.getItem("musicPlaying") === "true") {

        audio.play();

        playBtn.innerHTML = "⏸";

    }

});



/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener("timeupdate", () => {

    progress.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

    sessionStorage.setItem("musicTime", audio.currentTime);

});



/* =========================
   SEEK
========================= */

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});



/* =========================
   SONG ENDED
========================= */

audio.addEventListener("ended", () => {

    playBtn.innerHTML = "▶";

    progress.value = 0;

    sessionStorage.setItem("musicPlaying", "false");

    sessionStorage.setItem("musicTime", "0");

});



/* =========================
   TIME FORMAT
========================= */

function formatTime(seconds) {

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;

}

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("musicTime", audio.currentTime);
    sessionStorage.setItem("musicPlaying", !audio.paused);
});

window.addEventListener("load",()=>{

    setTimeout(()=>{

        musicHint.classList.add("show");

    },700);

    setTimeout(()=>{

        musicHint.classList.remove("show");

    },7000);

});
