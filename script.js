const moodCards = document.querySelectorAll(".mood-card");
const selectedMoodText = document.getElementById("selectedMoodText");
const taskList = document.getElementById("taskList");
const scoreValue = document.getElementById("scoreValue");
const historyList = document.getElementById("historyList");

let selectedMood = null;

// Mood → Task Mapping
const moodTasks = {
  happy: [
    "Work on a challenging concept",
    "Build or improve a project feature",
    "Creative brainstorming session",
    "Deep focus coding (45–60 mins)"
  ],
  neutral: [
    "Complete pending assignments",
    "Practice coding problems",
    "Revise notes or documentation",
    "Watch a technical tutorial"
  ],
  low: [
    "Organize files or notes",
    "Revise previously learned topics",
    "Watch light educational content",
    "Fix minor bugs"
  ],
  stressed: [
    "Plan tasks for tomorrow",
    "Clean up workspace or code",
    "Take a short break",
    "Reflect and journal"
  ]
};

// Mood → Productivity Score
const moodScores = {
  happy: 90,
  neutral: 70,
  low: 50,
  stressed: 30
};

// Load history from LocalStorage
let history = JSON.parse(localStorage.getItem("moodHistory")) || [];

moodCards.forEach(card => {
  card.addEventListener("click", () => {

    moodCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    selectedMood = card.dataset.mood;
    selectedMoodText.textContent = `Selected Mood: ${selectedMood}`;

    showTasksForMood(selectedMood);
    updateScore(selectedMood);
    saveTodayEntry(selectedMood);
    renderHistory();
  });
});

function showTasksForMood(mood) {
  taskList.innerHTML = "";
  moodTasks[mood].forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

function updateScore(mood) {
  scoreValue.textContent = moodScores[mood];
}

function saveTodayEntry(mood) {
  const today = new Date().toLocaleDateString();

  // Prevent duplicate entries for same day
  const existing = history.find(entry => entry.date === today);
  if (existing) {
    existing.mood = mood;
    existing.score = moodScores[mood];
  } else {
    history.push({
      date: today,
      mood: mood,
      score: moodScores[mood]
    });
  }

  localStorage.setItem("moodHistory", JSON.stringify(history));
}

function renderHistory() {
  historyList.innerHTML = "";

  history.slice().reverse().forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${entry.date} — ${entry.mood}</span>
      <strong>${entry.score}</strong>
    `;
    historyList.appendChild(li);
  });
}

// Initial render on page load
renderHistory();
