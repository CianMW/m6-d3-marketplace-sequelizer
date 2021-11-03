import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define("product", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.VARCHAR(50),
    allowNull: false,
  },
  category: {
    type: DataTypes.VARCHAR(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
})
export default Product;