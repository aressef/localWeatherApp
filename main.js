var city = document.getElementById('city');
var temp = document.getElementById('temp');
var weather = document.getElementById('weather');

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
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var getTemp = data.main.temp;
      var getCity = data.name;
      getWeather = data.weather[0].description;

      // Converting Weather from Kelvin to Fahrenheit and Celsius
      var fahrenheitConverter = Math.round((getTemp * (9/5) - 459.67) * 100) / 100;
      var celsiusConverter = Math.round((getTemp - 273.15) * 100) / 100;
      fahrenheit = fahrenheitConverter;
      celsius = celsiusConverter;

      city.innerHTML = getCity;
      temp.innerHTML = fahrenheit;
      weather.innerHTML = getWeather;

      console.log(data);
      console.log(getTemp);
      console.log(getCity);
      console.log(getWeather);
      console.log("Lat: " + lat);
      console.log("Lon: " + lon);

      functions.getWeatherIcon();
    });
  },
  toggleTemp: function() {
    var currentTempType = document.getElementById('temp');
    if (currentTempType.innerHTML == fahrenheit) {
      currentTempType.innerHTML = celsius + " &#8451;";
    } else {
      currentTempType.innerHTML = fahrenheit + " &#8457;";
    }
  },
  getWeatherIcon: function() {
    var weatherIcon = document.getElementById('weatherIcon');
    var currentWeather = weather.innerHTML;
    var image = '';

    console.log(currentWeather);

    switch(currentWeather) {
      case "sunny":
      case "clear sky":
      case "clear":
        image = 'img/weather-clear.png';
        break;
      case "few clouds":
      case "scattered clouds":
        image = 'img/weather-few-clouds.png';
        break;
      case "rainy":
        image = 'img/weather-showers-night.png';
        break;
      case "cloudy":
      case "overcast clouds":
        image = 'img/weather-clouds.png';
        break;
      case "light rain":
        image = 'img/weather-rain-night.png';
        break;
      case "stormy":
      case "thunderstorm":
        image = 'img/weather-storm-night.png';
        break;
      case "broken clouds":
        image = 'img/weather-haze.png';
        break;
      default:
        image = 'img/weather-none-available.png';
        console.log("I can't seem to find the weather.");
    }
  weatherIcon.src = image;
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

// function getWeatherIcon(currentWeather) {
//   var weatherIcon = document.getElementById('weatherIcon');
//
//   switch(currentWeather) {
//     case "sunny":
//       weatherIcon.src = 'img/weather-clear.png';
//       break;
//     case "rainy":
//       weatherIcon.src = 'img/weather-showers-night.png';
//       break;
//     case "cloudy":
//       weatherIcon.src = 'img/weather-clouds.png';
//       break;
//     case "light rain":
//       weatherIcon.src = 'img/weather-rain-night.png';
//       break;
//     case "stormy":
//     case "thunderstorm":
//       weatherIcon.src = 'img/weather-storm-night.png';
//       break;
//     case "broken clouds":
//       weatherIcon.src = 'img/weather-few-clouds-night.png';
//       break;
//     default:
//       console.log("I can't seem to find the weather.");
//   }
// }




// I can see the weather in my current location.


// I can see a different icon or background image depending on the weather.


// I can push a button to toggle between Fahrenheit and Celsius.
