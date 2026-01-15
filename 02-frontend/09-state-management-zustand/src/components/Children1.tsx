import { useCounter } from "../store/counter-store";

function Children1() {
  return (
    <div className="container">
      <p>Children1:</p>

      <GrandChildren1 />
    </div>
  );
}

function GrandChildren1() {
  const { counter } = useCounter();

  return (
    <div className="container">
      <p>Grand Children 1:</p>
      <p>{counter}</p>
    </div>
  );
}

export default Children1;
