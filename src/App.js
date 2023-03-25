import "./App.css";
import React from "react";

import Rules from "./Rules";
import Game from "./Game";
import About from "./About";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <Rules />,
  },
  {
    path: "/play",
    element: <Game />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
