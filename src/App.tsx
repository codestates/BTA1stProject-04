import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Intro from './pages/Intro';
import Recover from './pages/Recover';
import Send from './pages/Send';
import WalletProvider from './providers/WalletProvider';

const router = createHashRouter([
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: `/intro`,
    element: <Intro />,
  },
  {
    path: `/send`,
    element: <Send />,
  },
  {
    path: `/recover`,
    element: <Recover />,
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
      <WalletProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </WalletProvider>
    </>
  );
};

export default App;
