const SportService = require('../services/sport.service');
const AthleteController = require('../services/athlete.service');

class SportController {
    constructor() {
        // on créé une nouvelle instance de CommentService que l'on ajoute à notre attribut
        this.sportService = new SportService();
        this.athleteService = new AthleteController();
    }

    async getAll(req,res) {
        // on va devoir récupérer depuis la base de données nos sports
        const sports = await this.sportService.getAll();
        const athletes = await this.athleteService.getAll();

        res.render('sports', { sports, athletes });
    };

    async create(req,res){
        const sports = await this.sportService.create(req.body);

        res.redirect('/sports');
    }

    async delete(req,res){
        const sportId = req.params.sportId;
    
        await this.sportService.delete(sportId);

        res.redirect('/sports');
    }

    async addAthleteToSport(req,res){

        await this.sportService.addAthleteToSport(req)

        res.redirect('/sports');
    }

}

// on n'oublie pas d'exporter notre Controller
module.exports = SportController;
