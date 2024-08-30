import React, { useState , useEffect } from "react";
import { timeFormat, dateFormat } from "./util/DateUtil";
import { CoordConverter } from './util/CoordCoverter';

function Weather() {
    const [date, setDate] = useState(new Date());
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const { year, month, day } = dateFormat(date);
    const { hour, minu, sec } = timeFormat(date);

    useEffect(() => {
        const time = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    // 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    setError("위치를 가져올 수 없습니다.");
                }
            );
        } else {
            setError("Geolocation이 지원되지 않습니다.");
        }
    }, []);

    //API호출
    useEffect(() => {
        if(latitude && longitude){
            const fetchWeather = async () => {
                const serviceKey = process.env.REACT_APP_OPEN_DATA_API_KEY;
                const { nx, ny } = CoordConverter(longitude, latitude);
                const baseDate = `${year}${month}${day}`;
                const baseTime = `${hour}${minu}${sec}`; 
                const numOfRows = 10;
                const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=json`;
            
                try{
                    const response = await fetch(url);
                    const data = await response.json();
                    setWeather(data.response.body.items.item);
                } catch (error) {
                    setError("날씨정보를 가져올 수 없습니다.")
                }
            };

            fetchWeather();
        }
    }, [latitude, longitude]);

    return(
        <div>
            <h1>날씨</h1>
            {error && <p>{error}</p>}
            {weather ? (
                <div>
                    {weather.map((item, index) => (
                        <div key={index}>
                            <p>{item.category}: {item.fcstValue}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>데이터 로딩</p>
            )}
        </div>
    )
}

export default Weather;