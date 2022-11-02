let API_Key = "83464db7448f440f2230d5eae25329a5";
let user_input = "";
// city search input element
// doc query selector  
function fetch_coordimates() {
  var API_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + user_input + "&limit=5&appid=" + API_Key
    fecth(API_URL)
}