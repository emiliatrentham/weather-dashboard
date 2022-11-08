let apiKey = "83464db7448f440f2230d5eae25329a5";
const form = document.getElementById("form");
let cityInputEl = document.getElementById("js-city-input")
let citySearchButton = document.getElementById("js-search-city")
const iconImg = document.getElementById('weather-icon');
const deleteButton = document.getElementById("delete");
const ul = document.getElementById("ul");

//Date and time format for header
var now = moment();
var currentDate = now.format('dddd, MMMM Do || h:mm a');
document.getElementById("current-day").textContent = currentDate;

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
      let apiCityName = data[0].name;
      let apiCityState = data[0].state;
      let apiCityCountry = data[0].country;

      document.getElementById("api-city-name").textContent = apiCityName + ", " + apiCityState + ", " + apiCityCountry;
      fetchWeather(latitude, longitude);
    })
}

function fetchWeather(lat, lon) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
      console.log("-----FETCHED WEATHER DATA-----")
      console.log(data); 
      let iconCode = data.list[0].weather[0].icon;
      let currentTempF = data.list[0].main.temp;

      let currentTempMin = data.list[0].main.temp_min;
      console.log(currentTempMin)
   
      let currentTempMax = data.list[0].main.temp_max;
      console.log(currentTempMax)

      let currentWindSpeed = data.list[0].wind.speed;
      let currentHumidity = data.list[0].main.humidity;
      let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
      $(".icon").html("<img src='" + iconUrl  + "'>");
      document.getElementById("temp").textContent = "Current Temperature: " + currentTempF + " °F";
      document.getElementById("min").textContent = "Low: " + currentTempMin + " °F";
      document.getElementById("max").textContent = "High: " + currentTempMax + " °F";
      document.getElementById("wind-speed").textContent = "Wind Speed: " + currentWindSpeed + " miles per hour";
      document.getElementById("humidity").textContent = "Humidity: " + currentHumidity + "%";
    

      var arrayList = data.list;
      let counter = 0;

        for (var i = 0; i < arrayList.length; i++) {

          if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {

            counter = counter + 1;
            let iconCode = arrayList[i].weather[0].icon;
            let dateText = arrayList[i].dt_txt/*.format('MMMM Do YYYY || h:mm a')*/;
            let tempFahrenheit = arrayList[i].main.temp + " °F";
            let windSpeed = arrayList[i].wind.speed + " MPH";
            let humidity = arrayList[i].main.humidity + " HUM";

            let iconCode1 = ".icon" + counter;
            let dateText1 = "date" + counter;
            let tempFahrenheit1 = "temp" + counter;
            let windSpeed1 = "wind-speed" + counter;
            let humidity1 = "humidity" + counter;

            console.log(iconCode)

            // TO DO display correct icon in cards
            document.getElementById(dateText1).textContent = dateText;
            document.getElementById(tempFahrenheit1).textContent = tempFahrenheit;
            document.getElementById(windSpeed1).textContent = windSpeed;
            document.getElementById(humidity1).textContent = humidity;
          }
        }

  })
}  

// TO DO save data to local storage and display under recent searches + hook up delete button
let recentSearches;
if (localStorage.recentSearches && localStorage.recentSearches != "") {
  recentSearches = JSON.parse(localStorage.recentSearches);
} else {
  recentSearches = [];
}

const makeListItem = (text, parent) => {
  let listItem = document.createElement("li");
  listItem.textContent = text;
  listItem.className = "list-group-item";
  parent.appendChild(listItem);
};

recentSearches.forEach(element => {
  makeListItem(element, ul);
});

const isDuplicateValue = (arr, text) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == text) {
      return true;
    }
  }

  return false;
};

form.addEventListener("js-search-city", event => {
  event.preventDefault();
  if (
    cityInputEl.value == "" ||
    isDuplicateValue(recentSearches, cityInputEl.value)
  ) {
    return;
  } else {
    recentSearches.push(cityInputEl.value);
    makeListItem(cityInputEl.value, ul);
    localStorage.recentSearches = JSON.stringify(recentSearches);
    cityInputEl.value = "";
  }
});

deleteButton.addEventListener("click", () => {
  localStorage.clear();
  recentSearches = [];
  cityInputEl.value = "";
  // I use querySelectorAll because it returns a static collection
  let arr = document.querySelectorAll("li");
  // I use the static collection for iteration
  for (let i = 0; i < arr.length; i++) {
    arr[i].remove();
  }
});

citySearchButton.addEventListener("click", fetchCoordinates);




