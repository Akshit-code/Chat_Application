"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_Instance = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AWS_Instance = {
    port: parseInt(process.env.PORT || "3000"),
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID || "",
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY || "",
    bucket_name: process.env.BUCKET_NAME || "",
    region: process.env.AWS_REGION || ""
};
