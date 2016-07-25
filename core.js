var canvas, map, setup, xhr, players;

function onHttpAnswer() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var response = xhr.responseText;
    if (request == "firstSetup") {
      var jsonResponse = JSON.decode(response);
      console.log(jsonResponse);
    }
}

var xhr = new XmlHttpRequest();
xhr.open("GET", "parties/"party+"/setup.json");
var request = "firstSetup";
xhr.addEventListener("http", onHttpAnswer());
xhr.send();
