import { useEffect, useState } from "react";
import { dateFormat } from "./util/DateUtil";
import Weather from "./Weather";
import Clock from './Clock';
import styles from './css/Today.module.css';
import SearchBox from './SearchBox'
const Today = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const time = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    const {year, month, day} = dateFormat(date);

    return (
        <div className={styles.mainSection}>
            <SearchBox />
            <div className={styles.date}>
                {year}년 {month}월 {day}일
            </div>
            <Clock/>
            <div style={{marginBottom : '2em'}}>
                <Weather/>
            </div>
        </div>
    )
}

export default Today;