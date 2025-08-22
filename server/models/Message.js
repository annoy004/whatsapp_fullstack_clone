import mongoose from "mongoose";

const MessageSchema= new mongoose.Schema({
    conversationId: {
        type:String
    },
    senderId: {
        type:String
    },
    receiverId: {
        type:String
    },
    text: {
        type:String
    },
    type: {
        type:String
    },
    

}, {
    timestamps:true
});


const message = mongoose.model('Message', MessageSchema);

export default message;



// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema(
//   {
//     conversationId: { type: String, required: true },
//     senderId: { type: String, required: true },
//     receiverId: { type: String }, // keep for 1-1; not used for group
//     text: { type: String, required: true },
//     type: { type: String, default: "text" },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", MessageSchema);
// export default Message;
