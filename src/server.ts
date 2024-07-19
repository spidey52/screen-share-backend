import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());

app.use(express.static("public"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
 cors: {
  origin: "*",
 },
});

app.post("/screenshot", (req, res) => {
 try {
  const image = req.files?.image as UploadedFile;
  console.log("image received");
  image.mv("./public/screenshot.webp");

  return res.status(200).send({ message: "Screenshot received" });
 } catch (error) {
  console.error(error);
 }
});

app.get("/screenshot", (req, res) => {});

httpServer.listen(3000, () => {
 console.log("listening on *:3000");
});
