<!DOCTYPE html>
<html>
  <head>
    <title>Map editor</title>
    <script src="../drawMap.js"></script>
    <script>
      var map =  <?php
        echo '[';
        for ($y = 0; $y < $_GET['height']; $y++) {
          echo '[';
          for ($x = 0; $x < $_GET['width']; $x++) {
            echo '[0]';
            if ($x+1<$_GET['width']) {
              echo ',';
            }
          }
          echo ']';
          if ($y+1<$_GET['height']) {
            echo ',';
          }
        }
        echo ']';
        ?>;
      var width, height;
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
      
    </script>
    <style>
      .editor {
        border-collapse: separate;
        border-spacing: 1px;
        display: inline-block;
        margin-right: 4em;
      }
      .canvasContainer {
        display: inline-block;
        margin-left: 2em;
      }
      canvas {
        width: 256px;
        height: 256px;
        border: 1px solid #d0d0d0;
      }
      td, tr, img {
        margin: 0px 0px;
        margin-bottom: -2px;
      }
      .button, input {
        border: 1px solid #aaa;
        width: 16em;
        text-align: center;
      }
      .button:hover, input:hover {
        border: 1px solid #000;
      }
      .button, input, div {
        margin-bottom: 4px;
      }
    </style>
  </head>
  <body>
    <div id="mapContainer">
      <table class="editor">
      <?php
        for ($y = 0; $y < $_GET['height']; $y++) {
          echo '<tr>';
          for ($x = 0; $x < $_GET['width']; $x++) {
            echo '<td><img id="';
            echo $y.'-'.$x;
            echo '" src="../ressources/images/theme/basic-16/0.png" alt="0"';
            echo 'onclick="changeValue('.$y.', '.$x.');" /></td>';
          }
          echo '</tr>';
        }
      ?>
      </table>
      <span id="canvasContainer">
        <canvas id="canvas"></canvas>
      </span>
    </div>
    <form>
      Width: <input type="text" id="width" />
      <br />
      Height: <input type="text" id="height" />
      <br />
      <div class="button" onclick="changeSize();">Change size</div>
      <div class="button" onclick="alert(JSON.stringify(map));">Get result</div>
      Map id: <input type="text" id="mapId" /><br />
      Party: <input type="text" id="party" />
      <div class="button" onclick="saveMap();">Save it!</div>
    </form>
  </body>
</html>
