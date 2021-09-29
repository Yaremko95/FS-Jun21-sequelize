import express from "express";
import cors from "cors";
import { connectDB } from "./db/index.js";
import authorsRouter from "./services/authors/index.js";
import articlesRouter from "./services/articles/index.js";
const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());

server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/articles", articlesRouter);
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
