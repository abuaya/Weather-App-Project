/// Feature one ///
let now = new Date();

let h1 = document.querySelector("h1");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday,`
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
let month = months[now.getMonth()];

h1.innerHTML = `${day} ${month} ${date}, ${year}, ${hours}:${minutes}`;

///////
function displayTemperature (response) {

  let temperatureElement = document.querySelector("#temperatureData");
  let cityElement = document.querySelector("#displayCity");
  let weatherDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weatherIconElement = document.querySelector("#weatherIcon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round (celciusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round (response.data.wind.speed);


  weatherIconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}
 
function formatHours(timestamp) {
let date = new Date (timestamp);
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
  <div class="col-2"">
    <h3> ${formatHours(forecast.dt * 1000)}
    </h3> 
    <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
    <strong>High: ${Math.round(forecast.main.temp_max)}°C </strong> 
    Low: ${Math.round(forecast.main.temp_min)}°C
    </div>
    </div>
    `;
  }
}


function search(city) {
  let apiKey = "a05b99834a4c4393485b5df92793ef0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityNameInputElement = document.querySelector("#cityNameInput")
  search(cityNameInputElement.value);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperatureData")
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event){
  event.preventDefault();
  celciusLink.classList.add("active");
    farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperatureData")
  temperatureElement.innerHTML = Math.round(celciusTemperature);

}

 function displayConditions(response) {
   document.querySelector("#displayCity").innerHTML = response.data.name;
  document.querySelector("#temperatureData").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
 }

function searchLocation(position) {
  let apiKey = "a05b99834a4c4393485b5df92793ef0c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayConditions);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
 }


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
 
let celciusTemperature = null; 
 
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let farenheitLink = document.querySelector("#farenheit-link");
  farenheitLink.addEventListener("click", showFarenheitTemperature);

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelciusTemperature);

  search("Sydney")