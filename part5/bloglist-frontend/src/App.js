import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //useEffect

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Login & Logout

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      blogService
      .setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)

    } catch (exception) {
        setMessage('Wrong credentials')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  //Add Blog

  const addBlog = (blogObject) => {
    
    blogService
      .create(blogObject)
      .then(blog => {
        setBlogs(blogs.concat(blog))
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='add blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  //Update

  const updateBlog = async (blogObject) => {

    try{
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      const returnedBlogs = blogs.map(b => b.id === updatedBlog.id ? blogObject : b)
      setBlogs(returnedBlogs)

    } catch (exception) {
      setMessage(`Error updating blog ${blogObject.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
}

  //Log in form

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange ={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>{user.name} logged in <button type="submit" onClick={logout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App