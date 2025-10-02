import Conversation from "../models/conversation.js";

export const newConversation = async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;
        const exist = await Conversation.findOne({
            isGroup: false,
            members: { $all: [receiverId, senderId] }
        });
        if (exist) {
            return response.status(200).json('conversation already exist');
        }
        const newConversation = new Conversation({
            isGroup: false,
            members: [senderId, receiverId]
        });
        await newConversation.save();
        return response.status(200).json('conversation saved succesfully');
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const getConversation = async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;
        let conversation = await Conversation.findOne({
            isGroup: false,
            members: { $all: [receiverId, senderId] }
        });
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

// GROUP ENDPOINTS
export const createGroup = async (req, res) => {
    try {
        const { name, creatorId, memberIds = [], avatar } = req.body;
        if (!name || !creatorId) return res.status(400).json("Missing name/creatorId");
        const members = Array.from(new Set([creatorId, ...memberIds]));
        const group = new Conversation({
            isGroup: true,
            name,
            avatar,
            members,
            admins: [creatorId],
        });
        await group.save();
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getGroups = async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from query parameter
        if (!userId) {
            return res.status(400).json("Missing userId");
        }
        // Only return groups where the user is a member
        const groups = await Conversation.find({ 
            isGroup: true,
            members: userId 
        });
        return res.status(200).json(groups);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getGroupById = async (req, res) => {
    try {
        const group = await Conversation.findById(req.params.id);
        if (!group || !group.isGroup) return res.status(404).json("Group not found");
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const addMembersToGroup = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { userIds = [] } = req.body;
        const group = await Conversation.findByIdAndUpdate(
            conversationId,
            { $addToSet: { members: { $each: userIds } } },
            { new: true }
        );
        if (!group || !group.isGroup) return res.status(404).json("Group not found");
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const removeMemberFromGroup = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { userId } = req.body;
        const group = await Conversation.findByIdAndUpdate(
            conversationId,
            { $pull: { members: userId, admins: userId } },
            { new: true }
        );
        if (!group || !group.isGroup) return res.status(404).json("Group not found");
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const editGroup = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { name } = req.body;
        const group = await Conversation.findByIdAndUpdate(
            conversationId,
            { name },
            { new: true }
        );
        if (!group || !group.isGroup) return res.status(404).json("Group not found");
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
