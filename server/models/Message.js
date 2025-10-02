import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId: { type: String }, // for 1-1
    groupId: { type: String },        // for group
    senderId: { type: String },
    senderName: { type: String },     // for group display
    receiverId: { type: String },
    text: { type: String },
    type: { type: String },
    isGroup: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
