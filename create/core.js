var w, h, ow, oh; //level w & h in tiles and the old values of w & h
var y, x, ay = 0, ax = 0;
var ix = 0, iy = 0;
var starter = "../ressources/images/theme/basic-16/";
var tileSize = 32;
var oldmap = null;
loadMap = false;
var tileSize = 32;

var onSizeChanged = function() {};

function selectSquare(y, x) {
  document.getElementById('newValue').value = JSON.stringify(map[y][x]);
  ax = x;
  ay = y;
}
function selectAll(y, x) {
  document.getElementById('newValue').value = JSON.stringify(map[y][x]);
  ax = -1;
  ay = -1;
}
function changeValue() {
  if (ax>0&&ay>0) { //if only one tile is selected
    map[ay][ax] = JSON.parse(document.getElementById('newValue').value);
    var img = document.getElementById(ay+"-"+ax);
    img.src = starter+map[ay][ax][0]+".png";
    img.alt = map[ay][ax][0];
  } else if (ax==-1&&ay==-1) { //if all tiles are selected
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        map[i][j] = JSON.parse(document.getElementById('newValue').value);
        var img = document.getElementById(i+"-"+j);
        img.src = starter+map[i][j][0]+".png";
        img.alt = map[i][j][0];
      }
    }
  }
}
function changeSize() { //the size changing function (handle the map and the selector)
  w = document.getElementById('width').value;
  h = document.getElementById('height').value;
  var editor = document.getElementById("editor");
  if (h<oh) { //first the height modification
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
        xelem.id = "td-"+i+"-"+j;
        var img = document.createElement("img");
        img.src = "../"+setup.imageset+"/0.png";
        img.id = y+"-"+y;
        img.onclick = "selectSquare("+y+", "+x+");";
        img.ondblclick = "selectAll("+y+", "+x+");";
        xelem.appendChild(img);
        yelem.appendChild(xelem);
      }
    }
  }
  
  for (var i = 0; i < h; i++) { //then the width modification
    var yelem = document.getElementById("y-"+i);
    if (w<ow) {
      map[i] = map[i].slice(0, w);
      for (var j = w; j < ow-1; j++) {
        yelem.removeChild(yelem.lastChild()));
      }
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
      for (var j = ow; j < w; j++) {
        var xelem = document.createElement("td");
        xelem.id = "td-"+i+"-"+j;
        var img = document.createElement("img");
        img.src = "../"+setup.imageset+"/0.png";
        img.onclick = "selectSquare("+y+", "+x+");";
        img.ondblclick = "selectAll("+y+", "+x+");";
        img.id = y+"-"+y;
        xelem.appendChild(img);
        yelem.appendChild(xelem);
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
