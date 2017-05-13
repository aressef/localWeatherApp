var city = document.querySelectorAll('.city');
var temp = document.querySelectorAll('.temp');
var weather = document.querySelectorAll('.weather');

// Get location
var functions = {
  getLocation: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  },
  showPosition: function(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var pathWithCurrentLocal = 'https://weather.millergeek.xyz/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=31405be1fb8f6e7f0bb74137ccb08125';

    ajaxRequest(pathWithCurrentLocal, function(data){
      var getTemp = data.main.temp;
      var getCity = data.name;
      var getWeather = data.weather[0].description;
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      // Converting Weather from Kelvin to Fahrenheit and Celsius
      var fahrenheitConverter = Math.round((getTemp * (9/5) - 459.67) * 100) / 100;
      var celsiusConverter = Math.round((getTemp - 273.15) * 100) / 100;
      fahrenheit = fahrenheitConverter + " fahrenheit";
      celsius = celsiusConverter + " celsius";



      city[0].innerHTML = getCity;
      temp[0].innerHTML = fahrenheit;
      weather[0].innerHTML = getWeather;

      console.log(data);
      console.log(getTemp);
      console.log(getCity);
      console.log(getWeather);
      console.log("Lat: " + lat);
      console.log("Lon: " + lon);
    });
  },
  toggleTemp: function() {
    var currentTempType = document.getElementById('temp');
    if (currentTempType.innerHTML == fahrenheit) {
      currentTempType.innerHTML = celsius;
    } else {
      currentTempType.innerHTML = fahrenheit;
    }
  }
};


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

functions.getLocation();



// I can see the weather in my current location.


// I can see a different icon or background image depending on the weather.


// I can push a button to toggle between Fahrenheit and Celsius.
