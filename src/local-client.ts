import axios from "axios";
import env from "dotenv";
import FormData from "form-data";
import screenshotDesktop from "screenshot-desktop";

env.config();

const startSending = async () => {
 while (true) {
  const image = await screenshotDesktop({
   format: "png",
  });

  // const base64 = image.toString("base64");
  const formData = new FormData();
  formData.append("image", image, "screenshot.png");

  try {
   await axios.post("http://localhost:3000/screenshot", formData, {});
  } catch (error) {
   console.log("error in sending screenshot");
  }
  console.log("Screenshot sent");
  await new Promise((resolve) => setTimeout(resolve, 1000));
 }
};

startSending();
