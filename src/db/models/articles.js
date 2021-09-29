import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Article = sequelize.define("article", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Article;
