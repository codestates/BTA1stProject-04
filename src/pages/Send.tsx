import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { enterPassword, useWallet } from '../providers/WalletProvider';

const Send = () => {
  const [receiverInput, setReceiverInput] = useState(``);
  const [amountInput, setAmountInput] = useState(``);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState(``);
  const { send, sendingStatus, resetSendingStatus } = useWallet();
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    setPasswordOpen(true);
    setPasswordInput(``);
  }, []);

  useEffect(() => {
    if (sendingStatus === `done`) {
      navigate(`/`);
      resetSendingStatus();
    }
  }, [navigate, resetSendingStatus, sendingStatus]);

  const runTransaction = useCallback(async () => {
    setPasswordOpen(false);
    enterPassword(passwordInput);
    await send(receiverInput, new BigNumber(amountInput).multipliedBy(1e18));
  }, [amountInput, passwordInput, receiverInput, send]);

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
      <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>
        <DialogTitle>패스워드 입력</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="password"
            fullWidth
            variant="standard"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordOpen(false)}>취소</Button>
          <Button onClick={runTransaction}>보내기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Send;
