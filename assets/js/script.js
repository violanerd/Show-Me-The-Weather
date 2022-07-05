var testCity = 'houston';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';
var containerEl = document.querySelector("#current-display");
var formSubmitEl = document.querySelector("#city-name");
var formEl = document.querySelector("#form");
var windEl = document.querySelector("#wind");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv-index");
var buttonEl = document.querySelector("#button");

function buttonHandler(event) {
    if (event.target.id === "submit"){
        // add a new city to the search History
        var city = formSubmitEl.value.trim();
        searchHistory.push(city);
        updateSearchHistory();
        var newButton = document.createElement("button");
        newButton.setAttribute("class", "w-75 m-3");
        newButton.textContent = city
        buttonEl.appendChild(newButton);
        getWeather(city);
    } else {
        var city = event.target.innerHTML;
        getWeather(city);
    }
}


function getWeather(city){
    apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                
                displayWeather(data);
            });
        } else {
            alert("Error: City not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
}

function displayWeather(data){
    
    var dateData = data.dt;
    var currentDay = getTheDate(dateData);
    var cityName = data.name;
    var lat = data.coord["lat"];
    var lon = data.coord["lon"];
    var weatherEl = document.createElement("h3");
    weatherEl.textContent = cityName + " ";
    
    var weatherImgContEl = document.createElement("span");
    weatherImgContEl.textContent = currentDay;
    var weatherImgEl = document.createElement("img");
    var icon = data.weather[0].icon;
    weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"); 

    weatherImgContEl.appendChild(weatherImgEl);
    weatherEl.appendChild(weatherImgContEl);
    containerEl.appendChild(weatherEl);

    // Static display, dynamic content
    var wind = data.wind.speed;
    windEl.textContent = "Wind: " + wind + " MPH";
    
    var temp = data.main.temp;
    tempEl.innerHTML = "Temperature: " + temp + '&#8457';
    
    var humidity = data.main.humidity;
    humidityEl.textContent = "Humidity: " + humidity + "%";

    get5Day(lat,lon);
    
}


function getTheDate (dateData) {
    
    var date = new Date(dateData * 1000);
    var day = date.getDate();
    var month = (date.getMonth()) + 1;
    // month starts counting at 0
    var year = date.getFullYear();
    var current_day = ("(" + month + "/" + day + "/" + year + ")");
    return current_day;
}

function get5Day(lat, lon){
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts" + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayUVandForecast(data);
            });
        } else {
            alert("Error: City not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
}

function displayUVandForecast(data) {
    var uvData = data.current.uvi;
    uvEl.textContent = uvData;
    checkUV(uvData);

    var arrayDaily = data.daily
    for (var i=1; i < 6; i++){
        var divDay = "#day" + i;
        var forecastEl = document.querySelector(divDay);
        forecastEl.setAttribute("class", "daily-forecast");

        var dateData = arrayDaily[i].dt;
        var currentDay = getTheDate(dateData);
        
        var dateEl = document.createElement("h5");
        dateEl.textContent = currentDay;
        forecastEl.appendChild(dateEl);

        var weatherImgEl = document.createElement("img");
        var icon = arrayDaily[i].weather[0].icon;
        weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"); 
        forecastEl.appendChild(weatherImgEl);

        var tempEl = document.createElement("p");
        var temp = arrayDaily[i].temp.max;
        tempEl.innerHTML = "Temperature: " + temp + '&#8457';
        forecastEl.appendChild(tempEl);

        var windEl = document.createElement("p");
        var wind = arrayDaily[i].wind_speed;
        windEl.textContent = "Wind: " + wind + " MPH";
        forecastEl.appendChild(windEl);

        var humidityEl = document.createElement("p");
        var humidity = arrayDaily[i].humidity;
        humidityEl.textContent = "Humidity: " + humidity + "%";
        forecastEl.appendChild(humidityEl);

    } 
}

function checkUV (num) {
    uvEl.setAttribute("style", "padding: 0.2rem");
    if (num > 7 && num <= 15){
        uvEl.setAttribute("style", "background-color: red");
        return;
    } else if (num > 5 && num <= 7){
        uvEl.setAttribute("style", "background-color: orange");
        return;
    } else if (num > 3 && num <= 5){
        uvEl.setAttribute("style", "background-color: yellow");
        return;
    } else {
        uvEl.setAttribute("style", "background-color: green");
        return;
    }  
}

// search history
var searchHistory = [];

// display search history
function displaySearchHistory (cities) {
    for (var i = 0; i < cities.length; i++) {
        var newButton = document.createElement("button");
        newButton.setAttribute("class", "w-75 m-3");
        newButton.textContent = cities[i];
        buttonEl.appendChild(newButton);
        searchHistory.push(cities[i]);
    }
}
// local storage
function updateSearchHistory () {
    localStorage.setItem("cities", JSON.stringify(searchHistory));
}

function loadSearchHistory () {
    var getCities = JSON.parse(localStorage.getItem("cities"));

    if (!getCities){
        return;
    } else {
        displaySearchHistory(getCities);
    }
}

loadSearchHistory();

buttonEl.addEventListener("click", buttonHandler);

