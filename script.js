const key = "bca8bc7162567fa49f5ca4a1ac8a3dec";
let cityId = 683506;

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");




const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);                     //Numarul de zecimale va fi 1.
};
function getCurrentTimestamp () {
    return Date.now()
  }


const getCities = () => {
    fetch('cities.json', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        data.forEach((city) => {
            const option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;
            //If it's Bucharest
            if(city.id === 683506 ){
                option.setAttribute("selected", true);
            }
            select.appendChild(option);
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const getWeather = (cityId = 683506) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
    method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        city.innerText = data.name;
        temp.innerText = kelvinToCelsius(data.main.temp) + "\xB0C";
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherType.innerText = data.weather[0].description;
        if(cityId === 5128581){
            time.innerText = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });       //Nu inteleg de ce nu se schimba ora ...
        }else{
            time.innerText = new Date().toLocaleString();
        };
        wind.innerText = `Wind: ${data.wind.speed} m/s`;
        humidity.innerText = `Humidity: ${data.main.humidity}%`;
        atmp.innerText = `Atmospheric pressure: ${data.main.pressure} hPa`;
        
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
getCities();
getWeather();

select.addEventListener("change", function(e){
    const cityId = e.target.value;
    getWeather(cityId);
})