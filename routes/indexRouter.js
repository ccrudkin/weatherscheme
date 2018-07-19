var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weatherscheme' });
});

router.get("/conditions/:location", function(req, res) {
    let key = process.env.darkskykey;
    // let key = "###"; // swap and inclue ONLY for demo and dev purposes
    let coors = req.params.location;
    // let geokey = process.env.liqkey;
    console.log(key);
    let url = `https://api.darksky.net/forecast/${key}/${coors}`;
 
    request(url, { json: true }, (err, response, body) => {
        if (err) { 
            res.send("API error.");
            return console.log(err); 
        }
        // console.log(body);
        res.send(body.currently);
        return;
    });
});

module.exports = router;
