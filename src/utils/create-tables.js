import pool from "../utils/db.js"
const query = `
    -- DROP TABLE IF EXISTS authors;
    CREATE TABLE IF NOT EXISTS 
        authors(
            author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR (50) NOT NULL,
            last_name VARCHAR (50) NOT NULL,
            country VARCHAR (50) NOT NULL,
            avatar TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
`

const createTables = async () => {
    try {
     await pool.query(query)
     console.log('Default tables are created ✅')
    } catch (error) {
      console.log('Default tables are not created ❌')
    }
}

export default createTables