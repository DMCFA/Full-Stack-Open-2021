import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { Button, TextField } from '@material-ui/core'

const NewBlog = ({ notifyWith }) => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleNewBlog = async (event) => {
		try {
			event.preventDefault()
			dispatch(newBlog({ title, author, url }))
			setTitle('')
			setAuthor('')
			setUrl('')
			notifyWith(`a new blog '${title}' by ${author} added!`)
		} catch(err) {
			notifyWith(err)
		}
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					<TextField label='author'
						id='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<TextField label='title'
						id='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<TextField label='url'
						id='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<Button color="inherit" id="create">create</Button>
			</form>
		</div>
	)
}

export default NewBlog