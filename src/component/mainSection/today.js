import { useEffect, useState } from "react";
import { dateFormat } from "./util/DateUtil";
import Weather from "./Weather";

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
        <div>
            <div>
                {year}년 {month}월 {day}일
            </div>
            <div>
                <Weather/>
            </div>
        </div>
    )
}

export default Today;