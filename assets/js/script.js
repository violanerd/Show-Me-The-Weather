var testCity = 'houston';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';
var containerEl = document.querySelector("#current-display");
var formSubmitEl = document.querySelector("#city-name");
var formEl = document.querySelector("#form");
var windEl = document.querySelector("#wind");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv-index");

function buttonHandler(event) {
    if (event.target.id === "submit"){
        // add some logic if the city doesn't work... where?
        var city = formSubmitEl.value.trim();
        getWeather(city);
    };
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
    if (data.length === 0) {
        // do something
    }
    var currentDay = getTheDate(data);
    var cityName = data.name;
    var lat = data.coord["lat"];
    var lon = data.coord["lon"];
    var weatherEl = document.createElement("h3");
    weatherEl.textContent = cityName + " ";
    
    var weatherImgContEl = document.createElement("span");
    weatherImgContEl.textContent = currentDay;
    var weatherImgEl = document.createElement("img");
    weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/02d@2x.png"); 
    // this is hardcoded, change it to a variable

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




function getTheDate (data) {
    var dateData = data.dt;
    var date = new Date(dateData * 1000);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var current_day = ("(" + day + "/" + month + "/" + year + ")");
    return current_day;
}

function get5Day(lat, lon){
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts" + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
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
    uvEl.textContent = "UV Index: " + uvData + " where to get the image";
}




formEl.addEventListener("click", buttonHandler);

