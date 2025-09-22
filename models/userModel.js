import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

class UserModel extends Model {}

UserModel.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING(50), allowNull: false },
    LastName: { type: DataTypes.STRING(50), allowNull: false },
    Email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    DNI: { type: DataTypes.STRING(15), allowNull: false },
    PasswordHash: { type: DataTypes.STRING(255), allowNull: false },
    Role: { 
        type: DataTypes.ENUM('admin','coach','manager','user'), 
        allowNull: false 
    },
    IsMembershipPaid: { type: DataTypes.BOOLEAN, defaultValue: true },
    Balance: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    Phone: { type: DataTypes.STRING(20), allowNull: false },
    IsActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    sequelize,
    tableName: "Users",
    timestamps: false
});

export default UserModel;