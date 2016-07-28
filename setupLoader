var xhr = new XMLHttpRequest();
var request = "firstSetup";

function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "setup" || request == "firstSetup") {
      setup = JSON.parse(response);
      if (request == "firstSetup") {
        request = "firstMap";
        xhr.open("GET", "parties/"+party+"/map/"+setup.map+".json");
        xhr.send();
      } else {
        if (oldmap!=setup.map) {
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
  xhr.open("GET", "parties/"+party+"/setup.json");
  xhr.send();
}
