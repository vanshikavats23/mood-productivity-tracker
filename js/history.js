const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
const list = document.getElementById("historyList");

history.slice().reverse().forEach(e => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${e.date} — ${e.mood}</span><strong>${e.score}</strong>`;
  list.appendChild(li);
});
