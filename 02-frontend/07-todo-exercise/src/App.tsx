import { useState } from "react";

interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

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
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(initialTodo);

  return (
    <main>
      <div>
        <h1>TODO</h1>
        <button>🌙</button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setTodos([
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
          ]);
        }}
      >
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
        />
      </form>

      <ul>
        {todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
