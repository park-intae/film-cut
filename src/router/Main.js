import { useEffect, useState } from "react";
import styles from './Main.module.css';
import { SearchBox, Today } from './../component/mainSection';
import { Memo, TodoList } from './../component/bottom';
import { GoogleAuthLogin } from './../component/upperSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPen, faBars } from '@fortawesome/free-solid-svg-icons';


function Main() {
    const [loading, setLoading] = useState(true);
    const flexCenter = { justifyContent: 'center'};
    const flexEnd = { justifyContent: 'flex-end'};
    const flexAlign = { alignItems: 'center'};

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
                        <div><GoogleAuthLogin /></div>
                    </div>
                    <hr />
                    <div className={styles.divFlex} style={{ ...flexCenter, ...flexAlign }}>
                        <SearchBox />
                        <button className={styles.circle}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <Today />
                    <div className={styles.divFlex} style={flexEnd}>
                        <button className={styles.circle}><FontAwesomeIcon icon={faPen} /></button>
                        <button className={styles.circle}><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                    <hr />
                    <div>
                        <Memo />
                        <hr />
                        <TodoList />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main