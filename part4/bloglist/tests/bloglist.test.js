const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

//GET ALL POSTS IN THE RIGHT FORMAT AND CONFIRM LENGTH IS CORRECT//

test('get all blogs in json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.blogs.length)
})

//CONFIRM ID PROPERTY HAS THE CORRECT NAMING//

test('id property exists', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
})

//MAKE A POST REQUEST//

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'API Test Blog',
        author: 'Duarte Almeida',
        url: 'http://gooogle.com',
        likes: 23
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.blogs.length + 1)

    const content = res.map(blog => blog.title)
    expect(content).toContain(
        'API Test Blog'
    )
})

//LIKES PROPERTY ADDED AND DEFAULTED TO ZERO IF NOT ADDED//

test('likes have a default value', async () => {
    const newBlog = {
        title: 'Likes Blog',
        author: 'Tom Uber',
        url: 'http://reddit.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const allBlogs = await helper.blogsInDb()

    expect(allBlogs[allBlogs.length -1].likes).toBe(0)
})

//NOTE IS NOT ADDED WITHOUT TITLE OR URL//

test('title and url are required', async () => {
    const incompleteBlog = {
        author: 'Bam Adebayo',
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(incompleteBlog)
        .expect(400)
    
    const allBlogs = await helper.blogsInDb()
    
    expect(allBlogs).toHaveLength(helper.blogs.length)
})

//DELETE POST//
test('delete single blog post', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.blogs.length -1)
})

//UPDATE LIKES//
test('update likes on a blog post', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs[0]

    const likes = {
        likes: 1000
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(likes)
        .expect(200)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter[0].likes).toBe(1000)
})

afterAll(() => {
    mongoose.connection.close()
})