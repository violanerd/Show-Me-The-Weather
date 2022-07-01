var city = 'houston';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';
var containerEl = document.querySelector("#sample-display");

function getWeather(city){
    apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data.weather[0]);
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
    var weatherEl = document.createElement("p");
    weatherEl.textContent = data.weather[0].description;
    var weatherDisplayEl = document.createElement("img");
    weatherDisplayEl.setAttribute("src", "https://openweathermap.org/img/wn/02d@2x.png"); 
    containerEl.appendChild(weatherDisplayEl);
    containerEl.appendChild(weatherEl);
}


//"https://openweathermap.org/img/wn/" + icon "@2x.png"


getWeather(city);


