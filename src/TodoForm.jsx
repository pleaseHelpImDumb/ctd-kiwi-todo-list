import "./TodoForm.css";

function TodoForm() {
  return (
    <form action="">
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" type="text" placeholder="Learn React..." />
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
