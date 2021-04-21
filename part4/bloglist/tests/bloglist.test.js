const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('get all blogs in json format', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.blogs.length)
})

test('id property exists', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
})

test('a valid note can be added', async () => {
    const newBlog = {
        title: 'API Test Blog',
        author: 'Duarte Almeida',
        url: 'http://gooogle.com',
        likes: 23
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.blogs.length + 1)

    const content = res.map(blog => blog.title)
    expect(content).toContain(
        'API Test Blog'
    )
})

afterAll(() => {
    mongoose.connection.close()
})