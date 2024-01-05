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
exports.responseInvites = exports.getAllInvites = exports.leaveGroup = exports.adminOperations = exports.getAllAdmins = exports.getAllGroupMembers = exports.getAllGroups = exports.addGroup = exports.getAllContacts = exports.addContact = exports.currentUser = exports.logoutUser = exports.login = exports.register = void 0;
const database_1 = __importDefault(require("../utils/database"));
const user_1 = __importDefault(require("../models/user"));
const contacts_1 = __importDefault(require("../models/contacts"));
const groups_1 = __importDefault(require("../models/groups"));
const groupMembers_1 = __importDefault(require("../models/groupMembers"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const invites_1 = __importDefault(require("../models/invites"));
dotenv_1.default.config();
const register = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const isExistingUser = yield user_1.default.findOne({ where: { phoneNo: req.body.phoneNo }, transaction });
        if (!isExistingUser) {
            const user = yield user_1.default.create(req.body, { transaction });
            yield transaction.commit();
            console.log(`New User ${req.body.firstName} ${req.body.lastName} Added`);
            return res.status(201).json(user);
        }
        else {
            yield transaction.rollback();
            console.log("User Already exits");
            return res.status(409).json({ error: 'User already exists' });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.register = register;
const login = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const secretKey = process.env.SECRET_KEY || "";
        const isExistingUser = yield user_1.default.findOne({ where: { $phoneNo$: req.body.phoneNo }, transaction });
        if (isExistingUser) {
            const isValidPassword = yield bcrypt_1.default.compare(req.body.password, isExistingUser.password);
            if (!isValidPassword) {
                console.log("Incorrect Password");
                return res.status(401).json({ message: 'Incorrect Password' });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ id: isExistingUser.id }, secretKey);
                const responseData = {
                    id: isExistingUser.id,
                    firstName: isExistingUser.firstName,
                    lastName: isExistingUser.lastName,
                    email: isExistingUser.email,
                    phoneNo: isExistingUser.phoneNo,
                    token: token
                };
                yield transaction.commit();
                console.log(`User ${responseData.firstName} ${responseData.lastName} have Logged IN `);
                return res.status(200).json(responseData);
            }
        }
        else {
            console.log("No user Found");
            yield transaction.rollback();
            return res.status(404).json({ message: "User not Found" });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal server Error" });
    }
});
exports.login = login;
const logoutUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const isExistingUser = yield user_1.default.findOne({ where: { id: req.body.id }, transaction });
        if (!isExistingUser) {
            yield transaction.rollback();
            return res.status(404).json({ message: "User Details not found" });
        }
        else {
            transaction.commit();
            console.log("User Have Log Out");
            return res.status(201).json({ message: "User Have Logged Out" });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal server Error" });
    }
});
exports.logoutUser = logoutUser;
const currentUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const isExistingUser = yield user_1.default.findOne({ where: { $id$: req.body.id } });
        if (!isExistingUser) {
            yield transaction.rollback();
            return res.status(404).json({ message: "User Details not found" });
        }
        else {
            const responseData = {
                id: isExistingUser.id,
                firstName: isExistingUser.firstName,
                lastName: isExistingUser.lastName,
                email: isExistingUser.email,
                phoneNo: isExistingUser.phoneNo,
            };
            yield transaction.commit();
            return res.status(200).json(responseData);
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.currentUser = currentUser;
const addContact = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const isExistingUser = yield user_1.default.findOne({ where: { $phoneNo$: req.body.phoneNo }, transaction });
        if (!isExistingUser) {
            yield transaction.rollback();
            return res.status(404).json({ message: "User Details not found" });
        }
        else {
            const sender = yield user_1.default.findOne({ where: { $id$: req.body.UserId }, transaction });
            if (sender) {
                yield invites_1.default.create({
                    senderId: sender.id,
                    receiverId: isExistingUser.id,
                    inviteType: 'private',
                    otherDetails: sender.firstName + sender.lastName
                }, { transaction });
            }
            ;
            yield transaction.commit();
            return res.status(201).json({ message: "Invite has been send " });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addContact = addContact;
const getAllContacts = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const contacts = yield contacts_1.default.findAll({ where: { $UserId$: req.body.UserId }, transaction });
        transaction.commit();
        console.log("Fetched all contacts successfully");
        return res.status(200).json(contacts);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllContacts = getAllContacts;
const addGroup = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const group = yield groups_1.default.create({
            groupName: req.body.groupName,
            UserId: req.body.UserId
        }, { transaction });
        const groupMembers = req.body.groupMembers;
        const groupMembersPromises = groupMembers.map((memberId) => __awaiter(void 0, void 0, void 0, function* () {
            yield groupMembers_1.default.create({
                contactId: memberId,
                GroupId: group.id,
                groupName: req.body.groupName
            }, { transaction });
        }));
        yield Promise.all(groupMembersPromises);
        yield groups_1.default.update({ groupId: group.id }, { where: { $id$: group.id }, transaction });
        yield transaction.commit();
        console.log(`Added group: ${req.body.groupName}`);
        return res.status(201).json(group);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addGroup = addGroup;
const getAllGroups = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const adminGroupsPromise = groups_1.default.findAll({ where: { $UserId$: req.body.UserId }, transaction });
        const membersGroupsPromise = groupMembers_1.default.findAll({ where: { $contactId$: req.body.UserId }, transaction });
        const [adminGroups, membersGroups] = yield Promise.all([adminGroupsPromise, membersGroupsPromise]);
        const adminGroupsModified = adminGroups.map(group => (Object.assign(Object.assign({}, group.toJSON()), { isAdmin: true, GroupId: group.id })));
        const membersGroupsModified = membersGroups.map(group => (Object.assign(Object.assign({}, group.toJSON()), { isAdmin: false })));
        const responseData = [...adminGroupsModified, ...membersGroupsModified];
        yield transaction.commit();
        console.log("Fetched all Groups successfully");
        return res.status(200).json(responseData);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllGroups = getAllGroups;
const getAllGroupMembers = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const groupId = req.params.groupId;
        const isAdmin = yield groups_1.default.findOne({ where: { $id$: groupId }, transaction });
        if (isAdmin && req.body.UserId === isAdmin.UserId) {
            const allGroupMembers = yield groupMembers_1.default.findAll({ where: { $GroupId$: groupId }, transaction });
            const responseData = [];
            for (const member of allGroupMembers) {
                const contact = yield contacts_1.default.findOne({ where: { $UserId$: req.body.UserId, $contactId$: member.contactId }, transaction });
                if (contact) {
                    responseData.push(contact);
                }
                ;
            }
            ;
            yield transaction.commit();
            return res.status(200).json(responseData);
        }
        else {
            yield transaction.rollback();
            return res.status(403).json({ message: "Unauthorized Access: User is not an Admin" });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllGroupMembers = getAllGroupMembers;
const getAllAdmins = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const groupId = req.params.groupId;
        const admins = yield groups_1.default.findAll({ where: { groupId: groupId }, transaction });
        const adminsDetailsPromises = admins.map((admin) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ where: { id: admin.UserId },
                attributes: ['id', 'firstName', 'lastName'], transaction });
            return user;
        }));
        const adminsDetails = yield Promise.all(adminsDetailsPromises);
        console.log(adminsDetails);
        yield transaction.commit();
        return res.status(200).json(adminsDetails);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllAdmins = getAllAdmins;
