$("form").on("submit", function (e) {
    e.preventDefault();
    const city = $('#city-text').val();
    var APIKey = "bcef3a7ddc5c897b41eaebadadbfa1ac";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    "q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        let cityEvent = $("<li>");
        cityEvent.text(response.name);
        cityEvent.addClass("list-group-item");
        cityEvent.addClass("city1Li");
        cityEvent.attr("cityData", response.name);
        $("ul").append(cityEvent);
    });
});



$(document).on("click", ".city1Li", alertCity);


function alertCity() {
    var city = $(this).attr("cityData");
    alert(city);
}
