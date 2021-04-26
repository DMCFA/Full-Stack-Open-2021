import React from 'react'

const Add = ({addBlog, newTitle, titleChange, newAuthor, authorChange, newUrl, urlChange }) => {
    return (
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
    )
  }

export default Add