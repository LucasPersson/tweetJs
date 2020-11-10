const Sport = require('../models/sport');

// Une class CommentService
class SportService {
    constructor() { }

    async getAll() {
        // on va devoir récupérer depuis la base de données nos sports
        return Sport.find({});
    };

    async create(paramSport) {
        const sport = new Sport({
            name: paramSport.name,
            athletes: []
        });

        await sport.save();
    };

    async delete(sportId) {
        await Sport.findByIdAndDelete(sportId);
    };

    async addAthleteToSport(req){
        const sportId = req.params.sportId;
        const athleteId = req.params.athleteId;

        const sport = await Sport.findById(sportId);
        if (sport.athletes.indexOf(athleteId) < 0) sport.athletes.push(athleteId)
        await sport.save();
    }

}

// on n'oublie pas d'exporter notre Service
module.exports = SportService;
