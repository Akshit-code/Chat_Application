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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secretKey = process.env.SECRET_KEY;
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        try {
            const decode = jsonwebtoken_1.default.verify(token, secretKey);
            if (decode && decode.id) {
                req.body.id = decode.id;
                req.body.UserId = decode.id;
                next();
            }
            else {
                res.status(403).json({ message: "Invalid Token" });
            }
        }
        catch (error) {
            res.status(401).json({ message: 'Token expired or invalid' });
        }
    }
    else {
        res.status(401).json({ message: 'Authorization header not found' });
    }
});
exports.default = authToken;
