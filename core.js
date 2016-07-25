var canvas, map, setup, xhr, players;
var xhr = new XMLHttpRequest();
var request = "firstSetup";

function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "firstSetup") {
      var jsonResponse = JSON.parse(response);
      console.log(response);
      console.log(jsonResponse);
      setup = jsonResponse;
    }
  } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
    console.log(xhr);
  }
}

xhr.addEventListener("readystatechange", onHttpAnswer());

xhr.open("GET", "parties/"+party+"/setup.json");
xhr.send();
