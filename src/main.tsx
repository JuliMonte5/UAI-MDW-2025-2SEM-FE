// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { FormDemo } from "./pages/FormDemo/FormDemo.tsx";

createRoot(document.getElementById("root")!).render(<FormDemo />);
