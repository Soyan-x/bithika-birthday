
const surpriseBtn = document.getElementById("surpriseBtn");
const surprisePopup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");
const doneBtn = document.getElementById("doneBtn");
const birthdayMusic = document.getElementById("birthdayMusic");

let musicStarted = false;

async function openSurprise() {
  // Show the photo frames and birthday message.
  surprisePopup.classList.add("show");
  surprisePopup.setAttribute("aria-hidden", "false");

  // Start music from the same button click.
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

  closePopup.focus();
}

function hideSurprise() {
  surprisePopup.classList.remove("show");
  surprisePopup.setAttribute("aria-hidden", "true");
  surpriseBtn.focus();
}

surpriseBtn.addEventListener("click", openSurprise);
closePopup.addEventListener("click", hideSurprise);
doneBtn.addEventListener("click", hideSurprise);

surprisePopup.addEventListener("click", (event) => {
  if (event.target === surprisePopup) {
    hideSurprise();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    surprisePopup.classList.contains("show")
  ) {
    hideSurprise();
  }
});
