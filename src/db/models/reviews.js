import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Review = sequelize.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  text: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  rate: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  author_id: {
    type: DataTypes.INTEGER,
  },
});

export default Review;
