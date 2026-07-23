const audio = document.getElementById("dedicationAudio");

const button = document.getElementById("dedicationBtn");

const progress = document.getElementById("dedicationProgress");

const currentTimeText =
document.getElementById("dedicationCurrent");

const totalTimeText =
document.getElementById("dedicationTotal");

const cover =
document.getElementById("dedicationCover");



button.onclick = () =>{


    if(audio.paused){

        audio.play();

        button.innerHTML = "⏸ Pause";

        cover.classList.add("cover-rotate");

    }


    else{

        audio.pause();

        button.innerHTML = "▶ Listen";

        cover.classList.remove("cover-rotate");

    }


};




audio.addEventListener(

"loadedmetadata",

()=>{

    totalTimeText.innerHTML =

    Math.floor(audio.duration/60)

    +

    ":"

    +

    String(

        Math.floor(audio.duration%60)

    ).padStart(2,"0");


});




audio.addEventListener(

"timeupdate",

()=>{


    progress.value =

    (audio.currentTime/audio.duration)

    *100;



    currentTimeText.innerHTML =

    Math.floor(audio.currentTime/60)

    +

    ":"

    +

    String(

        Math.floor(audio.currentTime%60)

    ).padStart(2,"0");



});




progress.oninput = ()=>{


    audio.currentTime =

    (progress.value/100)

    *audio.duration;


};




audio.onended = ()=>{


    button.innerHTML = "▶ Listen";

    progress.value = 0;

    audio.currentTime = 0;

    cover.classList.remove("cover-rotate");


};
