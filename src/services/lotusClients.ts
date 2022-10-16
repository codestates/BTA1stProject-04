import { HttpJsonRpcConnector, LotusClient } from 'filecoin.js';

export type Network = 'mainnet' | 'testnet';

const mainnet = new LotusClient(
  new HttpJsonRpcConnector({
    url: `https://api.node.glif.io/`,
  }),
);

const testnet = new LotusClient(
  new HttpJsonRpcConnector({
    url: `https://api.calibration.node.glif.io/`,
  }),
);

export default {
  mainnet,
  testnet,
};
