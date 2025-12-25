if (localStorage.getItem("isLoggedIn") !== "true") {
  location.href = "auth.html";
}

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- MOOD ---------------- */

  const mood = localStorage.getItem("currentMood");
  if (!mood) {
    location.href = "index.html";
    return;
  }

  /* ---------------- TASKS ---------------- */

  const taskList = document.getElementById("taskList");

  const tasks = {
    happy: [
      "Deep work session",
      "Creative coding",
      "Skill improvement"
    ],
    neutral: [
      "Assignments",
      "Practice problems",
      "Revision"
    ],
    low: [
      "Light study",
      "Organize notes",
      "Watch tutorial"
    ],
    stressed: [
      "Planning tasks",
      "Short break",
      "Breathing exercise"
    ]
  };

  taskList.innerHTML = "";

  tasks[mood].forEach(task => {
    const div = document.createElement("div");
    div.textContent = task;
    taskList.appendChild(div);
  });

  /* ---------------- TIMER ELEMENTS ---------------- */

  const timeDisplay = document.getElementById("timeDisplay");
  const ring = document.getElementById("progressRing");

  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  const timerModeBtn = document.getElementById("timerModeBtn");
  const stopwatchModeBtn = document.getElementById("stopwatchModeBtn");

  /* ---------------- TIMER STATE ---------------- */

  let mode = "timer";
  let interval = null;

  const timerTotal = 25 * 60;
  let timerTime = timerTotal;
  let stopwatchTime = 0;

  /* ---------------- FUNCTIONS ---------------- */

  function updateDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timeDisplay.textContent = `${m}:${s.toString().padStart(2, "0")}`;
  }

  function updateRing(progress) {
    ring.style.background = `conic-gradient(
      var(--accent) ${progress}deg,
      rgba(255,255,255,0.15) 0deg
    )`;
  }

  /* ---------------- INIT ---------------- */

  updateDisplay(timerTime);
  updateRing(0);

  /* ---------------- MODE SWITCH ---------------- */

  timerModeBtn.onclick = () => {
    mode = "timer";
    timerModeBtn.classList.add("active");
    stopwatchModeBtn.classList.remove("active");
    clearInterval(interval);
    interval = null;
    timerTime = timerTotal;
    updateDisplay(timerTime);
    updateRing(0);
  };

  stopwatchModeBtn.onclick = () => {
    mode = "stopwatch";
    stopwatchModeBtn.classList.add("active");
    timerModeBtn.classList.remove("active");
    clearInterval(interval);
    interval = null;
    stopwatchTime = 0;
    updateDisplay(stopwatchTime);
    updateRing(0);
  };

  /* ---------------- START ---------------- */

  startBtn.onclick = () => {
    if (interval) return;

    interval = setInterval(() => {
      if (mode === "timer") {
        timerTime--;
        updateDisplay(timerTime);
        updateRing(((timerTotal - timerTime) / timerTotal) * 360);

        if (timerTime <= 0) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        stopwatchTime++;
        updateDisplay(stopwatchTime);
        updateRing((stopwatchTime % 60) * 6);
      }
    }, 1000);
  };

  /* ---------------- PAUSE ---------------- */

  pauseBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
  };

  /* ---------------- RESET ---------------- */

  resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;

    if (mode === "timer") {
      timerTime = timerTotal;
      updateDisplay(timerTime);
      updateRing(0);
    } else {
      stopwatchTime = 0;
      updateDisplay(stopwatchTime);
      updateRing(0);
    }
  };

});

/* ---------------- MANUAL TASKS ---------------- */

const customTaskInput = document.getElementById("customTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const customTaskList = document.getElementById("customTaskList");

let customTasks = [];

function renderCustomTasks() {
  customTaskList.innerHTML = "";
  customTasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${task}</span>
      <button data-index="${index}">✕</button>
    `;
    customTaskList.appendChild(div);
  });
}

addTaskBtn.onclick = () => {
  const task = customTaskInput.value.trim();
  if (!task) return;

  customTasks.push(task);
  customTaskInput.value = "";
  renderCustomTasks();
};

customTaskList.onclick = (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    customTasks.splice(index, 1);
    renderCustomTasks();
  }
};
const history =
  JSON.parse(localStorage.getItem("sessionHistory")) || [];

history.push(session);

localStorage.setItem("sessionHistory", JSON.stringify(history));
