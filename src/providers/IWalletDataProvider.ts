export interface WalletProfile {
  address: string;
  walletAgeDays: number;
  firstTxTimestamp: number | null;
  txCount: number;
  uniqueTokens: number;
  interactedTokenContracts: string[];
}

export interface IWalletDataProvider {
  getWalletProfile(address: string): Promise<WalletProfile>;
}
