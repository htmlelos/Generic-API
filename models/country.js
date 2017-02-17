const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const CountrySchema = new Schema({
    name: {
        type: String
    },
    languaje: [{ type: Schema.Types.ObjectId, ref: 'Languaje' }]
}, {
        versionKey: false
    })

const Country = mongoose.model('Country', CountrySchema)    

module.exports = Country