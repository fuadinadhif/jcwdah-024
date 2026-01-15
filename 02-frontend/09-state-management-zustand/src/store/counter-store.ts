import { create } from "zustand";

interface IState {
  counter: number;
}

export const useCounter = create((set) => {
  return {
    // state counter
    counter: 0,

    // first operation - increment
    increment: () =>
      set((state: IState) => {
        return { counter: state.counter + 1 };
      }),

    decrement: () => set((state: IState) => ({ counter: state.counter - 1 })),

    reset: () => set(() => ({ counter: 0 })),
  };
});
