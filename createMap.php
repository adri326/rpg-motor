<!DOCTYPE html>
<html>
  <head>
    <title>Map editor</title>
    <script>
      var map =  <?php
        echo '[';
        for ($y = 0; $y < $_GET['height']; $y++) {
          echo '[';
          for ($x = 0; $x < $_GET['width']; $x++) {
            echo '0';
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
      var starter = "ressources/images/theme/basic-16/";
      function changeValue(y, x) {
        var img = document.getElementById(y+"-"+x);
        var nval = prompt("What value to set?", "0");
        img.src = starter+nval+".png";
        map[y][x] = nval;
      }
      function changeSize() {
        width = document.getElementById('width').value;
        height = document.getElementById('height').value;
        window.location = 'createMap.php?width='+width+'&height='+height;
      }
    </script>
    <style>
      .editor {
        border-collapse: separate;
        border-spacing: 1px;
      }
    </style>
  </head>
  <body>
    <table class="editor">
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
      <div onclick="alert(JSON.stringify(map));">Get result</div>
    </form>
  </body>
</html>
