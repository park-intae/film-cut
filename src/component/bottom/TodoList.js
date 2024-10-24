import { useEffect, useState } from "react";
import styles from "./css/TodoList.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const completedTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deletTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todo}>
      <h2>Todo List</h2>
      <div className="input-group">
        <input
          className="form-control w-70"
          style={{ borderRadius: "5px 0 0 5px" }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일"
        />
        <button className="btn btn-outline-primary" onClick={addTodo}>
          추가
        </button>
      </div>
      <ul className={styles.listUl}>
        {todos.map((todo, index) => (
          <li className={`${styles.listItem} input-group-text`} key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completedTodo(index)}
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
                {todo.text}
              </span>
            </div>
            <button
              className="btn btn-danger"
              style={{ flexBasis: "10%", flexGrow: "0" }}
              onClick={() => deletTodo(index)}
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
