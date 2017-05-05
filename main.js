// js file

// Get location


var city = document.querySelectorAll('.city');
var temp = document.querySelectorAll('.temp');
var weather = document.querySelectorAll('.weather');

city.innerHTML = 'hello';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browswer.";
  }
}

function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  var pathWithCurrentLocal = 'https://weather.millergeek.xyz/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=31405be1fb8f6e7f0bb74137ccb08125';

  ajaxRequest(pathWithCurrentLocal, function(data){
    var getTemp = data.main.temp;
    var getCity = data.name;
    var getWeather = data.weather[0].description;
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    // Converting Weather to Fahrenheit from Kelvin

    var fahrenheit = Math.round((getTemp * (9/5) - 459.67) * 100) / 100;
    var celcius = Math.round((getTemp - 273.15) * 100) / 100;



    city[0].innerHTML = getCity;
    temp[0].innerHTML = "Fahrenheit : " + fahrenheit + "<br>" +  "Celcius: " + celcius;
    weather[0].innerHTML = getWeather;

    console.log(data);
    console.log(getTemp);
    console.log(getCity);
    console.log(getWeather);
    console.log("Lat: " + lat);
    console.log("Lon: " + lon);
  });

}


// AJAX request
function ajaxRequest (path, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (callback) callback(data);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }

  };

  xhr.open('GET', path);
  xhr.send(null);
}

getLocation();



// I can see the weather in my current location.


// I can see a different icon or background image depending on the weather.


// I can push a button to toggle between Fahrenheit and Celsius.
