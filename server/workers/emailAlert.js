import nodemailer from 'nodemailer';
import pool from '../config/db.js';

const emailAlert = async () => {
    try{
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const query = `
            SELECT * FROM users_games
            JOIN games ON users_games.game_id = games.game_id
            JOIN users ON users_games.user_id = users.user_id
        `;
        const result = await pool.query(query);
        result.rows.forEach(async (game) => {
            if (game.price <= game.buyprice) {
                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: game.email,
                    subject: 'Game Price Alert',
                    text: `The price of ${game.game_name} is now below your buyprice!`
                };
                await transporter.sendMail(mailOptions);
            }
        });
        console.log("Email alerts sent");
    } catch (error) {
        console.error(error.message);
    }
};

export default emailAlert;