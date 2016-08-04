var tiles;
var tilesSaved = false;
function saveTileJSON(input) {
  tiles = JSON.parse(input);
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].subs!=null) {
      for (var j = 0; j < tiles[i].length; j++) {
        tiles[i].subs[j].sup = tiles[i];
        if (tiles[i].subs[j].name == null) {
          tiles[i].subs[j].name = tiles[i].name;
        }
      }
    }
  }
}
function getTileInfo(tilen) {
  var result;
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].id==Math.round(input-0.5)) {
      result = tiles[i];
    }
  }
  if (input%1!=0) {
    for (var i = 0; i < result.subs.length; i++) {
      if (result.subs[i].id==input) {
        result = result.subs[i];
      }
    }
  }
  return result;
}
