import express from "express";
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"
import jwt from "jsonwebtoken"

const jwt_secret = "abc@123"

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.get("/login", (req, res) => {
    const token = jwt.sign({ _id: "difbfbsfi" }, jwt_secret);

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .json({
            message: "login successful",
        });
})


// middleware in socket.io
const user = true;
io.use((socket, next) => {
    if (user) next();
})


// creating one circuit
io.on("connection", (socket) => {
    console.log("used connected ", socket.id);

    socket.on("message", (msg) => {   // fetch message from client.
        console.log(msg);

        // send message to everyone in IO. self also
        // sab ko message bhej do, khud ko bhi
        // io.emit("receive-message", msg);    

        // except self, send message to to everyone in IO
        // khud ko chhod ke, sab ko bhej do
        // socket.broadcast.emit("receive-message", msg);

        // send message to specific user
        // user id comming from frontend
        socket.to(msg.room).emit("receive-message", msg);
    })

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
    })

    //  send message to everyone, even self also
    // socket.emit("welcome", `welcome to the server ${socket.id}`); 

    // send message to everyone but except self
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`);

    // disconnect socket
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})

server.listen(3000, () => {
    console.log("server listening on 3000 port")
})