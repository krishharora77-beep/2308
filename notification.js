// ======================================
// Android 16 Notification Pack
// ======================================

const redirectPage = "WEB2.html";

const cancelPage = "goodbye.html";

function showPrivacyNotification(){

    const overlay=document.getElementById("privacyOverlay");

    const notification=document.getElementById("privacyNotification");

    const checkbox=document.getElementById("privacyCheck");

    const continueBtn=document.getElementById("continuePrivacy");

    overlay.style.display="flex";

    checkbox.checked=false;

    continueBtn.disabled=true;

    requestAnimationFrame(()=>{

        notification.classList.add("show");

    });

}

document.addEventListener("DOMContentLoaded",()=>{

const checkbox=document.getElementById("privacyCheck");

const continueBtn=document.getElementById("continuePrivacy");

const laterBtn=document.getElementById("laterPrivacy");

checkbox.addEventListener("change",()=>{

continueBtn.disabled=!checkbox.checked;

});

continueBtn.addEventListener("click",()=>{

window.location.href=redirectPage;

});

laterBtn.addEventListener("click",()=>{

window.location.href=cancelPage;

});

});
