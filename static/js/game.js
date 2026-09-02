import * as classes from "/static/js/classes.js";
import * as functions from "/static/js/functions.js";

// Global variables
var backgroundColor = "rgb(255, 255, 255)";
var canvas;
var ctx;
var player;
var timer;
var start;
var keys;
var centerX;
var centerY;

var playerDirection = { up: false, down: false, left: false, right: false };

var speed = 5;

function drawBackground() {
  const oldStyle = ctx.fillStyle;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = oldStyle;
}

function getDirections() {
  playerDirection["up"] = keys["ArrowUp"] || keys["w"];
  playerDirection["down"] = keys["ArrowDown"] || keys["s"];
  playerDirection["left"] = keys["ArrowLeft"] || keys["a"];
  playerDirection["right"] = keys["ArrowRight"] || keys["d"];
}

function calcGlobals() {
  centerX = canvas.width / 2 - player.getWidth() / 2;
  centerY = canvas.height / 2 - player.getHeight() / 2;
  timer = (new Date().getTime() - start) / 1000;
}

// Update player position based on input
function updatePlayerPosition() {
  if (!(player instanceof classes.Sprite)) {
    return;
  }
  let yChange =
    (playerDirection["down"] ? 1 : 0) - (playerDirection["up"] ? 1 : 0);
  let xChange =
    (playerDirection["right"] ? 1 : 0) - (playerDirection["left"] ? 1 : 0);

  let a = yChange;
  let b = xChange;

  yChange = b % 1 != 0 ? a / 2 : a;
  xChange = a % 1 != 0 ? b / 2 : b;

  player.setY(player.getY() + speed * yChange);
  player.setX(player.getX() + speed * xChange);

  // Canvas boundary collisions (Keep player inside the box)
  player.setX(player.getX() < 0 ? 0 : player.getX());
  player.setY(player.getY() < 0 ? 0 : player.getY());

  if (player.getX() + player.getWidth() > canvas.width) {
    player.setX(canvas.width - player.getWidth());
  }
  if (player.getY() + player.getHeight() > canvas.height) {
    player.setY(canvas.height - player.getHeight());
  }
}

function playerAnimation() {
  if (!(player instanceof classes.Sprite)) {
    return;
  }
  if (playerDirection["up"]) {
    if (player.getAnimation() != 8) player.setAnimation(8);
    else player.setAnimation(9);
  } else if (playerDirection["down"]) {
    if (player.getAnimation() != 5) player.setAnimation(5);
    else player.setAnimation(6);
  } else if (playerDirection["right"]) {
    if (player.getAnimation() != 0) player.setAnimation(0);
    else player.setAnimation(1);
  } else if (playerDirection["left"]) {
    if (player.getAnimation() != 2) player.setAnimation(2);
    else player.setAnimation(3);
  }
}

function gameLoop() {
  if (!(ctx instanceof CanvasRenderingContext2D)) {
    alert("Fatal error. Please reload the page");
    return;
  }

  calcGlobals();

  getDirections();

  updatePlayerPosition();

  drawBackground();

  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

function doLogo(logo) {
  calcGlobals();

  if (timer >= 3) {
    requestAnimationFrame(gameLoop);
    return;
  }

  if (!(ctx instanceof CanvasRenderingContext2D)) {
    alert("Fatal error. Please reload the page");
    return;
  }

  let opacity;
  if (timer < 1.5) {
    opacity = timer / 1.5;
  } else {
    opacity = (3 - timer) / 1.5;
  }

  const logoSize = canvas.width / 4;
  const logoX = canvas.width / 2 - logoSize / 2;
  const logoY = canvas.height / 2 - logoSize / 2;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = opacity;
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  ctx.globalAlpha = 1.0;

  requestAnimationFrame(() => {
    doLogo(logo);
  });
}

function setup() {
  canvas = document.getElementById("main-window");
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    alert("Fatal error! Please try reloading.");
    return;
  }
  if (!canvas.getContext) {
    alert("Sorry, your browser is unsupported!");
    return;
  }
  // Get canvas context
  ctx = canvas.getContext("2d");

  keys = {};

  // Key listeners
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  // Resize it properly
  resizeCanvas();

  player = new classes.Sprite(
    "/static/img/sprites/slatey_mcslateface.png", // src for img
    64, // width
    64, // height
    0, // x
    0, // y
    10, // frame count
    8, // animation
    4, // rows
    3, // columns
  );

  calcGlobals();

  player.setX(centerX);
  player.setY(centerY);

  start = new Date().getTime();
  timer = 0;

  const logo = new Image();
  logo.src = "/static/img/lcv.png";

  requestAnimationFrame(() => {
    doLogo(logo);
  });

  setInterval(playerAnimation, 100);
}

function resizeCanvas() {
  // Resizes the canvas to the available area (according to the css/html)
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.round(rect.width);
  canvas.height = Math.round(rect.height);

  ctx.imageSmoothingEnabled = false;
}

window.addEventListener("load", setup);
window.addEventListener("resize", resizeCanvas);
