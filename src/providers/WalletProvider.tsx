import BigNumber from 'bignumber.js';
import { LightWalletProvider } from 'filecoin.js';
import { Cid } from 'filecoin.js/builds/dist/providers/Types';
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

type TxStatus = 'pending' | 'done';
interface WalletValue {
  account: string;
  balance: BigNumber | null;
  network: Network;
  setNetwork: (state: Network) => void;
  create: LightWalletProvider['createLightWallet'];
  recover: LightWalletProvider['recoverLightWallet'];
  send: (receiver: string, amount: BigNumber) => Promise<void>;
  sendingStatus: null | TxStatus;
  resetSendingStatus: () => void;
}

const mainnetProvider = new LightWalletProvider(lotusClients.mainnet, () =>
  window.prompt(`비밀번호를 입력해주세요`),
);
const mainnetKeystore = localStorage.getItem(`filenori-mainnet-keystore`);
if (mainnetKeystore) {
  mainnetProvider.loadLightWallet(mainnetKeystore);
}

const testnetProvider = new LightWalletProvider(
  lotusClients.testnet,
  () => window.prompt(`비밀번호를 입력해주세요`),
  `test`,
);
const testnetKeystore = localStorage.getItem(`filenori-testnet-keystore`);
if (testnetKeystore) {
  testnetProvider.loadLightWallet(testnetKeystore);
}

const WalletContext = createContext<WalletValue>({
  account: ``,
  balance: null,
  network: `mainnet`,
  setNetwork: () => {},
  create: async () => ``,
  recover: async () => {},
  send: async () => {},
  sendingStatus: null,
  resetSendingStatus: () => {},
});

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [network, setNetwork] = useState<Network>(`mainnet`);
  const [sendingStatus, setSendingStatus] = useState<null | TxStatus>(null);
  const [lastCid, setLastCid] = useState<null | Cid>(null);

  const provider = useMemo(
    () => (network === `mainnet` ? mainnetProvider : testnetProvider),
    [network],
  );

  const loadAccount = useCallback(async () => {
    if (!provider.keystore) {
      return;
    }
    provider.client.chain.getHead();
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

      return mnemonic;
    },
    [provider],
  );

  const recover = useCallback<LightWalletProvider['recoverLightWallet']>(
    async (mnemonic, password) => {
      await mainnetProvider.recoverLightWallet(mnemonic, password);
      await testnetProvider.recoverLightWallet(mnemonic, password);

      localStorage.setItem(
        `filenori-mainnet-keystore`,
        mainnetProvider.keystore.serialize(),
      );
      localStorage.setItem(
        `filenori-testnet-keystore`,
        testnetProvider.keystore.serialize(),
      );

      loadAccount();
    },
    [loadAccount],
  );

  const send = useCallback<WalletValue['send']>(
    async (receiver, amount) => {
      const message = await provider.createMessage({
        From: account,
        To: receiver,
        Value: amount,
      });

      const signedMessage = await provider.signMessage(message);
      const msgCid = await provider.sendSignedMessage(signedMessage);

      setLastCid(msgCid);
      setSendingStatus(`pending`);

      loadAccount();
    },
    [account, loadAccount, provider],
  );

  useEffect(() => {
    if (lastCid && sendingStatus === `pending`) {
      const id = setInterval(() => {
        provider.searchMsg(lastCid).then((data) => {
          if (data) {
            setSendingStatus(`done`);
            loadAccount();
          }
        });
      }, 1000);
      return () => clearInterval(id);
    }
    return () => {};
  }, [lastCid, loadAccount, provider, sendingStatus]);

  const value = useMemo<WalletValue>(
    () => ({
      account,
      setAccount,
      balance,
      network,
      setNetwork,
      create,
      recover,
      send,
      sendingStatus,
      resetSendingStatus: () => setSendingStatus(null),
    }),
    [account, balance, create, network, recover, send, sendingStatus],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;
