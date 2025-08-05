import "./TodoForm.css";
import { useState, useRef } from "react";

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef("");
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={todoTitleInput}
        name="title"
        id="todoTitle"
        type="text"
        placeholder="Learn React..."
      />
      <button disabled={workingTodoTitle == ""}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
