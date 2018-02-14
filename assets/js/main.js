$(document).ready(function () {

    var weather = document.getElementById("weather");

    var location = document.getElementById("location");

    var icon = document.getElementById("icon");

    var temperature;

    /* Get Geolocation from the navigator */
    function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showInfo);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    /* Call the FCC weather API, get the temperature, area, country and icon that describes the weather and insert
    into respective HTML*/
    function showInfo(position) {

        var call = "https://fcc-weather-api.glitch.me/api/current?lat=" + Math.round(position.coords.latitude) +
            "&lon=" + Math.round(position.coords.longitude);

        $.getJSON(call, function (json) {
            console.log(json.main.temp);
            temperature = json.main.temp;
            location.innerHTML = json.name + ", " + json.sys.country;
            weather.innerHTML = temperature;
            icon.innerHTML = "<img src=" + json.weather[0].icon + ">";
        });

    }

    /* Upon clicking the scale (Celsius/Fahrenheit) change to other and vice versa */
    $(document).on('click', "#scale", function () {
        if ('C' == $(this).text()) {
            weather.innerHTML = celsiusToFahrenheit(temperature);
            scale.innerHTML = "F";
        }
        else if ('F' == $(this).text()) {
            weather.innerHTML = fahrenheitToCelius(temperature);
            scale.innerHTML = "C";
        }
    });

    /* Conversions */
    function celsiusToFahrenheit(c) {
        temperature = c * 1.8 + 32;
        return temperature;
    }

    function fahrenheitToCelius(f) {
        temperature = Math.round((f - 32) * .5556)
        return temperature;
    }

    // Call the API upon loading the page
    getWeather();

});