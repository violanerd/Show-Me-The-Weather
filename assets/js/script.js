var testCity = 'houston';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';
var containerEl = document.querySelector("#current-display");
var formSubmitEl = document.querySelector("#city-name");
var formEl = document.querySelector("#form");
var windEl = document.querySelector("#wind");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");

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
                console.log(data);
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

    var weatherEl = document.createElement("h3");
    weatherEl.textContent = cityName + " ";
    
    var weatherImgContEl = document.createElement("span");
    weatherImgContEl.textContent = currentDay;
    var weatherImgEl = document.createElement("img");
    weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/02d@2x.png"); 
    
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
    
}


//"https://openweathermap.org/img/wn/" + icon "@2x.png"

function getTheDate (data) {
    var dateData = data.dt;
    var date = new Date(dateData * 1000);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var current_day = ("(" + day + "/" + month + "/" + year + ")");
    return current_day;
}
function get5Day(){
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=29.7633&lon=-95.3633&exclude=minutely,hourly,alerts" + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                
            });
        } else {
            alert("Error: City not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
}

get5Day(); // hardcoded lat and lon - use the first call to get lat and long AND UV index
formEl.addEventListener("click", buttonHandler);

