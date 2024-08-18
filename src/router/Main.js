import { useEffect, useState } from "react";
import SearchBox from './../component/mainSection/SearchBox';
import Clock from '../component/mainSection/Clock';
import Today from "../component/mainSection/Today";


function Main() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [])
    return (
        <div>
            {loading ? (
                <div>
                    <span>Now Loading...</span>
                </div>
            ) : (
                <div>
                    <div>
                        upperside
                    </div>
                    <Clock />
                    <Today />
                    <SearchBox />
                    <div>
                        Bottom
                    </div>
                </div>
        )}
        </div>
    )
}

export default Main