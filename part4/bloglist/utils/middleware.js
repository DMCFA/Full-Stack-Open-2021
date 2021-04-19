const { response } = require('express')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('---')
    next()
}

const unknownEndPoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler
}
