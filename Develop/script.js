

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
      let apiCityName = data[0].name;

      document.getElementById("api-city-name").textContent = apiCityName;
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
     
      let currentTempKelvin = data.list[0].main.temp;
      let currentWindSpeed = data.list[0].wind.speed;
      let currentHumidity = data.list[0].main.humidity;
         
      document.getElementById("temp").textContent = currentTempKelvin;
      document.getElementById("wind-speed").textContent = currentWindSpeed;
      document.getElementById("humidity").textContent = currentHumidity;
     
      var arrayList = data.list;
      let counter = 0;

        for (var i = 0; i < arrayList.length; i++) {

          if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {

            counter = counter + 1;
            let dateText = arrayList[i].dt_txt;
            let tempKelvin = arrayList[i].main.temp;
            let windSpeed = arrayList[i].wind.speed;
            let humidity = arrayList[i].main.humidity;

            let dateText1 = "date" + counter;
            let tempKelvin1 = "temp" + counter;
            let windSpeed1 = "wind-speed" + counter;
            let humidity1 = "humidity" + counter;

            document.getElementById(dateText1).textContent = dateText;
            document.getElementById(tempKelvin1).textContent = tempKelvin;
            document.getElementById(windSpeed1).textContent = windSpeed;
            document.getElementById(humidity1).textContent = humidity;
          }
        }
  })
}  
citySearchButton.addEventListener("click", fetchCoordinates);

// TO DO 
// display html from script  
// if searched city name is not existing in local storage then add it 
// whatever is in local storage display in list on the left 
// similar to button click event listerner - fetch value from previously searched city names
// basically call same function as search button  and fetch from list 


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



