
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [message, setMessage] = useState("");

  async function getWeather(e) {
    e.preventDefault();
    setMessage("Loading weather...");
    setWeather(null);
    setForecast([]);

    try {
      const placeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const placeData = await placeResponse.json();

      if (!placeData.results || placeData.results.length === 0) {
        setMessage("City not found. Try another city.");
        return;
      }

      const place = placeData.results[0];

      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}` +
        `&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m` +
        `&hourly=temperature_2m&forecast_days=1`;

      const response = await fetch(url);
      const data = await response.json();

      setWeather({
        city: place.name,
        country: place.country,
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m
      });

      setForecast(
        data.hourly.time.map((time, index) => ({
          time: time.slice(11, 16),
          temperature: data.hourly.temperature_2m[index]
        }))
      );

      setMessage("");
    } catch (error) {
      setMessage("Unable to fetch weather. Check your internet connection.");
    }
  }

  const chartData = {
    labels: forecast.map((item) => item.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((item) => item.temperature),
        borderColor: "blue",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="container">
      <h1>React Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {message && <p>{message}</p>}

      {weather && (
        <section>
          <h2>{weather.city}, {weather.country}</h2>
          <p>Current Temperature: {weather.temperature} °C</p>
          <p>Humidity: {weather.humidity}%</p>
          <h3>Today's Hourly Temperature Forecast</h3>
          <Line data={chartData} />
        </section>
      )}
    </div>
  );
}
