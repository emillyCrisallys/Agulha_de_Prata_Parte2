import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dataBase'
import bcrypt from 'bcrypt';

class UserModel extends Model {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    document: string | undefined;
    password: string | undefined;
    updatedBy: number | undefined;

    public async hashPassword() {
        this.password = await bcrypt.hash(this.password!, 10)
    }

    public async validatePassword(password: string) {
        return await bcrypt.compare(password, this.password!)
    }
}


UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
 
        },
    },
    {
        sequelize, 
        modelName: 'UserModel',
        tableName: 'users',
    }
)

UserModel.beforeCreate(async(user: UserModel) => {

    if (user.document) {
        user.document = user.document.replace(/\D/g, ''); // Remove tudo que não for número
    }

    await user.hashPassword()

});

UserModel.beforeUpdate(async(user: UserModel) => {

    if (user.changed('document') && user.document) {
        user.document = user.document.replace(/\D/g, ''); // Remove tudo que não for número
    }

    if (user.changed('password')) {
        await user.hashPassword()
    }
})

export default UserModel;