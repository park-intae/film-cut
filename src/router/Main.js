import { useEffect, useState } from "react";
import { Today } from "./../component/mainSection";
import { Memo, TodoList } from "./../component/bottom";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "./../component/mainSection/SearchBox";
import Login from "./../component/upperSide/Login";

import { faPen, faBars } from "@fortawesome/free-solid-svg-icons";

// grid 스타일
const gridCenter = {
  display: "grid",
  placeItems: "center",
  gridTemplateRows: "0.5fr 3fr",
};

const flexEnd = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

function Main() {
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [memo, setMemo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      // 로그인된 상태
      setLoggedIn(true);
      const savedMemo = localStorage.getItem("memo_logged_in");
      if (savedMemo) setMemo(JSON.parse(savedMemo));

      const savedTodos = localStorage.getItem("todos_logged_in");
      if (savedTodos) setTodos(JSON.parse(savedTodos));
    } else {
      // 로그아웃된 상태
      const savedMemo = localStorage.getItem("memo_logged_out");
      if (savedMemo) setMemo(JSON.parse(savedMemo));

      const savedTodos = localStorage.getItem("todos_logged_out");
      if (savedTodos) setTodos(JSON.parse(savedTodos));
    }

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const updateLocalStorage = (key, value) => {
    const storageKey = loggedIn ? `${key}_logged_in` : `${key}_logged_out`;
    localStorage.setItem(storageKey, JSON.stringify(value));
  };

  const addMemo = (newMemo) => {
    setMemo(newMemo);
    updateLocalStorage("memo", newMemo);
    console.log("updateLoclaStorage 실행");
  };

  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updateLocalStorage("todos", updatedTodos);
    console.log("updateLoclaStorage 실행");
  };

  const modalOpen = (modal) => {
    setModalActive(modal);
    console.log("modal is opened");
  };

  const modalClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setModalActive(null);
      console.log("modal is closed");
    }
  };

  return (
    <>
      <div className={styles.gridContainer}>
        {loading ? (
          <div>
            <span>Now Loading...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ gridArea: "header", ...flexEnd }}>
              <div style={{ width: "8em", ...flexEnd }}>
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div style={{ gridArea: "main", ...gridCenter }}>
              <SearchBox />
              <Today />
            </div>

            {/* 버튼 부분 */}
            <div style={{ gridArea: "button", ...flexEnd }}>
              <button
                className={styles.circle}
                onClick={() => modalOpen("memo")}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className={styles.circle}
                onClick={() => modalOpen("todo")}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 모달은 gridContainer 밖에서 렌더링 */}
      {modalActive && (
        <div
          className={`modal-overlay ${styles.modalOverlay}`}
          onClick={modalClose}
        >
          <div className={styles.modal}>
            {modalActive === "memo" ? (
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
