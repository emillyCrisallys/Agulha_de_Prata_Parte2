import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'loja_vinil',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false,
            underscored: true,
        },
    }
)
export default sequelize
