let responsesGroup = [];
let responsesList = localStorage.getItem("weatherResponse");
renderList();
function renderList() {
    $('<ul>').html("");
    if (responsesList) {
        responsesGroup = responsesList.split('///');
    } else {
        responsesList = " ";
    }
    for (let i = 0; i < responsesGroup.length - 1; i++) {
        console.log(JSON.parse(responsesGroup[i]));
        let cityEvent = $("<li>");
        cityEvent.text(JSON.parse(responsesGroup[i]).name);
        cityEvent.addClass("list-group-item");
        cityEvent.addClass("city1Li");
        cityEvent.attr("cityData", JSON.parse(responsesGroup[i]).name);
        cityEvent.attr("data-lon", JSON.parse(responsesGroup[i]).coord.lon);
        cityEvent.attr("data-lon", JSON.parse(responsesGroup[i]).coord.lat);
        $("ul").append(cityEvent);
    }
}

$("form").on("submit", function (e) {
    e.preventDefault();
    const city = $('#city-text').val();
    var APIKey = "bcef3a7ddc5c897b41eaebadadbfa1ac";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;


    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        if (responsesList !== " ") {
            responsesList = responsesList + JSON.stringify(response) + '///';
        } else {
            responsesList = JSON.stringify(response) + '///';
        }
        localStorage.setItem("weatherResponse", responsesList);
        location.reload();
    });
});



//         let cityEvent = $("<li>");
//         cityEvent.text(response.name);
//         cityEvent.addClass("list-group-item");
//         cityEvent.addClass("city1Li");
//         cityEvent.attr("cityData", JSON.parse(responsesList[i]).name);
//         cityEvent.attr("data-lon", JSON.parse(responsesList[i]).coord.lon);
//         cityEvent.attr("data-lat", JSON.parse(responsesList[i]).coord.lat);
//         cityEvent.on("click", alertCity);
//         $("ul").append(cityEvent);
//         $('#city-text').val("");
//     });
// });



$(document).on("click", ".city1Li", function () {

    var city = $(this).attr("cityData");
    const _dataStorage = $('#cityWeather');
    _dataStorage.html("");
    const cityChosen = cityWeatherStats(city);
    const _cityData = $('<h1>');
    let currentDay = moment().format('MM/DD/YY')
    _cityData.text(cityChosen[0].name + "" + currentDay + " Today");
    const _icon = $("<img>");
    _icon.attr("src", `http://openweathermap.org/img/w/${cityChosen[0].weather[0].icon}.png`);
    _dataStorage.append(_cityData);
    _dataStorage.append(_icon);
    const _dataTemperature = $("<p>");
    _dataTemperature.text("Temperature= " + ((cityChosen[0].main.temp - 273.15) * 1.80 + 32).toFixed(2));
    _dataStorage.append(_dataTemperature);
    const _humidityData = $("<p>");
    _humidityData.text("Humidity= " + cityChosen[0].main.humidity + "%");
    _dataStorage.append(_humidityData);
    const _windSpeed = $("<p>");
    _windSpeed.text("Wind Speed= " + cityChosen[0].wind.speed);
    _dataStorage.append(_windSpeed);
    _dataStorage.attr("style", "border: 5px solid black");

    var APIKey = "bcef3a7ddc5c897b41eaebadadbfa1ac";
    var url2 = `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=${APIKey}&lat=${cityChosen[0].coord.lat}&lon=${cityChosen[0].coord.lon}&cnt=${1}`;
    $.ajax({
        url: url2,
        method: "GET"
    }).then(function (response) {
        const _uvIndex = $("<p>");
        _uvIndex.text("UV Index= " + response[1].value);
        _dataStorage.append(_uvIndex);
    });

    const _projectedForecastStorage = $("#projectedForecast");
    _projectedForecastStorage.html("");

    var APIKey = "bcef3a7ddc5c897b41eaebadadbfa1ac";

    var url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityChosen[0].coord.lat}&lon=${cityChosen[0].coord.lon}&exclude=current,minutely,hourly&units=imperial&appid=${APIKey}`;

    $.ajax({
        url: url3,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; i <= 4; i++) {
            const forecast = $("<div>");
            forecast.addClass("card");
            const forecastPartTwo = $("<div>");
            forecastPartTwo.addClass("card-body");
            const forecastTitle = $("<h4>");
            forecastTitle.addClass("card-title");
            forecastTitle.text(`${moment(new Date(parseInt(response.daily[i].dt) * 1000)).format("MM/DD/YY")}`);
            const _image = $("<img>");
            _image.attr("src", `http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`);
            const _temperature1 = $("<p>").text("Temperature: " + response.daily[i].temp.day);
            const _humidity1 = $("<p>").text("Humidity: " + response.daily[i].humidity + " %");
            const _wind1 = $("<p>").text("Wind Speed: " + response.daily[i].wind_speed);
            const _uvi1 = $("<p>").text("UV Index: " + response.daily[i].uvi);
            forecastPartTwo.append(forecastTitle);
            forecastPartTwo.append(_image);
            forecastPartTwo.append(_temperature1);
            forecastPartTwo.append(_humidity1);
            forecastPartTwo.append(_wind1);
            forecastPartTwo.append(_uvi1);
            forecast.append(forecastPartTwo);
            _projectedForecastStorage.append(forecast);
        }

    });
});
function cityWeatherStats(city) {
    let temperatureList = [];
    for (let j = 0; j < responsesGroup.length - 1; j++) {
        temperatureList.push(JSON.parse(responsesGroup[j]));
    }
    return temperatureList.filter((w) => w.name === city);
}
