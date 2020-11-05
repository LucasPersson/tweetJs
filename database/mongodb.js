const mongoose = require('mongoose');

async function connect() {
    // on se connecte à la base de données
    try {
        // changer ici le password pour mettre celui que vous aviez copier + l'url de votre cluster !!
        await mongoose.connect('mongodb+srv://Y4jFu8s23r8cNYF:Y4jFu8s23r8cNYF@cluster.kwqfg.mongodb.net/athletes?retryWrites=true&w=majority', { useNewUrlParser: true });
    } catch (err) {
        console.error('impossible de se connecter à la base de donnée', err);
        throw err;
    }

    console.info('connection to the database established...');
}

// on export ici la fonction connect
module.exports = connect;
