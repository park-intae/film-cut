import { useEffect, useState } from "react";
import { dateFormat } from "./util/DateUtil";
import Weather from "./Weather";
import Clock from './Clock';
import styles from './css/Today.module.css';

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
            <div className={`${styles.date} juaRegular`}>
                {year}년 {month}월 {day}일
            </div>
            <Clock/>
            <div>
                <Weather/>
            </div>
        </div>
    )
}

export default Today;