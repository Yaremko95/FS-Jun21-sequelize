import express from "express";
import db from "../../db/models/index.js";
const router = express.Router();
const { Article, Author, Category } = db;
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Category.bulkCreate([
        { categoryName: "db" },
        { categoryName: "sql" },
        { categoryName: "react" },
      ]);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
