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
var _a, _b;
const topNav = document.getElementById("myTopnav");
const icon = document.querySelector(".icon");
const closeSpans = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");
const myContactsNavBtn = document.getElementById("myContacts");
const tableDiv = document.getElementById("tableContainerDiv");
const signUpDiv = document.getElementById("signup-form-div");
const signUpBtn = document.getElementById("signUp-btn");
const signUpSubmitBtn = document.getElementById("signUp-Submit-Btn");
const signUpForm = document.getElementById("signup-form");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNo = document.getElementById("phoneNo");
const loginDiv = document.getElementById("login-form-div");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.getElementById("login-form");
const loginPhoneNo = document.getElementById("login-phoneNo");
const loginPassword = document.getElementById("login-password");
const logoutBtn = document.getElementById("logout-btn");
const profileDiv = document.getElementById("profile-div");
const profileBtn = document.getElementById("profile-btn");
const addContactDiv = document.getElementById("addContactDiv");
const addContactBtn = document.getElementById("addContact-btn");
const addContactForm = document.getElementById("addContactForm");
const contactFirstName = document.getElementById("contactFirstName");
const contactLastName = document.getElementById("contactLastName");
const contactPhoneNo = document.getElementById("contactPhoneNo");
const addGroupDiv = document.getElementById("addGroupDiv");
const addGroupForm = document.getElementById("addGroupForm");
const groupName = document.getElementById("groupName");
const addGroupBtn = document.getElementById("createGroup-btn");
const groupSubmitBtn = document.getElementById("Group-Submit-Btn");
const addAdminBtn = document.getElementById("addAdminBtn");
const removeAdminBtn = document.getElementById("removeAdminBtn");
const editGroupDiv = document.getElementById("editGroupDiv");
const editGroupNameDiv = document.getElementById("editGroupNameDiv");
const editGroupNameBtn = document.getElementById("editGroupNameBtn");
const editGroupNameSubmitBtn = document.getElementById("editGroupNameubmitBtn");
const editGroupNameForm = document.getElementById("editGroupNameForm");
const editGroupNameInput = document.getElementById("editGroupNameInput");
const removeGroupMembersDiv = document.getElementById("removeGroupMembersDiv");
const removeGroupMembersBtn = document.getElementById("removeGroupMembersBtn");
const removeGroupMemberForm = document.getElementById("removeGroupMemberForm");
const groupMemberListDiv = document.getElementById("GroupMemberList");
const addGroupMembersDiv = document.getElementById("addGroupMembersDiv");
const addGroupMembersBtn = document.getElementById("addGroupMembersBtn");
const addGroupMemberListDiv = document.getElementById("addGroupMemberList");
const addGroupMemberForm = document.getElementById("addGroupMemberForm");
const addAdminDiv = document.getElementById("addAdminDiv");
const addAdminDivListDiv = document.getElementById("addAdminList");
const addAdminForm = document.getElementById("addAdminForm");
const addAdminSubmitBtn = document.getElementById("addAdminSubmitBtn");
const removeAdminDiv = document.getElementById("removeAdminDiv");
const removeAdminListDIv = document.getElementById("removeAdminList");
const removeAdminForm = document.getElementById("removeAdminForm");
const removeAdminSubmitBtn = document.getElementById("emoveAdminSubmitBtn");
const chatsSectionDiv = document.getElementById("chatsSectionDiv");
const myChatsNavBtn = document.getElementById("myChats");
const myInvitesBtn = document.getElementById("myInvites");
const myInvitesDiv = document.getElementById("myInvitesDiv");
function toggleNav() {
    if (topNav) {
        topNav.classList.toggle("responsive");
    }
    ;
}
function closeModal() {
    modals.forEach((modal) => {
        modal.style.display = "none";
    });
}
if (icon) {
    icon.addEventListener("click", (e) => {
        e.preventDefault();
        toggleNav();
    });
}
if (window) {
    window.onclick = (event) => {
        modals.forEach((modal) => {
            if (event.target === modal) {
                if (signUpDiv) {
                    signUpDiv.style.display = "none";
                }
                ;
                if (loginDiv) {
                    loginDiv.style.display = "none";
                }
                ;
                if (profileDiv) {
                    profileDiv.style.display = "none";
                }
                ;
                if (addContactDiv) {
                    addContactDiv.style.display = "none";
                }
                ;
                if (addGroupDiv) {
                    addGroupDiv.style.display = "none";
                }
                ;
                if (editGroupDiv) {
                    editGroupDiv.style.display = "none";
                }
                ;
                if (editGroupNameDiv) {
                    editGroupNameDiv.style.display = "none";
                }
                ;
                if (addGroupMembersDiv) {
                    addGroupMembersDiv.style.display = "none";
                }
                ;
                if (removeGroupMembersDiv) {
                    removeGroupMembersDiv.style.display = "none";
                }
                ;
                if (addAdminDiv) {
                    addAdminDiv.style.display = "none";
                }
                ;
                if (removeAdminDiv) {
                    removeAdminDiv.style.display = "none";
                }
                ;
            }
            ;
        });
    };
}
if (closeSpans) {
    closeSpans.forEach((closeSpan) => {
        closeSpan.addEventListener("click", () => {
            closeModal();
        });
    });
}
if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        if (signUpDiv) {
            signUpDiv.style.display = "block";
        }
        ;
    });
}
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        if (loginDiv) {
            loginDiv.style.display = "block";
        }
        ;
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield logoutuser();
        window.location.href = "../";
        localStorage.removeItem("token");
    }));
}
if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        if (profileDiv) {
            profileDiv.style.display = "block";
        }
        ;
    });
}
if (addContactBtn) {
    addContactBtn.addEventListener("click", () => {
        if (addContactDiv) {
            addContactDiv.style.display = "block";
        }
        ;
    });
}
if (addGroupBtn) {
    addGroupBtn.addEventListener("click", () => {
        if (addGroupDiv) {
            addGroupDiv.style.display = "block";
        }
        ;
        const contactList = generateContactList(allContacts);
        if (addGroupForm) {
            addGroupForm.insertBefore(contactList, groupSubmitBtn);
        }
        ;
    });
}
if (editGroupNameBtn) {
    editGroupNameBtn.addEventListener("click", () => {
        if (editGroupNameDiv) {
            editGroupNameDiv.style.display = "block";
        }
    });
}
if (removeGroupMembersBtn) {
    removeGroupMembersBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
        if (removeGroupMembersDiv) {
            removeGroupMembersDiv.style.display = 'block';
        }
    });
}
if (addGroupMembersBtn) {
    addGroupMembersBtn.addEventListener("click", () => {
        if (addGroupMembersDiv) {
            const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
            checkboxes.forEach((checkBox) => {
                checkBox.checked = false;
            });
            addGroupMembersDiv.style.display = "block";
        }
    });
}
if (addAdminBtn) {
    addAdminBtn.addEventListener("click", () => {
        if (addAdminDiv) {
            const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
            checkboxes.forEach((checkBox) => {
                checkBox.checked = false;
            });
            addAdminDiv.style.display = "block";
        }
        ;
    });
}
if (removeAdminBtn) {
    removeAdminBtn.addEventListener("click", () => {
        if (removeAdminDiv) {
            const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
            checkboxes.forEach((checkBox) => {
                checkBox.checked = false;
            });
            removeAdminDiv.style.display = "block";
        }
    });
}
function signUpFormValidation() {
    if (newPassword && confirmPassword && signUpSubmitBtn) {
        signUpSubmitBtn.disabled = !(newPassword.value.trim() !== '' && confirmPassword.value.trim() !== '' && newPassword.value === confirmPassword.value);
    }
    ;
}
if (newPassword) {
    newPassword.addEventListener("input", signUpFormValidation);
}
if (confirmPassword) {
    confirmPassword.addEventListener("input", signUpFormValidation);
}
if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (firstName && lastName && email && newPassword && phoneNo) {
            const formData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: newPassword.value,
                phoneNo: parseInt(phoneNo.value)
            };
            registerUser(formData);
            if (loginDiv) {
                loginDiv.style.display = "block";
            }
            ;
        }
        ;
    });
}
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (loginDiv) {
            loginDiv.style.display = "none";
        }
        if (loginPhoneNo && loginPassword) {
            const formData = {
                phoneNo: parseInt(loginPhoneNo.value),
                password: loginPassword.value
            };
            loginUser(formData);
        }
        ;
    });
}
if (addContactForm) {
    addContactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (addContactDiv) {
            addContactDiv.style.display = "none";
        }
        if (contactFirstName && contactLastName && contactPhoneNo) {
            const formData = {
                firstName: contactFirstName.value,
                lastName: contactLastName.value,
                phoneNo: parseInt(contactPhoneNo.value)
            };
            addContact(formData);
        }
    });
}
if (addGroupForm) {
    addGroupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedUsers = Array.from(document.querySelectorAll('input[name="selectedUsers"]:checked')).map((checkbox) => checkbox.value);
        if (addGroupDiv) {
            addGroupDiv.style.display = "none";
        }
        if (groupName) {
            addGroup(selectedUsers, groupName.value);
        }
        ;
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
    });
}
if (addGroupMemberForm) {
    addGroupMemberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (addGroupMembersDiv) {
            addGroupMembersDiv.style.display = "none";
        }
        ;
        const selectedUsers = Array.from(document.querySelectorAll(`input[name=selectedUsers]:checked`)).map((checkBox) => checkBox.value);
        console.log("Selected Users:", selectedUsers);
        adminOperations(selectedUsers, currentGroup.groupName, "addMembers");
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
    });
}
if (removeGroupMemberForm) {
    removeGroupMemberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (removeGroupMembersDiv) {
            removeGroupMembersDiv.style.display = "none";
        }
        const selectedUsers = Array.from(document.querySelectorAll(`input[name=selectedUsers]:checked`)).map((checkBox) => checkBox.value);
        console.log("Selected Users:", selectedUsers);
        adminOperations(selectedUsers, currentGroup.groupName, "removeMembers");
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
    });
}
if (editGroupNameForm) {
    editGroupNameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (editGroupNameDiv) {
            editGroupNameDiv.style.display = "none";
        }
        if (editGroupNameInput) {
            const newGroupName = editGroupNameInput.value;
            adminOperations([], newGroupName, "editGroupName");
            console.log(newGroupName);
        }
        ;
    });
}
if (addAdminForm) {
    addAdminForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (addAdminDiv) {
            addAdminDiv.style.display = "none";
        }
        ;
        const selectedUsers = Array.from(document.querySelectorAll(`input[name=selectedUsers]:checked`)).map((checkBox) => checkBox.value);
        console.log("Selected Users:", selectedUsers);
        adminOperations(selectedUsers, currentGroup.groupName, "addAdmin");
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
    });
}
if (removeAdminForm) {
    removeAdminForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (removeAdminDiv) {
            removeAdminDiv.style.display = "none";
        }
        ;
        const selectedUsers = Array.from(document.querySelectorAll(`input[name=selectedUsers]:checked`)).map((checkBox) => checkBox.value);
        console.log("Selected Users:", selectedUsers);
        adminOperations(selectedUsers, currentGroup.groupName, "removeAdmin");
        const checkboxes = document.querySelectorAll(`input[name=selectedUsers]:checked`);
        checkboxes.forEach((checkBox) => {
            checkBox.checked = false;
        });
    });
}
let socketFunctions;
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token") || '';
    if (!token) {
        console.log("No token Found");
        return;
    }
    else {
        try {
            yield Promise.all([
                getCurrentUserDetails(),
                getAllContacts().then(() => getAllPrivateMessages()),
                getAllGroups().then(() => getAllGroupMessages())
            ]);
            socketFunctions = connectToSocket();
        }
        catch (error) {
            console.error("Error occurred while loading data:", error);
        }
    }
    ;
}));
function openNav() {
    const sidepanel = document.getElementById("sidepanel");
    const mainContent = document.getElementsByClassName("main-content")[0];
    if (sidepanel && mainContent) {
        sidepanel.style.width = "250px";
        mainContent.style.marginLeft = "250px";
    }
    ;
}
function closeNav() {
    const sidepanel = document.getElementById("sidepanel");
    const mainContent = document.getElementsByClassName("main-content")[0];
    if (sidepanel && mainContent) {
        sidepanel.style.width = "0";
        mainContent.style.marginLeft = "0";
    }
    ;
}
(_a = document.getElementById("openBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", openNav);
(_b = document.getElementById("closeBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", closeNav);
function createContactRow(contact) {
    const row = document.createElement('tr');
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = contact.firstName;
    row.appendChild(firstNameCell);
    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = contact.lastName;
    row.appendChild(lastNameCell);
    const phoneNumberCell = document.createElement('td');
    phoneNumberCell.textContent = contact.phoneNo.toString();
    row.appendChild(phoneNumberCell);
    const actionsCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    actionsCell.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    actionsCell.appendChild(deleteBtn);
    const viewChatsBtn = document.createElement('button');
    viewChatsBtn.textContent = 'View Chats';
    actionsCell.appendChild(viewChatsBtn);
    row.appendChild(actionsCell);
    return row;
}
if (myContactsNavBtn) {
    myContactsNavBtn.addEventListener("click", () => {
        if (tableDiv && chatsSectionDiv) {
            tableDiv.style.display = "block";
            chatsSectionDiv.style.display = "none";
        }
        ;
    });
}
if (myChatsNavBtn) {
    myChatsNavBtn.addEventListener("click", () => {
        if (tableDiv) {
            tableDiv.style.display = "none";
        }
        ;
        if (myInvitesDiv) {
            myInvitesDiv.style.display = 'none';
        }
        ;
        if (chatsSectionDiv) {
            chatsSectionDiv.style.display = "none";
        }
    });
}
function tableBody(contacts) {
    const tableBody = document.querySelector('#contactTable tbody');
    if (tableBody) {
        contacts.forEach(contact => {
            const row = createContactRow(contact);
            tableBody.appendChild(row);
        });
    }
    ;
}
function generateContactList(contacts) {
    const contactListDiv = document.createElement("div");
    contactListDiv.classList.add("contact-list");
    contacts.forEach((contact) => {
        const contactLabel = document.createElement("label");
        contactLabel.htmlFor = `${contact.contactId}`;
        const contactCheckBox = document.createElement("input");
        contactCheckBox.type = "checkbox";
        contactCheckBox.id = `${contact.contactId}`;
        contactCheckBox.name = "selectedUsers";
        contactCheckBox.value = contact.contactId;
        const contactName = document.createTextNode(`${contact.firstName} ${contact.lastName}`);
        contactLabel.appendChild(contactCheckBox);
        contactLabel.appendChild(contactName);
        contactListDiv.appendChild(contactLabel);
    });
    return contactListDiv;
}
if (myInvitesBtn) {
    myInvitesBtn.addEventListener("click", () => {
        if (myInvitesDiv) {
            myInvitesDiv.innerHTML = '';
            getAllInvites();
            myInvitesDiv.style.display = "block";
        }
        ;
        if (chatsSectionDiv) {
            chatsSectionDiv.style.display = "none";
        }
        ;
        if (tableDiv) {
            tableDiv.style.display = "none";
        }
    });
}
function displayInvites(invite) {
    const singleInviteDiv = document.createElement("div");
    const text = document.createTextNode(`Hiii You have been invited to join : ${invite.otherDetails}`);
    const acceptInviteBtn = document.createElement('button');
    acceptInviteBtn.innerText = "Accept";
    const rejectInviteBtn = document.createElement("button");
    rejectInviteBtn.innerText = "Reject";
    singleInviteDiv.appendChild(text);
    singleInviteDiv.appendChild(acceptInviteBtn);
    singleInviteDiv.appendChild(rejectInviteBtn);
    acceptInviteBtn.addEventListener("click", () => {
        invite.response = true;
        respondInvites(invite);
        acceptInviteBtn.remove();
        rejectInviteBtn.remove();
        singleInviteDiv.remove();
    });
    rejectInviteBtn.addEventListener("click", () => {
        invite.response = false;
        respondInvites(invite);
        acceptInviteBtn.remove();
        rejectInviteBtn.remove();
        singleInviteDiv.remove();
    });
    if (myInvitesDiv) {
        myInvitesDiv.appendChild(singleInviteDiv);
    }
    ;
}
