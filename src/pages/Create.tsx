import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useWallet } from '../providers/WalletProvider';

const Create = () => {
  const [step, setStep] = useState(1);
  const [passwordInput, setPasswordInput] = useState(``);
  const [passwordInputConfirm, setPasswordInputConfirm] = useState(``);
  const [mnemonicInput, setMnemonicInput] = useState(``);
  const [mnemonic, setMnemonic] = useState(``);
  const [disabled, setDisabled] = useState(true);
  const { create, recover } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 1) {
      if (passwordInput.length >= 8 && passwordInput === passwordInputConfirm) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    } else if (step === 2) {
      setDisabled(false);
    } else if (step === 3) {
      if (!!mnemonicInput && mnemonicInput === mnemonic) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    }
  }, [step, passwordInput, passwordInputConfirm, mnemonicInput, mnemonic]);

  const onSubmit = useCallback(async () => {
    if (step === 1) {
      setMnemonic(await create(passwordInput));
      setDisabled(false);
      setStep(2);
    } else if (step === 2) {
      setDisabled(true);
      setStep(3);
    } else if (step === 3) {
      setMnemonic(``);
      setDisabled(true);
      alert(`지갑 생성이 완료되었습니다.`);
      await recover(mnemonic, passwordInput);
      navigate(`/`);
    }
  }, [step, create, recover, mnemonic, passwordInput, navigate]);

  const titleComponent = {
    1: `비밀번호 설정`,
    2: `니모닉 확인`,
    3: `니모닉 입력`,
  };

  const mainBoxComponent = {
    1: (
      <Box sx={{ flex: 1, my: 2 }}>
        <FormControl
          sx={{ m: 1, width: `calc(100% - 16px)` }}
          variant="outlined"
        >
          <InputLabel htmlFor="password-input">
            새 비밀번호 (8자 이상)
          </InputLabel>
          <OutlinedInput
            id="password-input"
            label="새 비밀번호 (8자 이상)"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: `calc(100% - 16px)` }}
          variant="outlined"
        >
          <InputLabel htmlFor="password-input">비밀번호 확인</InputLabel>
          <OutlinedInput
            id="password-input"
            label="비밀번호 확인"
            type="password"
            value={passwordInputConfirm}
            onChange={(e) => setPasswordInputConfirm(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
      </Box>
    ),
    2: (
      <Box
        sx={{
          m: 2,
          p: 2,
          height: `150px`,
          border: `1px dashed black`,
          borderRadius: `30px`,
        }}
      >
        {mnemonic}
      </Box>
    ),
    3: (
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
      </Box>
    ),
  };

  return (
    <Box sx={{ height: `100%` }}>
      <NavBar />
      <Box sx={{ m: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {titleComponent[step as keyof typeof titleComponent]}
        </Typography>
        <Box
          sx={{
            height: `100%`,
            display: `flex`,
            flexDirection: `column`,
          }}
        >
          {mainBoxComponent[step as keyof typeof mainBoxComponent]}
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ m: 1, width: `calc(100% - 16px)` }}
              onClick={onSubmit}
              disabled={!!disabled}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
