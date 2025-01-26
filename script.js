// global variables for better caching and performance
let gradient, container;
let intervalId = null;
let isFullscreen = false;

window.onload = function () {
  gradient = document.getElementById("gradient");
  container = document.getElementById("container");
  randomGradient();
};

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    isFullscreen = true;
  } else {
    document.exitFullscreen();
    isFullscreen = false;
  }
  updateFullscreenButton();
}

function updateFullscreenButton() {
  const btn = document.getElementById("fullscreenBtn");
  if (!btn) return;

  btn.innerHTML = isFullscreen
    ? `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="currentColor"/>
    </svg>
  `
    : `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/>
    </svg>
  `;
}

function stopScreensaver() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  container.style.display = "block";
  container.style.opacity = "1";
}

function randomGradient() {
  const childContainer = document.createElement("div");
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const degree = Math.floor(Math.random() * 360);
  const gradientStyle = `linear-gradient(${degree}deg, ${color1}, ${color2})`;

  if (!gradient.style.transition) {
    gradient.style.cssText = `
      opacity: 1;
      transition: opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      margin: 0;
      will-change: opacity;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    `;

    container.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      will-change: transform;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    `;
  }

  gradient.style.background = gradientStyle;
  gradient.style.opacity = "1";

  setTimeout(() => {
    requestAnimationFrame(() => {
      gradient.style.opacity = "0";
    });
  }, 50);

  childContainer.className = "child-container";
  childContainer.style.cssText = `
    opacity: 0;
    transition: opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${gradientStyle};
    will-change: opacity;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0); 
    -webkit-transform: translateZ(0);
  `;

  gradient.appendChild(childContainer);

  setTimeout(() => {
    requestAnimationFrame(() => {
      childContainer.style.opacity = "1";
    });
  }, 50);

  // cleanup
  const oldContainers = gradient.getElementsByClassName("child-container");
  if (oldContainers.length > 2) {
    gradient.removeChild(oldContainers[0]);
  }
}

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function handleStart() {
  intervalId = setInterval(randomGradient, 5000);
  hideContainer();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    isFullscreen = true;
    updateFullscreenButton();
  }
}

function hideContainer() {
  container.style.transition = "opacity 0.5s ease-out";
  container.style.opacity = "0";
  setTimeout(() => {
    container.style.display = "none";
  }, 500);
}
