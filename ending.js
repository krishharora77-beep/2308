document.addEventListener("DOMContentLoaded",()=>{

const btn=document.getElementById("finishJourney");

if(!btn) return;

btn.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.className="ending-overlay";

overlay.innerHTML=`

<div class="ending-card">

<div class="ending-title">

💜 One Last Thought...

</div>

<div class="ending-text">

Before you leave...

I'd love to know what you felt.

</div>

<div class="emoji-row">

<span class="emoji"></span>

<span class="emoji">🙂</span>

<span class="emoji">😊</span>

<span class="emoji">😄</span>

<span class="emoji">😍</span>

<span class="emoji">❤️</span>

</div>

<textarea class="message-box"

placeholder="Write anything..."></textarea>

<button class="send-btn">

💜 Send

</button>

</div>

`;

document.body.appendChild(overlay);

requestAnimationFrame(()=>{

overlay.classList.add("show");

const card=overlay.querySelector(".ending-card");

card.classList.add("show");

});

});

});
