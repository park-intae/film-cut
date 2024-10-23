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
          <li className="input-group-text" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completedTodo(index)}
            />
            <span
              className={`${styles.todoList} ${
                todo.completed ? styles.completed : "" //취소선 표시여부
              }`}
            >
              {todo.text}
            </span>
            <button className="btn btn-danger" onClick={() => deletTodo(index)}>삭제</button>
            {/* Memo.js 참고해서 ul내부 css 조정 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
