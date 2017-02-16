const BaseController = require('./base-controller')
const Continent = require('../models/Continent')

class ContinentController extends BaseController {
    constructor() {
        super(Continent, '_id')
    }
}

module.exports = ContinentController