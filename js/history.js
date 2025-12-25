const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
const historyList = document.getElementById("historyList");

history.slice().reverse().forEach(entry => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${entry.date} — ${entry.mood}</span>
    <strong>${entry.score}</strong>
  `;
  historyList.appendChild(li);
});
