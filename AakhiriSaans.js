document.addEventListener("DOMContentLoaded", () => {
    
    const startBtn = document.getElementById("start-btn");
    const startScreen = document.getElementById("start-screen");
    const finalCanvas = document.getElementById("final-canvas");
    const audio = document.getElementById("final-audio");
    const lyricsContainer = document.getElementById("lyrics-container");

    // The complete song structure
    // Note: Adjust these 'time' values (in seconds) to perfectly match the audio file!
    const myThoughts = [
        // Verse 1
        { time: 2.0, text: "Na jaane kyun mujhse tu rehti khafa hai..." },
        { time: 7.0, text: "Soch ke hamare kal ka..." },
        { time: 12.0, text: "Aankhon mein tu aur dil mein wafa hai..." },
        { time: 17.0, text: "Sach yahi to hai is pal ka..." },
        
        // Pre-Chorus
        { time: 22.0, text: "Is duniya mein jo kuch bhi hai hua..." },
        { time: 27.0, text: "Hua hai wo ki hum tum mile..." },
        { time: 32.0, text: "Sau saalon mein badlega ye jahan..." },
        { time: 37.0, text: "Na badlenge fir bhi tum aur main..." },
        
        // Chorus
        { time: 42.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 48.0, text: "Na mile tu mujhe, to main duniya chhan loon..." },
        { time: 54.0, text: "Jhooth bhi tu kahe, to main sach wo maan loon..." },
        { time: 60.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        
        // Verse 2
        { time: 66.0, text: "Socha saja loon ghar ko tu jo kal rahegi sang mein..." },
        { time: 71.0, text: "Tumse churaya pal lagaaon main humare kal mein..." },
        { time: 76.0, text: "Par tu khafa hai soche rehti na tu mere mann mein..." },
        { time: 81.0, text: "Shayad yahan koi aur hai..." },
        
        // Pre-Chorus 2
        { time: 86.0, text: "Sau pariyan bhi ho mere saamne..." },
        { time: 91.0, text: "Phir bhi sada tumko hi chunoon main..." },
        { time: 96.0, text: "Sau saalon mein badlega ye jahan..." },
        { time: 101.0, text: "Na badlenge fir bhi tum aur main..." },
        
        // Chorus 2
        { time: 106.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 112.0, text: "Saans bhi wo meri tujhse aadhi baant loon..." },
        { time: 118.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 124.0, text: "Na mile tu mujhe, to main duniya chhan loon..." },
        { time: 130.0, text: "Jhooth bhi tu kahe, to main sach wo maan loon..." },
        { time: 136.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        
        // Rap Verse (The Unsaid Thoughts)
        { time: 142.0, text: "Kyun faasle hain darmiyaan, samajh nahi main pa raha..." },
        { time: 145.0, text: "Paas aana chahta hoon, par thehar sa main jaa raha..." },
        { time: 148.0, text: "Sochta hoon dimaag mein ek poori nayi dastaan..." },
        { time: 151.0, text: "Par jab tu paas se guzre, kho deta hoon raasta..." },
        { time: 154.0, text: "Khamoshiyon ne mere lafzon ko chupa liya..." },
        { time: 157.0, text: "Bina kuch kahe maine sab kuch hai luta diya..." },
        { time: 160.0, text: "Bas ek muskaan dekhi aur khud ko mana liya..." },
        { time: 163.0, text: "Tere aage aake maine khud ko hi mita diya..." },
        
        // Bridge (The Fade to Black)
        { time: 168.0, text: "Ab yahi hai safar ki aakhiri manzil meri..." },
        { time: 173.0, text: "Is kaale andhere mein chhup jayegi mehfil meri..." },
        { time: 178.0, text: "Khush rahe tu hamesha, dua yahi karta hoon..." },
        { time: 183.0, text: "Apne in hisson ko in shabdon mein main rakhta hoon..." },

        // Final Chorus & Outro
        { time: 188.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 194.0, text: "Saans bhi wo meri tujhse aadhi baant loon..." },
        { time: 200.0, text: "Na ra na... na ra na... na ra na..." },
        { time: 206.0, text: "Na ra na... na ra na... na ra na..." },
        { time: 212.0, text: "Na ra na... na ra na... na ra na..." }
    ];

    // 1. Pre-create the DOM elements for the thoughts
    const lyricElements = myThoughts.map((thought) => {
        const div = document.createElement("div");
        div.className = "lyric-line";
        div.innerText = thought.text;
        lyricsContainer.appendChild(div);
        return div;
    });

    let currentIndex = -1;

    // 2. Trigger the journey (Bypass browser autoplay restrictions)
    startBtn.addEventListener("click", () => {
        // Fade out the start button
        startScreen.style.opacity = '0';
        
        setTimeout(() => {
            startScreen.style.display = 'none';
            
            // Fade in the canvas and start the pink-to-black transition
            finalCanvas.classList.remove("hidden");
            document.body.classList.add("fade-to-black");
            
            // Play the music
            audio.play();
        }, 1000); 
    });

    // 3. Synchronize thoughts with audio time
    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;

        // Find the index of the thought that should be currently displayed
        let newIndex = -1;
        for (let i = 0; i < myThoughts.length; i++) {
            if (currentTime >= myThoughts[i].time) {
                newIndex = i;
            } else {
                break; 
            }
        }

        // If the index has changed, update the UI
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateLyricsUI();
        }
    });

    // 4. Update the visual classes for the breathing effect
    function updateLyricsUI() {
        // Reset all classes
        lyricElements.forEach(el => {
            el.className = "lyric-line"; 
        });

        // Set previous line
        if (currentIndex > 0) {
            lyricElements[currentIndex - 1].classList.add("lyric-previous");
        }
        
        // Set current line
        if (currentIndex >= 0 && currentIndex < lyricElements.length) {
            lyricElements[currentIndex].classList.add("lyric-current");
        }

        // Set next line
        if (currentIndex < lyricElements.length - 1) {
            lyricElements[currentIndex + 1].classList.add("lyric-next");
        }
    }
});
