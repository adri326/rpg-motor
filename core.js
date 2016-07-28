(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  })();
var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
  })();

var oldmap = null; 
var canvas, map, setup, xhr, players;
var xhr = new XMLHttpRequest();
var request = "firstSetup";
var loop, keys = [];
var ix = 0, iy = 0, tileSize = 16, width, height;
var sx, sy, ex, ey, xo, yo;
var x, y, z;



function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "setup" || request == "firstSetup") {
      setup = JSON.parse(response);
      if (request == "firstSetup") {
        request = "firstMap";
        xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
        xhr.send();
      } else {
        if (oldmap!=setup.map) {
          request = "map";
          xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
          xhr.send();
          oldmap = setup.map;
        }
      }
      
    }
    if (request == "map" || request == "firstMap") {
      map = JSON.parse(response);
      if (request == "firstMap") {
        init();
      }
    }
  } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
    console.log(xhr);
  }
}

function update() {
  request = "setup";
  xhr.open("GET", "parties/"+party+"/setup.json");
  xhr.send();
}



function draw() {
  if (setup.tileSize==null) {
    tileSize = 32;
  }
  else {
    tileSize = setup.tileSize;
  }
  
  
  if (setup.useKeyboardMove!==false) {
    if (keys[38]) {
      iy += 1;
    }
    if (keys[39]) {
      ix -= 1;
    }
    if (keys[37]) {
      ix += 1;
    }
    if (keys[40]) {
      iy -= 1;
    }
  }
  drawMap();
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  loop = setInterval(update, 5000);
  if (setup.imageBluring==false||setup.imageBluring==null) {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    canvas.className += " noBlur";
  }
  window.addEventListener("load", function () {
    update();
  });
  draw();
  document.body.addEventListener("keydown", function (e) {
      keys[e.keyCode] = true;
  });
  
  document.body.addEventListener("keyup", function (e) {
      keys[e.keyCode] = false;
  });
}

xhr.onloadend = onHttpAnswer;

xhr.open("GET", "parties/"+party+"/setup.json");
xhr.send();



