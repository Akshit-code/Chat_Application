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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cron_1 = require("cron");
const database_1 = __importDefault(require("./utils/database"));
const routes_1 = __importDefault(require("./routes/routes"));
const messages_1 = __importDefault(require("./models/messages"));
const archivedChats_1 = __importDefault(require("./models/archivedChats"));
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/socket.io', function (_req, res, next) {
    res.header('Content-Type', 'text/javascript');
    next();
}, express_1.default.static(__dirname + '/node_modules/socket.io/client-dist'));
app.use("/user", routes_1.default);
app.use("/chats", routes_1.default);
app.use("/chats", (_req, res, _next) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'chats.html'));
});
app.use("/", (_req, res, _next) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'index.html'));
});
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('createPrivateRoom', (senderId) => {
        socket.join(senderId);
    });
    socket.on('sendPrivateMessage', (data) => {
        const { senderId, receiverId, message } = data;
        socket.to(receiverId).emit('newPrivateMessage', { senderId, receiverId, message });
    });
    socket.on("joinGroupChat", (groupId) => {
        socket.join(groupId);
    });
    socket.on("sendGroupMessage", (data) => {
        socket.to(data.groupId).emit("receiveGroupMessage", {
            senderId: data.currentUser,
            receverId: data.groupId,
            message: data.message
        });
    });
    socket.on('joinPrivateRoom', (data) => {
        const allRooms = Object.keys(socket.rooms);
        if (allRooms.includes(data.receiverId)) {
            socket.join(data.receiverId);
            console.log("Joint Receiver Room");
        }
        else {
            socket.join(data.senderId);
            console.log("Created sender Room");
        }
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
const moveMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageToArchive = yield messages_1.default.findAll({
            where: {
                createdAt: { [sequelize_1.Op.lt]: new Date() }
            }
        });
        const messageData = messageToArchive.map((msg) => ({
            message: msg.message,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            messageType: msg.messageType,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt
        }));
        yield archivedChats_1.default.bulkCreate(messageData);
        yield messages_1.default.destroy({
            where: {
                id: messageToArchive.map((msg) => msg.id)
            }
        });
        console.log('Messages moved to Archive successfully!');
    }
    catch (error) {
        console.error('Error moving messages:', error);
    }
});
const job = new cron_1.CronJob('0 0 0 * * *', moveMessages, () => console.log("Completed CronJob"), true, null, false);
job.start();
database_1.default.sync().then(() => {
    const port = parseInt(process.env.PORT || '3000');
    httpServer.listen(port, () => console.log(`Server is running at port: ${port}`));
}).catch(err => console.log(err));
