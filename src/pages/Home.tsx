import { Box, Button, TextField, Toolbar, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { HttpJsonRpcConnector, LotusClient } from 'filecoin.js';
import NavBar from '../components/NavBar';

const httpConnector = new HttpJsonRpcConnector({
  url: `https://api.node.glif.io`,
});

const lotusClient = new LotusClient(httpConnector);

const Home = () => {
  const [accountInput, setAccountInput] = useState(``);
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState(`0`);

  const load = useCallback(async () => {
    if (!account) {
      return;
    }

    const b = await lotusClient.wallet.balance(account);

    setBalance(b);
  }, [account]);

  useEffect(() => {
    load();
  }, [load]);

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
      <Typography>Hello, {account}</Typography>
      <Typography>Balance : {balance}</Typography>
    </Box>
  );
};

export default Home;
