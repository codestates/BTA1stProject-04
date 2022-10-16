import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useWallet } from '../providers/WalletProvider';

const Recover = () => {
  const [mnemonicInput, setMnemonicInput] = useState(``);
  const [passwordInput, setPasswordInput] = useState(``);
  const { recover } = useWallet();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    await recover(mnemonicInput, passwordInput);

    navigate(`/`);
  }, [mnemonicInput, navigate, passwordInput, recover]);

  return (
    <Box sx={{ height: `100%` }}>
      <NavBar />
      <Box sx={{ height: `100%`, display: `flex`, flexDirection: `column` }}>
        <Box sx={{ flex: 1, my: 2 }}>
          <FormControl
            sx={{ m: 1, width: `calc(100% - 16px)` }}
            variant="outlined"
          >
            <InputLabel htmlFor="mnemonic-input">니모닉 구문</InputLabel>
            <OutlinedInput
              id="mnemonic-input"
              label="니모닉 구문"
              value={mnemonicInput}
              onChange={(e) => setMnemonicInput(e.target.value)}
              autoComplete="off"
              multiline
              rows={4}
            />
          </FormControl>
          <FormControl
            sx={{ m: 1, width: `calc(100% - 16px)` }}
            variant="outlined"
          >
            <InputLabel htmlFor="password-input">비밀번호 설정</InputLabel>
            <OutlinedInput
              id="password-input"
              label="비밀번호 설정"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoComplete="off"
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
            가져오기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Recover;
