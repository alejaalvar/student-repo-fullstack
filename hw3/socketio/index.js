/*
 * Simple chat application using socketio, based on the
 * socketio tutorial.
 */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const url = "http://localhost";
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/styles.css");
});

// Runs only when no route above matched the request. Socket.IO
// handles /socket.io/ requests itself, so they never reach this
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/404.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`Listening on ${url}:${port}`);
});
