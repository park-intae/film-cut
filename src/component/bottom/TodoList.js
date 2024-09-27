import { useState } from "react"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim () !== "") {
            setTodos([...todos, {text : newTodo, completed: false}]);
            setNewTodo("");
        }
    };

    const handleCompletedTodo = (index) => {
        const updatedTodos = todos.map((todo,i) =>
        i === index ? {...todo, completed: !todo.completed} : todo);
        setTodos(updatedTodos);
    };

    const handleDeletTodo = (index) => {
        const updatedTodos = todos.tilter((_,i) => i !== index);
        setTodos(updatedTodos);
    }

    return(
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="새로운 할 일"
            />
            <button onClick={handleAddTodo}>추가</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.text}
                        <button onClick={() => handleCompletedTodo(index)}>
                            {todo.completed ? "Undo" : "complete"}
                        </button>
                        <button onClick={() => handleDeletTodo(index)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;