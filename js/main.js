
let pomoDeadline = 0;

function paintPomo() {
  const display = document.getElementById("pomo");
  if (display) {
    display.textContent = formatDuration(pomoRemaining);
  }
}

function startPomo() {
  if (pomoRunning || pomoRemaining <= 0) return;

  pomoRunning = true;
  pomoDeadline = Date.now() + pomoRemaining * 1000;

  function tick() {
    pomoRemaining = Math.max(0, (pomoDeadline - Date.now()) / 1000);
    paintPomo();

    const status = document.getElementById("pomoStatus");

    if (pomoRemaining <= 0) {
      pomoRemaining = 0;
      pomoRunning = false;
      stopActiveTimer();
      paintPomo();

      if (status) {
        status.textContent = "Focus session complete! Time for a break.";
      }
      return;
    }

    if (status) status.textContent = "Focus session in progress.";
  }

  tick();
  if (pomoRunning) timer = setInterval(tick, 200);
}

function pausePomo() {
  if (!pomoRunning) return;

  pomoRemaining = Math.max(0, (pomoDeadline - Date.now()) / 1000);
  pomoRunning = false;
  stopActiveTimer();
  paintPomo();

  const status = document.getElementById("pomoStatus");
  if (status) {
    status.textContent = "Session paused.";
  }
}

function resetPomo() {
  pomoRunning = false;
  pomoRemaining = 1500;
  pomoDeadline = 0;
  stopActiveTimer();
  paintPomo();

  const status = document.getElementById("pomoStatus");
  if (status) {
    status.textContent = "25 minutes of focused work.";
  }
}
