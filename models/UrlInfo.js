const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlInfoSchema = new Schema({
    originalUrl: {type: String},
    shortUrl: {type: String},
    urlCode: {type: String},
    clickCount: {type: Number},
    date_created: {type: Date, default: Date.now}
})


module.exports = mongoose.model('UrlInfo', UrlInfoSchema, 'UrlInfo');