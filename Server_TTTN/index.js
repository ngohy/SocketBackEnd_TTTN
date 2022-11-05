const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


//route socket
const authRoutes = require("./routes/routeSocket/auth");
const messageRoutes = require("./routes/routeSocket/messages");


//route api aribnb
const userRoutes = require("./routes/routeAribnb/routeUser");
const bookingRoomRoutes = require("./routes/routeAribnb//routeBookingRoom");
const roomRoutes = require("./routes/routeAribnb/routeComment");
const locationRoutes = require("./routes/routeAribnb/routeLocation");
const commentRoutes = require("./routes/routeAribnb/routeComment");



//api for socket 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//api app aribnb
//route room
app.use("/api/room", roomRoutes)
//route comment
app.use("/api/comment", commentRoutes)
//route location
app.use("/api/location", locationRoutes);
//route user
app.use("/api/user", userRoutes)
//route booking
app.use("/api/booking", bookingRoomRoutes)



const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
