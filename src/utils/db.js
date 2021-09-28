
 // package required to connect postgresql

 import pg from "pg"

// connection pool for postgresql

const {DATABASE_URL:connectionString,NODE_ENV} = process.env;

const isProduction = NODE_ENV==='production';

console.log({isProduction})

const pool = new pg.Pool({
  connectionString,
  ssl:{
    rejectUnauthorized:false
  }
})

export default pool;
 