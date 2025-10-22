// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ContactPage from "./pages/contact/index.tsx";
import Layout from "./Layout.tsx";
import AboutPage from "./pages/about/index.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import { FormDemo } from "./pages/FormDemo/FormDemo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
        errorElement: <ErrorPage />,
      },
      {
        path: "contact",
        Component: ContactPage,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        Component: AboutPage,
        errorElement: <ErrorPage />,
      },
      {
        path: "form-demo",
        Component: FormDemo,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
