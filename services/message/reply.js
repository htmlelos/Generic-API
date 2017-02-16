const success = function(response, data) {
    response.status(200).send({data})
}

const failure = function(response, data) {
    response.status(404).send({data: null, error})
}

module.exports = {
    success,
    failure
}