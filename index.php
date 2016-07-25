<?php session_start();

function filter_numbers($string) {
  return filter_var($string, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"(0-9)")));
}

$party = filter_numbers($_GET['party']);
$player = filter_numbers($_GET['player']);

?>
<!DOCTYPE html>
<html>
  <head>
    <title id="title">Rpg motor</title>
    <link rel="stylesheet" href="main.css" />
    <script>
      var party = <?php echo '"'.$party.'"'; ?>;
      var player = <?php echo '"'.$player.'"'; ?>;
    </script>
    <script src="core.js"></script>
  </head>
  <body>
    <div class="container">
      <div id="canvasContainer">
        <canvas id="canvas" />
      </div>
      <div id="playersContainer">
        
      </div>
    </div>
  </body>
</html>
