import React from 'react'
import { Link } from 'react-router-dom'
import {
	Button,
	AppBar,
	Toolbar
} from '@material-ui/core'

const Navbar = ({ user, handleLogout }) => {

	return (
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit">
					<Link to="/">blogs</Link>
				</Button>
				<Button color="inherit">
					{user
						? <em>{user.name} logged in</em>
						: <Link to="/login">login</Link>
					}
				</Button>
				{user
					? <Button color="inherit" onClick={handleLogout}>logout</Button>
					: <Link to="/login">login</Link>
				}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar