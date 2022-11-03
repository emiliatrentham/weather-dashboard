let apiKey = "83464db7448f440f2230d5eae25329a5";
let cityInputEl = document.getElementById("js-city-input")
let citySearchButton = document.getElementById("js-search-city")

// city search input element
// doc query selector  
function fetchCoordinates(event) {
  event.preventDefault();
  let userInput = cityInputEl.value; //gets input value
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=" + apiKey
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("-----FETCHED GEOCODE DATA-----")
      console.log(data);
      console.log(data[0]);
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      fetchWeather(latitude, longitude);
    })
}

function fetchWeather(lat, lon) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
      console.log("-----FETCHED WEATHER DATA-----")
      console.log(data); 
      // TO DO
      // grab forecast for next 5 days and take the values from the object representing temp, wind speed, and humidity to add to DOM

  })
}  
citySearchButton.addEventListener("click", fetchCoordinates);




