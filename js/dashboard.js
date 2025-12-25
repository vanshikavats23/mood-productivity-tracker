const data = JSON.parse(localStorage.getItem("lastSession"));

if (!data) {
  document.getElementById("summary").textContent = "No data yet.";
} else {
  document.getElementById("score").textContent = data.score;
  document.getElementById("summary").textContent =
    `You worked in a "${data.mood}" state on ${data.date}.`;
}
