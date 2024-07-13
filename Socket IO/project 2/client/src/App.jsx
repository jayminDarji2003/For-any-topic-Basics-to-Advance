import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connected");
    // });
    // socket.on("welcome", (msg) => {
    //   console.log(msg);
    // });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        welcome to socket.io
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outline-basic"
          label="Outlined"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          send
        </Button>
      </form>
    </Container>
  );
}

export default App;
