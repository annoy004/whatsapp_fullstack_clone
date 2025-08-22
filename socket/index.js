import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// Add user (avoid duplicates, allow multiple tabs)
const addUser = (userData, socketId) => {
  const existingUser = users.find((user) => user.sub === userData.sub && user.socketId === socketId);
  if (!existingUser) {
    users.push({ ...userData, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.filter((user) => user.sub === userId); // return all sessions
};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Track connected users
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  // Join a private conversation (room)
  socket.on("joinPrivate", ({ conversationId }) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined private room ${conversationId}`);
  });

  // Join a group chat (room)
  socket.on("joinGroup", ({ groupId }) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  // Send message (works for both private & group)
  socket.on("sendMessage", (data) => {
    const { isGroup, groupId, conversationId, receiverId, message } = data;

    if (isGroup) {
      // send to group room
      io.to(groupId).emit("getMessage", data);
      console.log(`📢 Group ${groupId} message:`, message);
    } else {
      // private: send to receiver’s sockets
      const receiverSessions = getUser(receiverId);
      if (receiverSessions.length > 0) {
        receiverSessions.forEach((user) => {
          io.to(user.socketId).emit("getMessage", data);
        });
        console.log(`📩 Private message to ${receiverId}:`, message);
      } else {
        console.log("⚠️ User not found:", receiverId);
      }

      // also emit to sender’s own socket (for multi-device sync)
      socket.emit("getMessage", data);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
//////////
// import { Server } from "socket.io";

// const io = new Server(9000, {
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// });

// let users = [];

// const addUser = (userData, socketId) => {
//     const existingUser = users.find(user => user.sub === userData.sub);
//     if (!existingUser) {
//         users.push({ ...userData, socketId });
//     }
// };

// const getUser = (userId) => {
//     return users.find(user=> user.sub === userId);
// }

// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('addUsers', (userData) => {
//         addUser(userData, socket.id);
//         io.emit("getUsers", users);
//     });

//     socket.on('sendMessage', (data) => {
//         const user = getUser(data.receiverId);
//         if (user) {
//             io.to(user.socketId).emit('getMessage', data);
//         } else {
//             console.log('User not found');
//         }
//     });
// });
