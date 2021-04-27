import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Add from './components/Add'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  // const errorMessage = newMessage => {
  //   setMessage(newMessage)
  //   setTimeout(() => {
  //     setMessage(null)
  //   }, 5000)
  // }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    
    blogService
      .create(blogObject)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
        setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const titleChange = (e) => setNewTitle(e.target.value)
  const authorChange = (e) => setNewAuthor(e.target.value)
  const urlChange = (e) => setNewUrl(e.target.value)

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
      <h2>create new</h2>
      <Add addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} titleChange={titleChange} authorChange={authorChange} urlChange={urlChange} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App