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
    </script>
    <script src="../setupLoader.js"></script>
    <script src="../drawMap.js"></script>
    <script src="core.js"></script>
    <link rel="stylesheet" href="style.css">
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
            echo 'onclick="selectSquare('.$y.', '.$x.');" /></td>';
          }
          echo '</tr>';
        }
      ?>
      </table>
      <span id="canvasContainer">
        <canvas id="canvas"></canvas>
      </span>
    </div>
    <div id="setupContainer">
      <span id="generalSetup">
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
      </span>
      <span id="localSetup">
        <form>
          <textarea id="newValue" value=""></textarea>
          <div class="button" onclick="changeValue();">Save</div>
        </form>
      </span>
    </div>
  </body>
</html>
