const SportService = require('../services/sport.service');

class SportController {
    constructor() {
        // on créé une nouvelle instance de CommentService que l'on ajoute à notre attribut
        this.sportService = new SportService();
    }

    async getAll(req,res) {
        // on va devoir récupérer depuis la base de données nos sports
        const sports = await this.sportService.getAll();

        res.render('sports', { sports });
    };
    
}

// on n'oublie pas d'exporter notre Controller
module.exports = SportController;