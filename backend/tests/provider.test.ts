import { CronoscanProvider } from "../src/providers/indexerProvider";

const provider = new CronoscanProvider();

(async () => {
  const profile = await provider.getWalletProfile(
    "0xee481dc6e4dc72aad6ddffe0944c9111cbf7b0d5"
  );

  console.log(profile);
})();
