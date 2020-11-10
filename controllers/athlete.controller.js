const AthleteService = require('../services/athlete.service');
const genderEnum = require("../models/gender");
const countryEnum = require("../models/country");

class AthleteController {
    constructor() {
        // on créé une nouvelle instance de CommentService que l'on ajoute à notre attribut
        this.athleteService = new AthleteService();
    }

    async getAll(req,res) {
        // on va devoir récupérer depuis la base de données nos sports
        const athletes = await this.athleteService.getAll();

        res.render('athletes', { athletes, genderEnum, countryEnum  });
    }

    async create(req,res){
        await this.athleteService.create(req);

        res.redirect('/athletes');
    }

    async delete(req,res){
        await this.athleteService.delete(req);

        res.redirect('/athletes');
    }
    
}

// on n'oublie pas d'exporter notre Controller
module.exports = AthleteController;