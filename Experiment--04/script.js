
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
let weatherChart;

const getWeather = async () => {
    const city = document.getElementById("city").value.trim();
    const output = document.getElementById("weather");

    if (!city) {
        output.textContent = "Please enter a city name.";
        return;
    }

    if (apiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
        output.textContent = "Add your OpenWeatherMap API key in script.js first.";
        return;
    }

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather.");
        }

        output.textContent =
            `Weather in ${data.city.name}: ${data.list[0].main.temp}°C, ` +
            `${data.list[0].weather[0].description}`;

        const dailyData = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        const labels = dailyData.map(item =>
            item.dt_txt.slice(0, 10)
        );

        const temperatures = dailyData.map(item =>
            item.main.temp
        );

        if (weatherChart) {
            weatherChart.destroy();
        }

        weatherChart = new Chart(
            document.getElementById("weatherChart"),
            {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Temperature (°C)",
                        data: temperatures,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
};
