import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 9000;
app.use(express.static(path.resolve("./public")))

// handle socket.io request
io.on("connection", (socket) => {  // socket is basically client
    socket.on("user-message", (message) => {  // fech from client
        // console.log("A new user messge => ", message)
        io.emit("msg", message)  // send server to client
    })
})



// handle http requests
app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
})

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});