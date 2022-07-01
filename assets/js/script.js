var city = '';
var apiKey = '5ad9ea946b69e95a9e1f81b039026e5a';

function getWeather(city){
    apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json(function(data){
                console.log(data);
            })
        }
    })
}

getWeather("houston");