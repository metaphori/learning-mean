const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/mydb';
mongoose.connect(dbURI, {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log(`MONGO CONNECT: ${dbURI}`) );
mongoose.connection.on('error', err => console.log('MONGO ERROR:', err) );
mongoose.connection.on('disconnected', () => console.log('MONGO DISCONNECT'));
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
process.once('SIGUSR2', () => gracefulShutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => gracefulShutdown('app termination', () => process.exit(0)));
process.on('SIGTERM', () => gracefulShutdown('Heroku app shutdown', () => process.exit(0)));

require('./posts');
