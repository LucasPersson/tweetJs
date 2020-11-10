const Athlete = require('../models/athlete');

// Une class CommentService
class AthleteService {
    constructor() { }

    async getAll() {
        // on va devoir récupérer depuis la base de données nos sports
        return Athlete.find({});

    }

    async create(req){
        const paramAthlete = req.body;

        const athlete = new Athlete({
            firstName: paramAthlete.firstName,
            lastName: paramAthlete.lastName,
            gender: paramAthlete.gender,
            country: paramAthlete.country
        });
        await athlete.save();
    }

    async delete(req){
        const athleteId = req.params.athleteId;
    
        await Athlete.findByIdAndDelete(athleteId);
    }
    
}

// on n'oublie pas d'exporter notre Service
module.exports = AthleteService;
