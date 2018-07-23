var express = require('express');
var router = express.Router();
const request = require('request');
require('dotenv').config(); // if running via npm; unnecessary for heroku

// GET main app page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weatherscheme' });
});

// GET weather conditions for the given location
router.get("/conditions/:location", function(req, res) {
    let location = req.params.location;

    // use LocationIQ API to geocode given location (convert to lat/lon)
    function convertLocation(location) {
        const key = process.env.liqkey;
        let url = `https://us1.locationiq.org/v1/search.php?key=${key}&q=${location}&format=json`;
    
        request(url, { json: true }, (err, response, body) => {
            if (err) {
                res.send([ 0, "Geocoding error." ]);
            } else {
                // console.log(`Body:\n${JSON.stringify(body, null, 2)}`); // for debug
                // console.log(`latlon: ${body[0].lat},${body[0].lon}`); // for debug
                let coors = `${body[0].lat},${body[0].lon}`;
                getConditions(coors);
            }
        });
    }
    
    // use lat/lon to get weather conditions from DarkSky
    function getConditions(coors) {
        console.log("Coors: " + coors);
        let key = process.env.darkskykey;
        let url = `https://api.darksky.net/forecast/${key}/${coors}`;
     
        request(url, { json: true }, (err, response, body) => {
            if (err) { 
                res.send([ 0, "API error." ]);
            } else {
                res.send(body);
            }
        });
    }

    convertLocation(location);
});

module.exports = router;
