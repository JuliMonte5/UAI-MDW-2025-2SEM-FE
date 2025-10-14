import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/Button";

function App() {
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    setSecond((prev) => prev + 1);
  }, [count]);

  const memoSample = useMemo(() => <div>Hola {count}</div>, [count]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  console.log("render");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>count is {count}</button>
        <Button label={`hola is ${second}`} />
        <Button handleClick={handleClick} label="sum 1" />
        <Button handleClick={() => setCount(5)} label="count to 5" />
        <div>{memoSample}</div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
