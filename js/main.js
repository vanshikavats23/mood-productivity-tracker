const emptyState = document.getElementById("emptyState");

const moodCards = document.querySelectorAll(".mood-card");
const selectedMoodText = document.getElementById("selectedMoodText");
const taskList = document.getElementById("taskList");
const saveBtn = document.getElementById("saveBtn");

let selectedMood = null;

const moodTasks = {
  happy: ["Deep focus work", "Creative tasks", "Challenging coding"],
  neutral: ["Assignments", "Practice problems", "Revise notes"],
  low: ["Organize files", "Light study", "Fix small bugs"],
  stressed: ["Planning", "Short break", "Reflection"]
};

const moodScores = {
  happy: 90,
  neutral: 70,
  low: 50,
  stressed: 30
};

let history = JSON.parse(localStorage.getItem("moodHistory")) || [];

moodCards.forEach(card => {
  card.addEventListener("click", () => {
    moodCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    selectedMood = card.dataset.mood;
    selectedMoodText.textContent = `Selected Mood: ${selectedMood}`;

    taskList.innerHTML = "";
moodTasks[selectedMood].forEach((task, index) => {
  const li = document.createElement("li");
  li.textContent = task;
  li.style.animationDelay = `${index * 0.05}s`;
  taskList.appendChild(li);
});
  });
});

saveBtn.addEventListener("click", () => {
  if (!selectedMood) return alert("Select a mood first");

  const today = new Date().toLocaleDateString();
  const existing = history.find(h => h.date === today);

  if (existing) {
    existing.mood = selectedMood;
    existing.score = moodScores[selectedMood];
  } else {
    history.push({
      date: today,
      mood: selectedMood,
      score: moodScores[selectedMood]
    });
  }
emptyState.style.display = "none";

  localStorage.setItem("moodHistory", JSON.stringify(history));
  alert("Mood saved successfully");
  applyMoodTheme(selectedMood);

});
function applyMoodTheme(mood) {
  const root = document.documentElement;

  const themes = {
  happy: {
    accent: "#16a34a",
    soft: "#dcfce7"
  },
  neutral: {
    accent: "#4f46e5",
    soft: "#eef2ff"
  },
  low: {
    accent: "#0284c7",
    soft: "#e0f2fe"
  },
  stressed: {
    accent: "#dc2626",
    soft: "#fee2e2"
  }
};

  root.style.setProperty("--accent", themes[mood].accent);
  root.style.setProperty("--accent-soft", themes[mood].soft);
}
if (!selectedMood) {
  emptyState.style.display = "block";
}
