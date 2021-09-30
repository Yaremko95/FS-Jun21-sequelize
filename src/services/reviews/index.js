import express from "express";
import db from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;
const router = express.Router();
const { Review, Article, Author } = db;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Review.findAll({
        where: req.query.text
          ? {
              text: {
                [Op.iLike]: `%${req.query.text}%`,
              },
            }
          : {},
        include: [
          {
            model: Article,
            attributes: { exclude: ["createdAt"] },
            where: req.query.title
              ? {
                  title: {
                    [Op.iLike]: `%${req.query.title}%`,
                  },
                }
              : {},
          },
          Author,
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
      const data = await Review.create(req.body);
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
      const data = await Review.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Review.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not Found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
