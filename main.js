// js file

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

ajaxRequest('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=31405be1fb8f6e7f0bb74137ccb08125', function (data){
  console.log(data);
});


// I can see the weather in my current location.


// I can see a different icon or background image depending on the weather.


// I can push a button to toggle between Fahrenheit and Celsius.
