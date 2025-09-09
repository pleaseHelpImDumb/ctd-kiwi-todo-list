import "./TodoForm.css";
import "../../shared/TextInputWithLabel.jsx";
import { useState, useRef } from "react";
import styled from "styled-components";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
    color: #cb904d;
    background-color: #573d1c;
  }
`;

const StyledForm = styled.form`
  padding: 20px;
  margin: 20px;  
`;


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
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <StyledButton disabled={workingTodoTitle == ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
