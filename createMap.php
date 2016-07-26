<!DOCTYPE html>
<html>
  <head>
    <title>Map editor</title>
    <script>
      var map = [[]];
      var width, height;
      var starter = "ressources/images/theme/basic-16/";
      function changeValue(y, x) {
        var img = document.getElementById(y+"-"+x);
        img.src = starter+prompt("What value to set?", "0")+".png";
      }
      function changeSize() {
        width = document.getElementById('width').value;
        height = document.getElementById('height').value;
        window.location = 'createMap.php?width='+width+'&height='+height;
      }
    </script>
  </head>
  <body>
    <table>
      <?php
        for ($y = 0; $y < $_GET['height']; $y++) {
          echo '<tr>';
          for ($x = 0; $x < $_GET['width']; $x++) {
            echo '<td><img id="';
            echo $y.'-'.$x;
            echo '" src="ressources/images/theme/basic-16/0.png" alt="0"';
            echo 'onclick="changeValue('.$y.', '.$x.');" /></td>';
          }
          echo '</tr>';
        }
      ?>
    </table>
    <form>
      <input type="text" id="width" />
      <br />
      <input type="text" id="height" />
      <br />
      <div onclick="changeSize();">Change size</div>
    </form>
  </body>
</html>
