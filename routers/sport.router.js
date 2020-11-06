const express = require('express');
const SportController = require('../controllers/sport.controller');

const Athlete = require('../models/athlete');
const Sport = require('../models/sport');


// on créé une nouvelle instance de notre controller !
const sportController = new SportController();
// on spécifie le router express
const router = express.Router();

router.get('/sports', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    /*const sports = await Sport.find({});

    res.render('sports', { sports });*/

    sportController.getAll(req, res);
})

router.get('/api/sports', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    const sports = await Sport.find({});

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sports));
})
router.post('/api/sports', async (req, res) => {
    const paramSport = req.body;

    const sport = new Sport({
        name: paramSport.name,
        athletes: []
    });
    await sport.save();

    res.redirect('/sports');
})

router.get('/api/sports/:sportId/athletes', async (req, res) => {
    const sportId = req.params.sportId;
    var l = []; // liste des athletes

    // on va devoir récupérer depuis la base de données nos sports
    const sport = await Sport.findById(sportId);
    for (var i in sport.athletes) { //
        l.push( await Athlete.findById(sport.athletes[i]) );
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(l));
})

router.post('/api/sports/:sportId/athletes/:athleteId', async (req, res) => {
    const sportId = req.params.sportId;
    const athleteId = req.params.athleteId;

    const sport = await Sport.findById(sportId);
    if (sport.athletes.indexOf(athleteId) < 0) sport.athletes.push(athleteId)
    await sport.save();

    res.redirect('/sports');
})

router.post('/api/sports/delete/:sportId', async (req, res) => {
    const sportId = req.params.sportId;

    const sport = await Sport.deletOne(sportId);
    //await sport.save();

    res.redirect('/sports');
})

// ici pas de classe, on export directement l'objet route
module.exports = router;