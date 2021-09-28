import express from "express";
import cors from "cors"
import createTables from "./utils/create-tables.js";
import authorsRoute from "./services/authors/routes.js"

const server = express()


const {PORT=5000} = process.env;

server.use(cors())

server.use(express.json())

server.use("/authors", authorsRoute)

server.listen(PORT,async ()=>{
    console.log(`Server is listening on port ${PORT}`)
    await createTables()
})

server.on('error',(error)=>{
    console.log('Server is stoppped ',error)
})


