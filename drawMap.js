var tiles = [];
var sx, sy, ex, ey, xo, yo;
var x, y, z;
var canvas;
var ctx;


function image(n) {
  if (tiles[n]==null) {
    var img = new Image();
    img.src = gstarter+setup.imageset+"/"+n+".png";
    tiles[n] = img;
    return img;
  } else {
    return tiles[n];
  }
}

function drawMap() {
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
