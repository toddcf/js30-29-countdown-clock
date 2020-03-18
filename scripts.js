let countdown;
const timerDisplay = document.querySelector('.display__time-left');

// Timer function takes in the number of seconds you want to count down:
function timer(seconds) {
  // Avoid using setInterval, since that can stop if you leave the browser tab for too long, or while you're scrolling:
  // Instead, get the current timestamp in milliseconds:
  const now = Date.now();

  // Calculate the current time plus the number of milliseconds you wish to count down:
  const then = now + (seconds * 1000);

  // Display the remaining time when timer() first runs.
  // Otherwise it will not display until after the first interval.
  displayRemainingTime(seconds);

  // Each second, display the remaining time:
  // Okay to use setInterval for this because even if it skips, it will update itself to the correct time afterward rather than losing accuracy.
  countdown = setInterval( () => {
    // Calculate how much time is left on clock by running Date.now() again, calculating the difference, and converting from milliseconds to seconds.
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      clearInterval(countdown);
    }
    displayRemainingTime(secondsLeft);
  }, 1000);
}

// Display the countdown:
function displayRemainingTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Add a '0' if under 10 seconds, then display:
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  timerDisplay.textContent = display;

  // Also show this in the tab title:
  document.title = display;
}

// Display the end time:
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
}

timer(70);