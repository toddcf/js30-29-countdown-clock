let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const countdownObject = {
  // Timer function takes in the number of seconds you want to count down:
  timer: (seconds) => {
    // Clear any existing countdowns before starting new one:
    clearInterval(countdown);
    // Avoid using setInterval, since that can stop if you leave the browser tab for too long, or while you're scrolling:
    // Instead, get the current timestamp in milliseconds:
    const now = Date.now();

    // Calculate the current time plus the number of milliseconds you wish to count down:
    const then = now + (seconds * 1000);

    // Display the remaining time when timer() first runs.
    // Otherwise it will not display until after the first interval.
    countdownObject.displayRemainingTime(seconds);

    // Each second, display the remaining time:
    // Okay to use setInterval for this because even if it skips, it will update itself to the correct time afterward rather than losing accuracy.
    countdown = setInterval( () => {
      // Calculate how much time is left on clock by running Date.now() again, calculating the difference, and converting from milliseconds to seconds.
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft === 0) {
        clearInterval(countdown);
      }
      countdownObject.displayRemainingTime(secondsLeft);

      // Pass the end time into the function that will display it:
      countdownObject.displayEndTime(then);
    }, 1000);
  },
  startTimer: (e) => {
    const seconds = parseInt(e.currentTarget.dataset.time); // Convert to number
    countdownObject.timer(seconds);
  },
  // Display the countdown:
  displayRemainingTime: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Add a '0' if under 10 seconds, then display:
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.textContent = display;

    // Also show this in the tab title:
    document.title = display;
  },
  // Display the end time:
  displayEndTime: (timestamp) => {
    // Convert timestamp into a date:
    const end = new Date(timestamp);

    // Get the individual components we need:
    const hours = end.getHours();
    const minutes = end.getMinutes();

    // Pass into the UI, convert from military time, and determine AM/PM:
    endTime.textContent = `Be back at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours > 12 ? 'PM' : 'AM'}`;
  },
  init: () => {
    // When any button with data-time attribute is clicked, start the countdown with the corresponding time remaining:
    buttons.forEach(button => button.addEventListener('click', countdownObject.startTimer));

    // Custom form entry:
    document.customForm.addEventListener('submit', function(e) {
      // Stop it from reloading the page:
      e.preventDefault();
      const mins = e.currentTarget.minutes.value;
      const seconds = mins * 60;
      countdownObject.timer(seconds);
    });
  }

}

countdownObject.init();