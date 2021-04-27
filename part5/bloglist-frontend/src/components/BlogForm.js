import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const titleChange = (e) => setNewTitle(e.target.value)
  const authorChange = (e) => setNewAuthor(e.target.value)
  const urlChange = (e) => setNewUrl(e.target.value)

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

    return (
      <div>
        <h2>create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title: <input
            value={newTitle}
            onChange={titleChange}/>
          </div>
          <div>
            author: <input
            value={newAuthor}
            onChange={authorChange}/>
          </div>
          <div>
            url: <input
            value={newUrl}
            onChange={urlChange}/>
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
        </form>
      </div>
    )
  }

export default BlogForm