(function(){

var weather = document.getElementById("weather");

var location = document.getElementById("location"); 

var tempC;

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showInfo);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showInfo(position) {

    var call = "https://fcc-weather-api.glitch.me/api/current?lat=" + Math.round(position.coords.latitude) + 
    "&lon=" + Math.round(position.coords.longitude); 

   

    $.getJSON(call,function(json){
        console.log(json.main.temp);
        tempC =json.main.temp;
        location.innerHTML = json.name + ", " + json.sys.country;
        weather.innerHTML = tempC;
    });

}

getWeather();
})();