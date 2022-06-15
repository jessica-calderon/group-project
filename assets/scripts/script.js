/* $(document).ready(function() {
    $.ajaxSetup({ cache: false });
  });
 */
// display todays current date on page
var today = moment().format('MMMM Do, YYYY');
$("#currentDate").html("<i class='mr-2 fa-solid fa-calendar-day'></i>" + today);

// openweather api logic start 
function searchCoord(city) {
    var owApiKey = "8146fc372939ba1529f0cee4a074681a";
<<<<<<< HEAD
    var owApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + owApiKey;


    $.ajax({
        url: owApiUrl,
        method: 'GET'
    })
        // create lat/lon coordinatesfrom openweather api 
        .then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;


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
=======
    var owApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&units=imperial&appid=" + owApiKey;
    // openweather geocode api url for state locator from city search
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + owApiKey; 
    // find and add state using geocode api  
        $.ajax({
            url: geoUrl,
            method: 'GET'
>>>>>>> ce7633cd223849f2e6942a25cf2f91158df69181
        })
            // pull state name openweather api 
            .then(function (geoResponse) {
                var stateName = geoResponse[0].state;
                stateName = stateName.toUpperCase();
            

            // placeholder tag for the current location (city, state) on the pollen index 
                var currentLocation = $("#cLocation"); 
                var lIcon = $("#lIcon");
                //console.log(currentLocation); 
                city = city.toUpperCase(); // making everything uppercase bc it looks better than lowercase lol 
                $("#cLocation").html('<i class="fa-solid fa-location-dot mr-2"></i>' + city + ", " + stateName); 
            })

                $.ajax({
                    url: owApiUrl,
                    method: 'GET'
                })
                    // create lat/lon coordinatesfrom openweather api 
                    .then(function (response) {
                        var lat = response.coord.lat;
                        var lon = response.coord.lon;
                    
                        // todays forecast section to display on the card 
                        var weather = response.weather[0].main; 
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

                        var weatherDiv =$('<div class="card has-text-light has-background-grey-dark pl-5 py-4 is-size-5 has-text-weight-semi-bold" >')
                        weatherDiv.append(icon, temp, humidity, wind);
                        $("#dForecast").html(weatherDiv)
                        // end of the daily forecast section of the page 

                    // tomorrow api logic start 
                    var tomApiKey = "4KmRdN5z9dqbcv6PQ9857fEpkG1PShyN";
                    var treeIndexUrl = "https://api.tomorrow.io/v4/timelines?location=" + lat + "," + lon + "&timesteps=current&units=imperial&apikey=" + tomApiKey + "&fields=treeIndex,treeAshIndex,treeCedarIndex,treeOakIndex,treePineIndex,grassIndex,weedIndex,weedRagweedIndex";

                        $.ajax({
                            url: treeIndexUrl,
                            method: 'GET'
                        })                            
                        // pull tree, grass, and weed index from tomorrow.io api and add them dynamically to the page after city search
                            .then(function (response) {
                                // pollen index values 
                                var grassIndex = response.data.timelines[0].intervals[0].values.grassIndex;
                                var treeIndex = response.data.timelines[0].intervals[0].values.treeIndex;
                                var treeAshIndex = response.data.timelines[0].intervals[0].values.treeAshIndex ;
                                var treeCedarIndex = response.data.timelines[0].intervals[0].values.treeCedarIndex;
                                var treeOakIndex = response.data.timelines[0].intervals[0].values.treeOakIndex;
                                var treePineIndex = response.data.timelines[0].intervals[0].values.treePineIndex
                                var weedIndex = response.data.timelines[0].intervals[0].values.weedIndex;
                                var weedRagweedIndex = response.data.timelines[0].intervals[0].values.weedRagweedIndex;
                                // clear pollenLevels div
                                $('#pollenLevels').empty();
                                // div to hold and display all pollen levels with styling 
                                var pollenDiv = $("<div class='card has-text-light has-background-grey-dark pl-5 py-4 is-size-5 has-text-weight-semi-bold is-flex-grow-5'>").html("<h5 class='has-text-light'>Pollen Index:</h5> " + "<i class='fa-style fa-color mr-2 fa-solid fa-seedling'></i>Grass: " + grassIndex + "<br><i class='fa-style fa-color mr-2 fa-solid fa-tree'></i>Tree: " + treeIndex + "<br><i class='fa-style fa-color mr-2 fa-solid fa-tree'></i>Tree Ash: " + treeAshIndex + "<br><i class='fa-style fa-color mr-2 fa-solid fa-tree'></i>Tree Cedar: " + treeCedarIndex + "<br><i class='fa-style fa-color mr-2 fa-solid fa-tree'></i>Tree Oak: " + treeOakIndex + "<br><i class='fa-style fa-color mr-2 fa-solid fa-tree'></i>Tree Pine: " + treePineIndex + "<br><i class='fa-style fa-color mr-2 fa-brands fa-pagelines'></i>Weed: " + weedIndex + "<br><i class='fa-style fa-color mr-2 fa-brands fa-pagelines'></i>Weed Ragweed: " + weedRagweedIndex);
                                // push pollen div to page 
            /*                     $('.pollen-card').attr("class", "card is-dark") */
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
                    var air = $("<p>").text("AQI: ");
                    var aqi = $("<span>")
                    aqi.text(response.data.aqi)
                    air.append(aqi)
                    var newDivEl = $("<div>")
                    // set background color based on aqi levels green-good 
                    if (response.data.aqi <= 50 && response.data.aqi >= 0) {
                        $("#airQuality").attr("class", "card is-one-quarter p-2 m-5 p-5 has-background-success has-text-centered title has-text-white");
                            // moderate-yellow 
                        } else if (response.data.aqi >= 51 && response.data.aqi <= 100) {
                            $("#airQuality").attr("class", "card m-5 p-5 has-background-warning has-text-centered title has-text-black");
                            // unhealthy for sensitive groups-light red 
                        } else if (response.data.aqi >= 101 && response.data.aqi <= 150) {
                            $("#airQuality").attr("class", "card m-5 p-5 has-background-danger-light has-text-centered title has-text-black");
                            // unhealthy-red
                        } else if (response.data.aqi >= 151 && response.data.aqi <= 200) {
                            $("#airQuality").attr("class", "card m-5 p-5 has-background-danger has-text-centered title has-text-white");
                        } else {
                            $("#airQuality").attr("class", "card m-5 p-5 has-background-light has-text-centered title has-text-black");
                            aqi.text(" N/A ")
                }
                        // append air quality to page
                        newDivEl.append(air);
                        $("#airQuality").html(newDivEl);
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
        localStorage.setItem('city', JSON.stringify(saved));

        searchAirQuality(citySearch);
        searchCoord(citySearch);
        // add searched cities to location history as clickable elements
        var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(citySearch);
        var divEl = $("<div>");
        divEl.append(searchHistory)
        $("#locationHistory").prepend(divEl);

        // lets input feild clear out after clicking the search button instead of having the name stay there 
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = ''); 
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
// stop refresh on enter key 

loadSaved();

