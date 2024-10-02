import { useEffect, useState } from "react";
import styles from './Main.module.css';
import { SearchBox, Today } from './../component/mainSection';
import { Memo, TodoList } from './../component/bottom';
import { GoogleAuthLogin } from './../component/upperSide';


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
                    <Today />
                    <button className={styles.circle}>'</button>
                    <button></button>
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