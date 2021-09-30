import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
