const express = require('express');
const AthleteController = require('../controllers/athlete.controller');

const Athlete = require('../models/athlete');
const Sport = require('../models/sport');
const genderEnum = require("../models/gender");
const countryEnum = require("../models/country");

// on créé une nouvelle instance de notre controller !
const athleteController = new AthleteController();
// on spécifie le router express
const router = express.Router();

router.get('/athletes', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    /*const sports = await Sport.find({});

    res.render('sports', { sports });*/

    athleteController.getAll(req, res);
})


router.get('/api/athletes', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    const athletes = await Athlete.find({});

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(athletes));
})

// create athlete api
router.post('/api/athletes', async (req, res) => {
    const paramAthlete = req.body;

    const athlete = new Athlete({
        firstName: paramAthlete.firstName,
        lastName: paramAthlete.lastName,
        gender: paramAthlete.gender,
        country: paramAthlete.country
    });
    await athlete.save();

    res.redirect('/athletes');
})

// get sports from athlete
router.get('/api/athletes/:athleteId/sports', async (req, res) => {
    const athleteId = req.params.athleteId;
    var l = []; // liste des sports

    // on va devoir récupérer depuis la base de données nos sports
    const sports = await Sport.find({});
    sportLoop: for (var i in sports) {
        for (var j in sports[i].athletes) {
            if (sports[i].athletes[j]._id == athleteId) {
                l.push(sports[i]);
                continue sportLoop;
            }
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(l));
})



// ici pas de classe, on export directement l'objet route
module.exports = router;