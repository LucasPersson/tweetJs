// on récupére notre dépendance externe - ici express.
const express = require('express');
const logger = require('morgan');
const path = require('path');
const axios = require('axios');

const connect = require('./database/mongodb');

const Athlete = require('./models/athlete');
const Sport = require('./models/sport');
const genderEnum = require("./models/gender");
const countryEnum = require("./models/country");

const sportRouter = require('./routers/sport.router');
const athleteRouter = require('./routers/athlete.router');

// on construit notre application qui nous servira à créer nos routes
const app = express();
// on donne un port sur lequel notre serveur écoute
const port = 3000;

connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views
app.set('views', path.join(__dirname, 'views'));
// on indique à notre app d'utiliser nos routers
app.use('/', sportRouter);
app.use('/', athleteRouter);

// page d'index
app.get('/', (req, res) => {
    res.render('index', { name: 'athleteJS' });
});

app.get('/athletes', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos athletes
    const athletes = await Athlete.find({});

    res.render('athletes', { athletes, genderEnum, countryEnum });
})

app.get('/sports', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    const sports = await Sport.find({});

    res.render('sports', { sports });
})

app.get('/api/sports', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    const sports = await Sport.find({});

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sports));
})
app.post('/api/sports', async (req, res) => {
    const paramSport = req.body;

    const sport = new Sport({
        name: paramSport.name,
        athletes: []
    });
    await sport.save();

    res.redirect('/sports');
})

app.get('/api/athletes', async (req, res) => {
    // on va devoir récupérer depuis la base de données nos sports
    const athletes = await Athlete.find({});

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(athletes));
})
app.post('/api/athletes', async (req, res) => {
    const paramAthlete = req.body;

    const athlete = new Athlete({
        firstName: paramAthlete.firstName,
        lastName: paramAthlete.lastName,
        gender: paramAthlete.gender,
        country: paramAthlete.country
    });
    await athlete.save();

    res.redirect('/athletes');
})

// on écoute sur notre port.
app.listen(port, () => {
    console.log(`TweetJS listening at http://localhost:${port}`)
});
