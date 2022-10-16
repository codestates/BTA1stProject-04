import BigNumber from 'bignumber.js';
import { LightWalletProvider } from 'filecoin.js';
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

interface WalletValue {
  account: string;
  balance: BigNumber | null;
  network: Network;
  setNetwork: (state: Network) => void;
  create: LightWalletProvider['createLightWallet'];
  recover: LightWalletProvider['recoverLightWallet'];
}

const mainnetProvider = new LightWalletProvider(lotusClients.mainnet, () =>
  console.log(`pwdcallback`),
);

const testnetProvider = new LightWalletProvider(lotusClients.testnet, () =>
  console.log(`pwdcallback`),
);

const WalletContext = createContext<WalletValue>({
  account: ``,
  balance: null,
  network: `mainnet`,
  setNetwork: () => {},
  create: async () => ``,
  recover: async () => {},
});

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [network, setNetwork] = useState<Network>(`mainnet`);

  const provider = useMemo(
    () => (network === `mainnet` ? mainnetProvider : testnetProvider),
    [network],
  );

  const loadAccount = useCallback(async () => {
    if (!provider.keystore) {
      return;
    }
    const [address] = await provider.getAddresses();
    setAccount(address);

    const b = await provider.getBalance(address);
    setBalance(new BigNumber(b).dividedBy(1e18));
  }, [provider]);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  const create = useCallback<LightWalletProvider['createLightWallet']>(
    async (password) => {
      const mnemonic = await provider.createLightWallet(password);
      loadAccount();

      return mnemonic;
    },
    [loadAccount, provider],
  );

  const recover = useCallback<LightWalletProvider['recoverLightWallet']>(
    async (mnemonic, password) => {
      await provider.recoverLightWallet(mnemonic, password);

      loadAccount();
    },
    [loadAccount, provider],
  );

  const value = useMemo(
    () => ({
      account,
      setAccount,
      balance,
      network,
      setNetwork,
      create,
      recover,
    }),
    [account, balance, network, create, recover],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;
