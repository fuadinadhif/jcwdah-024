import "./App.css";

import { useContext } from "react";
import { CounterContext } from "./provider/CounterProvider";

import Children1 from "./components/Children1";
import Children2 from "./components/Children2";

function App() {
  const { counter, setCounter } = useContext(CounterContext);

  return (
    <main className="container">
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>

      <Children1 />
      <Children2 />
    </main>
  );
}

export default App;
