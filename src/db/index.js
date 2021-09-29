import { Sequelize } from "sequelize";

const { PGPORT, PGHOST, PGPASSWORD, PGUSER, PGDDATABASE } = process.env;

const sequelize = new Sequelize(PGDDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB is authenticated");
  } catch (error) {
    console.log(error);
  }
};

//testDB();

export const connectDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
