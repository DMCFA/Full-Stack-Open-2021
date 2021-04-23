const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//CREATE USER//

usersRouter.post('/', async (req, res) => {
    const body = req.body

    if(body.password && body.password.length < 3) {
        return res.status(400).json({ error: 'Password must have a minimum of 3 characters' })
    } else if (!body.password || body.password === '') {
        return res.status(400).json({ error: 'Password not defined' })
    } else if(body.username && body.username.length < 3) {
        return res.status(400).json({ error: 'Username must have a minimum of 3 characters' })
    } else if (!body.username || body.username === '') {
        return res.status(400).json({ error: 'Username not defined' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

//GET ALL USERS//

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs')

    res.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter