import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const ArticleCategory = sequelize.define("articleCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// ArticleCategory.sync({ force: true });

export default ArticleCategory;
