import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from "typeorm";

import ormConfig from "./config/orm-config";
import ormTestConfig from "./config/orm-test-config";

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const nodeEnv: string = process.env.NODE_ENV;
    const currentOrmConfiguration: ConnectionOptions =
      nodeEnv === "test" ? ormTestConfig : ormConfig;
    const conn = await createConnection(currentOrmConfiguration);
    if (nodeEnv !== "test") {
      console.log(
        `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`
      );
    }
  } catch (err) {
    if (err.name === "AlreadyHasActiveConnectionError") {
      const activeConnection = getConnectionManager().get(ormConfig.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
