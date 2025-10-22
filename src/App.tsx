import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/Button";
import styles from "./App.module.css";
import { jsonplaceholderInstance } from "./config/axios";

function App() {
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);

  const fetchData = async (url: string) => {
    const response = await jsonplaceholderInstance.put(url);
    console.log(response.data);
  };

  useEffect(() => {
    setSecond((prev) => prev + 1);
  }, [count]);

  useEffect(() => {
    fetchData("/todos/1");
    fetchData("/todos/2");
    fetchData("/posts/1");
    fetchData("/posts/2");
  }, []);

  const memoSample = useMemo(() => <div>Hola {count}</div>, [count]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <h1 className="font-bold text-4xl">Home Page</h1>
      <div className="card">
        <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-300 hover:transition-colors">
          count is {count}
        </button>
        <Button label={`hola is ${second}`} />
        <Button handleClick={handleClick} label="sum 1" />
        <Button handleClick={() => setCount(5)} label="count to 5" />
        <div>{memoSample}</div>
      </div>
      <p className={styles.claseConModule}>Clase con ModuleCss</p>
    </>
  );
}

export default App;
