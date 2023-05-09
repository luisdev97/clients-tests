declare namespace NodeJS {
  export interface ProcessEnv {
    API_PORT: string;
    NODE_ENV: string;
    MYSQL_HOST: string;
    MYSQL_PORT: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}
