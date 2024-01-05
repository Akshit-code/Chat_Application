"use strict";
let connected = false;
function connectToSocket() {
    const socket = io('http://localhost:3000');
    if (!connected) {
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });
        connected = true;
    }
    ;
    function createPrivateRoom(senderId) {
        socket.emit('createPrivateRoom', senderId);
    }
    function sendPrivatemessage(senderId, receiverId, message) {
        socket.emit("sendPrivateMessage", { senderId, receiverId, message });
        const existingChats = JSON.parse(localStorage.getItem("PrivateChats") || '[]');
        const time = new Date(Date.now()).toISOString();
        const new_message = [{
                message: message,
                senderId: senderId,
                receiverId: receiverId,
                messageType: 'private',
                createdAt: time,
            }];
        const updatedChats = existingChats.concat(new_message);
        localStorage.setItem('PrivateChats', JSON.stringify(updatedChats));
    }
    function joinOrCreateGroupRoom(groupId) {
        socket.emit('joinGroupChat', groupId);
    }
    ;
    function sendGroupSocketMessage(currentUser, groupId, message) {
        socket.emit('sendGroupMessage', { currentUser, groupId, message });
        const existingChats = JSON.parse(localStorage.getItem("GroupChats") || '[]');
        const time = new Date(Date.now()).toISOString();
        const new_message = [{
                message: message,
                senderId: currentUser,
                receiverId: groupId,
                messageType: 'group',
                createdAt: time,
            }];
        const updatedChats = existingChats.concat(new_message);
        localStorage.setItem('GroupChats', JSON.stringify(updatedChats));
    }
    ;
    socket.on("newPrivateMessage", (data) => {
        displayReceviedMessage(data.message);
        const existingChats = JSON.parse(localStorage.getItem("PrivateChats") || '[]');
        const time = new Date(Date.now()).toISOString();
        const new_message = [{
                message: data.message,
                senderId: data.senderId,
                receiverId: data.receiverId,
                messageType: 'private',
                createdAt: time,
            }];
        const updatedChats = existingChats.concat(new_message);
        localStorage.setItem('PrivateChats', JSON.stringify(updatedChats));
    });
    socket.on("joinedPrivateRoom", (data) => {
        console.log("User Joined  private Room", data.receiverId);
    });
    socket.on('receiveGroupMessage', (data) => {
        if (currentUser.id !== data.senderId) {
            displayReceviedMessage(data.message);
        }
        ;
        const existingChats = JSON.parse(localStorage.getItem("GroupChats") || '[]');
        const time = new Date(Date.now()).toISOString();
        const new_message = [{
                message: data.message,
                senderId: data.senderId,
                receiverId: data.receiverId,
                messageType: 'group',
                createdAt: time,
            }];
        const updatedChats = existingChats.concat(new_message);
        localStorage.setItem('GroupChats', JSON.stringify(updatedChats));
    });
    return {
        createPrivateRoom,
        sendPrivatemessage,
        joinOrCreateGroupRoom,
        sendGroupSocketMessage
    };
}
