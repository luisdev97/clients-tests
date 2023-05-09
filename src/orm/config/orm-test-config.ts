import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const config: ConnectionOptions = {
  type: "sqlite",
  name: "default",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: ["src/orm/entities/**/*.ts"],
  migrations: ["src/orm/migrations/**/*.ts"],
  subscribers: ["src/orm/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/orm/entities",
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
