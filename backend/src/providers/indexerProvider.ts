import { ENV } from "../utils/env.js";
import { IWalletDataProvider, WalletProfile } from "./IWalletDataProvider.js";

type CronoscanTx = {
  timeStamp: string;
};

type CronoscanTokenTx = {
  contractAddress: string;
};

export class CronoscanProvider implements IWalletDataProvider {
  async getWalletProfile(address: string): Promise<WalletProfile> {
    const [txs, tokenTxs] = await Promise.all([
      this.fetchTransactions(address),
      this.fetchTokenTransfers(address),
    ]);

    const txCount = txs.length;

    const firstTxTimestamp = txCount
      ? Math.min(...txs.map((tx) => Number(tx.timeStamp)))
      : null;

    const walletAgeDays = firstTxTimestamp
      ? Math.floor((Date.now() / 1000 - firstTxTimestamp) / 86400)
      : 0;

    const tokenContracts = new Set(
      tokenTxs.map((t) => t.contractAddress.toLowerCase())
    );

    return {
      address: address.toLowerCase(),
      walletAgeDays,
      firstTxTimestamp,
      txCount,
      uniqueTokens: tokenContracts.size,
      interactedTokenContracts: [...tokenContracts],
    };
  }

  private async fetchTransactions(address: string): Promise<CronoscanTx[]> {
    const url =
      `${ENV.CRONOSCAN_BASE_URL}` +
      `?module=account` +
      `&action=txlist` +
      `&address=${address}` +
      `&startblock=0` +
      `&endblock=99999999` +
      `&page=1` +
      `&offset=100` +
      `&sort=asc` +
      `&apikey=${ENV.CRONOSCAN_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "1") return [];
    return json.result ?? [];
  }

  private async fetchTokenTransfers(
    address: string
  ): Promise<CronoscanTokenTx[]> {
    const url =
      `${ENV.CRONOSCAN_BASE_URL}` +
      `?module=account` +
      `&action=tokentx` +
      `&address=${address}` +
      `&startblock=0` +
      `&endblock=99999999` +
      `&page=1` +
      `&offset=100` +
      `&apikey=${ENV.CRONOSCAN_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "1") return [];
    return json.result ?? [];
  }
}
