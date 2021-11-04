import sequelize from "../index.js"; 
import s from "sequelize";
const { DataTypes } = s;

const ProductJoinCategory = sequelize.define("productJoinCategory", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  })
  export default ProductJoinCategory;