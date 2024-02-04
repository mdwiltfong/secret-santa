import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

interface ENV {
  DATABASE_URL: string;
  SEND_GRID_KEY: string;
  SEND_GRID_EMAIL: string;
  PORT: number;
  NODE_ENV: "production" | "development" | "test" | string;
}

interface Config extends ENV {}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    SEND_GRID_KEY: process.env.SEND_GRID_KEY!,
    SEND_GRID_EMAIL: process.env.SEND_GRID_EMAIL!,
    PORT: Number(process.env.PORT!),
    NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  const missingKeys = [];
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      missingKeys.push(key);
    }
    if (missingKeys.length > 0) {
      throw new Error(
        `Missing value(s) for ${missingKeys.join(", ")} in config.env`
      );
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
