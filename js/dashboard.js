const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

const scoreValue = document.getElementById("scoreValue");
const moodInsight = document.getElementById("moodInsight");
const bestDayInsight = document.getElementById("bestDayInsight");

if (history.length > 0) {
  const today = history[history.length - 1];
  scoreValue.textContent = today.score;

  const lastWeek = history.slice(-7);
  const moodCount = {};

  lastWeek.forEach(e => {
    moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
  });

  const dominantMood = Object.keys(moodCount).reduce((a, b) =>
    moodCount[a] > moodCount[b] ? a : b
  );

  const bestDay = lastWeek.reduce((a, b) =>
    a.score > b.score ? a : b
  );

  moodInsight.textContent =
    `Your most frequent mood this week was "${dominantMood}".`;

  bestDayInsight.textContent =
    `Your highest productivity was on ${bestDay.date} with score ${bestDay.score}.`;
}
document.documentElement.style.setProperty(
  "--progress",
  today.score
);

