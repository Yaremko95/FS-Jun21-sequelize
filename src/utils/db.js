// package required to connect postgresql

import pg from "pg";

// connection pool for postgresql

const { DATABASE_URL, DATABASE_URL_DEV, NODE_ENV } = process.env;

/**
 * 
 *   if its deployed to heroku heroku sets  NODE_ENV ==='production'
 *   we can understand if code is running on heroku or local by checking it.
 */
const isProduction = NODE_ENV === "production";

/**
 * 
 *   if its deployed to heroku we use heroku connection string 
 *    otherwise we use local connection string
 */
const connectionString = isProduction ? DATABASE_URL : DATABASE_URL_DEV;

/**
 * 
 *  heroku deployment requires this ssl configs so if its deployed to heroku 
 *  we are providing these sslConfig
 */
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
