import { useEffect, useState } from "react";
import SearchBox from './../component/mainSection/SearchBox';
import Clock from '../component/mainSection/Clock';
import Today from "../component/mainSection/Today";
import Memo from './../component/bottom/Memo/Memo';


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
                        upperSide
                    </div>
                    <Clock />
                    <Today />
                    <SearchBox />
                    <div>
                        <Memo />
                    </div>
                </div>
        )}
        </div>
    )
}

export default Main