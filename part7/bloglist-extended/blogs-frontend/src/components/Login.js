import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import {
	TextField,
	Button
} from '@material-ui/core'

const Login = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = (e) => {
		e.preventDefault()
		dispatch(loginUser(username, password))
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>login to application</h2>

			<form onSubmit={handleLogin}>
				<div>
					<TextField
						label='username' id='username' value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField label='password' id='password' value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<Button variant="contained" color="primary" type="submit" id='login'>
					login
				</Button>
			</form>
		</div>
	)
}

export default Login