if (localStorage.getItem("isLoggedIn") !== "true") {
  location.href = "auth.html";
}

const moods = document.querySelectorAll(".mood");
const btn = document.getElementById("continueBtn");

let selectedMood = null;

moods.forEach(mood => {
  mood.onclick = () => {
    moods.forEach(m => m.classList.remove("active"));
    mood.classList.add("active");
    selectedMood = mood.dataset.mood;
    btn.disabled = false;
  };
});

btn.onclick = () => {
  localStorage.setItem("currentMood", selectedMood);
  window.location.href = "focus.html";
};

