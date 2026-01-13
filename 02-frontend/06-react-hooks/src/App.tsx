import { useEffect, useState } from "react";

function App() {
  // const counterState = useState(0);
  // const counter = counterState[0]; // variable state
  // const setCounter = counterState[1]; // set state function

  const [counter, setCounter] = useState(() => {
    const initialCounter = JSON.parse(localStorage.getItem("counterValue")!);

    if (initialCounter) {
      return initialCounter;
    } else {
      return 0;
    }
  });
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      setPositionX(event.clientX);
      setPositionY(event.clientY);
    });
  }, []);

  return (
    <main>
      <div
        style={{
          position: "fixed",
          top: positionY,
          left: positionX,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      ></div>

      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
          localStorage.setItem("counterValue", JSON.stringify(counter + 1));
        }}
      >
        Increment
      </button>

      <hr />

      {/* {10 > 50 ? <p>True text</p> : <p>False text</p>} */}
      {/* {true && <p>Show some text</p>} */}

      {isTextVisible && <p>Hidden text</p>}
      <button
        onClick={() => {
          setIsTextVisible(true);
        }}
      >
        Show text
      </button>
      <button
        onClick={() => {
          setIsTextVisible(false);
        }}
      >
        Hidden text
      </button>
    </main>
  );
}

export default App;

/* -------------------------------------------------------------------------- */
/*                                    NOTES                                   */
/* -------------------------------------------------------------------------- */
/*
1. useState:
    - Hooks yang kita pakai untuk membuat sebuah state.
    - State adalah memory dari aplikasi kita.
    - Re-render hanya akan terjadi jika ada state yang berubah.
*/

/*
2. useEffect:
    - Hooks yang kita pakai untuk menghandle side effect di dalam sebuah komponen
*/

// Conditional rendering: Menampilkan sebuah element/komponen tergantung sebuah kondisi
