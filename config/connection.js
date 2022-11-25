const { connect, connection } = require('mongoose');

// TODO:UPDATE DATABASE
connect('mongodb://localhost/crochetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;