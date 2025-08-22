import mongoose from "mongoose";
 const ConversationSchema = new mongoose.Schema({
    members: {
        type:Array
    },
    message: {
        type:String
    }},
    {
        timestamps:true
    }
    );

    const conversation = mongoose.model('Conversation',ConversationSchema);

    export default conversation;


//     import mongoose from "mongoose";

// const ConversationSchema = new mongoose.Schema(
//   {
//     // works for both: 1-1 and group
//     isGroup: { type: Boolean, default: false },      // <— NEW
//     name: { type: String },                           // <— NEW (group display name)
//     avatar: { type: String },                         // <— optional (group DP)
//     members: { type: [String], required: true },      // userId array
//     admins: { type: [String], default: [] },          // <— NEW (group admins)
//     message: { type: String },                        // last message preview
//   },
//   { timestamps: true }
// );

// const Conversation = mongoose.model("Conversation", ConversationSchema);
// export default Conversation;
