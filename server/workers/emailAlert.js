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
                    html: `
                        <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Sans, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background-color: #ffffff;
                                        padding: 20px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        background-color: #1f2937;
                                        color: white;
                                        padding: 10px 0;
                                        text-align: center;
                                    }
                                    .content {
                                        margin: 20px 0;
                                        text-align: center;
                                    }
                                    .footer {
                                        text-align: center;
                                        color: #888888;
                                        font-size: 12px;
                                        margin-top: 20px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <h1>Game Price Alert</h1>
                                    </div>
                                    <div class="content">
                                        <p>The price of <strong> portal </strong> is now below your buy price!</p>
                                    </div>
                                    <div class="footer">
                                        <p>&copy; 2024 Steam Deals Tracker. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                        </html>
                    `
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