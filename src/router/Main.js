import { useEffect, useState } from "react";
import { Today } from './../component/mainSection';
import { Memo, TodoList } from './../component/bottom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import styles from './Main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBox from './../component/mainSection/SearchBox';

import {
    faRightFromBracket,
    faRightToBracket,
    faPen,
    faBars
} from '@fortawesome/free-solid-svg-icons';

// grid 스타일
const gridCenter = {
    display: 'grid',
    placeItems: 'center',
    gridTemplateRows: '0.5fr 3fr',
};

const flexEnd = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
};

function Main() {
    const [loading, setLoading] = useState(true);
    const [modalActive, setModalActive] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [memo, setMemo] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setLoggedIn(true);
            const savedMemo = localStorage.getItem('memo');
            if (savedMemo) setMemo(savedMemo);

            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) setTodos(JSON.parse(savedTodos));
        }

        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const updateLocalStorage = (key, value) => {
        if (loggedIn) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    const addMemo = (newMemo) => {
        setMemo(newMemo);
        updateLocalStorage('memo', newMemo);
    };

    const addTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        updateLocalStorage('todos', updatedTodos);
    };

    const login = useGoogleLogin({
        onSuccess: (response) => {
            console.log('Login Successful:', response);

            localStorage.setItem('user', JSON.stringify({ name: 'User' }));
            setLoggedIn(true);
        },
        onError: () => {
            console.log('Login Failed');
        }
    });

    const modalOpen = (modal) => {
        setModalActive(modal);
        console.log('modal is opened');
    };

    const modalClose = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            setModalActive(null);
            console.log('modal is closed');
        }
    };

    const handleLogin = () => login();
    const handleLogout = () => {
        setLoggedIn(false);
        googleLogout();
        localStorage.removeItem('user');
        console.log('logged out');
    };

    return (
        <>
            <div className={styles.gridContainer}>
                {loading ? (
                    <div><span>Now Loading...</span></div>
                ) : (
                    <>
                        {/* Header */}
                        <div style={{ gridArea: 'header', ...flexEnd }}>
                            <button className={styles.circle} onClick={loggedIn ? handleLogout : handleLogin}>
                                {loggedIn ? <FontAwesomeIcon icon={faRightFromBracket} /> : <FontAwesomeIcon icon={faRightToBracket} />}
                            </button>
                        </div>

                        {/* 메인 콘텐츠 */}
                        <div style={{ gridArea: 'main', ...gridCenter }}>
                            <SearchBox />
                            <Today />
                        </div>

                        {/* 버튼 부분 */}
                        <div style={{ gridArea: 'button', ...flexEnd }}>
                            <button className={styles.circle} onClick={() => modalOpen('memo')}><FontAwesomeIcon icon={faPen} /></button>
                            <button className={styles.circle} onClick={() => modalOpen('todo')}><FontAwesomeIcon icon={faBars} /></button>
                        </div>
                    </>
                )}
            </div>

            {/* 모달은 gridContainer 밖에서 렌더링 */}
            {modalActive && (
                <div className={`modal-overlay ${styles.modalOverlay}`} onClick={modalClose}>
                    <div className={styles.modal}>
                        {modalActive === 'memo' ? (
                            <Memo memo={memo} AddMemo={addMemo} loggedIn={loggedIn} />
                        ) : (
                            <TodoList todos={todos} AddTodo={addTodo} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Main;
