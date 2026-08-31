import { Sprite } from "/static/js/classes.js";
import "/static/js/functions.js";

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

var speed = 5;

function calcGlobals() {
  centerX = canvas.width / 2 - player.getWidth() / 2;
  centerY = canvas.height / 2 - player.getHeight() / 2;
  timer = (new Date().getTime() - start) / 1000;
}

function drawBackground() {
  const oldStyle = ctx.fillStyle;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = oldStyle;
}

// Update player position based on input
function updatePlayerPosition() {
  if (keys["ArrowUp"] || keys["w"]) {
    player.setY(player.getY() - speed);
  }
  if (keys["ArrowDown"] || keys["s"]) {
    player.setY(player.getY() + speed);
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    player.setX(player.getX() - speed);
  }
  if (keys["ArrowRight"] || keys["d"]) {
    player.setX(player.getX() + speed);
  }

  // Canvas boundary collisions (Keep player inside the box)
  if (player.getX() < 0) player.setX(0);
  if (player.getX() + player.getWidth() > canvas.width)
    player.setX(canvas.width - player.getWidth());
  if (player.getY() < 0) player.setY(0);
  if (player.getY() + player.getHeight() > canvas.height)
    player.setY(canvas.height - player.getHeight());
}

function gameLoop() {
  calcGlobals();

  updatePlayerPosition();

  drawBackground();

  player.draw(ctx);

  requestAnimationFrame(gameLoop);
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

  // Resize it properly
  resizeCanvas();

  player = new Sprite(
    "/static/img/lcv.png", // src for img
    64, // width
    64, // height
    canvas.width / 2, // x
    canvas.height / 2, // y
    1, // frame count
    0, // animation
    0, // row
    1, // rows
    1, // columns
  );

  keys = {};

  // Key listeners
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  timer = 0;
  start = new Date().getTime();

  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  // Resizes the canvas to the available area (according to the css/html)
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
}

window.addEventListener("load", setup);
window.addEventListener("resize", resizeCanvas);
