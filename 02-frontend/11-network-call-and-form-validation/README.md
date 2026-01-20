# README

## NOTES

### Get Network Request with JSONPlaceholder

```ts
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<null | User[]>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setUsers(data);
    }

    getData();
  }, []);

  return (
    <main>
      <h1>Network Call and Form Validation</h1>
      <ul>
        {users?.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;

```
