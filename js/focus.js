const mood = localStorage.getItem("currentMood");
if (!mood) location.href = "index.html";

const title = document.getElementById("focusTitle");
const list = document.getElementById("taskList");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startTimer");
const saveBtn = document.getElementById("saveSession");
const note = document.getElementById("note");

title.textContent = `Focus Mode — ${mood}`;

const tasks = {
  happy: ["Deep work", "Creative coding", "Project development", "Brainstorming"],
  neutral: ["Assignments", "Practice problems", "Reading", "Reviewing notes"],
  low: ["Light study", "Organize notes", "Review material", "Mind mapping"],
  stressed: ["Planning", "Short break", "Meditation", "Breathing exercises"]
};

const scores = { happy: 90, neutral: 70, low: 50, stressed: 30 };

tasks[mood].forEach(task => {
  const div = document.createElement("div");
  div.textContent = task;
  list.appendChild(div);
});

let time = 25 * 60;
let interval;

startBtn.onclick = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    timerEl.textContent = `${m}:${s.toString().padStart(2,"0")}`;
    if (--time < 0) clearInterval(interval);
  }, 1000);
};

saveBtn.onclick = () => {
  const data = {
    mood,
    score: scores[mood],
    note: note.value,
    date: new Date().toLocaleDateString()
  };
  localStorage.setItem("lastSession", JSON.stringify(data));
  window.location.href = "dashboard.html";
};

