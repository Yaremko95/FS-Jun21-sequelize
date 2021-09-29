import express from "express";
import db from "../../db/models/index.js";
import s from "sequelize";
const { Op } = s;
const router = express.Router();

const { Author, Article } = db;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Author.findAll({
        // attributes: ["name", "email"], =>select colums

        //  attributes: { exclude: ["id"] }, => exclude columns

        // where: {
        //      name: "Tetiana",
        //   age: {
        //     [Op.gt]: 30,    => >30
        //   },
        // },

        // where: {
        //   name: {
        //     [Op.iLike]: `%${req.query.name}%`, => search names by substring case insensitive
        //   },
        // },
        include: Article,

        where: req.query.search
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: `%${req.query.search}%` } },
                { lastName: { [Op.iLike]: `%${req.query.search}%` } },
                { email: { [Op.iLike]: `%${req.query.search}%` } },
              ],
            }
          : {},
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Author.create(req.body);
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
      const data = await Author.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Author.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Author.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
