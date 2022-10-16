import { Send } from '@mui/icons-material';
import {
  Box,
  Button,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import NavBar from '../components/NavBar';
import { useLotus } from '../providers/LotusProvider';

const Home = () => {
  const [accountInput, setAccountInput] = useState(``);
  const [copied, setCopied] = useState(false);
  const { account, setAccount, balance } = useLotus();

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
      <Toolbar>
        <TextField
          value={accountInput}
          onChange={(e) => setAccountInput(e.target.value)}
        />
        <Button onClick={() => setAccount(accountInput)}>Load</Button>
      </Toolbar>
      <Box display="flex" justifyContent="center">
        <Tooltip title={copied ? `복사됨` : `클립보드로 복사`} arrow>
          <Button variant="text" onClick={copyToClipboard}>
            {accountDisplay}
          </Button>
        </Tooltip>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
        <Typography variant="h4">{balance?.toFormat(3)} FIL</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button sx={{ flexDirection: `column` }}>
          <Send sx={{ m: 1 }} />
          <Typography>보내기</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
