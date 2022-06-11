// display todays current date on page
var today = moment().format('MMMM Do, YYYY');
$("#currentDate").html("<i class='fa-style fa-solid fa-calendar-day'></i>" + today);

// turn searched city into lat/lon for pollen api purposes 

function searchCoord(city) { 
    var searched = JSON.parse(localStorage.getItem('city'));
    var owApiKey = "8146fc372939ba1529f0cee4a074681a";
    var owApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&units=imperial&appid=" + owApiKey;


    $.ajax({
        url: owApiUrl,
        method: 'GET'
    })
    .then(function (response) {
        console.log(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;


// tomorrow api  

    var tomApiKey = "4KmRdN5z9dqbcv6PQ9857fEpkG1PShyN";
    var treeIndexUrl = "https://api.tomorrow.io/v4/timelines?location=" + lat + "," + lon + "&timesteps=current&units=imperial&apikey=" + tomApiKey + "&fields=treeIndex,grassIndex,weedIndex";
    $.ajax({
    url: treeIndexUrl,
    method: 'GET'
     })

.then(function (response) {
    $('#pollenLevels').empty();
    var uv = response.value;
    var pollenDiv = $('<p class="pollen-index">').html("<h5>Pollen Index:</h5> " + "<div class='box has-text-light has-background-grey-dark'><i class='fa-style fa-color fa-margin fa-solid fa-seedling'></i> Grass: " + response.data.timelines[0].intervals[0].values.grassIndex + "<br> <i class='fa-style fa-color fa-margin fa-solid fa-tree'></i> Tree: " + response.data.timelines[0].intervals[0].values.treeIndex + "<br> <i class='fa-style fa-color fa-margin fa-brands fa-pagelines'></i> Weed: " + response.data.timelines[0].intervals[0].values.weedIndex + "</p>");
    $('#pollenLevels').html(pollenDiv)
})
})
}

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
        var air = $("<p>").text("Air Quality Index (AQI): " + response.data.aqi);
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
    searchCoord(citySearch);
    loadSaved();
});
/* load localStorage and display on page */
function loadSaved () {
    var searchedItem = JSON.parse(localStorage.getItem('city'));
    var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(searchedItem);
    var divEl = $("<div>");
    divEl.append(searchHistory)
    $("#locationHistory").prepend(divEl);
    
}
// clickable location history
$("#locationHistory").on('click', '.btn', function(event) {
    event.preventDefault();
    searchAirQuality($(this).text());
});
// clear location history on clear btn click
$("#clearBtn").on("click", function(event) {
    event.preventDefault();
    $("#locationHistory").html("");
})