const adminOperations = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const isAdmin = yield groups_1.default.findOne({ where: { $id$: req.body.groupId }, transaction });
        if (isAdmin && req.body.UserId === isAdmin.UserId) {
            if (req.body.opsType === "editGroupName") {
                yield isAdmin.update({ groupName: req.body.groupName }, { transaction });
                yield transaction.commit();
                return res.status(201).json(req.body);
            }
            else if (req.body.opsType === "addMembers") {
                yield Promise.all(req.body.selectedMembers.map((member) => __awaiter(void 0, void 0, void 0, function* () {
                    yield invites_1.default.create({
                        senderId: req.body.groupId,
                        receiverId: member,
                        inviteType: "group",
                        otherDetails: isAdmin.groupName
                    }, { transaction });
                })));
                yield transaction.commit();
                return res.status(201).json(req.body);
            }
            else if (req.body.opsType === "removeMembers") {
                req.body.selectedMembers.forEach((member) => {
                    groupMembers_1.default.destroy({ where: { $contactId$: member, $GroupId$: req.body.groupId } });
                });
                yield transaction.commit();
                return res.status(201).json(req.body);
            }
            else if (req.body.opsType === 'addAdmin') {
                const { selectedMembers, groupId, groupName } = req.body;
                for (const memberId of selectedMembers) {
                    yield groups_1.default.create({
                        groupName: groupName,
                        groupId: groupId,
                        UserId: memberId
                    }, { transaction });
                    yield groupMembers_1.default.destroy({
                        where: {
                            contactId: memberId,
                            GroupId: groupId,
                            groupName: groupName
                        }, transaction
                    });
                }
                ;
                yield transaction.commit();
                return res.status(201).json(req.body);
            }
            else if (req.body.opsType === 'removeAdmin') {
                const { selectedMembers, groupId, groupName } = req.body;
                for (const memberId of selectedMembers) {
                    yield groups_1.default.destroy({
                        where: {
                            $groupId$: groupId,
                            $groupName$: groupName,
                            $UserId$: memberId
                        }, transaction
                    });
                    yield groupMembers_1.default.create({
                        contactId: memberId,
                        groupName: groupName,
                        GroupId: groupId
                    }, { transaction });
                }
                ;
                yield transaction.commit();
                return res.status(201).json(req.body);
            }
        }
        else {
            yield transaction.rollback();
            return res.status(403).json({ message: "Unauthorized Access: User is not an Admin" });
        }
        console.log(req.body);
        yield transaction.commit();
        return res.status(201).json(req.body);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.adminOperations = adminOperations;
