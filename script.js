
const surpriseBtn = document.getElementById("surpriseBtn");
const surprisePopup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");
const doneBtn = document.getElementById("doneBtn");
const birthdayMusic = document.getElementById("birthdayMusic");
const hiddenContent = document.getElementById("hiddenContent");
const popupCard = document.querySelector(".popup-card");

let musicStarted = false;
let popupAutoScrollFrame = null;
let popupAutoScrollTimer = null;

function startPopupAutoScroll() {
  stopPopupAutoScroll();

  // Start from the top of the popup.
  popupCard.scrollTop = 0;

  function scrollStep() {
    if (!surprisePopup.classList.contains("show")) {
      popupAutoScrollFrame = null;
      return;
    }

    const atBottom =
      popupCard.scrollTop + popupCard.clientHeight >=
      popupCard.scrollHeight - 2;

    if (atBottom) {
      popupAutoScrollFrame = null;
      return;
    }

    // Increase 0.5 to 1 for faster scrolling.
    popupCard.scrollTop += 0.5;

    popupAutoScrollFrame =
      requestAnimationFrame(scrollStep);
  }

  popupAutoScrollFrame =
    requestAnimationFrame(scrollStep);
}

function stopPopupAutoScroll() {
  if (popupAutoScrollFrame !== null) {
    cancelAnimationFrame(popupAutoScrollFrame);
    popupAutoScrollFrame = null;
  }

  if (popupAutoScrollTimer !== null) {
    clearTimeout(popupAutoScrollTimer);
    popupAutoScrollTimer = null;
  }
}

async function openSurprise() {
  // Reveal the hidden Memories section.
  if (hiddenContent) {
    hiddenContent.hidden = false;
  }

  // Open the surprise popup.
  surprisePopup.classList.add("show");
  surprisePopup.setAttribute("aria-hidden", "false");

  // Play birthday music.
  if (!musicStarted) {
    try {
      await birthdayMusic.play();
      musicStarted = true;
    } catch (error) {
      console.error(
        "Music could not play. Check music/birthday-song.mp3",
        error
      );
    }
  }

  // Focus the close button.
  closePopup.focus();

  // Start scrolling inside the popup after a short delay.
  popupAutoScrollTimer = setTimeout(() => {
    startPopupAutoScroll();
    popupAutoScrollTimer = null;
  }, 1200);
}

function hideSurprise() {
  surprisePopup.classList.remove("show");
  surprisePopup.setAttribute("aria-hidden", "true");

  stopPopupAutoScroll();

  surpriseBtn.focus();
}

surpriseBtn.addEventListener("click", openSurprise);
closePopup.addEventListener("click", hideSurprise);
doneBtn.addEventListener("click", hideSurprise);

// Close when clicking outside the popup card.
surprisePopup.addEventListener("click", (event) => {
  if (event.target === surprisePopup) {
    hideSurprise();
  }
});

// Close with the Escape key.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    surprisePopup.classList.contains("show")
  ) {
    hideSurprise();
  }
});
