import express from "express";
import db from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;
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

router.route("/stats").get(async (req, res, next) => {
  try {
    // get number of records from  Authors
    const totalAuthors = await Author.count();

    // get number of records from  Authors in Italy
    const totalAuthorsInItaly = await Author.count({
      where: { country: "Italy" },
    });

    //get total age where author is in italy
    const totalAge = await Author.sum("age", { where: { country: "Italy" } });

    // get the youngest from Italy
    const youngestFromItaly = await Author.min("age", {
      where: { country: "Italy" },
    });

    //group customers by country
    // select country, count(*) as total from authors group by country order by total desc

    const groupedByCountry = await Author.findAll({
      attributes: ["country", [sequelize.fn("COUNT", "id"), "total"]],
      group: "country",
      order: [[sequelize.col("total"), "DESC"]],
    });

    //get avg age of the customer from each country
    // select country, avg(age) from authors group by country

    const getAVGAge = await Author.findAll({
      attributes: [
        "country",
        [sequelize.fn("AVG", sequelize.col("age")), "total"],
      ],
      group: "country",
    });

    res.send({
      groupedByCountry,
      getAVGAge,
    });
  } catch (error) {
    console.log(error);
  }
});
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Author.findOne({
        where: { id: req.params.id },
        include: Article,
      });
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("Not found");
      }
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
