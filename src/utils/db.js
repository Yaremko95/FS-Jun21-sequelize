// package required to connect postgresql

import pg from "pg";

// connection pool for postgresql

const { DATABASE_URL, DATABASE_URL_DEV, NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";

const connectionString = isProduction ? DATABASE_URL : DATABASE_URL_DEV;

const sslConfig = isProduction
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};

  
const pool = new pg.Pool({
  connectionString,
  ...sslConfig,
});

export default pool;
