
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://dev:secret123@treinamento-node-vanilla-g1sga.mongodb.net/treinamento-node-vanilla?retryWrites=true&w=majority', options);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected in MongoDB!');
});

db.on('open', () => {
  console.log('MongoDB Opened!');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!')
});

db.on('error', err => {
  console.log(`MongoDB error: ${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;