const leaveGroup = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const groupId = req.params.groupId;
        yield groupMembers_1.default.destroy({ where: { $GroupId$: groupId, contactId: req.body.UserId }, transaction });
        transaction.commit();
        return res.status(201).json({ message: "User have left the group" });
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.leaveGroup = leaveGroup;
const getAllInvites = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        const allInvites = yield invites_1.default.findAll({ where: { $receiverId$: req.body.UserId } });
        yield transaction.commit();
        return res.status(200).json(allInvites);
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllInvites = getAllInvites;
const responseInvites = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield database_1.default.transaction();
    try {
        if (req.body.invite.response === false) {
            yield invites_1.default.destroy({ where: { id: req.body.invite.id }, transaction });
            yield transaction.commit();
            return res.status(201).json({ message: "Invite has been declined" });
        }
        else {
            if (req.body.invite.inviteType === 'group') {
                yield groupMembers_1.default.create({
                    contactId: req.body.UserId,
                    groupName: req.body.invite.otherDetails,
                    GroupId: req.body.invite.senderId
                }, { transaction });
                yield invites_1.default.destroy({ where: { id: req.body.invite.id }, transaction });
                yield transaction.commit();
                return res.status(201).json({ message: "Group membership added" });
            }
            else if (req.body.invite.inviteType === 'private') {
                const currentUser = yield user_1.default.findOne({ where: { id: req.body.UserId }, transaction });
                const senderUser = yield user_1.default.findOne({ where: { id: req.body.invite.senderId }, transaction });
                if (currentUser && senderUser) {
                    yield contacts_1.default.create({
                        firstName: senderUser.firstName,
                        lastName: senderUser.lastName,
                        phoneNo: senderUser.phoneNo,
                        contactId: senderUser.id,
                        UserId: currentUser.id
                    }, { transaction });
                    yield contacts_1.default.create({
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        phoneNo: currentUser.phoneNo,
                        contactId: currentUser.id,
                        UserId: senderUser.id
                    }, { transaction });
                }
                yield invites_1.default.destroy({ where: { id: req.body.invite.id }, transaction });
                yield transaction.commit();
                return res.status(201).json({ message: "Contacts have been added" });
            }
            yield transaction.rollback();
            return res.status(403).json({ message: "Unauthorized Access" });
        }
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.responseInvites = responseInvites;
