import Message from '../models/Message.js';
import Conversation from '../models/conversation.js';

export const newMessage = async (request, response) => {
    try {
        const { isGroup, groupId, conversationId, text } = request.body;
        const newMessage = new Message(request.body);
        await newMessage.save();
        if (isGroup && groupId) {
            await Conversation.findByIdAndUpdate(groupId, { message: text });
        } else if (conversationId) {
            await Conversation.findByIdAndUpdate(conversationId, { message: text });
        }
        return response.status(200).json('Message has been sent successfully');
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const getMessages = async (request, response) => {
    try {
        const messages = await Message.find({ conversationId: request.params.id, isGroup: { $ne: true } });
        if (!messages) {
            return response.status(404).json('no message found here plz get away');
        }
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const getGroupMessages = async (request, response) => {
    try {
        const { userId } = request.query; // Get userId from query parameter
        const groupId = request.params.id;
        
        // First check if the user is a member of this group
        const group = await Conversation.findById(groupId);
        if (!group || !group.isGroup || !group.members.includes(userId)) {
            return response.status(403).json('Access denied: You are not a member of this group');
        }
        
        const messages = await Message.find({ groupId: groupId, isGroup: true });
        if (!messages) {
            return response.status(404).json('no group message found');
        }
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};