import { useEffect, useState } from "react";
import axios from "axios";
import weatherDescKo from './util/weatherDescKo';

function Weather() {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [ weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);
  
  const getWeather = async(lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
 
      const cityName = res.data.name;
      // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
      const weatherId = res.data.weather[0].id;
      const weatherKo = weatherDescKo[weatherId];
      // 날씨 아이콘 가져오기
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      // 소수점 버리기
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

  return(
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