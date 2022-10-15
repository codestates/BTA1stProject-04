import { CssBaseline } from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Intro from "./pages/Intro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/intro",
    element: <Intro />,
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
