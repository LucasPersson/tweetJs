const Sport = require('../models/sport');

// Une class CommentService
class SportService {
    constructor() { }


    async getAll() {
        // on va devoir récupérer depuis la base de données nos sports
        return Sport.find({});

       // res.setHeader('Content-Type', 'application/json');
        //res.end(JSON.stringify(sports));
    };
}

// on n'oublie pas d'exporter notre Service
module.exports = SportService;
