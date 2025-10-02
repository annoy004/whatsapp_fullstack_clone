import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    isGroup: { type: Boolean, default: false },
    name: { type: String },
    avatar: { type: String },
    members: { type: [String], required: true },
    admins: { type: [String], default: [] },
    message: { type: String }, // last message preview
}, {
    timestamps: true
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;
