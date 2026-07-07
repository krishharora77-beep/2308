document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("finishJourney");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.className = "ending-overlay";

        overlay.innerHTML = `

<div class="ending-card">

    <div class="ending-title">
        💜 One Last Thought...
    </div>

    <div class="ending-text">
        Before you leave...
        <br><br>
        I'd love to know what you felt.
    </div>

    <div class="emoji-row">

        <span class="emoji">🥺</span>
        <span class="emoji">🙂</span>
        <span class="emoji">😊</span>
        <span class="emoji">😄</span>
        <span class="emoji">😍</span>
        <span class="emoji">❤️</span>

    </div>

    <textarea
        class="message-box"
        placeholder="Write anything..."
    ></textarea>

    <button class="send-btn">
        💜 Send
    </button>

</div>

`;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {

            overlay.classList.add("show");

            const card = overlay.querySelector(".ending-card");

            card.classList.add("show");

        });

        /* ===========================
           Emoji Selection
        =========================== */

        const emojis = overlay.querySelectorAll(".emoji");

        emojis.forEach(emoji => {

            emoji.addEventListener("click", () => {

                emojis.forEach(e => e.classList.remove("selected"));

                emoji.classList.add("selected");

            });

        });

        /* ===========================
           Send Button
        =========================== */

        const sendBtn = overlay.querySelector(".send-btn");

        sendBtn.addEventListener("click", async () => {

            const reaction =
                overlay.querySelector(".emoji.selected")?.textContent || "";

            const message =
                overlay.querySelector(".message-box").value;

            const formData = new FormData();

            formData.append("entry.1330814782", reaction);
            formData.append("entry.1787595112", message);

            sendBtn.disabled = true;
            sendBtn.innerHTML = "💜 Sending...";

            try {

                await fetch(
                    "https://docs.google.com/forms/d/e/1FAIpQLSfT1tu8oXAPjRlPyV94So5ZfC9MApWZWUoUDC763Tgmvivt5A/formResponse",
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    }
                );

            } catch (e) {
                console.log(e);
            }

            sendBtn.innerHTML = "💜 I got your words.";

        });

    });

});
