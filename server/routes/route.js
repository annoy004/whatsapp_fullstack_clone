import express from "express";
import { addUser, getUsers } from "../controller/user_controller.js";
import {
  newConversation,
  getConversation,
  createGroup,
  getGroups,
  getGroupById,
  addMembersToGroup,
  removeMemberFromGroup,
  editGroup
} from "../controller/conversation-controller.js";
import { newMessage, getMessages, getGroupMessages } from "../controller/message-controller.js";
import { uploadFile, getImage } from "../controller/image-controller.js";
import upload from '../utils/upload.js';
const route = express.Router();

route.post("/add", addUser);
route.get('/users', getUsers);
route.post('/conversation/ad', newConversation);
route.post('/conversation/gets', getConversation);
route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);
route.get('/group/messages/:id', getGroupMessages);
route.post('/file/upload', upload.single("file"), uploadFile);
route.get('/file/:filename', getImage);

// Group chat routes
route.post('/group/create', createGroup);
route.get('/groups', getGroups);
route.get('/group/:id', getGroupById);
route.post('/group/:conversationId/add-members', addMembersToGroup);
route.post('/group/:conversationId/remove-member', removeMemberFromGroup);
route.patch('/group/:conversationId/edit', editGroup);

export default route;