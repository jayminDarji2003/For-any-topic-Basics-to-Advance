import express from "express";
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"

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

// creating one circuit
io.on("connection", (socket) => {
    // console.log("used connected ", socket.id);

    socket.on("message", (msg) => {
        console.log(msg);
    })

    //  send message to everyone, even self also
    // socket.emit("welcome", `welcome to the server ${socket.id}`); 

    // send message to everyone but except self
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`);

    // disconnect socket
    // socket.on("disconnect", () => {
    //     console.log("user disconnected", socket.id);
    // })
})

server.listen(3000, () => {
    console.log("server listening on 3000 port")
})