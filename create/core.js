var width, heigth;
var ix = 0, iy = 0;
var starter = "../ressources/images/theme/basic-16/";
function changeValue(y, x) {
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
}
function changeSize() {
  width = document.getElementById('width').value;
  height = document.getElementById('height').value;
  window.location = 'createMap.php?width='+width+'&height='+height;
}
function saveMap() {
  var mapId = document.getElementById('mapId').value;
  var party = document.getElementById('party').value;
  window.location = 'saveMap.php?party='+party+'&mapId='+mapId+'&map='+JSON.stringify(map);
}
var canvas, ctx, tileSize = 32;
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  draw();
}
function draw() {
  drawMap();
}
window.addEventListener("load", init);
