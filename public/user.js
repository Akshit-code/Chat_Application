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
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    phoneNo: user.phoneNo
                }),
            });
            if (response.status === 201) {
                console.log("New User Added");
                if (signUpDiv) {
                    signUpDiv.style.display = "none";
                }
                ;
                if (loginDiv) {
                    loginDiv.style.display = "block";
                }
            }
            else if (response.status === 409) {
                console.log("User Already Exits");
                alert("User with the same Phone Number already exists!");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error in fetching register user", error);
        }
    });
}
let isloggedIn = false;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNo: user.phoneNo,
                    password: user.password
                }),
            });
            if (response.status === 200) {
                const data = yield response.json();
                localStorage.setItem('token', data.token);
                console.log(`User ${data.firstName} ${data.lastName} have Logged In`);
                if (loginDiv) {
                    loginDiv.style.display = "none";
                }
                ;
                window.location.href = "/chats";
                isloggedIn = true;
            }
            else if (response.status === 401) {
                console.log("Incorrect Password");
                alert("Incorrect Phone Number or password");
            }
            else if (response.status === 404) {
                console.log("User Not FOund");
                alert("No user Found with this phone number, Kidly signUp first");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error in fetching Login User", error);
        }
    });
}
function logoutuser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/logoutUser', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 201) {
                localStorage.clear();
                console.log("User Have Logged Out");
            }
            else if (response.status === 404) {
                console.log("User Not FOund");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error in fetching LogOut Requestr", error);
        }
    });
}
let currentUser;
function getCurrentUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/getCurrentUserDetails', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = yield response.json();
                data.token = token;
                currentUser = data;
                console.log("Successfully fetched current User details");
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
        }
        catch (error) {
            console.error("Error in fetching Current User Details", error);
        }
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/addContact', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNo: contact.phoneNo
                })
            });
            if (response.status === 201) {
                const responseData = yield response.json();
                console.log(`${responseData.firstName} ${responseData.lastName} have been Added in Contacts`);
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else if (response.status === 404) {
                console.log("Added Contact User Not found");
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function addGroup(selectedUsers, groupName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/addGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    groupName: groupName,
                    groupMembers: selectedUsers,
                })
            });
            if (response.status === 201) {
                yield response.json();
                console.log("Added New Group");
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log("Error in fetching Add group ", error);
        }
    });
}
let allContacts;
function getAllContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/getAllContacts', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = yield response.json();
                allContacts = data;
                tableBody(allContacts);
                allContacts.forEach((contact) => {
                    displayContactCard(contact);
                });
                console.log("Fetched sucessfully Users all contacts details");
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
        }
        catch (error) {
            console.error("Error in fetching User all contact Details", error);
        }
    });
}
let allGroups;
function getAllGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/getAllGroups', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = yield response.json();
                allGroups = data;
                allGroups.forEach(group => {
                    displayGroupCard(group);
                });
                console.log("Fetched sucessfully Users all groups details");
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
        }
        catch (error) {
            console.error("Error in fetching All groups Details", error);
        }
    });
}
function getAllGroupMembers(group) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("token") || '';
        try {
            const response = yield fetch(`chats/getAllMembers/${group.GroupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = yield response.json();
                const allGroupsMembers = generateContactList(data);
                if (groupMemberListDiv) {
                    groupMemberListDiv.appendChild(allGroupsMembers);
                }
                ;
                if (addAdminDivListDiv) {
                    addAdminDivListDiv.appendChild(allGroupsMembers);
                }
                const nonGroupMembersList = [];
                allContacts.forEach((contact) => {
                    if (!data.some((member) => member.contactId === contact.contactId)) {
                        nonGroupMembersList.push(contact);
                    }
                });
                const nonMembers = generateContactList(nonGroupMembersList);
                if (addGroupMemberListDiv) {
                    addGroupMemberListDiv.appendChild(nonMembers);
                }
                ;
                console.log("Fetched sucessfully all group members details");
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
        }
        catch (error) {
            console.error("Error in fetching all Group Members Details", error);
        }
    });
}
function getAllAdmins(group) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("token") || '';
        try {
            const response = yield fetch(`chats/getAllAdmins/${group.GroupId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data = yield response.json();
                data.forEach((admin) => {
                    admin.contactId = admin.id;
                });
                const groupAdminslist = generateContactList(data);
                if (removeAdminListDIv) {
                    removeAdminListDIv.appendChild(groupAdminslist);
                }
                ;
                console.log("Fetched sucessfully all group admins details");
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
        }
        catch (error) {
            console.error("Error in fetching all Group Admins Details", error);
        }
    });
}
function adminOperations(selectedUsers, groupName, opsType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('/chats/adminOps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    groupName: groupName,
                    selectedMembers: selectedUsers,
                    opsType: opsType,
                    groupId: currentGroup.GroupId
                })
            });
            if (response.status === 201) {
                yield response.json();
                console.log("Admin Operation Done successfully");
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log("Error in fetching Admin operation request ", error);
        }
    });
}
function getAllInvites() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('chats/getAllInvites', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data = yield response.json();
                console.log("Got all invites");
                console.log(data);
                data.forEach((invite) => {
                    displayInvites(invite);
                });
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log("Error in fetching get All invites request ", error);
        }
    });
}
function respondInvites(invite) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("token") || '';
            const response = yield fetch('chats/responseInvites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    invite: invite
                })
            });
            if (response.status === 201) {
                const data = yield response.json();
                console.log("Got all invies");
                console.log(data);
            }
            else if (response.status === 401 || 403) {
                console.log("Unauthorized User");
            }
            else {
                console.log(`Error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log("Error in fetching respond invites request ", error);
        }
    });
}
