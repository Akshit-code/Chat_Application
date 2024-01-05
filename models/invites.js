"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
class Invites extends sequelize_1.Model {
}
Invites.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    senderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    receiverId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    inviteType: {
        type: sequelize_1.DataTypes.ENUM('private', 'group'),
        allowNull: false
    },
    otherDetails: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize: database_1.default,
    tableName: 'invites',
    modelName: "Invites",
});
exports.default = Invites;
