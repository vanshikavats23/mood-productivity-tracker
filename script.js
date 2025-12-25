const moodCards = document.querySelectorAll(".mood-card");
const selectedMoodText = document.getElementById("selectedMoodText");
const taskList = document.getElementById("taskList");

let selectedMood = null;

// Mood → Task Mapping (Core Intelligence)
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
    "Small wins: fix minor bugs"
  ],
  stressed: [
    "Plan tasks for tomorrow",
    "Clean up workspace or code",
    "Take a 10–15 min break",
    "Reflect and journal thoughts"
  ]
};

moodCards.forEach(card => {
  card.addEventListener("click", () => {

    moodCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    selectedMood = card.dataset.mood;
    selectedMoodText.textContent = `Selected Mood: ${selectedMood}`;

    showTasksForMood(selectedMood);
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
