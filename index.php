<?php session_start();

$party = sprintf('%04d', $_GET['party']);
$player = sprintf('%04d', $_GET['player']);



?>
<!DOCTYPE html>
<html>
  <head>
    <title id="title">Rpg motor</title>
    <link rel="stylesheet" href="main.css" />
    <script>
      var party = <?php echo '"'.$party.'"'; ?>;
      var player = <?php echo '"'.$player.'"'; ?>;
      var gstarter = "";
    </script>
    <script src="drawMap.js"></script>
    <script src="setupLoader.js"></script>
    <script src="core.js"></script>
    <script src="tilesReader.js"></script>
  </head>
  <body>
    <?php include("starter.php"); ?>
    <div class="container">
      <div id="canvasContainer">
        <canvas id="canvas" width="500px" height="500px"/>
      </div>
      <div id="playersContainer">
        
      </div>
    </div>
  </body>
</html>
