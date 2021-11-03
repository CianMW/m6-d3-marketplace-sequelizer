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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },

});

export default Review;