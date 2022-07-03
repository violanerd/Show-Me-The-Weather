var testCity = 'houston';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';
var containerEl = document.querySelector("#current-display");
var formSubmitEl = document.querySelector("#city-name");
var formEl = document.querySelector("#form");


function buttonHandler(event) {
    if (event.target.id === "submit"){
        // add some logic if the city doesn't work... where?
        var city = formSubmitEl.value.trim();
        getWeather(city);
    };
}


function getWeather(city){
    apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data.weather[0]);
                console.log(data.dt);
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


formEl.addEventListener("click", buttonHandler);

