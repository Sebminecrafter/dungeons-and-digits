import * as classes from "/static/js/classes.js";
import * as sprites from "/static/js/sprites.js";
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
var spriteList;

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

  let a = yChange,
    b = xChange;

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
  let anim = player.getAnimation();
  if (playerDirection["up"]) {
    if (anim != 8) player.setAnimation(8);
    else player.setAnimation(9);
  } else if (playerDirection["down"]) {
    if (anim != 5) player.setAnimation(5);
    else player.setAnimation(6);
  } else if (playerDirection["right"]) {
    if (anim != 0) player.setAnimation(0);
    else player.setAnimation(1);
  } else if (playerDirection["left"]) {
    if (anim != 2) player.setAnimation(2);
    else player.setAnimation(3);
  } else {
    if (anim == 0 || anim == 1) player.setAnimation(0);
    else if (anim == 2 || anim == 3) player.setAnimation(2);
    else if (anim == 4 || anim == 5 || anim == 6) player.setAnimation(4);
    else if (anim == 7 || anim == 8 || anim == 9) player.setAnimation(7);
    else player.setAnimation(4);
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

  for (var i = 0; i <= spriteList.length; i++) {
    let sprite = spriteList[i];
    if (sprite instanceof classes.Sprite) {
      sprite.draw(ctx);
    }
  }

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
  spriteList = [];

  // Key listeners
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  // Resize it properly
  resizeCanvas();

  player = sprites.player();

  spriteList.push(player);

  let listOfSprites = [
    "add_knight",
    "add_rat_overworld",
    "basic_addition",
    "basic_addition_guard",
    "not_so_basic_addition",
  ];

  for (var i = 0; i <= listOfSprites.length - 1; i++) {
    let a = listOfSprites[i];
    console.log(a);
    eval(`
      let ${a} = sprites.${a}();
      ${a}.setX(100 * i);
      ${a}.setY(100);
      spriteList.push(${a});
    `);
  }

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
