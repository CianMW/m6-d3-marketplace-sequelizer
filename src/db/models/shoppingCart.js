import sequelize from "../index.js"; 
import s from "sequelize";
const { DataTypes } = s;

const ShoppingCart = sequelize.define("shoppingCart", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
})
export default ShoppingCart;