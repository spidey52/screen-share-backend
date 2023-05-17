import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
 cors: {
  origin: "*",
 },
});

let client = 0;

io.on("connection", (socket) => {
 const query = socket.handshake.query;

 if (query.name === "screenshot-provider") {
  console.log("screenshot-provider connected");
  socket.on("client-send-screenshot", async (data) => {
   io.emit("server-send-screenshot", data);
   io.emit("client", client);
  });
 } else {
  console.log("client connected");
  client++;
 }

 socket.on("disconnect", () => {
  console.log("client disconnected");
  client--;
 });
});

httpServer.listen(3000, () => {
 console.log("listening on *:3000");
});
