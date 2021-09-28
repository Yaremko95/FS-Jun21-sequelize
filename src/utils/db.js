
 // package required to connect postgresql

 import pg from "pg"

// connection pool for postgresql

const {DATABASE_URL:connectionString} = process.env;

const pool = new pg.Pool({
  connectionString,
  ssl:{
    rejectUnauthorized:false
  }
})

export default pool;
 