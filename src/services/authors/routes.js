import {Router} from "express"
import pool from "../../utils/db.js"
const route = Router()


route.get("/",async(req,res,next)=>{
    try {
        const query = `SELECT * FROM authors;`
        const result = await pool.query(query)
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.get("/:id",async(req,res,next)=>{
    try {
        const query = `SELECT * FROM authors WHERE author_id=${req.params.id};`
      
        const result = await pool.query(query)
        if(result.rows.length > 0){
            const author = result.rows[0]
            const booksQuery = `SELECT * FROM books WHERE author=${req.params.id};`
            const booksResult = await pool.query(booksQuery)
            const books = booksResult.rows
            res.send({author,books})
        }
        else{
            res.status(404).send({message:`Author with ${req.params.id} is not found.`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.delete("/:id",async(req,res,next)=>{
    try {
        const query = `DELETE FROM authors WHERE author_id=${req.params.id};`
        await pool.query(query)
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.put("/:id",async(req,res,next)=>{
    try {
        const {name,last_name,avatar,country} = req.body;
        const query =`
            UPDATE authors 
            SET 
                name=${"'"+name+"'"},
                last_name=${"'"+last_name+"'"},
                avatar=${"'"+avatar+"'"},
                country=${"'"+country+"'"},
                updated_at= NOW()
            WHERE author_id=${req.params.id}
            RETURNING*;`
        const result = await pool.query(query)
        res.send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.post("/",async(req,res,next)=>{
    try {
        const {name,last_name,avatar,country} = req.body;
        const query =`
        INSERT INTO authors
        (
            name,
            last_name,
            avatar,
            country
        )
        VALUES 
        (
            ${"'"+name+"'"},
            ${"'"+last_name+"'"},
            ${"'"+avatar+"'"},
            ${"'"+country+"'"}
        ) RETURNING *;
        `
        const result = await pool.query(query)
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default route;