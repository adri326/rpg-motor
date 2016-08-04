var width, heigth;
var y, x, ay = 0, ax = 0;
var ix = 0, iy = 0;
var starter = "../ressources/images/theme/basic-16/";
var tileSize = 32;
var oldmap = null;
loadMap = false;

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



/*function changeValue(y, x) {
  var img = document.getElementById(y+"-"+x);
  var nval = JSON.parse(prompt("What value to set?", "0"));
  if (typeof nval == "array") {
    img.src = starter+nval[0]+".png";
    img.alt = nval[0];
    map[y][x] = nval;
  } else {
    img.src = starter+nval+".png";
    img.alt = nval;
    map[y][x][0] = parseInt(nval, 10);
  }
}*/
function changeSize() {
  width = document.getElementById('width').value;
  height = document.getElementById('height').value;
  window.location = 'createMap.php?width='+width+'&height='+height+'&party='+party+'&player='+player;
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
  xhr.open("get", "../ressources/theme/basic-16/tiles.json");
  xhr.send();
  ontileRead = function() {
    for (var i = 0; i < tiles.length; i++) {
      var newElement = document.createElement('li');
      var newImg = document.createElement('img');
      newImg.src = "../ressources/theme/basic-16/"+tiles[i].filename;
      newImg.width = '32px';
      newImg.height = '32px';
      newElement.appendChild(newImg);
      document.getElementById('tileslist').appendChild(newElement);
    }
  }
}
function draw() {
  drawMap();
}
window.addEventListener('load', function() {
  firstUpdate();
});
