// scheduleJobs.js - schedule the workers to run at regular intervals

//import dependencies
import cron from "node-cron";

//import workers
import emailAlert from "./workers/emailAlert.js";
import gameData from "./workers/gameData.js";
import gamePrices from "./workers/gamePrices.js";

//schedule the workers to run at regular intervals
const scheduleJobs = () => {
  cron.schedule("14 14 * * *", async () => {
    await emailAlert();
    console.log("Email alert sent");
  });
  cron.schedule("20 9 * * *", async () => {
    await gameData();
    console.log("Game data fetched");
  });
  cron.schedule("44 11 * * *", async () => {
    await gamePrices();
    console.log("Game prices fetched");
  });
  console.log("Jobs scheduled");
};

export default scheduleJobs;
