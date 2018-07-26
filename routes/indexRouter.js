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

    getLocation(location)
    .then((coors) => { return getConditions(coors) })
    .then((data) => { res.send(data) } )
    .catch((err) => { res.send(`Location Error!\n${err}`) });
});

function getLocation(location) {
    return new Promise((resolve, reject) => {
        const key = process.env.liqkey;
        let url = `https://us1.locationiq.org/v1/search.php?key=${key}&q=${location}&format=json`;

        request(url, { json: true }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                // console.log(`Body:\n${JSON.stringify(body, null, 2)}`); // for debug
                // console.log(`latlon: ${body[0].lat},${body[0].lon}`); // for debug
                let coors = `${body[0].lat},${body[0].lon}`;
                resolve(coors);
            }
        });
    });
}

function getConditions(coors) {
    return new Promise((resolve, reject) => {
        console.log("Coors: " + coors);
        let key = process.env.darkskykey;
        let url = `https://api.darksky.net/forecast/${key}/${coors}`;
        
        request(url, { json: true }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                console.log("Conditions request resolved.");
                resolve(body);
            }
        }); 
    });
}

module.exports = router;
