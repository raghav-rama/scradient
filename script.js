// global variables for better caching and performance
let gradient, container;

window.onload = function () {
  gradient = document.getElementById("gradient");
  container = document.getElementById("container");
  randomGradient();
};

function randomGradient() {
  const childContainer = document.createElement("div");
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const degree = Math.floor(Math.random() * 360);
  const gradientStyle = `linear-gradient(${degree}deg, ${color1}, ${color2})`;

  if (!gradient.style.transition) {
    gradient.style.cssText = `
      opacity: 1;
      transition: opacity 2.5s ease-out;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      margin: 0;
    `;

    container.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    `;
  }

  gradient.style.background = gradientStyle;
  gradient.style.opacity = "1";

  requestAnimationFrame(() => {
    gradient.style.opacity = "0";
  });

  childContainer.className = "child-container";
  childContainer.style.cssText = `
    opacity: 0;
    transition: opacity 2.5s ease-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${gradientStyle};
  `;

  gradient.appendChild(childContainer);

  requestAnimationFrame(() => {
    childContainer.style.opacity = "1";
  });

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
  setInterval(randomGradient, 5000);
  hideContainer();

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function hideContainer() {
  container.style.transition = "opacity 0.5s ease-out";
  container.style.opacity = "0";
  setTimeout(() => {
    container.style.display = "none";
  }, 500);
}
