"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMediaMessage = exports.getAllGroupMessages = exports.getAllPrivateMessages = exports.sendMessage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const database_1 = __importDefault(require("../utils/database"));
const aws_1 = require("../config/aws");
const messages_1 = __importDefault(require("../models/messages"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    accessKeyId: aws_1.AWS_Instance.aws_access_key_id,
    secretAccessKey: aws_1.AWS_Instance.aws_secret_access_key,
    region: aws_1.AWS_Instance.region
});
const s3 = new aws_sdk_1.default.S3();
const sendMessage = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const data = yield messages_1.default.create({
            message: req.body.message,
            senderId: req.body.UserId,
            receiverId: req.body.receiverId,
            messageType: req.body.messageType
        }, { transaction });
        transaction.commit();
        return res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.sendMessage = sendMessage;
const getAllPrivateMessages = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const allMessages = yield messages_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { $senderId$: req.body.UserId, messageType: 'private' },
                    { $receiverId$: req.body.UserId, messageType: 'private' }
                ]
            },
            attributes: { exclude: ['id', 'updatedAt'] },
            order: [['createdAt', 'ASC']],
            transaction
        });
        transaction.commit();
        return res.status(200).json(allMessages);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllPrivateMessages = getAllPrivateMessages;
const getAllGroupMessages = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const allMessagesPrmoise = req.body.allGroupsId.map((groupId) => __awaiter(void 0, void 0, void 0, function* () {
            const message = yield messages_1.default.findAll({
                where: { $receiverId$: groupId, $messageType$: 'group' },
                order: [['createdAt', 'ASC']],
                transaction
            });
            return message;
        }));
        const allMessagesArrays = yield Promise.all(allMessagesPrmoise);
        const allMessages = allMessagesArrays.flatMap(messages => messages);
        transaction.commit();
        return res.status(200).json(allMessages);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllGroupMessages = getAllGroupMessages;
const sendMediaMessage = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const params = {
            Bucket: aws_1.AWS_Instance.bucket_name,
            Key: `${req.file.originalname}`,
            ACL: 'public-read',
            Body: req.file.buffer
        };
        const data = yield s3.upload(params).promise();
        const message = yield messages_1.default.create({
            message: data.Location,
            senderId: req.body.UserId,
            receiverId: req.body.receiverId,
            messageType: req.body.messageType
        });
        transaction.commit();
        return res.status(200).json(message);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.sendMediaMessage = sendMediaMessage;
