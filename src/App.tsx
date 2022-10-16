import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Intro from './pages/Intro';
import LotusProvider from './providers/LotusProvider';

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

const theme = createTheme({
  typography: {
    fontFamily: `'Noto Sans KR', sans-serif`,
  },
});

const App = () => {
  return (
    <>
      <CssBaseline />
      <LotusProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LotusProvider>
    </>
  );
};

export default App;
