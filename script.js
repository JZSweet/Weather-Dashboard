
var searchHistory = []

// Build button to trigger AJAX call
$("#find-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val();
    searchHistory.push(city);
    // API key
    var APIKey = "e12e920767d761fecb84037722ebae76";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $("#city-view").html("");
    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response, $("city-view").html());
        var city = (response.name);
        var cityEl = $("<div>").text(city);
        $("#city-view").append(cityEl);
        var temperature = (response.main.temp - 273.15) * 1.80 + 32;
        var tempel = $("<div>").text(temperature.toFixed(2) + "°F");
        $("#temperature").append(tempel);
        var icon = (response.weather[0].icon);
        var iconEl = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        $("#city-view").append(iconEl);
        var windSpeed = (response.wind.speed);
        var windspeedEl = $("<div>").text(windSpeed.toFixed() + " mph");
        $("#windSpeed").append(windspeedEl);
        var humidity = (response.main.humidity);
        var humidityEl = $("<div>").text(humidity + "%");
        $("#humidity").append(humidityEl);
        // UV call.
        var lat = (response.coord.lat);
        var lon = (response.coord.lon);
        var key = "e12e920767d761fecb84037722ebae76";
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + key
        }).then(function getUV(response) {
            var cityUV = (response.value);
            $("#UVindex").append(cityUV);
        });
    })
});
