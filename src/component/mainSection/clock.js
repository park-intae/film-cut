import { useEffect, useState } from "react";
import { timeFormat } from "./DateUtil";

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
            <div>
                {hour}:{minu}:{sec}
            </div>
        </div>
    );
};

export default Clock;