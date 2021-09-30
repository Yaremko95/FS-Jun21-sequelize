import express from "express";
import db from "../../db/models/index.js";
const router = express.Router();
const { Article, Author, Category, ArticleCategory, Review } = db;
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findAll({
        include: [
          Author,
          { model: Category, through: { attributes: [] } },
          Review,
        ],
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Article.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/stats").get(async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
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

router.route("/addCategory").post(async (req, res, next) => {
  try {
    const data = await ArticleCategory.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
