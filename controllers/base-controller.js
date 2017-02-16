const express = require('express')
const router = express.Router()
const Continent = require('../models/Continent')

class BaseController {
    constructor() {
    }

    routes() {
        router.route('/continents')
            .get((request, response) => {
                Continent.find({})
                    .then(continents => {
                        response.status(200).send({data: continents})
                    })
                    .catch(error => {
                        response.status(500).send({data: null, error})
                    })
            })

        router.route('/continent')
            .post((request, response) => {
                let continent = new Continent(request.body)
                continent.save()
                    .then(result => {
                        response.status(200).send({ data: result })
                    })
                    .catch(error => {
                        response.status(500).send({ data: null, error })
                    })
            })

        router.route('/continent/:countryId')
            .get((request, response) => {
                Continent.findById(request.params.countryId)
                    .then(continent => {
                        response.status(200).send({ data: continent })
                    })
                    .catch(error => {
                        response.status(404).send({ data: null, error })
                    })
            })

        return router
    }
}

module.exports = BaseController