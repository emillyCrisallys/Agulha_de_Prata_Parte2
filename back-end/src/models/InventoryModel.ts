import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dataBase';
import ProductModel from './ProductModel';


class InventoryModel extends Model {
    id!: number;
    productId!: number;
    stock!: number;
    quantity: any;
}

InventoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'InventoryModel',
        tableName: 'inventory'
    }
);





export default InventoryModel;
