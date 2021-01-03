let responsesGroup = [];
let responsesList = localStorage.getItem("weatherResponses");
renderList();

$("form").on("submit", function (e) {
    e.preventDefault();
    const city = $('#city-text').val();
    var APIKey = "bcef3a7ddc5c897b41eaebadadbfa1ac";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;


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

        localStorage.setItem("weatherResponses", responsesList);
        let cityEvent = $("<li>");
        cityEvent.text(response.name);
        cityEvent.addClass("list-group-item");
        cityEvent.addClass("city1Li");
        cityEvent.attr("cityData", response.name);
        cityEvent.on("click", alertCity);
        $("ul").append(cityEvent);
        $('#city-text').val("");
    });
});



$(document).on("click", ".city1Li", alertCity);



function alertCity() {
    city = $(this).attr("cityData");
}
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
        cityEvent.on("click", alertCity);
        $("ul").append(cityEvent);
    }
}
