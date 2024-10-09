import { useEffect, useState } from "react"
import styles from './css/TodoList.module.css';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');

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
            i === index ? { ...todo, completed: !todo.completed } : todo);
        setTodos(updatedTodos);
    };

    const deletTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

    return (
        <div className={styles.todo}>
            <h2>Todo List</h2>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="새로운 할 일"
            />
            <button onClick={addTodo}>추가</button>
            <ul className={styles.listUl}>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span className={`${styles.todoList} ${todo.completed ? '' : styles.completed}`}>{todo.text}</span>
                        <button onClick={() => completedTodo(index)}>
                            {todo.completed ? "Undo" : "complete"}
                        </button>
                        <button onClick={() => deletTodo(index)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;