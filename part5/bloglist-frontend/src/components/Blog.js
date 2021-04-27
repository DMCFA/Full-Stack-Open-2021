import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [blogDetails, setBlogDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = {display: blogDetails ? '' : 'none'}

  const toggleVisibility = () => {
    setBlogDetails(!blogDetails)
    buttonText === 'view' ? setButtonText('hide') : setButtonText('view')
  }

  return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{buttonText}</button>
    </div>
    <div style={showWhenVisible}>
      {blog.url} < br></br>
      likes {blog.likes} <button>like</button> <br></br>
      {blog.author}
    </div>
  </div>  
)}

export default Blog