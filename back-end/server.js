require('dotenv').config();
const mongoose = require("mongoose");
require("cors");

// MongoDB connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("MongoDB Connected!")
});

//DB models
require('./models/user');
// require('./models/message');
require('./models/chatroom');

// models for sockets
const User = mongoose.model("User");

// Server 
const app = require("./app");

const server = app.listen(8000, () => {
    console.log("Server is listning on port 8000")
});

//Sockets
const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        credentials: true,
        rejectUnauthorized: false
    }
});


io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();

    } catch (err) { }
});

io.on('connection',(socket) => {
    console.log("Connected : " + socket.userId);
    socket.on("myinfo",async()=>{
        var userInfo = await User.findOne({ _id: socket.userId });
        const meData = { id: socket.id, name: userInfo.name ,userId:socket.userId};
        socket.emit("me", meData);
        console.log("user_name :" + userInfo.name);
    })
    

    socket.on("disconnect", () => {
        console.log("Disconnected : " + socket.userId);
    });

    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom : " + chatroomId);
    });
    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom : " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message}) => {
       
        const user = await User.findOne({ _id: socket.userId });
        SendMessage = {
            id: uuidV4(),
            message,
            name: user.name,
            userId: socket.userId,
            socketId:socket.id
        };

        io.to(chatroomId).emit("newMessage", SendMessage);

    });
      socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})


  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

