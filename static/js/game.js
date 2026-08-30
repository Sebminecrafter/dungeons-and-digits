function randomDec(min, max) {
  return Math.random() * (max - min) + min;
}
function random(min, max) {
  return Math.round(randomDec(min, max));
}

var canvas, ctx, player, x, y, timer, start;

function gameLoop() {
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, x + 50, y + 50, 100, 100);

  timer = (new Date().getTime() - start) / 1000;
  x = 800 + Math.sin((timer * 10) / 2) * 128;
  y = 300 + Math.sin(timer * 10) * 128;

  requestAnimationFrame(gameLoop);
}

function main() {
  canvas = document.getElementById("main-window");
  if (!canvas.getContext) {
    alert("Sorry, your browser is unsupported!");
    return;
  }
  // Get canvas context
  ctx = canvas.getContext("2d");

  resizeCanvas();

  player = new Image();
  player.src = "/static/img/lcv.png";

  x = 0;
  y = 0;
  timer = 0;
  start = new Date().getTime();

  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
}

window.addEventListener("load", main);
window.addEventListener("resize", resizeCanvas);
