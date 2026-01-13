import "dotenv/config";
import { buildServer } from "./server.js";

const app = buildServer();

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

app.listen({ port, host }).then(() => {
  app.log.info(`Server listening on http://${host}:${port}`);
}).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
