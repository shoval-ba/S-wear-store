/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_DB_URL: string;
      DATABASE_URL: string;
    }
  }
}
