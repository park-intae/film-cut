import { useEffect, useState } from "react";
import axios from "axios";
import weatherDescKo from './util/weatherDescKo';
import styles from './css/Weather.module.css';

function Weather() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const cityName = res.data.name;
        //날씨 한글 설명
        const weatherId = res.data.weather[0].id;
        const weatherKo = weatherDescKo[weatherId];
        //날씨 아이콘 가져오기
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
    <div className={styles.weatherSection}>
      {weather && (
        <div style={{marginTop: '2em'}}>
          <div className={styles.icon}><img src={weather.icon} alt="weather icon" /></div>
          <p className={styles.temperture}>{weather.temp}°C</p>
          <p className={styles.weather}>{weather.description}</p>
          <p className={styles.cityName}>{weather.name}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
