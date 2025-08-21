document.addEventListener('DOMContentLoaded',()=>{
    cityInput = document.getElementById("city-input")
    getWeatherBtn = document.getElementById("get-weather-btn")
    weatherInfo = document.getElementById("weather-info")
    cityNameDisplay = document.getElementById("city-name")
    tempDisplay = document.getElementById("temperature")
    descDisplay = document.getElementById("description")
    errorMsg = document.getElementById("error-message")
     
    const API_KEY = "7e22c0f1dc7ab7ffe4a516e0dc041e5a";

    getWeatherBtn.addEventListener('click',async ()=>{
        const city = cityInput.value.trim()
        if (!city) return;

        try {
           const weatherData =  await fetchWeatherData(city)
           displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url)
        console.log(typeof response);
        console.log("RESPONSE", response);
        
        if(!response.ok){
            throw new Error("City not found");  
        }

        const data = await response.json()
        return data;
        
    }

    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;

        weatherInfo.classList.remove('hidden');     //unhide the weather display 
        errorMsg.classList.add('hidden');

        tempDisplay.textContent = `Temperature: ${main.temp}`;
        descDisplay.textContent = `Weather: ${weather[0].description}`
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMsg.classList.remove('hidden')
    }
})