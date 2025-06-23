import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dataBase";



class ProductModel extends Model {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    image: string | undefined;
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: true 
        }
    },
    {
        sequelize,
        modelName: "ProductModel",
        tableName: "products"
    }
);



export default ProductModel;
