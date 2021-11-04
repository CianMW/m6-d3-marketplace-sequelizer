import sequelize from "../index.js"; 
import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define("category", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
export default Category;