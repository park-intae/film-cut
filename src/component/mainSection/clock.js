import { useEffect, useState } from "react";
import { timeFormat } from "./util/DateUtil";
import style from "./css/Clock.module.css";

const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const { hour, minu, sec } = timeFormat(date);

    return (
        <div className={`${style.clock} juaRegular`}>
            <div>
                {hour}:{minu}:{sec}
            </div>
        </div>
    );
};

export default Clock;