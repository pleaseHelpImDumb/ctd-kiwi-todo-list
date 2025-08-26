import "./TodoForm.css";
import "../../shared/TextInputWithLabel.jsx";
import { useState, useRef } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef("");
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();

    const newTodo = {
      title: workingTodoTitle,
      isCompleted: false,
    };

    onAddTodo(newTodo);

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
      <button disabled={workingTodoTitle == ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
