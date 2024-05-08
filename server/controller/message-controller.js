import Message from '../models/Message.js';
import conversation from '../models/conversation.js';
export const newMessage=async(request,response) => {
    try {
        const newMessage = new Message(request.body);
        await newMessage.save();
        await conversation.findByIdAndUpdate(request.body.conversationId, {message : request.body.text});
        return response.status(200).json('Message has been sent successfully');
        
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
export const getMessages = async (request,response) => {
    try {
        const messages = await Message.find({conversationId:request.params.id});
        if(!messages) {
            return response.status(404).json('no message found here plz get away');
        }
        return response.status(200).json(messages);
    } catch (error) {
       return response.status(500).json(error.message); 
    }
}