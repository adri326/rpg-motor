var canvas, map, setup, xhr, players;
var xhr = new XMLHttpRequest();
var request = "firstSetup";
var loop;



function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "setup" || request == "firstSetup") {
      setup = JSON.parse(response);
      if (request == "firstSetup") {
        request = "firstMap";
      } else {
        request = "map";
      }
      xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
      xhr.send();
    }
    if (request == "map" || request == "firstMap") {
      map = JSON.parse(response);
      if (request == "firstMap") {
        init();
      }
    }
  } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
    console.log(xhr);
  }
}

function update() {
  request = "setup";
  xhr.open("GET", "parties/"+party+"/setup.json");
  xhr.send();
}

function image(n) {
  var img = new Image();
  img.src = n+".jpg";
  return img;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image(1), 0, 0);
  console.log('drawed');
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  loop = setInterval(update, 5000);
  canvas.onload = draw;
}

xhr.onloadend = onHttpAnswer;

xhr.open("GET", "parties/"+party+"/setup.json");
xhr.send();


