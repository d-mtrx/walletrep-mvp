import Fastify from "fastify";
import cors from "@fastify/cors";

import { walletRoutes } from "./routes/wallet.js";
// import { healthRoutes } from "./routes/health.js";
// import { scoreRoutes } from "./routes/score.js";

export function buildServer() {
  const app = Fastify({
    logger: true,
  });

  // Plugins
  app.register(cors, {
    origin: true,
  });

  // Routes
  app.register(walletRoutes);

  // Optional basic health route
  app.get("/health", async () => {
    return { ok: true };
  });

  return app;
}
