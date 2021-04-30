import React, { useState } from 'react'

const Togglable = (props) => {
	const [blogsVisible, setBlogsVisible] = useState(false)

	const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
	const showWhenVisible = { display: blogsVisible ? '' : 'none' }

	const toggleVisibility = () => {
		setBlogsVisible(!blogsVisible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
}

export default Togglable