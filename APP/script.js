const apiKey = '8ccb1d15ee2f72f691c0bd9b7873c7c9';

async function getWeather(city) {
    try {
        // Fetch data from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        // Display error message in weather-info div
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`;
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    if (weatherIcon) {
        // Update the weather icon
        const iconCode = data.weather[0].icon; // Weather icon code
        weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = 'block'; // Ensure the icon is visible
    } else {
        console.warn('Weather icon element not found in the DOM.');
    }

    // Update the weather information
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p><i class="fas fa-temperature-high"></i> Temperature: ${data.main.temp} °C</p>
        <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
        <p><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
