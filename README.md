# Steam Deals Tracker

### What is it?

Steam Deals tracker is a web app that allows you to add games and what price you would buy them at and once the game goes below that price an email alert is sent to you.

### How to run it for yourself?

To run the web app yourself you need to:
* Clone or download and unzip the repository
* Setup a .env file in the root folder, including:
  * `SERVER_PORT`: the port to host the web app on.
  * `DB_HOST`: the internal hostname of your postgresql database.
  * `DB_NAME`: the name of your postgresql database.
  * `DB_USER`: the name of the user for the postgresql database.
  * `DB_PASS`: the password for the postgresql database.
  * `DB_PORT`: the port the postgresql database is on.
  * `JWT_SECRET`: a random string of numbers , letters and characters.
  * `STEAM_KEY`: the key needed to access some parts of the Steam API.
  * `EMAIL_HOST`: the email service being used to send notifications.
  * `EMAIL_PORT`: the port the service is hosted on.
  * `EMAIL_USER`: the email that will be sending notifications.
  * `EMAIL_PASS`: the password of the email, some providers like gmail will require a special password for automating emails.
  * `EMAIL_SERVICE`: the name of the email service being used.
* Open up a terminal in the root folder and run `npm run build` which will instal all dependencies
* Then in the terminal run `npm run start` and the web app will be available on whatever port you have hosted it
