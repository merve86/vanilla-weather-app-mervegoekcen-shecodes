function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-lg-2">
        <div class="d-flex justify-content-center weather-forecast-date">${formatDay(
          forecastDay.dt
        )}</div>
        <div class="d-flex justify-content-center weather-img</div">
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="50"
          />
        </div>
        <div class="d-flex justify-content-center weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8eb28f04c7f539b2e023c388f6d5de89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherConditions(response) {
  let tempDisplay = document.querySelector("#temperature");
  let cityDisplay = document.querySelector("#city");
  let descriptionDisplay = document.querySelector("#dayOverview");
  let humidityDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind");
  let dateDisplay = document.querySelector("#time-id");
  let feelsLikeDisplay = document.querySelector("#feels-like");
  let iconDisplay = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  tempDisplay.innerHTML = Math.round(celsiusTemp);
  cityDisplay.innerHTML = response.data.name;
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  humidityDisplay.innerHTML = response.data.main.humidity;
  windDisplay.innerHTML = Math.round(response.data.wind.speed);
  dateDisplay.innerHTML = formatDate(response.data.dt * 1000);
  feelsLikeDisplay.innerHTML = Math.round(response.data.main.feels_like);
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8eb28f04c7f539b2e023c388f6d5de89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputDisplay = document.querySelector("#city-search-id");
  search(cityInputDisplay.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemp = null;

search("Vienna");
