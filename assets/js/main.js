const apikey = 'c4ea91fce88970821457e7cea2c8cf29';

let temperature;

let isCelsius = true;

document.getElementById('scale').addEventListener('click', toggleScale);

document.getElementById('search-button').addEventListener('click', extractCity);

/* Get Geolocation from the navigator */
function validateNavGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (response) {
            getWeatherByLocation(Math.round(response.coords.latitude), Math.round(response.coords.longitude));
        });
    } else {
        window.alert('Geolocation is not supported by this browser.');
    }
};

function getWeatherByCity(city) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apikey, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setWeatherDOM(convertFromKelvin(data.main.temp), data.name, data.sys.country);
        })
        .catch(function (error) {
            console.log(error);
        });
};

function getWeatherByLocation(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + apikey, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setWeatherDOM(convertFromKelvin(data.main.temp), data.name, data.sys.country);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function setWeatherDOM(temp, city, country) {
    temperature = temp;
    document.getElementById("location").innerHTML = city + ", " + country;
    document.getElementById("weather").innerHTML = temperature;
};

function extractCity() {
    getWeatherByCity(document.getElementById('city-text').value);
}

/* Upon clicking the scale (Celsius/Fahrenheit) change to the other and vice versa */
function toggleScale() {
    if (isCelsius) {
        document.getElementById("weather").innerHTML = celsiusToFahrenheit(temperature);
        document.getElementById('scale').innerHTML = "F";
        isCelsius = false;
    }
    else {
        document.getElementById("weather").innerHTML = fahrenheitToCelius(temperature);
        document.getElementById('scale').innerHTML = "C";
        isCelsius = true;
    }
};

/* Conversions */
function celsiusToFahrenheit(c) {
    temperature = c * 1.8 + 32;
    return temperature;
};

function fahrenheitToCelius(f) {
    temperature = Math.round((f - 32) * .5556)
    return temperature;
};

function convertFromKelvin(temp) {
    if (isCelsius === true) {
        return Math.round(temp - 273.15);
    } else {
        return Math.round(((temp - 273.15) * 1.8) + 32);
    }
}

validateNavGeolocation();
