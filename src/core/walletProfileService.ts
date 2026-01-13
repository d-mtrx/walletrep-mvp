import { prisma } from "../utils/prisma.js";
import { CronoscanProvider } from "../providers/indexerProvider.js";

const CACHE_TTL_MINUTES = 30;

export async function getOrBuildWalletProfile(address: string) {
  const normalized = address.toLowerCase();

  const existing = await prisma.walletProfile.findUnique({
    where: { address: normalized },
  });

  if (
    existing &&
    Date.now() - existing.fetchedAt.getTime() <
      CACHE_TTL_MINUTES * 60 * 1000
  ) {
    return existing;
  }

  const provider = new CronoscanProvider();
  const raw = await provider.getWalletProfile(normalized);

  const profile = {
    address: normalized,
    firstSeen: raw.firstTxTimestamp
      ? new Date(raw.firstTxTimestamp * 1000)
      : new Date(),

    lastSeen: new Date(), //will be ointegrated in other milestones
    txCount: raw.txCount,

    approxVolume: raw.txCount * 0.01, //will be ointegrated in other milestones
    tokensSeen: raw.interactedTokenContracts,
    contractsSeen: raw.interactedTokenContracts,

    source: "cronos",
  };

  return prisma.walletProfile.upsert({
    where: { address: normalized },
    update: profile,
    create: profile,
  });
}
