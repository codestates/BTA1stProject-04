import { CssBaseline } from '@mui/material';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Intro from './pages/Intro';

const router = createHashRouter([
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: `/intro`,
    element: <Intro />,
  },
]);

const App = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
