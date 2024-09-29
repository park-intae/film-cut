import { useEffect, useState } from "react";
import SearchBox from './../component/mainSection/SearchBox';
import Today from "../component/mainSection/Today";
import Memo from '../component/bottom/Memo.js';
import TodoList from "../component/bottom/TodoList.js";
import GoogleAuthLogin from "../component/upperSide/GoogleAuthLogin";


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
                        <GoogleAuthLogin />
                    </div>
                    <hr/>
                    <SearchBox />
                    <hr/>
                    <Today />
                    <hr/>
                    <div>
                        <Memo />
                        <hr/>
                        <TodoList />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main