import React from 'react'

const BlogPage = ({ blog, handleLike, handleRemove, user }) => {

	if (!blog) {
		return null
	}


	return (
		<div>
			<div>
				<h2>{blog.title}{blog.author}</h2>
			</div>
			<div>
				<a href=''>{blog.url}</a>
				<br />
				{blog.likes} times
				<button onClick={() => handleLike(blog.id)}>like</button>
			</div>
			<div>
                added by {blog.user.name}
				{user.username === blog.user.username &&
                        <button onClick={() => handleRemove(blog.id)}>remove</button>}
			</div>
		</div>
	)
}

export default BlogPage