// display todays current date on page
var today = moment().format('MMMM Do, YYYY');
$("#currentDate").html("<i class='fa-style fa-solid fa-calendar-day'></i>" + today);

//  air quality open data platform api logic

function searchAirQuality(city) {
    var aqApiKey = "a53b18a6ff2b8d358de6c248c203cfc1ba838e36";
    var apiUrl = "https://api.waqi.info/feed/" + city + "/?token=" + aqApiKey;

    $.ajax({
        url: apiUrl,
        method: 'GET'
    })
    .then(function (response) {
        $("#airQuality").empty();

        // city html section and forecast elements //
  //      var cityEl = $("<h2>").text(response.name);
        var air = $("<p>").text(" " + response.data.aqi);
        var newDivEl = $('<div>')
        newDivEl.append(air);
        $("#airQuality").html(newDivEl);

        // air quality colors
        // 0-50 good-green 
        // 51-100 moderate-yellow
        // 101-150 unhealthy for sensitive groups - orange
        // 151-200 unhealthy - red 
        // TODO: add if statement block to change div color based on quality 
    });
}
/* city location logic */
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    // set and save searched city variable to localstorage //
    var citySearch = $("#citySearch").val().trim();
    var savedSearch = $(this).siblings("input").val();
    var saved = [];
    saved.push(savedSearch);
    localStorage.setItem('city', JSON.stringify(citySearch));

    searchAirQuality(citySearch);
    loadSaved();
});
/* load localStorage and display on page */
function loadSaved () {
    var searchedItem = JSON.parse(localStorage.getItem('city'));
    var searchHistory = $("<button class='styled-btn btn'>").text(searchedItem);
    var divEl = $("<div>");
    divEl.append(searchHistory)
    $("#locationSearch").prepend(divEl);
    
}
// clickable location history
$("#locationHistory").on('click', '.btn', function(event) {
    event.preventDefault();
    searchAirQuality($(this).text());
});