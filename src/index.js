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

h1.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

///////
function displayTemperature (response) {

  let temperatureElement = document.querySelector("#temperatureData");
  temperatureElement.innerHTML = Math.round (response.data.main.temp);
  let cityElement = document.querySelector("#displayCity");
  cityElement.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round (response.data.wind.speed);
  let weatherIconElement = document.querySelector("#weatherIcon");
  weatherIconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}
 

function search(city) {
  let apiKey = "a05b99834a4c4393485b5df92793ef0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityNameInputElement = document.querySelector("#cityNameInput")
  search(cityNameInputElement.value);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  alert("clicked");
}

search("New York")
 
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let farenheitLink = document.querySelector("#farenheit-link");
  farenheitLink.addEventListener("click", showFarenheitTemperature);