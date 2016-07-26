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
        img.src = starter+prompt('What value to set?", "0");
      }
    </script>
  </head>
  <body>
    <table>
      <?php
        for ($y = 0, y < $_GET['height'], y++) {
          echo '<tr>';
          for ($x = 0, x < $_GET['width'], x++) {
            echo '<td><img id="'.$y.'-'.$x.'" src="ressources/images/theme/basic-16/0.png" alt="0" onclick="changeValue('.$y.', '.$x');" /></td>';
          }
          echo '</tr>';
        }
      ?>
    </table>
  </body>
</html>
