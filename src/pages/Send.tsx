import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import NavBar from '../components/NavBar';

const Send = () => {
  const [receiver, setReceiver] = useState(``);
  const [receiverInput, setReceiverInput] = useState(``);
  const [amount, setAmount] = useState(``);
  const [amountInput, setAmountInput] = useState(``);

  return (
    <Box sx={{ height: `100%` }}>
      <NavBar />
      <Box sx={{ height: `100%`, display: `flex`, flexDirection: `column` }}>
        <Box sx={{ flex: 1, my: 2 }}>
          <FormControl
            sx={{ m: 1, width: `calc(100% - 16px)` }}
            variant="outlined"
          >
            <InputLabel htmlFor="receiver-input">보낼 대상</InputLabel>
            <OutlinedInput
              id="receiver-input"
              label="보낼 대상"
              value={receiverInput}
              onChange={(e) => setReceiverInput(e.target.value)}
            />
          </FormControl>
          <FormControl
            sx={{ m: 1, width: `calc(100% - 16px)` }}
            variant="outlined"
          >
            <InputLabel htmlFor="amount-input">금액</InputLabel>
            <OutlinedInput
              id="amount-input"
              label="금액"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              endAdornment={<InputAdornment position="end">FIL</InputAdornment>}
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1, width: `calc(100% - 16px)` }}
          >
            보내기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Send;
