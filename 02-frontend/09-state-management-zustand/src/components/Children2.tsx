import { useCounter } from "../store/counter-store";

function Children2() {
  const { counter } = useCounter();

  return (
    <div className="container">
      <p>Children 2:</p>
      <p>{counter}</p>
    </div>
  );
}

export default Children2;
