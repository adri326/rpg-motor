var xhr = new XMLHttpRequest();
var request = "firstSetup";
var loadMap = true;
xhr.onloadend = onHttpAnswer;

function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "setup" || request == "firstSetup") {
      setup = JSON.parse(response);
      if (request == "firstSetup"&&loadMap) {
        request = "firstMap";
        xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
        xhr.send();
      } else if (request == "firstSetup"&&!loadMap) {
        init();
      } else {
        if (oldmap!=setup.map&&loadMap) {
          request = "map";
          xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
          xhr.send();
          oldmap = setup.map;
        }
      }
      
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
  xhr.open("GET", gstarter+"parties/"+party+"/setup.json");
  xhr.send();
}
