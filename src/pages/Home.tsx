import { Send } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useWallet } from '../providers/WalletProvider';

const Home = () => {
  const [copied, setCopied] = useState(false);
  const { account, balance } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate(`/intro`);
    }
  }, [account, navigate]);

  const accountDisplay = useMemo(() => {
    if (!account) {
      return ``;
    }
    return `${account.substring(0, 5)}...${account.substring(
      account.length - 5,
    )}`;
  }, [account]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [account]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box sx={{ my: 2, display: `flex`, justifyContent: `center` }}>
        <Tooltip title={copied ? `복사됨` : `클립보드로 복사`} arrow>
          <Button
            variant="text"
            onClick={copyToClipboard}
            sx={{ textTransform: `none` }}
          >
            {accountDisplay}
          </Button>
        </Tooltip>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
        <Typography variant="h4">{balance?.toFormat(3)} FIL</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button component={Link} to="/send" sx={{ flexDirection: `column` }}>
          <Send sx={{ m: 1 }} />
          <Typography>보내기</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
