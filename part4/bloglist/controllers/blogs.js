const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


//GET//

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

//POST//

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })
  
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    
    response.json(savedBlog.toJSON())
})

//DELETE//

blogRouter.delete('/:id', async (req, res) => {
    const user = req.user
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)

    if ( blog.user.toString() === user._id.toString() ) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'Not authorized'})
    }
})
  

blogRouter.put('/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    res.json(updatedBlog.toJSON())
})

module.exports = blogRouter