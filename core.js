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

var canvas, map, setup, xhr, players;
var xhr = new XMLHttpRequest();
var request = "firstSetup";
var loop;
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
      } else {
        request = "map";
      }
      xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
      xhr.send();
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

function image(n) {
  var img = new Image();
  img.src = setup.imageset+"/"+n+".png";
  return img;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  width = canvas.width;
  height = canvas.height;
  
  sx = Math.round(ix/tileSize-1.5);
  sy = Math.round(iy/tileSize-1.5);
  ex = Math.round((ix+width)/tileSize+0.5);
  ey = Math.round((ix+height)/tileSize+0.5);
  xo = ix%tileSize;
  yo = iy%tileSize;
  for (x = sx; x < ex; x++) {
    for (y = sy; y < ey; y++) {
      for (z = 0; z < map[y][x].length; z++) {
        ctx.drawImage(image(map[y][x][z]), x*sx+xo-ix, y*sy+yo-iy);
      }
    }
  }
  
  
  
  requestAnimationFrame(draw);
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  loop = setInterval(update, 5000);
  window.addEventListener("load", function () {
    update();
  });
  draw();
}

xhr.onloadend = onHttpAnswer;

xhr.open("GET", "parties/"+party+"/setup.json");
xhr.send();


