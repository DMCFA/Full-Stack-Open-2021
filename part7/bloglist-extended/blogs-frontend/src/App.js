import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'

import storage from './utils/storage'

import { addNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Switch, Route } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const users = useSelector(state => state.users)
	const notification = useSelector(state => state.notification)

	const blogFormRef = React.createRef()

	useEffect(() => {
		const user = storage.loadUser()
		dispatch(setUser(user))
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [dispatch])

	const notifyWith = (message, type='success') => {
		dispatch(addNotification(message, type))
	}

	const handleLike = async (id) => {
		const blogToLike = blogs.find(b => b.id === id)
		const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
		dispatch(likeBlog(likedBlog))
	}

	const handleRemove = async (id) => {
		const blogToRemove = blogs.find(b => b.id === id)
		const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		if (ok) {
			dispatch(removeBlog(id))
		}
	}

	const handleLogout = () => {
		dispatch(logoutUser(null))
		storage.logoutUser()
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes

	return (

		<Switch>

			<Route path='/users'>
				<h2>blogs</h2>
				<p>
					{user.name} logged in <button onClick={handleLogout}>logout</button>
				</p>
				<Users users={users} />
			</Route>

			<Route path='/'>
				<div>
					<h2>blogs</h2>

					<Notification notification={notification} />

					<p>
						{user.name} logged in <button onClick={handleLogout}>logout</button>
					</p>

					<Togglable buttonLabel='create new blog' ref={blogFormRef}>
						<NewBlog notifyWith={notifyWith} />
					</Togglable>

					{blogs.sort(byLikes).map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							handleLike={handleLike}
							handleRemove={handleRemove}
						/>
					)}
				</div>
			</Route>
		</Switch>
	)
}

export default App