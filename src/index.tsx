import React from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Register from "./routes/register";
import Welcome from "./routes/welcome";
import { store } from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
