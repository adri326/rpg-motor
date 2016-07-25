<?php session_start();

$party = $invID = str_pad($_GET['party']*1, 4, '0', STR_PAD_LEFT);
$player = $invID = str_pad($_GET['player']*1, 4, '0', STR_PAD_LEFT);



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
