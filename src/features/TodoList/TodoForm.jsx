import "./TodoForm.css";
import "../../shared/TextInputWithLabel.jsx";
import { useState, useRef } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";

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
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <button disabled={workingTodoTitle == ""}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
