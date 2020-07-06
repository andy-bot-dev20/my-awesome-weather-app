//Feature 1
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[now.getMonth()];
let weekdayDisplay = weekDay[now.getDay()];

let currentTime = document.querySelector("#dateDisplay");
currentTime.innerHTML = `${month} ${date},${year} ${hour}:${minute}`;

let currentDay = document.querySelector("#currentWeekday");
currentDay.innerHTML = `${weekdayDisplay}`;

//Feature 2

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input-text");
  let enteredCity = document.querySelector("#entered-city");

  if (cityInput.value) {
    enteredCity.innerHTML = `${cityInput.value}`;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
  } else {
    enteredCity.innerHTML = null;
    alert("Please type a city");
  }
}

function displayWeather(response) {
  let enteredCity = document.querySelector("#entered-city");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  enteredCity.innerHTML = `${response.data.name}`;
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let citySearch = document.querySelector("#form-search");
citySearch.addEventListener("submit", search);

let apiKey = "d7d4c0964a495395c6fffcb36bb9fe78";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&units=metric&appid=${apiKey}`;
axios.get(url).then(displayWeather);

function searchLocation(position) {
  let apiKey = "d7d4c0964a495395c6fffcb36bb9fe78";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
