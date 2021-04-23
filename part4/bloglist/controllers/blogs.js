const blogRouter = require('express').Router()
const Blog = require('./../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
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