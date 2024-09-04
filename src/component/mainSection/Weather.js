import { useEffect, useState } from "react";
import axios from "axios";
import weatherDescKo from './util/weatherDescKo';

function Weather() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  console.log("API Key:", API_KEY);

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const cityName = res.data.name;
        const weatherId = res.data.weather[0].id;
        const weatherKo = weatherDescKo[weatherId];
        const weatherIcon = res.data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const temp = Math.round(res.data.main.temp);

        setWeather({
          description: weatherKo,
          name: cityName,
          temp: temp,
          
          icon: weatherIconAdrs,
        });
      } catch (err) {
        console.error(err);
      }
    };

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, [API_KEY]);

  return (
    <div>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.description}</p>
          <p>{weather.temp}°C</p>
          <img src={weather.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}

export default Weather;
