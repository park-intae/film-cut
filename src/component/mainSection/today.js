import { useEffect, useState } from "react";

const Today = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const time = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    //date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return (
        <div>
            <div>
                {year}년 {month}월 {day}일
            </div>
        </div>
    )
}

export default Today;