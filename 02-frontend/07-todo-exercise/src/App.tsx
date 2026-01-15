import { useState } from "react";

interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

type TFilters = "ALL" | "ACTIVE" | "COMPLETED";

const initialTodo: ITodo[] = [
  {
    id: 1,
    title: "Complete Online JavaScript Course",
    isCompleted: true,
    createdAt: new Date("2024-09-12T10:30:00"),
    updatedAt: new Date("2024-10-01T14:45:00"),
  },
  {
    id: 2,
    title: "Build Todo App with TypeScript",
    isCompleted: false,
    createdAt: new Date("2024-11-03T09:15:00"),
    updatedAt: null,
  },
  {
    id: 3,
    title: "Read React Documentation",
    isCompleted: false,
    createdAt: new Date("2024-11-20T20:00:00"),
    updatedAt: null,
  },
];

function App() {
  const [newTodo, setNewTodo] = useState(() => {
    const savedNewTodo = sessionStorage.getItem("newTodo");

    if (savedNewTodo) {
      return JSON.parse(savedNewTodo);
    } else {
      return "";
    }
  });
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return initialTodo;
    }
  });
  const [filter, setFilter] = useState<TFilters>("ALL");
  const [isDark, setIsDark] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") {
      return !todo.isCompleted;
    } else if (filter === "COMPLETED") {
      return todo.isCompleted;
    } else {
      return true;
    }
  });

  function toggleCompleted(id: number) {
    setTodos((previous) => {
      const toggledTodos = previous.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });

      return toggledTodos;
    });
  }

  function removeCompleted() {
    const remainingTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(remainingTodos);
    localStorage.setItem("todos", JSON.stringify(remainingTodos));
  }

  return (
    <main
      className={`${
        isDark ? "dark" : ""
      } bg-white text-black dark:bg-black dark:text-white`}
    >
      {/* Title */}
      <div>
        <h1>TODO</h1>
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "🌞" : "🌛"}
        </button>
      </div>

      {/* Form Add */}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const updatedTodos = [
            ...todos,
            {
              id:
                todos.length > 0
                  ? Math.max(...todos.map((todo) => todo.id)) + 1
                  : 1,
              title: newTodo,
              isCompleted: false,
              createdAt: new Date(),
              updatedAt: null,
            },
          ];

          setTodos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(updatedTodos));

          setNewTodo("");
        }}
      >
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
            sessionStorage.setItem(
              "newTodo",
              JSON.stringify(event.target.value)
            );
          }}
        />
      </form>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <li>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span className={todo.isCompleted ? "line-through" : ""}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>

      {/* Status, Filter, Remove Button */}
      <div>
        <p>{todos.filter((todo) => !todo.isCompleted).length} items left</p>

        <div>
          <button onClick={() => setFilter("ALL")}>All</button>
          <button onClick={() => setFilter("ACTIVE")}>Active</button>
          <button onClick={() => setFilter("COMPLETED")}>Completed</button>
        </div>

        <button onClick={removeCompleted}>Clear Completed</button>
      </div>
    </main>
  );
}

export default App;
