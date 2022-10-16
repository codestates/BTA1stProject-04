import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Intro = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box
        sx={{
          m: 2,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Filenori에 오신걸 환영합니다!
        </Typography>
        <Box
          sx={{
            m: 3,
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/recover"
            sx={{ m: 1, width: `45%` }}
          >
            지갑 복구
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/create"
            sx={{ m: 1, width: `45%` }}
          >
            지갑 생성
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
