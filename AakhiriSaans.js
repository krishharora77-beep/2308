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
        { time: 0.3, text: "Na jaane kyun mujhse tu rehti khafa hai..." },
        { time: 6.0, text: "Soch ke hamare kal ka..." },
        { time: 11.5, text: "Aankhon mein tu aur dil mein wafa hai..." },
        { time: 16.8, text: "Sach yahi to hai is pal ka..." },
        
        // Pre-Chorus
        { time: 21.4, text: "Is duniya mein jo kuch bhi hai hua..." },
        { time: 27.2, text: "Hua hai wo ki hum tum mile..." },
        { time: 32.6, text: "Sau saalon mein badlega ye jahan..." },
        { time: 38.1, text: "Na badlenge fir bhi tum aur main..." },
        
        // Chorus
        { time: 44.0, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 49.5, text: "Na mile tu mujhe, to main duniya chhan loon..." },
        { time: 55.0, text: "Jhooth bhi tu kahe, to main sach wo maan loon..." },
        { time: 60.5, text: "Aakhiri saans ho, to bhi tera naam loon..." },

        //Music 1
        { time: 66.0, text: "..."},
        
        // Verse 2
        { time: 77.8, text: "Socha saja loon ghar ko tu jo kal rahegi sang mein..." },
        { time: 83.3, text: "Tumse churaya pal lagaaon main humare kal mein..." },
        { time: 88.8, text: "Par tu khafa hai soche rehti na tu mere mann mein..." },
        { time: 94.4, text: "Shayad yahan koi aur hai..." },
        
        // Pre-Chorus 2
        { time: 97.6, text: "Sau pariyan bhi ho mere saamne..." },
        { time: 99.1, text: "Phir bhi sada tumko hi chunoon main..." },
        { time: 104.1, text: "Sau saalon mein badlega ye jahan..." },
        { time: 109.6, text: "Na badlenge fir bhi tum aur main..." },
        
        // Chorus 2
        { time: 115.2, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 121.2, text: "Saans bhi wo meri tujhse aadhi baant loon..." },
        { time: 126.7, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 132.2, text: "Na mile tu mujhe, to main duniya chhan loon..." },
        { time: 137.8, text: "Jhooth bhi tu kahe, to main sach wo maan loon..." },
        { time: 143.3, text: "Aakhiri saans ho, to bhi tera naam loon..." },

        // Final Chorus & Outro
        { time: 148.7, text: "Aakhiri saans ho, to bhi tera naam loon..." },
        { time: 154.3, text: "Saans bhi wo meri tujhse aadhi baant loon..." },
        { time: 165.4, text: "Na ra na... na ra na... na ra na..." },
        { time: 170.8, text: "Na ra na... na ra na... na ra na..." },
        { time: 178.3, text: "Na ra na... na ra na... na ra na..." },
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

// TEMPORARY SYNC HELPER - DELETE WHEN FINISHED
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            // Prevents the spacebar from scrolling the page down
            event.preventDefault(); 
            console.log(`Current Time: ${audio.currentTime.toFixed(1)}`);
        }
    });
// TILL HERE.....    
});
