// emailAlert.js - Worker to send email alerts to users when a game is on sale

//import dependencies
import nodemailer from "nodemailer";
import { connectReadDb, closeDb, runQueryWithRetry } from "../db.js";

const emailAlert = async () => {
  try {
    //create transporter object
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    //connect to the database
    const db = connectReadDb();
    //get all the users and their usergames
    const response = await runQueryWithRetry(
      db,
      `
            SELECT * FROM users_games
            JOIN games ON users_games.game_id = games.id
            JOIN users ON users_games.user_id = users.id
        `
    );
    //close the database connection
    closeDb(db);
    //iterate over the response and send email alerts to users when a game is under their buy_price
    response.rows.forEach(async (row) => {
      if (row.price <= row.buy_price) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: row.email,
          subject: "Game on sale",
          text: `The game ${row.name} is now below ${row.buy_price} at ${row.price_formatted}!`,
        };
        await transporter.sendMail(mailOptions);
      }
    });
    console.log("Email alert sent");
  } catch (error) {
    console.log("Error sending email alerts");
  }
};

export default emailAlert;
