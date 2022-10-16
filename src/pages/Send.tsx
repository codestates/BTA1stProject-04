import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useWallet } from '../providers/WalletProvider';

const Send = () => {
  const [receiverInput, setReceiverInput] = useState(``);
  const [amountInput, setAmountInput] = useState(``);
  const { send, sendingStatus, resetSendingStatus } = useWallet();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    await send(receiverInput, new BigNumber(amountInput).multipliedBy(1e18));
  }, [amountInput, receiverInput, send]);

  useEffect(() => {
    if (sendingStatus === `done`) {
      navigate(`/`);
      resetSendingStatus();
    }
  }, [navigate, resetSendingStatus, sendingStatus]);

  return (
    <>
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
                endAdornment={
                  <InputAdornment position="end">FIL</InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ m: 1, width: `calc(100% - 16px)` }}
              onClick={onSubmit}
            >
              보내기
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={sendingStatus === `pending`}>
        <DialogTitle>트랜잭션 진행중...</DialogTitle>
        <DialogContent sx={{ display: `flex`, justifyContent: `center` }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Send;
