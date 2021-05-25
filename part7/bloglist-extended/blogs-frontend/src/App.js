import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogPage from './components/BlogPage'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Navbar from './components/Navbar'

import storage from './utils/storage'

import { addNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Container from '@material-ui/core/Container'

const App = () => {
	const dispatch = useDispatch()
	const history = useHistory()

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
			history.push('/')
		}
	}

	const handleLogout = () => {
		dispatch(logoutUser(null))
		storage.logoutUser()
	}

	const findUser = useRouteMatch('/users/:id')
	const userId = findUser
		? users.find(user => user.id === findUser.params.id)
		: null

	const findBlog = useRouteMatch('/blogs/:id')
	const blogId = findBlog
		? blogs.find(blog => blog.id === findBlog.params.id)
		: null

	const byLikes = (b1, b2) => b2.likes - b1.likes

	return (
		<>
			{!user ?
				<Login notification={notification}
				/> :
				<Container>
					<Navbar handleLogout={handleLogout} user={user} />
					<div>
						<div>
							<h2>blogs</h2>
							<Notification notification={notification} />
						</div>
						<Switch>
							<Route path='/users/:id'>
								<User user={userId} />
							</Route>

							<Route path='/users'>
								<Users users={users} />
							</Route>
							<Route path='/blogs/:id'>
								<BlogPage blog={blogId}
									user = {user}
									handleLike = {handleLike}
									handleRemove = {handleRemove} />
							</Route>
							<Route path='/'>
								<Togglable buttonLabel='create new blog' ref={blogFormRef}>
									<NewBlog notifyWith={notifyWith} />
								</Togglable>

								{blogs.sort(byLikes).map(blog =>
									<Blog
										key={blog.id}
										blog={blog}
									/>
								)}
							</Route>
						</Switch>
					</div>
				</Container>
			}
		</>
	)
}

export default App