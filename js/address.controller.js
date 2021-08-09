var x = document.getElementById("demo");
var currgeocoder;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}



function showPosition(position) {
  var lat = position.coords.latitude;
  var lang = position.coords.longitude;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCbHYkmNnrECcJOwVb0szq4DHDo3413OGY&latlng=" + lat + "," + lang + "&sensor=true";
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
    var address = data.results[0];
    console.log(address);
  }).catch(function() {
    console.log("Booo");
  });
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

// getLocation();