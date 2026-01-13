import { FastifyInstance } from "fastify";
import { getOrBuildWalletProfile } from "../core/walletProfileService.js";
import { normalizeAddress } from "../utils/address.js";

export async function walletRoutes(app: FastifyInstance) {
  app.get("/api/wallet/:address", async (req, reply) => {
    const { address } = req.params as { address: string };

    if (!address) {
      reply.code(400);
      return { error: "Wallet address is required" };
    }

    const normalized = normalizeAddress(address);
    if (!normalized) {
      reply.code(400);
      return { error: "Invalid wallet address" };
    }

    const profile = await getOrBuildWalletProfile(normalized);
    return profile;
  });
}
