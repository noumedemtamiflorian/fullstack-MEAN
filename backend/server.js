
// Importation des modules HTTP et App
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()


const DATABASE_URI = process.env.DATABASE_URI

// Fonction pour normaliser le port
const normalizePort = val => {
    const port = parseInt(val, 10);

    // Vérifie que le port est bien un nombre
    if (isNaN(port)) {
        return val;
    }
    // Vérifie qu'il est supérieur ou égal à 0
    if (port >= 0) {
        return port;
    }
    // Retourne faux s'il n'est pas valide
    return false;
};

// Définit le port en fonction des variables d'environnement ou à 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
// Définit le port dans App
app.set('port', port);

// Fonction de gestion des erreurs
const errorHandler = error => {
    // Vérifie si le type d'erreur est 'listen'
    if (error.syscall !== 'listen') {
        throw error;
    }
    // Définit l'adresse du serveur
    const address = server.address();
    // Définit le type de liaison
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    // Vérifie le type d'erreur
    switch (error.code) {
        // Si erreur 'EACCES'
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        // Si erreur 'EADDRINUSE'
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        // Sinon 
        default:
            throw error;
    }
};

// Création du serveur et utilisation de l'application
const server = http.createServer(app);

// Gestion des erreurs
server.on('error', errorHandler);
// Ecoute du serveur
server.on('listening', () => {
    // Définit l'adresse du serveur
    const address = server.address();
    // Définit le type de liaison
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    // Affiche le message de lancement
    console.log('Listening on ' + bind);
});

mongoose.connect(DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement du serveur
server.listen(port);