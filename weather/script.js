const apiKey = "7b768227b5edf8cb5a1081ed9b9abc0a"; // Replace with your OpenWeatherMap API key

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city").textContent = data.name;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => console.error(error));
}

document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("location-input").value;
    getWeather(city);
});

document.getElementById("current-location-button").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        getWeather(data.name);
                    })
                    .catch(error => console.error(error));
            },
            error => {
                console.error("Error getting current location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});