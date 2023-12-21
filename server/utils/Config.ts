import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

interface ENV {
  DATABASE_URL: string;
  SEND_GRID_KEY: string;
  SEND_GRID_EMAIL: string;
  PORT: string;
}

interface Config extends ENV {}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    SEND_GRID_KEY: process.env.SEND_GRID_KEY!,
    SEND_GRID_EMAIL: process.env.SEND_GRID_EMAIL!,
    PORT: process.env.PORT!,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing value for ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
