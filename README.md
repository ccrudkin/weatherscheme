# weatherscheme
A simple app that generates a dynamic color scheme based on local weather conditions.

### Usage:
Enter a location by address, landmark, or city + state / country in the input field to begin (e.g., "Denver, CO" or "the Statue of Liberty"). Hit enter, or click "Get scheme" to fetch the weather and generate a color scheme for the given locale.

### Project / server setup:
Clone from Github into new local repository.

This is a Node.js application, and thus Node is the primary dependency. If you haven't [downloaded and installed Node](https://nodejs.org/), do so.

Open a command line interface in the root of the project folder and run `npm install` to create the `node_modules` folder and Express with all of the other project dependencies.

To run the app using your local machine as a server, follow the basic instructions from the [Express docs](https://expressjs.com/en/starter/generator.html):

> On MacOS or Linux, run the app with this command:

> `DEBUG=weatherscheme:* npm start`

> On Windows, use this command:

> `set DEBUG=weatherscheme:* & npm start`

Finally, navigate to your local IP and port to access the site. With this standard setup, it will usually be `http://127.0.0.1:3000/` (or something similar).

#### NOTE:
The app will not be able to communicate with the external APIs without a `.env` file. That is not included in the repo for security reasons, but can be sent separately or recreated.

### Project file structure:
This app uses standard Express file structure. The main app is contained in `app.js`, while `/routes` contains the basic router script that handles server-side requests and processes.

The `/public` folder contains `/images`, `/javascripts`, and `/stylesheets`, which are self-explanatory; `/views` contains the EJS files that render into HTML.
