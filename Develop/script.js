// DOM hooks
let apiKey = "83464db7448f440f2230d5eae25329a5";
const form = document.getElementById("form");
let cityInputEl = document.getElementById("js-city-input");
let citySearchButton = document.getElementById("js-search-city");
let recentSearchEl = document.querySelector(".recent-searches");
const iconImg = document.getElementById('weather-icon');
const deleteButton = document.getElementById("delete");
const ul = document.getElementById("ul");
let cityInputElSidebar = document.getElementById("js-city-input-sidebar");
let citySearchButtonSidebar = document.getElementById("js-search-city-sidebar");
let searcHistory = [];

const modal = document.querySelector(".modal");
const modalTwo = document.querySelector(".modalTwo");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// Header date and time format 
var now = moment();
var currentDate = now.format('dddd, MMMM Do || h:mm a');
document.getElementById("current-day").textContent = currentDate;

// function myFunction() {
//   var element = document.getElementById("form");
//   element.classList.remove("hidden");
// }

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.add("hidden");
  cityInputEl.classList.add("hidden");
  citySearchButton.classList.add("hidden");
};
citySearchButton.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
overlay.addEventListener("click", closeModal);


// Get input value
function fetchCoordinates(event) {
  event.preventDefault();
  let userInput = cityInputEl.value || cityInputElSidebar.value; 
  appendHistory(userInput);
  var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=" + apiKey
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
      cityInputEl.value = "";
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
      let iconCode = data.list[0].weather[0].icon;
      let currentTempF = data.list[0].main.temp;
      let currentTempMin = data.list[0].main.temp_min;
      let currentTempMax = data.list[0].main.temp_max;
      let currentWindSpeed = data.list[0].wind.speed;
      let currentHumidity = data.list[0].main.humidity;
      let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    
      $(".icon").html("<img src='" + iconUrl  + "'>");
      document.getElementById("temp").textContent = "Current Temperature: " + currentTempF + " °F";
      document.getElementById("min").textContent = "Low: " + currentTempMin + " °F";
      document.getElementById("max").textContent = "High: " + currentTempMax + " °F";
      document.getElementById("wind-speed").textContent = "Wind Speed: " + currentWindSpeed + " miles per hour";
      document.getElementById("humidity").textContent = "Humidity: " + currentHumidity + "%";

      let arrayList = data.list;
      let counter = 0;

        for (var i = 0; i < arrayList.length; i++) {

          if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
            counter = counter + 1;
            let iconCode = arrayList[i].weather[0].icon;
            let dateText = arrayList[i].dt_txt;
            let tempFahrenheit = arrayList[i].main.temp + " °F";
            let windSpeed = arrayList[i].wind.speed + " MPH";
            let humidity = arrayList[i].main.humidity + " HUM";
            let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"; 
            let dateText1 = "date" + counter;
            let tempFahrenheit1 = "temp" + counter;
            let windSpeed1 = "wind-speed" + counter;
            let humidity1 = "humidity" + counter;
            let iconCode1 = ".icon" + counter;

            $(iconCode1).html("<img src='" + iconUrl  + "'>");
            document.getElementById(dateText1).textContent = moment(dateText).format("MMMM Do");
            document.getElementById(tempFahrenheit1).textContent = tempFahrenheit;
            document.getElementById(windSpeed1).textContent = windSpeed;
            document.getElementById(humidity1).textContent = humidity;
          }
        }
    })
}  

function appendHistory(search) {
  searcHistory.push(search);
  localStorage.setItem("history", JSON.stringify(searcHistory));
  getSearches();
  
}

function getSearches() {
  let storedHistory = localStorage.getItem("history");
  if (storedHistory) {
    searcHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
};

function renderSearchHistory() {
  recentSearchEl.innerHTML = "";
  for (let i = 0; i < searcHistory.length; i++) {
    var recentSearchesButton = document.createElement("button");
    var recentSearchesLi = document.createElement("li");
    recentSearchesLi.append(recentSearchesButton);
    recentSearchesButton.setAttribute("data-search", searcHistory[i]);
    recentSearchesButton.textContent = searcHistory[i];
    recentSearchEl.append(recentSearchesLi);
  }
}

function displaySearchHistory(searchedCity) {
  let userInput = searchedCity;
  var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=" + apiKey
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

var searchHistoryHandler =  recentSearchEl.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button")) {
    var searchedCity = event.target.getAttribute("data-search");
    console.log(searchedCity)
    displaySearchHistory(searchedCity);
  }
});

function clearSearchHistory() {
  searcHistory = [];
  localStorage.clear(searcHistory);
  recentSearchEl.textContent = "";
}

deleteButton.addEventListener("click", clearSearchHistory);
citySearchButton.addEventListener("click", fetchCoordinates);
citySearchButtonSidebar.addEventListener("click", fetchCoordinates);





