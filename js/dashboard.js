if (localStorage.getItem("isLoggedIn") !== "true") {
  location.href = "auth.html";
}

const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("greeting").textContent =
  `Welcome, ${user.name}`;

const sessions = JSON.parse(localStorage.getItem("sessionHistory")) || [];

document.getElementById("totalSessions").textContent = sessions.length;

if (sessions.length > 0) {
  const last = sessions[sessions.length - 1];
  document.getElementById("todayMood").textContent = last.mood;
  document.getElementById("lastDuration").textContent = last.duration;
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.setItem("isLoggedIn", "false");
  location.href = "auth.html";
};
