import "./App.css";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoList/TodoForm.jsx";
import TodosViewForm from "./features/TodoList/TodosViewForm.jsx";
import { useEffect, useState, useCallback } from "react";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  //Main List
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //Sorting and Filtering
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };
      console.log(options);
      try {
        const resp = await fetch(
          encodeUrl(sortField, sortDirection, queryString),
          options
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const response = await resp.json();
        setTodoList(
          response.records.map((record) => {
            console.log(record);
            const todo = {
              id: record.id,
              title: record.title,
              ...record.fields,
            };
            if (!todo.isCompleted) {
              todo.isCompleted = false;
            }
            return todo;
          })
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const encodeUrl = useCallback(() => {
    let searchQuery = "";
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  async function apiCall(method, bodyData) {
    const options = {
      method: method,
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };

    const resp = await fetch(
      encodeUrl(sortField, sortDirection, queryString),
      options
    );

    if (!resp.ok) {
      throw new Error(resp.status);
    }

    return await resp;
  }

  async function addTodo(newTodo) {
    const payload = {
      records: [
        { fields: { title: newTodo.title, isCompleted: newTodo.isCompleted } },
      ],
    };
    console.log(JSON.stringify(payload));

    try {
      setIsSaving(true);
      const resp = await apiCall("POST", payload);

      const { records } = await resp.json();

      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    try {
      const resp = await apiCall("PATCH", payload);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return originalTodo;
        } else {
          return todo;
        }
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      const resp = await apiCall("PATCH", payload);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return originalTodo;
        } else {
          return todo;
        }
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  };

  return (
    <div>
      <div class="title-container">
        <img src="/public/testIcon.png" width="100px" alt="Title Logo" />
        <h1>Todo List</h1>
      </div>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {errorMessage && (
        <div id="error">
          <hr />
          <img
            src="/src/assets/error-icon.png"
            width="50px"
            height="50px"
            alt="Error"
          />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </div>
  );
}

export default App;
