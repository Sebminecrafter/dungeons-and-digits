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

var uiLayer = document.getElementById("ui-layer");

if (uiLayer) {
  uiLayer.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;

    var action = e.target.getAttribute("data-action");
    if (!action) return;

    if (action === "start") {
      window.location.href = "/play";
    } else if (action === "settings") {
      showScreen("settings");
    } else if (action === "trial") {
      window.location.href = "/trial";
    } else if (action == "credits") {
      showScreen("credits");
    } else if (action === "back") {
      showScreen("main");
    }
  });
}
