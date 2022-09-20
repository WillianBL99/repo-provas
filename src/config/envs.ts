import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export function loadEnv() {
  const nodeEnv = process.env.NODE_ENV;
  const path =
    nodeEnv === "test"
      ? ".env.test"
      : nodeEnv === "development"
      ? ".env.development"
      : ".env";

  const env = dotenv.config({ path });
  dotenvExpand.expand(env);
}
