import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { observeUser } from "./features/authSlice";
import { Login } from "./features/login/Login";
import { Register } from "./features/register/register";
import Layout from "./Layout";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import { FormDemo } from "./pages/FormDemo";
import ReduxDemoPage from "./pages/redux-demo";
import type { AppDispatch } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
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
      {
        path: "redux-demo",
        Component: ReduxDemoPage,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const AppWithObserver = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(observeUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
