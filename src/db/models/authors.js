import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Author = sequelize.define(
  "author",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://image.url",
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Author;
