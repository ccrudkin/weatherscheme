# weatherscheme
A simple app that generates a dynamic color scheme based on local weather conditions.

### Usage:
Enter a location by address, landmark, or city + state / country in the input field to begin (e.g., "Denver, CO" or "the Statue of Liberty"). Hit enter, or click "Get scheme" to fetch the weather and generate a color scheme for the given locale.

### Project / server setup:
Clone from Github into new local repository.

This is a Node.js application, and thus Node is the primary dependency. If you haven't [downloaded and installed Node](https://nodejs.org/), do so.

Open a command line interface in the root of the project folder and run `npm install` to install Express and all of the other project dependencies.

To run the app using your local machine as a server, follow the basic instructions from the Express docs:

> On MacOS or Linux, run the app with this command:

> `DEBUG=weatherscheme:* npm start`

> On Windows, use this command:

> `set DEBUG=weatherscheme:* & npm start`

Finally, navigate to your local IP and port to access the site. It will usually be `http://127.0.0.1:3000/` or something similar.

