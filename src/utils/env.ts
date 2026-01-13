import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  CRONOSCAN_API_KEY: z.string().min(1),
  CRONOSCAN_BASE_URL: z.string().url(),
});

export const ENV = envSchema.parse(process.env);
