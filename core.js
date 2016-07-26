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
  
  
  
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  width = canvas.width;
  height = canvas.height;
  
  sx = Math.round(ix/tileSize-1.5);
  sy = Math.round(iy/tileSize-1.5);
  ex = Math.round((ix+width)/tileSize+0.5);
  ey = Math.round((iy+height)/tileSize+0.5);
  xo = ix%tileSize;
  yo = iy%tileSize;
  for (y = sy; y < ey; y++) {
    for (x = sx; x < ex; x++) {
      if (y>=0&&y<map.length) {
        if (x>=0&&x<map[y].length) {
          for (z = 0; z < map[y][x].length; z++) {
            ctx.drawImage(image(map[y][x][z]), x*tileSize+xo-ix, y*tileSize+yo-iy, tileSize, tileSize);
          }
        }
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



