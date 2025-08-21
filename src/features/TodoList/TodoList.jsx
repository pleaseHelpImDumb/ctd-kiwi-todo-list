import "./TodoList.css";
import TodoListItem from "./TodoListItem.jsx";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => {
    return !todo.isCompleted;
  });

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onUpdateTodo={onUpdateTodo}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
