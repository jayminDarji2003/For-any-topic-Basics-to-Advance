import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [roomName, setRoomName] = useState("");

  // console.log(receivedMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    // setRoom("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log("Data received => ", data);
      setReceivedMessage((messages) => [...messages, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30px",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        CHAT APP
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        USER ID : {socketId}
      </Typography>

      <form
        onSubmit={joinRoomHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "50px",
          marginTop: "20px",
        }}
      >
        <h5>JOIN ROOM</h5>

        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outline-basic"
          label="room name"
          variant="outlined"
          // required={true}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ padding: "5px", marginLeft: "10px" }}
        >
          JOIN
        </Button>
      </form>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outline-basic"
          label="Message"
          variant="outlined"
          // required={true}
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outline-basic"
          label="User ID"
          variant="outlined"
          // required={true}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ padding: "5px", marginLeft: "10px" }}
        >
          send
        </Button>
      </form>

      <Stack>
        {receivedMessage.map((message, i) => {
          return (
            <Typography key={i} variant="h6" component="div" gutterBottom>
              {message}
            </Typography>
          );
        })}
      </Stack>
    </Container>
  );
}

export default App;
