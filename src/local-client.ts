import io from "socket.io-client";
import screenshotDesktop from "screenshot-desktop";
import env from "dotenv";

env.config();

const myenv = {
 socketUrl: process.env.SOCKET_URL,
 screenShotInterval: process.env.SCREENSHOT_INTERVAL,
};

if (!myenv.socketUrl) {
 console.error("SOCKET_URL is not defined");
 process.exit(1);
}

if (!myenv.screenShotInterval) {
 console.error("SCREENSHOT_INTERVAL is not defined");
 process.exit(1);
}

const socket = io(myenv.socketUrl, {
 query: {
  name: "screenshot-provider",
 },
});

let intervalId: NodeJS.Timeout | undefined;
const startScrenshot = () => {
 if (!myenv.screenShotInterval) return console.error("SCREENSHOT_INTERVAL is not defined");
 intervalId = setInterval(async () => {
  const screenshot = await screenshotDesktop({
   format: "png",
  });

  socket.emit("client-send-screenshot", screenshot);
  console.log("screenshot sent");
 }, +myenv.screenShotInterval);
};

socket.on("connect", () => {
 console.log("connected to server");
 startScrenshot();
});

socket.on("disconnect", () => {
 console.log("disconnected from server");
 if (intervalId) clearInterval(intervalId);
 intervalId = undefined;
});
