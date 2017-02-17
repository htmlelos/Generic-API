const express = require('express')
const BaseController = require('./base-controller')
const Continent = require('../models/Continent')
const reply = require('../services/message/reply')
const pluralize = require('pluralize')

const MAX_RESULTS = 200

class ContinentController extends BaseController {
    constructor() {
        super(Continent, '_id')
    }
}

module.exports = ContinentController