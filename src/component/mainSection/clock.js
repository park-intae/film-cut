import { useEffect, useState } from "react";

const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 시, 분, 초 2자리로 포맷팅
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return (
        <div>
            <div>
                {hour}:{minutes}:{seconds}
            </div>
        </div>
    );
};

export default Clock;