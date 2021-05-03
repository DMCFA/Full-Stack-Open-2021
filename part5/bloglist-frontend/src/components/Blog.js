import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
	const [blogDetails, setBlogDetails] = useState(false)
	const [buttonText, setButtonText] = useState('view')
	const [likes, setLikes] = useState(blog.likes)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const showWhenVisible = { display: blogDetails ? '' : 'none' }

	const toggleVisibility = () => {
		setBlogDetails(!blogDetails)
		buttonText === 'view' ? setButtonText('hide') : setButtonText('view')
	}

	const addLikes = () => {
		const updateLikes = blog
		updateLikes.likes ++
		updateBlog(updateLikes)
		setLikes(likes+1)
	}

	const removeBlog = () => {
		deleteBlog(blog)
	}


	return (
		<div style={blogStyle}>
			<div className='head'>
				{blog.title} {blog.author}
				<button className='toggleBtn' onClick={toggleVisibility}>{buttonText}</button>
			</div>
			<div style={showWhenVisible} className='remainingDivs'>
				{blog.url} <br />
				likes {blog.likes} <button id='like' onClick={addLikes}>like</button> <br />
				{blog.author} <br />
				<button onClick={removeBlog}>remove</button>
			</div>
		</div>
	)}

export default Blog