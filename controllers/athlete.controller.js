const AthleteService = require('../services/athlete.service');

class AthleteController {
    constructor() {
        // on créé une nouvelle instance de CommentService que l'on ajoute à notre attribut
        this.athleteService = new AthleteService();
    }

    async getAll(req,res) {
        // on va devoir récupérer depuis la base de données nos sports
        const athletes = await this.athleteService.getAll();

        res.render('athletes', { athletes });
    };
    
}

// on n'oublie pas d'exporter notre Controller
module.exports = AthleteController;