import BigNumber from 'bignumber.js';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import lotusClient from '../services/lotusClient';

interface LotusValue {
  account: string;
  setAccount: (state: string) => void;
  balance: BigNumber | null;
}

const LotusContext = createContext<LotusValue>({
  account: ``,
  setAccount: () => {},
  balance: null,
});

const LotusProvider: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState<BigNumber | null>(null);

  const loadBalance = useCallback(async () => {
    if (!account) {
      return;
    }

    const b = await lotusClient.wallet.balance(account);

    setBalance(new BigNumber(b).dividedBy(1e18));
  }, [account]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const value = useMemo(
    () => ({
      account,
      setAccount,
      balance,
    }),
    [account, balance],
  );

  return (
    <LotusContext.Provider value={value}>{children}</LotusContext.Provider>
  );
};

export const useLotus = () => useContext(LotusContext);

export default LotusProvider;
