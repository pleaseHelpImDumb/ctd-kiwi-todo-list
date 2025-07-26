import "./TodoList.css";
import TodoListItem from "./TodoListItem.jsx";

function TodoList() {
  const todos = [
    { id: 1, title: "clean kitchen" },
    { id: 2, title: "take notes" },
    { id: 3, title: "feed cat" },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} title={todo.title}></TodoListItem>
      ))}
    </ul>
  );
}

export default TodoList;
