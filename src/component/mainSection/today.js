import { useEffect, useState } from "react";
import { dateFormat } from "./DateUtil";

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
        </div>
    )
}

export default Today;