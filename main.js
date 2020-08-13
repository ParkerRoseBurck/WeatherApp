

// clock image stuff - Web Animations API
const myAnimation = document.getElementById("hands").animate(
    [
        {
            transform: 'rotate(0) ',
        },
        {
            transform: 'rotate(360deg) ',
        },
    ],
    {
        duration: 3000,
        iterations: Infinity,
    }
);

// OpenWeatherMap API
// used https://bithacker.dev/fetch-weather-openweathermap-api-javascript as a resource for how to use the API
let cityInput = document.getElementById('city-input');
let weatherButton = document.getElementById('city-button');

//function that runs when we click the "Get Weather" button
function getWeather(){
    //gets the text value from the input
    let city = cityInput.value;
    document.getElementById('lat').innerHTML = " ";
    document.getElementById('long').innerHTML = " ";
    document.getElementById('description').innerHTML = " ";
    let lat = document.getElementById('lat').textContent;
    let long = document.getElementById('long').textContent;
    let description = document.getElementById('description').textContent;
    let hour = " ";
//function that gets the weather with our api key and city
//then displays it
    
    function weatherBalloon(city) {
        var key = 'c715c9b3ebc21f403deb09b10da2d3be';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
        .then(function(resp) { return resp.json(); }) 
        .then(function(data) {
            drawWeather(data);
        })
        .catch(function() {
        // catch any errors
        alert("Must be a valid city, spelled correctly.")
        });
    }
  
    weatherBalloon(city);
    setTimeout(() => {  
        long = document.getElementById('long').textContent;
        lat = document.getElementById('lat').textContent; 
        console.log("2) " + long + " " + lat);
    }, 1000);
    
    
    function time(long, lat){
        fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=PB1FKIGR9YXR&format=json&by=position&lat=' + lat + '&lng=' + long)
        .then(function(resp){return resp.json();})
        .then(function(data){
            console.log("1) " + long + " " + lat);
            console.log(data);
            drawTime(data);
        })
        .catch(function() {
            // catch any errors

          });
    }
    setTimeout(() => {  
        time(long, lat); 
    }, 1000);

    setTimeout(() => {  
        let date = document.getElementById('time').textContent;
        console.log(date);
        let hourString = date.substring(11,13);
        hour = parseInt(hourString);
        console.log(hour);
        description = document.getElementById('description').textContent;
    }, 2500);

    
   
    setTimeout(() => { 
        
        setWeatherIcon(description, hour); 
    }, 2500);
    
    
}
  
  weatherButton.onclick = getWeather;
  
  //formats and displays all the weather information
  function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('long').innerHTML = d.coord.lon;
    document.getElementById('lat').innerHTML = d.coord.lat;
    long = document.getElementById('long').textContent;
    lat = document.getElementById('lat').textContent;
    description = document.getElementById('description').textContent;
    console.log("3) " + long + " " + lat);
    console.log(description);
	document.getElementById('temp').innerHTML = celcius + '&deg;';
    //document.getElementById('location').innerHTML = d.name;
    
}

function drawTime(data){
    document.getElementById('timezone').innerHTML = data.zoneName;
    document.getElementById('time').innerHTML = data.formatted;
}

function setWeatherIcon(description, hour){
    let icon = document.getElementById('weather-icon');

    console.log("setting icon: " + hour + " " + description);
    if((hour >= 5) && (hour <= 20)){
        switch (description){
            case 'clear sky':
                icon.setAttribute('src', 'img/clearsky-day.jpg');
                break;
            case 'few clouds':
                icon.setAttribute('src', 'img/fewclouds-day.png');
                break;
            case 'scattered clouds':
                icon.setAttribute('src', 'img/scatteredclouds-day.png');
                break;
            case 'broken clouds':
                icon.setAttribute('src', 'img/brokenclouds.png');
                break;
            case 'overcast clouds':
                icon.setAttribute('src', 'img/brokenclouds.png');
                break;
            case 'shower rain':
                icon.setAttribute('src', 'img/showerrain.png');
                break;
            case 'light rain':
                icon.setAttribute('src', 'img/showerrain.png');
                break;
            case 'rain':
                icon.setAttribute('src', 'img/rain.png');
                break;
            case 'moderate rain':
                icon.setAttribute('src', 'img/rain.png');
                break;
            case 'thunderstorm':
                icon.setAttribute('src', 'img/thunderstorm.png');
                break;
            case 'snow':
                icon.setAttribute('src', 'img/snow.png');
                break;
            case 'mist':
                icon.setAttribute('src', 'img/mist-day.png');
                break;
        }
    }else{
        switch (description){
            case 'clear sky':
                icon.setAttribute('src', 'img/clearsky-night.png');
                break;
            case 'few clouds':
                icon.setAttribute('src', 'img/fewclouds-night.png');
                break;
            case 'scattered clouds':
                icon.setAttribute('src', 'img/fewclouds-night.png');
                break;
            case 'broken clouds':
                icon.setAttribute('src', 'img/brokenclouds.png');
                break;
            case 'overcast clouds':
                icon.setAttribute('src', 'img/brokenclouds.png');
                break;
            case 'shower rain':
                icon.setAttribute('src', 'img/showerrain.png');
                break;
            case 'light rain':
                icon.setAttribute('src', 'img/showerrain.png');
                break;
            case 'rain':
                icon.setAttribute('src', 'img/rain.png');
                break;
            case 'moderate rain':
                icon.setAttribute('src', 'img/rain.png');
                break;
            case 'thunderstorm':
                icon.setAttribute('src', 'img/thunderstorm.png');
                break;
            case 'snow':
                icon.setAttribute('src', 'img/snow.png');
                break;
            case 'mist':
                icon.setAttribute('src', 'img/mist-night.png');
                break;
        }
    }
}

