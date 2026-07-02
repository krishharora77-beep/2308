document.addEventListener("DOMContentLoaded", function () {

    // Prevent duplicate player
    if (document.getElementById("musicFab")) return;

    // Create audio
    const audio = new Audio("music/TuHaiKahaan.mp3");
    audio.loop = true;
    audio.volume = 0.12;

    // Player HTML
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

                <input id="progress" type="range" value="0" min="0" max="100">

                <div class="timeRow">
                    <span id="currentTime">0:00</span>
                    <span id="totalTime">0:00</span>
                </div>

                <div class="volumeLabel">Volume</div>

                <input id="volume" type="range" min="0" max="100" value="12">

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

    fab.addEventListener("click", function () {
        overlay.style.display = "flex";
        setTimeout(() => {
            sheet.classList.add("open");
        }, 10);
    });

    closeBtn.addEventListener("click", function () {
        sheet.classList.remove("open");
        setTimeout(() => {
            overlay.style.display = "none";
        }, 350);
    });

    playPause.addEventListener("click", function () {

        if (audio.paused) {

            audio.play();

            playPause.innerHTML = "⏸";

            fab.classList.add("playing");

        } else {

            audio.pause();

            playPause.innerHTML = "▶";

            fab.classList.remove("playing");

        }

    });

    volume.addEventListener("input", function () {

        audio.volume = this.value / 100;

    });

    audio.addEventListener("loadedmetadata", function () {

        document.getElementById("totalTime").innerHTML = format(audio.duration);

    });

    audio.addEventListener("timeupdate", function () {

        if (audio.duration) {

            progress.value = (audio.currentTime / audio.duration) * 100;

        }

        document.getElementById("currentTime").innerHTML = format(audio.currentTime);

    });

    progress.addEventListener("input", function () {

        if (audio.duration) {

            audio.currentTime = (this.value / 100) * audio.duration;

        }

    });

    function format(sec) {

        if (isNaN(sec)) return "0:00";

        let m = Math.floor(sec / 60);

        let s = Math.floor(sec % 60);

        if (s < 10) s = "0" + s;

        return m + ":" + s;

    }

});