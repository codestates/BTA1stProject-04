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
import lotusClients, { Network } from '../services/lotusClients';

interface LotusValue {
  account: string;
  setAccount: (state: string) => void;
  balance: BigNumber | null;
  network: Network;
  setNetwork: (state: Network) => void;
}

const LotusContext = createContext<LotusValue>({
  account: ``,
  setAccount: () => {},
  balance: null,
  network: `mainnet`,
  setNetwork: () => {},
});

const LotusProvider: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [network, setNetwork] = useState<Network>(`mainnet`);

  const loadBalance = useCallback(async () => {
    if (!account) {
      return;
    }

    const b = await lotusClients[network].wallet.balance(account);

    setBalance(new BigNumber(b).dividedBy(1e18));
  }, [account, network]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const value = useMemo(
    () => ({
      account,
      setAccount,
      balance,
      network,
      setNetwork,
    }),
    [account, balance, network],
  );

  return (
    <LotusContext.Provider value={value}>{children}</LotusContext.Provider>
  );
};

export const useLotus = () => useContext(LotusContext);

export default LotusProvider;
