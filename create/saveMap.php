<?php session_start();
$party = sprintf('%04d', $_GET['party']);
$player = sprintf('%04d', $_GET['player']);
$mapId = $_GET['id']*;
$map = $_GET['map'];
$path = $__DIR__."../parties/".$party."/map/".$mapId.".json";
$file = fopen($path, "w");
fwrite($file, $map);
fclose($file);
?>
