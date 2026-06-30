// ===============================
// MUSIC PLAYER
// ===============================

const audio = new Audio("music/TuHaiKahaan.mp3");

audio.loop = true;
audio.volume = 0.12;

document.body.insertAdjacentHTML("beforeend", `

<div id="musicFab">🎵</div>

<div id="musicOverlay">

    <div id="musicSheet">

        <div class="musicHandle"></div>

        <div class="musicArt">🎵</div>

        <div class="musicTitle">Background Melody</div>

        <div class="musicArtist">Tu Hai Kahan • AUR</div>

        <div class="musicControls">

            <button id="playPause">▶</button>

        </div>

        <input type="range" id="progress" value="0" min="0" max="100">

        <div class="timeRow">

            <span id="currentTime">0:00</span>

            <span id="totalTime">0:00</span>

        </div>

        <div class="volumeLabel">

            Volume

        </div>

        <input type="range" id="volume" min="0" max="100" value="12">

        <button class="closeMusic">Close</button>

    </div>

</div>

`);

const fab = document.getElementById("musicFab");
const overlay = document.getElementById("musicOverlay");
const sheet = document.getElementById("musicSheet");
const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const closeBtn = document.querySelector(".closeMusic");

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

    }, 350);

};

playPause.onclick = () => {

    if (audio.paused) {

        audio.play();

        playPause.innerHTML = "⏸";

        fab.classList.add("playing");

    } else {

        audio.pause();

        playPause.innerHTML = "▶";

        fab.classList.remove("playing");

    }

};

volume.oninput = () => {

    audio.volume = volume.value / 100;

};

audio.onloadedmetadata = () => {

    document.getElementById("totalTime").innerHTML = format(audio.duration);

};

audio.ontimeupdate = () => {

    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    document.getElementById("currentTime").innerHTML = format(audio.currentTime);

};

progress.oninput = () => {

    audio.currentTime = (progress.value / 100) * audio.duration;

};

function format(sec) {

    let m = Math.floor(sec / 60);

    let s = Math.floor(sec % 60);

    if (s < 10) s = "0" + s;

    return m + ":" + s;

}
