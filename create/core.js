var w, h, ow, oh; //level w & h in tiles and the old values of w & h
var y, x, ay = 0, ax = 0;
var ix = 0, iy = 0;
var starter = "../ressources/images/theme/basic-16/";
var tileSize = 32;
var oldmap = null;
loadMap = false;

var onSizeChanged = function() {};

function selectSquare(y, x) {
  document.getElementById('newValue').value = JSON.stringify(map[y][x]);
  ax = x;
  ay = y;
}
function changeValue() {
  map[ay][ax] = JSON.parse(document.getElementById('newValue').value);
  var img = document.getElementById(ay+"-"+ax);
  img.src = starter+map[ay][ax][0]+".png";
  img.alt = map[ay][ax][0];
}
function changeSize() {
  w = document.getElementById('width').value;
  h = document.getElementById('height').value;
  var editor = document.getElementById("editor");
  if (h<oh) {
    map = map.slice(0, h);
    for (var i = h; i < oh-1; i++) {
      editor.removeChild(editor.lastChild());
    }
  } else {
    for (var i = oh; i < h; i++) {
      map[i] = [];
      var yelem = document.createElement("tr");
      yelem.id = "y-"+i;
      for (var j = 0; j < w; j++) {
        map[i][j] = [0];
        var xelem = document.createElement("td");
        var img = document.createElement("img");
        img.src = "../"+setup.imageset+"/0.png";
        img.onclick = "selectSquare("+y+", "+x+");";
        img.ondblclick = "selectAll();";
        xelem.appendChild(img);
        yelem.appendChild(xelem);
      }
    }
  }
  
  for (var i = 0; i < h; i++) {
    if (w<ow) {
      map[i] = map[i].slice(0, w);
    } else {
      if (typeof map[i] == "undefined") {
        map[i] = [];
        for (var j = 0; j < w; j++) {
          map[i][j] = [0];
        }
      } else {
        for (var j = ow; j < w; j++) {
          map[i][j] = [0];
        }
      }
    }
  }
  
  ow = w;
  oh = h;
}

function saveMap() {
  var mapId = document.getElementById('mapId').value;
  var party = document.getElementById('party').value;
  window.location = 'saveMap.php?party='+party+'&mapId='+mapId+'&map='+JSON.stringify(map);
}
var tileSize = 32;
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  draw();
  request = "tiles";
  xhr.open("get", "../ressources/images/theme/basic-16/tiles.json");
  xhr.send();
  ontileRead = function() {
    for (var i = 0; i < tiles.length; i++) {
      var newElement = document.createElement('li');
      var newImg = document.createElement('img');
      newImg.src = "../ressources/theme/basic-16/"+tiles[i].filename;
      newImg.width = '32px';
      newImg.height = '32px';
      newElement.appendChild(newImg);
      document.getElementById('tilesList').appendChild(newElement);
    }
  }
}
function draw() {
  drawMap();
}
window.addEventListener('load', function() {
  firstUpdate();
});
