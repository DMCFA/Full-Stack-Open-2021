import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button } from '@material-ui/core'

const BlogPage = ({ blog, handleLike, handleRemove, user }) => {
	const dispatch = useDispatch()

	if (!blog) {
		return null
	}

	const comment = (e) => {
		e.preventDefault()
		dispatch(addComment(blog.id, e.target.comment.value))
		e.target.comment.value = ''
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
				<Button color="inherit" onClick={() => handleLike(blog.id)}>
					like
				</Button>
			</div>
			<div>
                added by {blog.user.name}
				{user.username === blog.user.username &&
                        <Button color="inherit" onClick={() => handleRemove(blog.id)}>remove</Button>}
			</div>
			<div>
				<h3>Comments:</h3>
				<form onSubmit={comment}>
					<input type="text" name="comment" />
					<Button color="inherit" type="submit">add comment</Button>
				</form>
				<ul>
					{blog.comments.map( comment => (
						<li key={comment.id}>{comment}</li>
					))
					}
				</ul>
			</div>
		</div>
	)
}

export default BlogPage