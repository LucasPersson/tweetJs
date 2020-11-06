const express = require('express');
const SportController = require('../controllers/sport.controller');

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

// ici pas de classe, on export directement l'objet route
module.exports = router;