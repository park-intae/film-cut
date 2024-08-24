import { useEffect } from "react";
import { dateFormat, timeFormat } from "./DateUtil";
import LatlonToXY from './LatlonToXY';

const API_KEY = process.env.REACT_APP_API_KEY;
const time = timeFormat(date) - 30;
const date = dateFormat(date); 
// time,date 나중에 네 자리,여덟자리 숫자로 표기되도록 바꿔야됨
const URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
const {x , y} = LatlonToXY();

useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeather(lat, lon);
    });
},[]);

const getWeather = async(lat,lon) => {
    try{
        const res = await axios.get(URL, {
            param: {
                serviceKey : 'p4KFG0gAnkZNNQO2J1dVvJNqJmVaPA7X2e3ro1jntb%2BMXHiYnbxUar6QenJ6eW5NfZkWoGUCt3vIxOBaOzHCFQ%3D%3D',
                pageNo : '1',
                base_date : {date},
                base_time : {time},
                nx : {},
                ny : {},
            }
        }
        )
    } catch (err) {
        console.error(err);
    }
}