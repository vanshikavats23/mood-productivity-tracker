const moodCards = document.querySelectorAll(".mood-card");
const selectedMoodText = document.getElementById("selectedMoodText");

let selectedMood = null;

moodCards.forEach(card => {
  card.addEventListener("click", () => {
    
    // Remove active class from all
    moodCards.forEach(c => c.classList.remove("active"));

    // Add active class to clicked card
    card.classList.add("active");

    // Update state
    selectedMood = card.dataset.mood;

    // Update UI
    selectedMoodText.textContent = `Selected Mood: ${selectedMood}`;
  });
});
