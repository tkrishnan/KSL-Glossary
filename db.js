var mongoose = require('mongoose');

mongoose.connect('mongodb://nodejitsu_emoore24:jpfn91vrdiisid0l91o8mmdpnt@ds061548.mongolab.com:61548/nodejitsu_emoore24_nodejitsudb8100305891');

module.exports = mongoose.connection;