// $(window).on('load', function () {
//   checkLocalStorage();
// });

let apiKey = "83464db7448f440f2230d5eae25329a5";
let cityInputEl = document.getElementById("js-city-input")
let citySearchButton = document.getElementById("js-search-city")

//Date and time format for header
var now = moment();
var currentDate = now.format('MMMM Do YYYY || h:mm a');
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
      fetchWeather(latitude, longitude);
      // saveToLocalStorage(cityInputEl);
    
    })
}

//converting temperature F to Celsius 
// function convertToC(fahrenheit) {
//   var fTempVal = fahrenheit;
//   var cTempVal = (fTempVal - 32) * (5 / 9);
//   var celcius = Math.round(cTempVal * 10) / 10;
//   return celcius;
// }

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


// Function to get data stored in Local Storage 
// function checkLocalStorage() {
//   var storedData = localStorage.getItem('queries');
//   var dataArray = [];
//   if (!storedData) {
//       console.log("no data stored");
//   } else {
//       storedData.trim();
//       dataArray = storedData.split(',');
//       for (var i = 0; i < dataArray.length; i++) {
//           createRecentSearchBtn(dataArray[i]);
//       }
//   }
// };

// // Function to Set data in Local storage
// function saveToLocalStorage(citySearchButton) {
//   var data = localStorage.getItem('queries');
//   if (data) {
//       console.log(data, citySearchButton)

//   } else {
//       data = citySearchButton;
//       localStorage.setItem('queries', data);
//   }
//   if (data.indexOf(citySearchButton) === -1) {
//       data = data + ',' + citySearchButton;
//       localStorage.setItem('queries', data);
//       createRecentSearchBtn(citySearchButton);
//   }
// }

