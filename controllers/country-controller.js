const express = require('express')
const BaseController = require('./base-controller')
const Country = require('../models/country')
// const reply = require('../services/message/reply')
// const pluralize = require('pluralize')

class CountryController extends BaseController {
    constructor() {
        super(Country, '_id')
    }
}

module.exports = CountryController