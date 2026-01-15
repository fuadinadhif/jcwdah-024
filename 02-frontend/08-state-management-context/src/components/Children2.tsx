import { useContext } from "react";
import { CounterContext } from "../provider/CounterProvider";

function Children2() {
  const { counter } = useContext(CounterContext);

  return (
    <div className="container">
      <p>Children 2:</p>
      <p>{counter}</p>
    </div>
  );
}

export default Children2;
