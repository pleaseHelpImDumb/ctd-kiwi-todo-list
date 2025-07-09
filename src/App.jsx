import "./App.css";

function App() {
  const todos = [
    { id: 1, title: "clean kitchen" },
    { id: 2, title: "take notes" },
    { id: 3, title: "feed cat" },
  ];

  return (
    <div>
      <h1>My todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
