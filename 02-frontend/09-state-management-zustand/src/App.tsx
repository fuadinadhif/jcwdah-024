import "./App.css";

import Children1 from "./components/Children1";
import Children2 from "./components/Children2";

import { useCounter } from "./store/counter-store";

function App() {
  const { counter, increment, decrement, reset } = useCounter();

  return (
    <main className="container">
      <p>{counter}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>

      <Children1 />
      <Children2 />
    </main>
  );
}

export default App;
