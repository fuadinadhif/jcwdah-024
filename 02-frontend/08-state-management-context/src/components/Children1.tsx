import { useContext } from "react";
import { CounterContext } from "../provider/CounterProvider";

function Children1() {
  return (
    <div className="container">
      <p>Children1:</p>

      <GrandChildren1 />
    </div>
  );
}

function GrandChildren1() {
  const { counter } = useContext(CounterContext);

  return (
    <div className="container">
      <p>Grand Children 1:</p>
      <p>{counter}</p>
    </div>
  );
}

export default Children1;
