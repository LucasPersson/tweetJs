const Athlete = require('../models/athlete');

// Une class CommentService
class AthleteService {
    constructor() { }


    async getAll() {
        // on va devoir récupérer depuis la base de données nos sports
        return Athlete.find({});

       // res.setHeader('Content-Type', 'application/json');
        //res.end(JSON.stringify(sports));
    };
}

// on n'oublie pas d'exporter notre Service
module.exports = AthleteService;
