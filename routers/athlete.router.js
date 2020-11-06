const express = require('express');
const AthleteController = require('../controllers/athlete.controller');

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

// ici pas de classe, on export directement l'objet route
module.exports = router;