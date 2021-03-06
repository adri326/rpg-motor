<?php session_start();
$party = sprintf('%04d', $_GET['party']);
$player = sprintf('%04d', $_GET['player']);
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Map editor</title>
    <script>
      var setup, xhr, players;
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
      var party = "<?php echo $party; ?>";
      var player = "<?php echo $player; ?>";
      var gstarter = "../";
      window.addEventListener("load", function() {
        request = "firstSetup";
        update();
      });
    </script>
    <script src="../setupLoader.js"></script>
    <script src="../drawMap.js"></script>
    <script src="core.js"></script>
    <script src="../tilesReader.js"></script>
    <link rel="stylesheet" href="../main.css" />
    <link rel="stylesheet" href="create.css" />
  </head>
  <body>
    <div id="mapContainer">
      <table><tbody><tr class="canvas-container-top">
      <td rowspan="2">
        <canvas id="canvas" width="512px" height="512px"></canvas>
      </td>
      <td>
        <table class="editor" id="editor"><tbody id="editor-body"><?php
          for ($y = 0; $y < $_GET['height']; $y++) {
            echo '<tr id="y-'.$y.'">';
            for ($x = 0; $x < $_GET['width']; $x++) {
              echo '<td id="x-'.$x.'"><img id="';
              echo $y.'-'.$x;
              echo '" src="../ressources/images/theme/basic-16/0.png" alt="0"';
              echo 'onclick="selectSquare('.$y.', '.$x.');"';
              echo 'ondblclick="selectAll('.$y.', '.$x.');" /></td>';
            }
            echo '</tr>';
          }
        ?></tbody></table>
      </td></tr><tr class="canvas-container-bottom"><td>
        <form>
          <textarea id="newValue" value=""></textarea>
          <div class="button" onclick="changeValue(); draw();">Save</div>
        </form>
      </td></tr>
      </tr></tbody></table>
    </div>
    <div id="setupContainer">
      <table><tbody><tr><td>
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
      </td></tr></tbody></table>
    </div>
    <ul id="tilesList">
      
    </ul>
  </body>
</html>
