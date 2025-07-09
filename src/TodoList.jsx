import "./TodoList.css";

function TodoList() {
  const todos = [
    { id: 1, title: "clean kitchen" },
    { id: 2, title: "take notes" },
    { id: 3, title: "feed cat" },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
