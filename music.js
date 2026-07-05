document.addEventListener("DOMContentLoaded",()=>{

if(document.getElementById("musicFab")) return;

document.body.insertAdjacentHTML("beforeend",`

<div id="musicFab">🎵</div>

<div id="musicOverlay" style="display:none;">

<div id="musicSheet">

<div class="musicHandle"></div>

<h3>Music Player</h3>

<p>Skeleton Working ✅</p>

<button id="closeMusic">Close</button>

</div>

</div>

`);

const fab=document.getElementById("musicFab");

const overlay=document.getElementById("musicOverlay");

const sheet=document.getElementById("musicSheet");

const close=document.getElementById("closeMusic");

fab.onclick=()=>{

overlay.style.display="flex";

requestAnimationFrame(()=>{

sheet.classList.add("open");

});

};

close.onclick=()=>{

sheet.classList.remove("open");

setTimeout(()=>{

overlay.style.display="none";

},300);

};

});
