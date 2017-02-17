const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ContinentSchema = new Schema({
    name: {
        type: String
    },
    countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }]
}, {
        versionKey: false
    })

const Continent = mongoose.model('Continent', ContinentSchema)

module.exports = Continent