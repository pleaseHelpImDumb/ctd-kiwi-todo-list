import "./TodoForm.css";

function TodoForm() {
  return (
    <form action="">
      <label htmlFor="todoTitle">To-Do!</label>
      <input id="todoTitle" type="text" placeholder="Learn React..." />
      <button>Add To-Do!</button>
    </form>
  );
}

export default TodoForm;
