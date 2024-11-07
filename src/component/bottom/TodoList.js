import { useEffect, useState } from "react";
import styles from "./css/TodoList.module.css";

const TodoList = ({ loggedIn, AddTodo, updateLocalStorage }) => {
  // const storageKey = loggedIn ? "todos_logged_in" : "todos_logged_out";
  // const [todos, setTodos] = useState(() => {
  //   const savedTodos = localStorage.getItem(storageKey);
  //   return savedTodos ? JSON.parse(savedTodos) : [];
  // });
  // const [newTodo, setNewTodo] = useState("");

  // useEffect(() => {
  //   localStorage.setItem(storageKey, JSON.stringify(todos));
  // }, [todos, storageKey]);
  const storageKey = loggedIn ? "todos_logged_in" : "todos_logged_out";
  const [todos, setTodos] = useState(() => {
    const savedMemos = localStorage.getItem(storageKey);
    return savedMemos ? JSON.parse(savedMemos) : [];
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  const addTodoHandler = () => {
    if (content.trim() === "") return;
    const updatedTodo = {
      id: Date.now(),
      content,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, updatedTodo]);
    AddTodo(updatedTodo);
    setContent("");
  };

  const completedTodo = (id) => {
    const updatedTodos = todos.map((todo, i) =>
      i === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updateLocalStorage("todos", updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.todo}>
      <h2>Todo List</h2>
      <div className="input-group">
        <input
          className="form-control w-70"
          style={{ borderRadius: "5px 0 0 5px" }}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="새로운 할 일"
        />
        <button className="btn btn-outline-primary" onClick={addTodoHandler}>
          추가
        </button>
      </div>
      <ul className={styles.listUl}>
        {todos.map((todo, id) => (
          <li className={`${styles.listItem} input-group-text`} key={id}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completedTodo(id)}
            />
            <div className={styles.todoList}>
              <span
                className={`${
                  todo.completed ? styles.completed : "" //취소선 표시여부
                }`}
                style={{
                  flexBasis: "70%",
                  flexGrow: "2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {todo.content}
              </span>
            </div>
            <button
              className="btn btn-danger"
              style={{ flexBasis: "10%", flexGrow: "0" }}
              onClick={() => deleteTodo(todo.id)}
            >
              삭제
            </button>
            {/* Memo.js 참고해서 ul내부 css 조정 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
