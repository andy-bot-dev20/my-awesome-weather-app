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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
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
let weekofDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[now.getMonth()];
let weekdayDisplay = weekofDay[now.getDay()];

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
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
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

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <span class="weekday-1-out-5">
        ${formatHours(forecast.dt * 1000)}
      </span>
      <div class="row">
      <span class="weather-1-out-5"
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      </span>
      </div>
      <div class= "row" id="weather-forecast-temperature">
      <span class="temp-1-out-5">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
        </span>
      </div>
    </div>
    </div>
  `;
  }
}

let citySearch = document.querySelector("#form-search");
citySearch.addEventListener("submit", search);

let apiKey = "d7d4c0964a495395c6fffcb36bb9fe78";
let url = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&units=metric&appid=${apiKey}`;
axios.get(url).then(displayWeather);

function searchLocation(position) {
  let apiKey = "d7d4c0964a495395c6fffcb36bb9fe78";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
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
