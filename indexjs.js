const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notifElement = document.querySelector('.notification');

const weather = {};
weather.temperature = {
    unit: 'celsius'
}

const KELVIN = 273.15;
const key = `4a536c71d297cd35b738d09b45820adc`;

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notifElement.style.display ='block';
    notifElement.innerHTML = `<p> Browser dosen't support geolocation`; }

function setPosition(postion){
    let latitude = postion.coords.latitude;
    let longitude = postion.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notifElement.style.display = 'block';
    notifElement.innerHTML = `<p> ${error.message}`;
}

function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);

    fetch(api)
    .then(function(response) {
        let data = response.json();
        return data;
    }) 
    .then(function(data){
        weather.temperature.value = Math.floor((data.main.temp - KELVIN)*9/5+32);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function() {
        displayWeather();
    })
} 

function displayWeather(){
    iconElement.innerHTML = `<img src="icon/${weather.iconId}.png" />`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
} 