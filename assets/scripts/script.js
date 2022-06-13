// display todays current date on page
var today = moment().format('MMMM Do, YYYY');
$("#currentDate").html("<i class='fa-style fa-solid fa-calendar-day'></i>" + today);


// turn searched city into lat/lon for pollen api purposes 

// openweather api logic start 
function searchCoord(city) {
    var searched = JSON.parse(localStorage.getItem('city'));
    var owApiKey = "8146fc372939ba1529f0cee4a074681a";
    var owApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&units=imperial&appid=" + owApiKey;



    // placeholder tag for the current location on the pollen index 
    // it is working however not auto caps on the first letter and the location image thingy also disapeard 
var currentLocation = $("#cLocation"); 
var lIcon = $("#lIcon");
//console.log(currentLocation); 
city = city.toUpperCase(); // making everything uppercase bc it looks better than lowercase lol 
$("#cLocation").text(city); 

    $.ajax({
        url: owApiUrl,
        method: 'GET'
    })
        // create lat/lon coordinatesfrom openweather api 
        .then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

             // todays forecast section to display on the card 
        
         // todays forecast section to display on the card 
        var weather = response.weather.main; 
        var temp = $("<p>").text("Temperature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);

        // getting the weather icons to display in the box 
        if (weather === "Rain") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Clouds") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Drizzle") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Clear") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Snow") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            icon.attr("style", "width: 60px; height: 60px");
        }

        var weatherDiv =$('<div class="card has-text-light has-background-grey-dark pl-5 py-4 is-size-4 has-text-weight-semi-bold" >')
        weatherDiv.append( icon, temp, humidity, wind);
        $("#dForecast").html(weatherDiv)

        // end of the daily forecast section of the page 

            // tomorrow api logic start 

            var tomApiKey = "4KmRdN5z9dqbcv6PQ9857fEpkG1PShyN";
            var treeIndexUrl = "https://api.tomorrow.io/v4/timelines?location=" + lat + "," + lon + "&timesteps=current&units=imperial&apikey=" + tomApiKey + "&fields=treeIndex,grassIndex,weedIndex";
            $.ajax({
                url: treeIndexUrl,
                method: 'GET'
            })
                // pull tree, grass, and weed index from tomorrow.io api and add them dynamically to the page after city search
                .then(function (response) {
                    $('#pollenLevels').empty();
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
            // pull air quality index from air quality open data api and push to page dynamically after city search
            .then(function (response) {
                $("#airQuality").empty();
                var air = $("<p>").text("Air Quality Index (AQI): ");
                var aqi = $("<span>")
                aqi.text(response.data.aqi)
                air.append(aqi)
                var newDivEl = $('<div>')
                if (response.data.aqi <= 50 && response.data.aqi >= 0) {
                        aqi.css("background-color", "green")
                        aqi.css("color", "white")
                    } else if (response.data.aqi >= 51 && response.data.aqi <= 100) {
                        aqi.css("background-color", "yellow")
                        aqi.css("color", "black")
                    } else if (response.data.aqi >= 101 && response.data.aqi <= 150) {
                        aqi.css("background-color", "orange")
                        aqi.css("color", "black")
                    } else if (response.data.aqi >= 151 && response.data.aqi <= 200) {
                        aqi.css("background-color", "red")
                        aqi.css("color", "white")
                }

                        newDivEl.append(air);
                        $("#airQuality").html(newDivEl);
                        // console.log(response) // jdcarra 
                // air quality colors
                // 0-50 good-green 
                // 51-100 moderate-yellow
                // 101-150 unhealthy for sensitive groups - orange
                // 151-200 unhealthy - red 
            });
    }

/* city location logic */
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // set and save searched city variable to localstorage //
    var saved = [];
    var savedSearches = JSON.parse(localStorage.getItem('city'));
    if (savedSearches) {
      //  console.log(savedSearches);
        saved.push(...savedSearches);
    }
    var citySearch = $("#citySearch").val().trim();
    //citySearch = citySearch.toLowerCase();
    if (saved.includes(citySearch)) {
        return;
    }
    //var savedSearch = $(this).siblings("input").val();
    saved.push(citySearch)
    console.log(saved);
    localStorage.setItem('city', JSON.stringify(saved));

    searchAirQuality(citySearch);
    searchCoord(citySearch);
    var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(citySearch);
    var divEl = $("<div>");
    divEl.append(searchHistory)
    $("#locationHistory").prepend(divEl);
});
/* load localStorage and display on page */
function loadSaved() {
    var searchedItems = JSON.parse(localStorage.getItem('city'));
    if (searchedItems) {
        for (let index = 0; index < searchedItems.length; index++) {
            const searchedItem = searchedItems[index];
            var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(searchedItem);
            var divEl = $("<div>");
            divEl.append(searchHistory)
            $("#locationHistory").prepend(divEl);
        }
    }

}
// clickable location history
$("#locationHistory").on('click', '.btn', function (event) {
    event.preventDefault();
    searchAirQuality($(this).text());
    searchCoord($(this).text());
});
// clear location history on clear btn click
$("#clearBtn").on("click", function (event) {
    event.preventDefault();
    $("#locationHistory").html("");
    localStorage.clear();
})
loadSaved();

