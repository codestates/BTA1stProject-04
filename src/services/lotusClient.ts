import { HttpJsonRpcConnector, LotusClient } from 'filecoin.js';

const httpConnector = new HttpJsonRpcConnector({
  url: process.env.REACT_APP_LOTUS_RPC_ENDPOINT,
});

const lotusClient = new LotusClient(httpConnector);

export default lotusClient;
