import React, { useState } from "react";
import { createContext } from "react";

interface ICounterContext {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const CounterContext = createContext<null | ICounterContext>(null);

function CounterProvider(props: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;
