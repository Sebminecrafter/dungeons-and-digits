var screens = {
  main: document.getElementById("screen-main"),
  settings: document.getElementById("screen-settings"),
  credits: document.getElementById("screen-credits"),
};

function showScreen(targetKey) {
  var keys = Object.keys(screens);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var element = screens[key];

    if (element) {
      if (key === targetKey) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
  }
}

// Returns all focusable buttons in the currently active screen.
function getActiveButtons() {
  var activeScreen = document.querySelector(".screen.active");
  if (!activeScreen) return [];
  return Array.from(activeScreen.querySelectorAll("[data-action]"));
}

// Moves active-button to the given element, clearing it from all others.
function setActiveButton(el) {
  getActiveButtons().forEach(function (btn) {
    btn.removeAttribute("active-button");
  });
  if (el) el.setAttribute("active-button", "");
}

document.addEventListener("keydown", function (e) {
  var buttons = getActiveButtons();
  if (buttons.length === 0) return;

  var focused = document.activeElement;
  var index = buttons.indexOf(focused);

  var next;

  console.log(e.key);

  switch (e.key) {
    case "ArrowDown":
    case "ArrowRight":
    case "Tab":
      if (e.key === "Tab" && e.shiftKey) {
        // Let shift+Tab fall through to the ArrowUp case below.
        next = (index - 1 + buttons.length) % buttons.length;
      } else {
        next = (index + 1) % buttons.length;
      }
      break;
    case "ArrowUp":
    case "ArrowLeft":
      next = (index - 1 + buttons.length) % buttons.length;
      break;
    case "Enter":
    case " ":
      // Trigger the focused button (or the first one if none is focused).
      var target = index !== -1 ? buttons[index] : buttons[0];
      if (target instanceof HTMLElement) target.click();
      e.preventDefault();
      return;
    default:
      return;
  }

  // Prevent the browser's default Tab/arrow scrolling behavior.
  e.preventDefault();

  // If nothing in this screen was focused yet, start at the first button.
  if (next === undefined) next = 0;

  var nextButton = buttons[next];
  if (nextButton instanceof HTMLElement) nextButton.focus();
  setActiveButton(nextButton);
});

var uiLayer = document.getElementById("ui-layer");

if (uiLayer) {
  uiLayer.addEventListener(
    "mouseenter",
    (e) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.hasAttribute("data-action")) return;
      setActiveButton(e.target);
    },
    true,
  );

  uiLayer.addEventListener(
    "mouseleave",
    (e) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.hasAttribute("data-action")) return;
      setActiveButton(null);
    },
    true,
  );

  uiLayer.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;

    var action = e.target.getAttribute("data-action");
    if (!action) return;

    switch (action) {
      case "start":
        window.location.href = "/play";
        break;
      case "settings":
        showScreen("settings");
        break;
      case "trial":
        window.location.href = "trial.html";
        break;
      case "credits":
        showScreen("credits");
        break;
      case "back":
        showScreen("main");
        break;
    }
  });
}
