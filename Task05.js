document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const locationUrl = `https://geocode.maps.co/search?q=${location}`;

    fetch(locationUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('Location not found');
            }
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            return fetch(weatherUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = `
                <h2>${data.current_weather.temperature} °C</h2>
                <p>Weather: ${data.current_weather.weathercode}</p>
                <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
        });
});
