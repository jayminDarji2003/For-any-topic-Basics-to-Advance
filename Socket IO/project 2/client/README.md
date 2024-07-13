## websocket client

```
 useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

```

## websocket server

```

// creating one circuit
io.on("connection", (socket) => {
    console.log("used connected ", socket.id);

    //  send message to everyone, even self also
    // socket.emit("welcome", `welcome to the server ${socket.id}`);

    // send message to everyone but except self
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`);

    // disconnect socket
    // socket.on("disconnect", () => {
    //     console.log("user disconnected", socket.id);
    // })
})

```
