"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const contacts_1 = __importDefault(require("./contacts"));
const groups_1 = __importDefault(require("./groups"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    phoneNo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    modelName: "User",
});
User.hasMany(contacts_1.default, { foreignKey: 'UserId' });
contacts_1.default.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(contacts_1.default, { foreignKey: 'contactId' });
contacts_1.default.belongsTo(User, { foreignKey: 'contactId' });
User.hasMany(groups_1.default);
groups_1.default.belongsTo(User);
exports.default = User;
