const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('Add users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('test123', 10)
        const user = new User({ username: 'root', name: 'simon', passwordHash })

        await user.save()
    })
    
    test('adding new user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rabbit',
            name: 'Simon',
            password: 'rainbow'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const users = usersAtEnd.map(user => user.name)
        expect(users).toContain(newUser.name)
    })
    
    test('no user or password returns status code and error message', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'James'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password not defined')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('username is too short', async (req, res) => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ok',
            name: 'mike',
            password: 'test123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Type-Content', /application\/json/)

        expect(res.body.error).toContain('`username` (`ok`) is shorter than the minimum allowed length (3)')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    afterAll(() => {
        mongoose.connection.close()
    })
})