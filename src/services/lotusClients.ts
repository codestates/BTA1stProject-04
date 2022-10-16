import { HttpJsonRpcConnector, LotusClient } from 'filecoin.js';

export type Network = 'mainnet' | 'testnet';

const mainnet = new LotusClient(
  new HttpJsonRpcConnector({
    url: `https://api.node.glif.io/rpc/v0`,
  }),
);

const testnet = new LotusClient(
  new HttpJsonRpcConnector({
    url: `https://api.calibration.node.glif.io/rpc/v0`,
  }),
);

export default {
  mainnet,
  testnet,
};
