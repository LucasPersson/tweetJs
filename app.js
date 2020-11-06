// on récupére notre dépendance externe - ici express.
const express = require('express');
const logger = require('morgan');
const path = require('path');
const axios = require('axios');

const connect = require('./database/mongodb');

const Athlete = require('./models/athlete');
const Sport = require('./models/sport');

const commentRouter = require('./routers/comment.router');

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
app.use('/', commentRouter);

// notre première route !
// on envoi un Hello World si la requête est sur la racine.
app.get('/', (req, res) => {
    res.render('index', { name: 'athleteJS' });
});

app.get('/athletes', async (req, res) => {

    // on va devoir récupérer depuis la base de données nos tweets ...
    const athletes = await Athlete.find({});

    res.render('athletes', { athletes });
})

app.get('/sports', async (req, res) => {

    // on va devoir récupérer depuis la base de données nos tweets ...
    const sports = await Sport.find({});

    res.render('sports', { sports });
})

// on écoute sur notre port.
app.listen(port, () => {
    console.log(`TweetJS listening at http://localhost:${port}`)
});


/**
* ma fonction prend en paramètre le nombre d'utilisateur qui sera généré.
* elle est asynchrone !
* @param number
* @return elle retourne un tableau d'utilisateurs
*/
async function getRandomUsers(number) {
    // je construis mon url avec le paramètre
    const url = `https://randomuser.me/api/?results=${number}`;

    let response;
    try {
        // on fait l'appel à l'API avec l'url. Toujours avec le `await`!
        response = await axios.get(url);
    } catch (err) {
        // on catch si il y a une erreur HTTP !
        // pas de réponse du serveur !
        if (!err.response) {
            console.error('Unknown error during the request');
            return [];
        }
        // on extrait de la réponse du serveur, le code, le body, et le status
        const { data, status, statusText } = err.response;
        console.error('Error during the request', status, statusText, data);

        // si j'ai une erreur je retourne un tableau vide ici
        return [];
    }

    // je récupére l'objet results de mon body
    const results = response.data.results;

    // ici je construis un nouveau tableau avec le même nombre d'élément que mon tableau.
    // je ne choisis de retourner que ce que j'ai besoin !
    const users = results.map(elem => {

        let politness = 'Monsieur';
        if (elem.gender === 'female') {
            politness = 'Madame';
        }

        return {
            politness: politness,
            firstName: elem.name.first,
            lastName: elem.name.last,
            email: elem.email,
        }
    });

    return users;
}

async function getCommentsByTweetId(id) {
    return Comment.find({ tweetId: id }).sort({ createdAt: -1 });
}
