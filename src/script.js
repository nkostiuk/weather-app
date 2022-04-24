function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = days[date.getDay()];
  return `${currentDay}, ${hours}:${minutes}`;
}

function displayCurrentDate() {
  let timeToBeChanged = document.querySelector("#current-time");
  timeToBeChanged.innerHTML = formatDate();
}

//display-current-time
displayCurrentDate();

// converts to units
function convertToFarenheitCelc(temp, unit) {
  if (unit === "fromCelcium") {
    return Math.round((temp * 9) / 5 + 32);
  } else return Math.round(((temp - 32) * 5) / 9);
}

function changeUnitToF(event) {
  event.preventDefault();
  let currentDayTempQ = document.querySelector(".day-current-city-temperature");
  let currentDayTemp = currentDayTempQ.innerHTML;
  console.log(currentDayTemp);

  let currentNightTempQ = document.querySelector(
    ".night-current-city-temperature"
  );
  let currentNightTemp = currentNightTempQ.innerHTML;

  currentDayTempQ.innerHTML = convertToFarenheitCelc(
    currentDayTemp,
    "fromCelcium"
  );
  currentNightTempQ.innerHTML = convertToFarenheitCelc(
    currentNightTemp,
    "fromCelcium"
  );
}

function changeUnitToC(event) {
  event.preventDefault();
  let currentDayTempQ = document.querySelector(".day-current-city-temperature");
  let currentDayTemp = currentDayTempQ.innerHTML;
  console.log(currentDayTemp);

  let currentNightTempQ = document.querySelector(
    ".night-current-city-temperature"
  );
  let currentNightTemp = currentNightTempQ.innerHTML;

  currentDayTempQ.innerHTML = convertToFarenheitCelc(
    currentDayTemp,
    "fromFarenheit"
  );
  currentNightTempQ.innerHTML = convertToFarenheitCelc(
    currentNightTemp,
    "fromFarenheit"
  );
}

// change-units
let unitF = document.querySelector(".unit-f");
unitF.addEventListener("click", changeUnitToF);

let unitC = document.querySelector(".unit-c");
unitC.addEventListener("click", changeUnitToC);

//works-with-api
let apiKey = "1d81c247d22842a0bce17c833b8a5ff0";
let units = "metric";

function searchCurrentPosition(position) {
  let userCoords = { lat: "", lon: "" };
  userCoords.lat = position.coords.latitude;
  userCoords.lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&lat=${userCoords.lat}&lon=${userCoords.lon}`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

//Display the weather information of the city from search or current user location
function displayWeatherInfo(response) {
  document.querySelector(
    ".heading-1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  document.querySelector(".day-current-city-temperature").innerHTML =
    Math.round(response.data.main.temp);

  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity} %`;

  document.querySelector(".descriptive-text").innerHTML =
    response.data.weather[0].main;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&q=${city}`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputValue = document.querySelector("#search-field").value;

  searchCity(searchInputValue);
}

searchCity("Paris");
// submit weather search by city from the input
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

//weather info of current location of user
let buttonLocation = document.querySelector(".location-button");
buttonLocation.addEventListener("click", getCurrentPosition);
