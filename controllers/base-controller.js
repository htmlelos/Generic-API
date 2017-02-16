const express = require('express')
const router = express.Router()
const reply = require('../services/message/reply')
const pluralize = require('pluralize')

const MAX_RESULTS = 200

class BaseController {
    constructor(model, key) {
        this.model = model
        this.modelName = model.modelName.toLowerCase()
        this.key = key
    }

    create(data) {
        return this.model
            .create(data)
            .then(modelInstance => {
                let response = {}
                response[this.modelName] = modelInstance
                return response
            })
    }

    read(id) {
        let filter = {}
        filter[this.key] = id

        return this.model
            .findOne(filter)
            .then(modelInstance => {
                let response = {}
                response[this.modelName] = modelInstance
                return response
            })
    }

    update(id, data) {
        let filter = {}
        filter[this.key] = id

        return this.model
            .findOne(filter)
            .then(modelInstance => {
                for (let attribute in data) {
                    if (data.hasOwnProperty(attribute) && attribute !== this.key && attribute !== "_id") {
                        modelInstance[attribute] = data[attribute]
                    }
                }

                return modelInstance.save()
            })
            .then(modelInstance => {
                let response = {}
                response[this.modelName] = modelInstance
                return response
            })
    }

    delete(id) {
        const filter = {}
        filter[this.key] = id

        return this.model
            .remove(filter)
            .then(() => {
                return {}
            })
    }

    list() {
        return this.model
            .find({})
            .limit(MAX_RESULTS)
            .then(modelInstances => {
                let response = {}
                response[pluralize(this.modelName)] = modelInstances
                return response
            })
    }

    routes() {
        router.route('/')
            .get((request, response) => {
                this.list()
                    .then(result => {reply.success(response, result)})
                    .catch(error => {response.status(404).send(error)})
            })

        router.route('/')
            .post((request, response) => {
                this
                    .create(request.body)
                    .then(result => reply.success(response, result))
                    .catch(error => reply.failure(response, error))
            })

        router.route('/:id')
            .get((request, response) => {
                this.read(request.params.id)
                    .then(result => reply.success(response, result))
                    .catch(error => reply.failure(response, error))
            })

        router.route('/:id')
            .put((request, response) => {
                this.update(request.params.id, request.body)
                    .then(result => reply.success(response, result))
                    .catch(error => reply.failure(response, error))
            })

        router.route('/:id')
            .delete((request, response) => {
                this.delete(request.params.id)
                    .then(result => reply.success(response, result))
                    .catch(error => reply.failure(response, error))
            })

        return router
    }
}

module.exports = BaseController