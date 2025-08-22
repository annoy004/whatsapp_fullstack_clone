import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import route from './routes/route.js';


const app = express();

app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",route);

      


Connection();

const PORT =8000;


app.listen(PORT, ()=> console.log(`Server is running on successfully on port ${PORT}`))


// //import express from "express";
// import {
//   newConversation,
//   getConversation,
//   createGroup,
//   addMembersToGroup,
//   removeMemberFromGroup,
//   getGroupById,
//   listMyConversations,
// } from "../controllers/conversation.js";
// import { newMessage, getMessages } from "../controllers/message.js";

// const router = express.Router();

// // 1-1
// router.post("/conversations", newConversation);
// router.post("/conversations/find", getConversation);

// // Groups
// router.post("/groups", createGroup);
// router.patch("/groups/:conversationId/members", addMembersToGroup);
// router.delete("/groups/:conversationId/members", removeMemberFromGroup);
// router.get("/groups/:id", getGroupById);

// // Shared
// router.get("/users/:userId/conversations", listMyConversations);
// router.post("/messages", newMessage);
// router.get("/messages/:id", getMessages);

// export default router;
