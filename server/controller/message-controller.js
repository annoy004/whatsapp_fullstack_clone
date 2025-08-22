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


// // controllers/message.js
// import Message from '../models/Message.js';
// import Conversation from '../models/conversation.js';

// export const newMessage = async (req, res) => {
//   try {
//     const { conversationId, text } = req.body;
//     if (!conversationId || !text) return res.status(400).json("Missing fields");

//     const msg = new Message(req.body);
//     await msg.save();

//     await Conversation.findByIdAndUpdate(conversationId, { message: text });
//     return res.status(200).json("Message has been sent successfully");
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
//     if (!messages || messages.length === 0) {
//       return res.status(404).json("no message found here plz get away");
//     }
//     return res.status(200).json(messages);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }