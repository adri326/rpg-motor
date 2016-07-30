var tiles;
var tilesSaved = false;
function saveTileJSON(input) {
  tiles = JSON.parse(input);
}
fonction getTileInfo(tilen) {
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
