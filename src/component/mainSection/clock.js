import { useEffect, useState } from "react";
import { timeFormat } from "./util/DateUtil";

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
        <div>
            <div className="clock">
                {hour}:{minu}:{sec}
            </div>
        </div>
    );
};

export default Clock;