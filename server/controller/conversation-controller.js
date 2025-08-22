import Conversation from "../models/conversation.js";

export const newConversation =async (request,response) => {
    try{
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;
        const exist = await Conversation.findOne({members: {$all :[receiverId,senderId]}})//$all yeh batayega ki array ki sab 
        if(exist) {
            return response.status(200).json('conversation already exist');
        }
        const newConversation = new Conversation({
            members: [senderId,receiverId]
        })
        await newConversation.save();
        return response.status(200).json('conversation saved succesfully');
    }catch(error) {
        return response.status(500).json(error.message);
    }
}

export const getConversation = async (request,response) => {
    try{
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;
        console.log(receiverId);

      let conversation =  await Conversation.findOne({members:{$all: [receiverId,senderId]}})
      console.log(conversation + "hwllo");
      return response.status(200).json(conversation);
      
    }catch(error) {
        return response.status(500).json(error.message);
    }
}



// // controllers/conversation.js
// import Conversation from "../models/conversation.js";

// // 1-1: unchanged
// export const newConversation = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.body;
//     if (!senderId || !receiverId) return res.status(400).json("Missing ids");

//     const exist = await Conversation.findOne({
//       isGroup: false,
//       members: { $all: [receiverId, senderId] },
//     });

//     if (exist) return res.status(200).json('conversation already exist');

//     const conv = new Conversation({
//       isGroup: false,
//       members: [senderId, receiverId],
//     });

//     await conv.save();
//     return res.status(200).json('conversation saved succesfully');
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // 1-1: unchanged
// export const getConversation = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.body;
//     const conv = await Conversation.findOne({
//       isGroup: false,
//       members: { $all: [receiverId, senderId] },
//     });
//     return res.status(200).json(conv);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// /** ---------- GROUP ENDPOINTS (NEW) ---------- **/

// // Create a group conversation
// export const createGroup = async (req, res) => {
//   try {
//     const { name, creatorId, memberIds = [] } = req.body;
//     if (!name || !creatorId) return res.status(400).json("Missing name/creatorId");

//     const members = Array.from(new Set([creatorId, ...memberIds])); // ensure creator included

//     const conv = new Conversation({
//       isGroup: true,
//       name,
//       members,
//       admins: [creatorId],
//     });

//     await conv.save();
//     return res.status(200).json(conv);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // Add member(s) to a group
// export const addMembersToGroup = async (req, res) => {
//   try {
//     const { conversationId } = req.params;
//     const { userIds = [] } = req.body;

//     const conv = await Conversation.findByIdAndUpdate(
//       conversationId,
//       { $addToSet: { members: { $each: userIds } } },
//       { new: true }
//     );

//     if (!conv || !conv.isGroup) return res.status(404).json("Group not found");
//     return res.status(200).json(conv);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // Remove a member from a group
// export const removeMemberFromGroup = async (req, res) => {
//   try {
//     const { conversationId } = req.params;
//     const { userId } = req.body;

//     const conv = await Conversation.findByIdAndUpdate(
//       conversationId,
//       { $pull: { members: userId, admins: userId } },
//       { new: true }
//     );

//     if (!conv || !conv.isGroup) return res.status(404).json("Group not found");
//     return res.status(200).json(conv);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // Get group by id (for header, members list, etc.)
// export const getGroupById = async (req, res) => {
//   try {
//     const conv = await Conversation.findById(req.params.id);
//     if (!conv || !conv.isGroup) return res.status(404).json("Group not found");
//     return res.status(200).json(conv);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // List all conversations (1-1 + groups) for a user
// export const listMyConversations = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const convs = await Conversation.find({ members: userId }).sort({ updatedAt: -1 });
//     return res.status(200).json(convs);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };
