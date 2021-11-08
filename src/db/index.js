import { Sequelize } from "sequelize";

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;
//destructures the variables from env

const sequelize = new Sequelize(
  process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: "postgres",
  dialectOptions: {         // IMPORTANT
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
console.log("sequelize instance created");
//creates

export const testConnection = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Can be established");
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  try {
    console.log("syncronizes all tables in connectDB"); 
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;