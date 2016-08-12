var w, h, ow, oh; //level w & h in tiles and the old values of w & h
var y, x, ay = 0, ax = 0;
var ix = 0, iy = 0;
var starter = "../ressources/images/theme/basic-16/";
var tileSize = 32;
var oldmap = null;
loadMap = false;
var tileSize = 32;
var trs = [];
var tds = [];
var editor;

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
function removeLastChild(elem) {
  elem.removeChild(elem.childNodes[elem.childNodes.length-1]);
}
function actualiseTable() {
  trs = [];
  tds = [];
  for (var i = 0; i < editor.childNodes[0].childNodes.length; i++) {
    trs[i] = editor.childNodes[0].childNodes[i];
    tds[i] = [];
    for (var j = 0; j < trs[i].childNodes.length; j++) {
      tds[i][j] = trs[i].childNodes[j];
    }
  }
}

function changeSize() { //the size changing function (handle the map and the selector)
  actualiseTable();
  var tbody = editor.childNodes[0];
  w = document.getElementById('width').value;
  h = document.getElementById('height').value;
  
  if (h<oh) { //first the height modification
    map = map.slice(0, h);
    
  } else if (h>oh) {
    for (var i = oh; i < h; i++) {
      map[i] = [];
    }
  }
  
  if (trs.length>h) {
    for (var i = h; i < trs.length; i++) {
      editor.childNodes[0].removeChild(trs[i]);
      trs[i] = null;
    }
  } else if (trs.length<h) {
    for (var i = trs.length; i < h; i++) {
      trs[i] = document.createElement("tr");
      for (var j = 0; j < w; j++) {
        tds[i][j] = document.createElement("td");
        tds[i][j].id = "td-"+i+"-"+j;
        var img = document.createElement("img");
        img.src = "../"+setup.imageset+"/0.png";
        img.id = i+"-"+j;
        img.onclick = "selectSquare("+y+", "+x+");";
        img.ondblclick = "selectAll("+y+", "+x+");";
        tds[i][j].appendChild(img);
        trs[i].appendChild(tds[i][j]);
      }
      editor.appendChild(trs[i]);
    }
  }
  
  for (var i = 0; i < h; i++) { //then the width modification
    var yelem = document.getElementById("y-"+i);
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
    
    if (tds[i].length>w) {
      for (var j = w; i < tds.length; i++) {
        trs[i].removeChild(tds[i][j]);
        tds[i][j] = null;
      }
    } else if (tds[i].length<w) {
      for (var j = tds[i].length; j < w; j++) {
        tds[i][j] = document.createElement("td");
        tds[i][j].id = "td-"+i+"-"+j;
        var img = document.createElement("img");
        img.src = "../"+setup.imageset+"/0.png";
        img.id = i+"-"+j;
        img.onclick = "selectSquare("+y+", "+x+");";
        img.ondblclick = "selectAll("+y+", "+x+");";
        tds[i][j].appendChild(img);
        trs[i].appendChild(tds[i][j]);
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
  actualiseTable();
}
function draw() {
  drawMap();
}
window.addEventListener('load', function() {
  editor = document.getElementById("editor");
  firstUpdate();
});
