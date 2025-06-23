import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dataBase";
import ProductModel from "./ProductModel";

class CartModel extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
}

CartModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "cart"
  }
);

// Relacionamento com ProductModel
CartModel.belongsTo(ProductModel, { foreignKey: "productId", as: "Product" });

export default CartModel;