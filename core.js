var canvas, map, setup, xhr, players;
var xhr = new XMLHttpRequest();

function onHttpAnswer() {
  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
    var response = xhr.responseText;
    if (request == "firstSetup") {
      var jsonResponse = JSON.decode(response);
      console.log(response);
      console.log(jsonResponse);
    }
  } else {
    console.log(xhr);
  }
}

xhr.open("GET", "parties/"+party+"/setup.json");
var request = "firstSetup";
xhr.addEventListener("readystatechange", onHttpAnswer());
xhr.send();
