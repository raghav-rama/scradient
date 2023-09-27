window.onload = function () {
  randomGradient();
};

function randomGradient() {
  let gradient = document.getElementById("gradient");
  let childContainer = document.createElement("div");
  let color1 = getRandomColor();
  let color2 = getRandomColor();
  let degree = Math.floor(Math.random() * 360);
  gradient.style.opacity = "1";
  gradient.style.transition = "opacity 2.5s ease-out";
  gradient.style.background = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
  gradient.style.backgroundRepeat = "no-repeat";
  gradient.style.backgroundAttachment = "fixed";
  gradient.style.backgroundSize = "cover";
  gradient.style.margin = "0";
  setTimeout(() => {
    gradient.style.opacity = "0";
  }, 1000);

  color1 = getRandomColor();
  color2 = getRandomColor();
  childContainer.className = "child-container";
  childContainer.style.opacity = "0";
  childContainer.style.transition = "opacity 2.5s ease-out";
  childContainer.style.position = "absolute";
  childContainer.style.top = "0";
  childContainer.style.left = "0";
  childContainer.style.width = "100%";
  childContainer.style.height = "100%";
  childContainer.style.background = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
  gradient.appendChild(childContainer);
  setTimeout(() => {
    childContainer.style.opacity = "1";
  }, 1000);

  let container = document.getElementById("container");
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "1";
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; ++i) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleStart() {
  setInterval(randomGradient, 5000);
  hideContainer();
  let body = document.body;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  }
}

function hideContainer() {
  let container = document.getElementById("container");
  container.style.transition = "opacity 0.5s ease-out";
  container.style.opacity = "0";
  setTimeout(() => {
    container.style.display = "none";
  }, 500);
}
