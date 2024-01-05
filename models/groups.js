"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const groupMembers_1 = __importDefault(require("./groupMembers"));
class Groups extends sequelize_1.Model {
}
Groups.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    groupId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    groupName: {
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
    tableName: 'groups',
    modelName: "Groups",
});
Groups.hasMany(groupMembers_1.default);
groupMembers_1.default.belongsTo(Groups);
exports.default = Groups;
