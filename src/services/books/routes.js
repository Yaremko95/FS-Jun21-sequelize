import {Router} from "express"
import pool from "../../utils/db.js"
const route = Router()


route.get("/",async(req,res,next)=>{
    try {
        const query = 
        `SELECT 
        book.book_id,
        book.name AS book_name,
        book.description,
        book.price,
        book.author,
        author.name AS author_name,
        author.last_name,
        author.country,
        author.avatar
    FROM books as book
    INNER JOIN authors AS author ON book.author = author.author_id
    `
        const result = await pool.query(query)
        res.send(result.rows)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/:id",async(req,res,next)=>{
    try {
        const query = `SELECT 
        book.book_id,
        book.name AS book_name,
        book.description,
        book.price,
        book.author,
        author.name AS author_name,
        author.last_name,
        author.country,
        author.avatar
    FROM books as book
    INNER JOIN authors AS author ON book.author = author.author_id
    WHERE book_id=${req.params.id};`
        const result = await pool.query(query)
        if(result.rows.length > 0){
            res.send(result.rows[0])
        }
        else{
            res.status(404).send({message:`Book with ${req.params.id} is not found.`})
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete("/:id",async(req,res,next)=>{
    try {
        const query = `DELETE FROM books WHERE book_id=${req.params.id};`
        await pool.query(query)
        res.status(204).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put("/:id",async(req,res,next)=>{
    try {
        const {name,description ,price,author} = req.body;
        const query =`
            UPDATE books 
            SET 
                name=${"'"+name+"'"},
                description=${"'"+description+"'"},
                price=${"'"+price+"'"},
                author=${"'"+author+"'"},
                updated_at= NOW()
            WHERE author_id=${req.params.id}
            RETURNING*;`
        const result = await pool.query(query)
        res.send(result.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post("/",async(req,res,next)=>{
    try {
        const {name,description,price,author} = req.body;
        const query =`
        INSERT INTO books
        (
            name,
            description,
            price,
            author
        )
        VALUES 
        (
            ${"'"+name+"'"},
            ${"'"+description+"'"},
            ${"'"+price+"'"},
            ${"'"+author+"'"}
        ) RETURNING *;
        `
        const result = await pool.query(query)
        res.status(201).send(result.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
})


export default route;