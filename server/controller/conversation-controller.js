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