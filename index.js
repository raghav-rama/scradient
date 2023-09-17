window.onload = function () {
  randomGradient();
};

function randomGradient() {
  let gradient = document.getElementById("gradient");
  let color1 = getRandomColor();
  let color2 = getRandomColor();
  let degree = Math.floor(Math.random() * 360);
  gradient.style.background = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
  gradient.style.backgroundRepeat = "no-repeat";
  gradient.style.backgroundAttachment = "fixed";
  gradient.style.backgroundSize = "cover";
  gradient.style.margin = "0";
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}
