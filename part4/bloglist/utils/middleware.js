const logger = require('./logger')
const jwt = require ('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('---')
    next()
}

const unknownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}

   
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null 
    }
    next()
    return req.token
}


const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.decode(authorization.substring(7))
        const user = await User.findById(decodedToken.id)
        req.user = user
    } else {
        req.user = null }
        
    next()
}
  

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}

