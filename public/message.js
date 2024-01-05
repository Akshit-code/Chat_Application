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
const chatsSideBar = document.getElementById("chats-sidebar");
const chatsheaderDiv = document.getElementById("chats-header-div");
const chatsMessagesDiv = document.getElementById("chats-messages-div");
const composeDiv = document.getElementById("compose-div");
const personalTabBtn = document.getElementById("PersonalTab");
const groupTab = document.getElementById("groupTab");
function resetChatDisplay() {
    [chatsSideBar, chatsMessagesDiv, chatsheaderDiv, composeDiv].forEach((element) => {
        if (element) {
            element.innerHTML = '';
        }
        ;
    });
}
if (personalTabBtn && groupTab) {
    personalTabBtn.addEventListener("click", () => {
        resetChatDisplay();
        handleTabClick(true);
    });
    groupTab.addEventListener("click", () => {
        resetChatDisplay();
        handleTabClick(false);
    });
}
function handleTabClick(isPersonal) {
    if (chatsSectionDiv) {
        chatsSectionDiv.style.display = "block";
        if (chatsSideBar) {
            chatsSideBar.innerHTML = '';
            isPersonal ? getAllContacts() : getAllGroups();
        }
        ;
    }
    ;
}
function createCard(_type, text, clickHandler) {
    const card = document.createElement("div");
    if (card) {
        card.classList.add("contact-card");
        const textNode = document.createTextNode(text);
        const paragraph = document.createElement("p");
        if (paragraph) {
            paragraph.appendChild(textNode);
            card.appendChild(paragraph);
        }
        ;
        card.addEventListener("click", () => {
            clickHandler();
        });
        chatsSideBar === null || chatsSideBar === void 0 ? void 0 : chatsSideBar.appendChild(card);
    }
    ;
}
function displayContactCard(contact) {
    console.log(contact.contactId);
    createCard("contact", `${contact.firstName} ${contact.lastName}`, () => {
        displayHeaeders(contact);
        composeChats(contact);
        getPrivateChats(contact);
        socketFunctions.createPrivateRoom(currentUser.id);
    });
}
function displayGroupCard(group) {
    createCard("group", group.groupName, () => {
        displayGroupHeader(group);
        composeGroupChats(group);
        getGroupChats(group);
        getAllAdmins(group);
        if (group.isAdmin === true) {
            getAllGroupMembers(group);
        }
        socketFunctions.joinOrCreateGroupRoom(group.GroupId);
    });
}
function getPrivateChats(contact) {
    const storedMessagesRaw = localStorage.getItem("PrivateChats");
    const storedMessages = storedMessagesRaw ? JSON.parse(storedMessagesRaw) : [];
    if (chatsMessagesDiv) {
        chatsMessagesDiv.innerHTML = '';
    }
    ;
    storedMessages.forEach((message) => {
        if (message.senderId === currentUser.id && message.receiverId === contact.contactId) {
            displaySendMessage(message.message);
        }
        else if (message.receiverId === currentUser.id && message.senderId === contact.contactId) {
            displayReceviedMessage(message.message);
        }
        ;
    });
}
function getGroupChats(group) {
    const storedMessagesRaw = localStorage.getItem("GroupChats");
    const storedMessages = storedMessagesRaw ? JSON.parse(storedMessagesRaw) : [];
    if (chatsMessagesDiv) {
        chatsMessagesDiv.innerHTML = '';
    }
    ;
    storedMessages.forEach((message) => {
        if (message.senderId === currentUser.id && message.receiverId === group.GroupId) {
            displaySendMessage(message.message);
        }
        else if (message.receiverId === group.GroupId) {
            displayReceviedMessage(message.message);
        }
        ;
    });
}
function displayHeaeders(contact) {
    if (chatsheaderDiv) {
        chatsheaderDiv.innerHTML = '';
        const headerName = contact.firstName + " " + contact.lastName;
        const headerTextNode = document.createTextNode(headerName);
        chatsheaderDiv.style.textAlign = "center";
        chatsheaderDiv.appendChild(headerTextNode);
    }
    ;
}
let currentGroup;
function displayGroupHeader(group) {
    currentGroup = group;
    if (chatsheaderDiv) {
        chatsheaderDiv.innerHTML = '';
        const headerName = group.groupName;
        if (group.isAdmin) {
            const editGroupBtn = document.createElement("button");
            editGroupBtn.classList.add("reg");
            editGroupBtn.addEventListener("click", () => {
                if (editGroupDiv) {
                    editGroupDiv.style.display = "block";
                }
                ;
            });
            editGroupBtn.innerText = "Edit Group";
            editGroupBtn.style.float = "right";
            chatsheaderDiv.appendChild(editGroupBtn);
        }
        else {
            const leaveGroupBtn = document.createElement("button");
            leaveGroupBtn.classList.add("log");
            leaveGroupBtn.innerText = "Leave Group";
            leaveGroupBtn.style.float = "right";
            chatsheaderDiv.appendChild(leaveGroupBtn);
            leaveGroupBtn.addEventListener("click", () => {
                leaveGroup(group);
            });
        }
        const headerTextNode = document.createTextNode(headerName);
        chatsheaderDiv.style.textAlign = "center";
        chatsheaderDiv.appendChild(headerTextNode);
    }
    ;
}
;
function composeChats(contact) {
    const messageInput = document.createElement("input");
    messageInput.setAttribute("type", "text");
    messageInput.placeholder = "Type a Message";
    const fileInputBtn = document.createElement("button");
    fileInputBtn.textContent = "+";
    fileInputBtn.addEventListener("click", () => {
        fileInput.click();
    });
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("multiple", "false");
    fileInput.style.display = "none";
    fileInput.addEventListener("change", () => {
        var _a;
        const selectedFile = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            console.log("Selected Files:", selectedFile);
        }
        ;
    });
    const sendBtn = document.createElement("button");
    sendBtn.classList.add("send-btn");
    sendBtn.textContent = "Send";
    sendBtn.addEventListener("click", () => {
        var _a;
        const message = messageInput.value;
        const selectedFile = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            sendMultiMediaMessage(selectedFile, contact.contactId, 'private');
        }
        else {
            sendMessage(message, contact.contactId, 'private');
            socketFunctions.sendPrivatemessage(currentUser.id, contact.contactId, message);
            displaySendMessage(message);
        }
        messageInput.value = '';
    });
    if (composeDiv) {
        composeDiv.innerHTML = '';
        composeDiv.appendChild(fileInputBtn);
        composeDiv.appendChild(fileInput);
        composeDiv.appendChild(messageInput);
        composeDiv.appendChild(sendBtn);
    }
    ;
}
function composeGroupChats(group) {
    const messageInput = document.createElement("input");
    messageInput.setAttribute("type", "text");
    messageInput.placeholder = "Type a Message";
    const fileInputBtn = document.createElement("button");
    fileInputBtn.textContent = "+";
    fileInputBtn.addEventListener("click", () => {
        fileInput.click();
    });
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("multiple", "false");
    fileInput.style.display = "none";
    fileInput.addEventListener("change", () => {
        var _a;
        const selectedFile = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            console.log("Selected Files:", selectedFile);
        }
    });
    const sendBtn = document.createElement("button");
    sendBtn.classList.add("send-btn");
    sendBtn.textContent = "Send";
    sendBtn.addEventListener("click", () => {
        var _a;
        const message = currentUser.firstName + " " + currentUser.lastName + " : " + messageInput.value;
        const selectedFile = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            sendMultiMediaMessage(selectedFile, group.GroupId, 'group');
        }
        else {
            connectToSocket().sendGroupSocketMessage(currentUser.id, group.GroupId, message);
            sendMessage(message, group.GroupId, 'group');
            displaySendMessage(message);
        }
        messageInput.value = '';
    });
    if (composeDiv) {
        composeDiv.innerHTML = '';
        composeDiv.appendChild(fileInputBtn);
        composeDiv.appendChild(fileInput);
        composeDiv.appendChild(messageInput);
        composeDiv.appendChild(sendBtn);
    }
    ;
}
function displayReceviedMessage(message) {
    if (chatsMessagesDiv) {
        const receivedMessageDiv = document.createElement("div");
        receivedMessageDiv.classList.add("message-container", "received");
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        const isURL = urlPattern.test(message);
        if (isURL) {
            const link = document.createElement("a");
            link.href = message;
            link.textContent = "Download File";
            link.setAttribute("download", "true");
            receivedMessageDiv.appendChild(link);
        }
        else {
            const p = document.createElement("p");
            const messageNode = document.createTextNode(message);
            p.appendChild(messageNode);
            receivedMessageDiv.appendChild(p);
        }
        ;
        chatsMessagesDiv.appendChild(receivedMessageDiv);
    }
    ;
}
function displaySendMessage(message) {
    if (chatsMessagesDiv) {
        const sendMessageDiv = document.createElement("div");
        sendMessageDiv.classList.add("message-container", "send");
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        const isURL = urlPattern.test(message);
        if (isURL) {
            const link = document.createElement("a");
            link.href = message;
            link.textContent = "Download File";
            link.setAttribute("download", "true");
            sendMessageDiv.appendChild(link);
        }
        else {
            const p = document.createElement("p");
            const messageNode = document.createTextNode(message);
            p.appendChild(messageNode);
            sendMessageDiv.appendChild(p);
        }
        ;
        chatsMessagesDiv.appendChild(sendMessageDiv);
    }
    ;
}
function sendMessage(message, id, messageType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/sendMessage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: message,
                    receiverId: id,
                    messageType: messageType
                })
            });
            if (response.status === 201) {
                const data = yield response.json();
                console.log(data);
                const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
                const isURL = urlPattern.test(data.message);
                if (isURL) {
                    displaySendMessage(data.message);
                }
                console.log("Fetched sucessfully send Message request");
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("User Details not Found");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
            ;
        }
        catch (error) {
            console.error("Error in fetching Private sending message", error);
        }
        ;
    });
}
function sendMultiMediaMessage(selectedFile, id, messageType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("From SendMulti media file", selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('receiverId', id);
            formData.append('messageType', messageType);
            console.log(formData);
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/sendMediaMessage', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (response.status === 200) {
                const data = yield response.json();
                console.log("From Send Message Mutlimedia", data);
                console.log("Fetched sucessfully send MultiMedia request");
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("User Details not Found");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
            ;
        }
        catch (error) {
            console.error("Error in fetching Send media file request", error);
        }
        ;
    });
}
function getAllPrivateMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/getAllPrivateMessages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = yield response.json();
                console.log("Fetched sucessfully get All Private Message request");
                localStorage.setItem("PrivateChats", JSON.stringify(data));
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("User Details not Found");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
            ;
        }
        catch (error) {
            console.error("Error in fetching all private message", error);
        }
    });
}
function getAllGroupMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const allGroupsId = allGroups.map(group => group.GroupId);
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/getAllGroupMessages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    allGroupsId: allGroupsId
                })
            });
            if (response.status === 200) {
                const data = yield response.json();
                console.log("Fetched sucessfully get All Group Message request");
                localStorage.setItem("GroupChats", JSON.stringify(data));
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("User Details not Found");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
            ;
        }
        catch (error) {
            console.error("Error in fetching all group message", error);
        }
        ;
    });
}
function leaveGroup(group) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch(`/chats/leaveGroup/${group.GroupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                yield response.json();
                console.log(`User left the group: ${group.groupName} `);
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("User Details not Found");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
            ;
        }
        catch (error) {
            console.error("Error in fetching leave group request", error);
        }
    });
}
